document.addEventListener("DOMContentLoaded", function () {
  // Function to check if container is ready
  function isContainerReady(containerId) {
    const container = document.getElementById(containerId);
    const isReady = container && container.getBoundingClientRect().width > 0;
    return isReady;
  }
  

  // Function to create single chart
  function createChart(data, chart) {
    // Wait until container is ready
    if (!isContainerReady(chart.id)) {
      requestAnimationFrame(() => createChart(data, chart));
      return;
    }

    const container = document.getElementById(chart.id);
    container.innerHTML = ''; // Clear existing content
    const containerWidth = container.getBoundingClientRect().width;

    const itemColors = {
      "Iuran Pendaftaran": "#1f77b4",
      "Konsumsi": "#9D0208",
      "Sewa Lokasi": "#D00000",
      "Dekor": "#DC2F02",
      "Perlengkapan": "#E85D04",
      "Lain-lain": "#F48C06",
      "Amal": "#FAA307"
    };

    const pendapatan = data[chart.pendapatanKey].filter(item => item.Item !== "Total");
    const pengeluaran = data[chart.pengeluaranKey].filter(item => item.Item !== "Total");

    const iuranData = pendapatan.find(item => item.Item === "Iuran Pendaftaran");
    const totalPengeluaran = pengeluaran.reduce((sum, item) => sum + item.Jumlah, 0);
    const stackedData = pengeluaran.map((item, index) => {
      const previous = index > 0 ? 
        pengeluaran.slice(0, index).reduce((sum, prev) => sum + prev.Jumlah, 0) : 0;
      return {
        Item: item.Item,
        Jumlah: item.Jumlah,
        y0: previous,
        y1: previous + item.Jumlah,
        color: itemColors[item.Item],
        percentage: (item.Jumlah / totalPengeluaran * 100).toFixed(2)
      };
    });

    const svg = d3.select(`#${chart.id}`)
                  .append("svg")
                  .attr("width", containerWidth)
                  .attr("height", 500)
                  .attr("preserveAspectRatio", "xMidYMid meet"); // Add this for better scaling

    const margin = { top: 0, right: 0, bottom: 0, left: 0 };
    const width = containerWidth - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    
    const x = d3.scaleBand()
                .range([0, width])
                .domain(['Income', 'Expenses'])
                .padding(0);
    
    const y = d3.scaleLinear()
                .range([height, 0])
                .domain([0, Math.max(
                  iuranData.Jumlah,
                  stackedData[stackedData.length - 1].y1
                )]);

    const g = svg.append("g")
                 .attr("transform", `translate(${margin.left},${margin.top})`);

    // iuran bar
    g.append("rect")
      .attr("class", "bar")
      .attr("x", x('Income'))
      .attr("y", y(iuranData.Jumlah))
      .attr("width", x.bandwidth())
      .attr("height", height - y(iuranData.Jumlah))
      .attr("fill", itemColors["Iuran Pendaftaran"]);

    // iuran label
    g.append("text")
      .attr("class", "label")
      .attr("x", x('Income') + x.bandwidth() / 2)
      .attr("y", y(iuranData.Jumlah) + (height - y(iuranData.Jumlah)) / 2)
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .text(`Iuran: ${iuranData.Jumlah.toLocaleString()}`);

    // stacked bars
    const stackedBars = g.selectAll(".stacked-bar")
      .data(stackedData)
      .enter().append("rect")
      .attr("class", "stacked-bar")
      .attr("x", x('Expenses'))
      .attr("y", d => y(d.y1))
      .attr("width", x.bandwidth())
      .attr("height", d => y(d.y0) - y(d.y1))
      .attr("fill", d => d.color);

    // stacked bars label
    g.selectAll(".stacked-label")
      .data(stackedData)
      .enter().append("text")
      .attr("class", "stacked-label")
      .attr("x", x('Expenses') + x.bandwidth() / 2)
      .attr("y", d => y(d.y0) + (y(d.y1) - y(d.y0)) / 2)
      .attr("text-anchor", "middle") 
      .attr("dy", ".35em")
      .text(d => `${d.Item}: ${d.Jumlah.toLocaleString()} (${d.percentage}%)`);
  }

  // Main execution
  let chartsData = null;
  fetch('assets/data/finansial.json')
    .then(response => response.json())
    .then(data => {
      chartsData = data;
      const charts = [
        { id: "chart-50", pendapatanKey: "Pendapatan 50", pengeluaranKey: "Pengeluaran 50" },
        { id: "chart-100", pendapatanKey: "Pendapatan 100", pengeluaranKey: "Pengeluaran 100" },
        { id: "chart-150", pendapatanKey: "Pendapatan 150", pengeluaranKey: "Pengeluaran 150" },
        { id: "chart-200", pendapatanKey: "Pendapatan 200", pengeluaranKey: "Pengeluaran 200" },
        { id: "chart-250", pendapatanKey: "Pendapatan 250", pengeluaranKey: "Pengeluaran 250" },
        { id: "chart-300", pendapatanKey: "Pendapatan 300", pengeluaranKey: "Pengeluaran 300" }
      ];

      charts.forEach(chart => createChart(data, chart));

      // Handle window resize
      let resizeTimeout;
      window.addEventListener('resize', () => {
        // Debounce resize events
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          charts.forEach(chart => createChart(data, chart));
        }, 250);
      });
    });
});
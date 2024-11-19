document.addEventListener("DOMContentLoaded", function () {
  fetch('assets/data/finansial.json')
    .then(response => response.json())
    .then(data => {
      const charts = [
        { id: "chart-50", pendapatanKey: "Pendapatan 50", pengeluaranKey: "Pengeluaran 50" },
        { id: "chart-100", pendapatanKey: "Pendapatan 100", pengeluaranKey: "Pengeluaran 100" },
        { id: "chart-150", pendapatanKey: "Pendapatan 150", pengeluaranKey: "Pengeluaran 150" },
        { id: "chart-200", pendapatanKey: "Pendapatan 200", pengeluaranKey: "Pengeluaran 200" },
        { id: "chart-250", pendapatanKey: "Pendapatan 250", pengeluaranKey: "Pengeluaran 250" },
        { id: "chart-300", pendapatanKey: "Pendapatan 300", pengeluaranKey: "Pengeluaran 300" }
      ];

      const itemColors = {
        "Iuran Pendaftaran": "#1f77b4",
        "Konsumsi": "#D00000",
        "Sewa Lokasi": "#DC2F02",
        "Dekor": "#E85D04",
        "Perlengkapan": "#F48C06",
        "Keperluan tak terduga": "#FAA307",
        "Amal": "#FFBA08"
      };

      charts.forEach(chart => {
        const pendapatan = data[chart.pendapatanKey].filter(item => item.Item !== "Total");
        const pengeluaran = data[chart.pengeluaranKey].filter(item => item.Item !== "Total");

        const chartData = [
          ...pendapatan.map(item => ({ Item: item.Item, Jumlah: item.Jumlah, color: itemColors[item.Item] || "#1f77b4" })),
          ...pengeluaran.map(item => ({ Item: item.Item, Jumlah: item.Jumlah, color: itemColors[item.Item] || "#ff7f0e" }))
        ];

        const svg = d3.select(`#${chart.id}`)
                      .append("svg")
                      .attr("width", 600)
                      .attr("height", 400);
        
        const margin = { top: 20, right: 30, bottom: 40, left: 90 };
        const width = +svg.attr("width") - margin.left - margin.right;
        const height = +svg.attr("height") - margin.top - margin.bottom;
        
        const x = d3.scaleBand()
                    .range([0, width])
                    .padding(0.75);
        const y = d3.scaleLinear()
                    .range([height, 0]);

        const g = svg.append("g")
                     .attr("transform", `translate(${margin.left},${margin.top})`);
        
        x.domain(chartData.map(d => d.Item));
        y.domain([0, d3.max(chartData, d => d.Jumlah)]);

        g.selectAll(".bar")
          .data(chartData)
          .enter().append("rect")
          .attr("class", "bar")
          .attr("x", d => x(d.Item))
          .attr("y", d => y(d.Jumlah))
          .attr("width", x.bandwidth())
          .attr("height", d => height - y(d.Jumlah))
          .attr("fill", d => d.color);

        g.selectAll(".label")
          .data(chartData)
          .enter().append("text")
          .attr("class", "label")
          .attr("x", d => x(d.Item) + x.bandwidth() / 2)
          .attr("y", d => y(d.Jumlah) - 5)
          .attr("text-anchor", "right")
          .style("font-size", "9px")
          .text(d => `${d.Item}: ${d.Jumlah}`);
      });
    });
});
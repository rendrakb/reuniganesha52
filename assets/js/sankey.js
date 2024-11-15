document.addEventListener("DOMContentLoaded", function () {
    fetch('assets/data/finansial.json')
      .then(response => response.json())
      .then(data => {
        const charts = [
          { id: "sankey-chart-50", pendapatanKey: "Pendapatan 50", pengeluaranKey: "Pengeluaran 50" },
          { id: "sankey-chart-100", pendapatanKey: "Pendapatan 100", pengeluaranKey: "Pengeluaran 100" },
          { id: "sankey-chart-150", pendapatanKey: "Pendapatan 150", pengeluaranKey: "Pengeluaran 150" },
          { id: "sankey-chart-200", pendapatanKey: "Pendapatan 200", pengeluaranKey: "Pengeluaran 200" },
          { id: "sankey-chart-250", pendapatanKey: "Pendapatan 250", pengeluaranKey: "Pengeluaran 250" },
          { id: "sankey-chart-300", pendapatanKey: "Pendapatan 300", pengeluaranKey: "Pengeluaran 300" }
        ];
  
        charts.forEach(chart => {
          const sankeyData = generateSankeyData(data, chart.pendapatanKey, chart.pengeluaranKey);
          createSankey(sankeyData, chart.id);
        });
      }).catch(function(error) {
        console.error('Error loading the JSON file:', error);
      });
  });
  
  function generateSankeyData(data, pendapatanKey, pengeluaranKey) {
    const sankeyData = [];
    let pendapatanToAmalValue = 0;
  
    const financialDataPendapatan = data[pendapatanKey];
    const financialDataPengeluaran = data[pengeluaranKey];
  
    financialDataPendapatan.forEach(item => {
      if (item.Item === "Iuran Pendaftaran") {
        sankeyData.push({
          source: "Iuran",
          target: "Pendapatan",
          value: item.Jumlah
        });
      }
    });
  
    financialDataPengeluaran.forEach(item => {
      if (item.Item !== "Total") {
        sankeyData.push({
          source: "Pendapatan",
          target: item.Item,
          value: item.Jumlah
        });
  
        // Capture the value for "Amal" to use it for "Donasi"
        if (item.Item === "Amal") {
          pendapatanToAmalValue = item.Jumlah;
        }
      }
    });
  
    // Add the dynamic "Donasi" relations based on "Pendapatan" to "Amal" value
    if (pendapatanToAmalValue > 0) {
      sankeyData.push(
        { source: "Donasi", target: "Amal", value: pendapatanToAmalValue },
        { source: "Donasi", target: "Konsumsi", value: pendapatanToAmalValue * 0.1 }
      );
    }
  
    return sankeyData;
  }
  
  function createSankey(data, chartId) {
    console.log('Creating Sankey chart for', chartId); // log function call
  
    var width = 250; // Reduced width
    var height = 150; // Reduced height
  
    var svg = d3.select(`#${chartId}`).append("svg")
      .attr("width", width)
      .attr("height", height);
  
    var nodes = Array.from(new Set(data.flatMap(d => [d.source, d.target]))).map(name => ({ name }));
    var links = data.map(d => ({
      source: nodes.find(n => n.name === d.source),
      target: nodes.find(n => n.name === d.target),
      value: d.value
    }));
  
    console.log('Nodes:', nodes); // log nodes
    console.log('Links:', links); // log links
  
    var x = d3.scaleBand().domain(nodes.map(d => d.name)).range([0, width]).padding(0.1);
    var y = d3.scaleLinear().domain([0, d3.max(links, d => d.value)]).range([height, 0]);
  
    // Adjust the y scale for bars
    var yBarScale = d3.scaleLinear()
      .domain([0, d3.max(links, d => d.value)])
      .range([0, height * 0.5]); // Scale down to fit better
  
    // Append the nodes (bars)
    svg.selectAll(".node")
      .data(nodes)
      .enter().append("rect")
      .attr("class", "node")
      .attr("x", d => x(d.name))
      .attr("y", d => {
        var yValue = height - yBarScale(d3.sum(links.filter(l => l.source.name === d.name || l.target.name === d.name).map(l => l.value)));
        console.log('y for', d.name, ':', yValue); // log y value
        return yValue;
      })
      .attr("height", d => {
        var heightValue = yBarScale(d3.sum(links.filter(l => l.source.name === d.name || l.target.name === d.name).map(l => l.value)));
        console.log('height for', d.name, ':', heightValue); // log height value
        return heightValue;
      })
      .attr("width", x.bandwidth())
      .attr("fill", "steelblue");
  
    console.log('Bars created for', chartId); // log after creating bars
  }
  
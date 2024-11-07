d3.json('assets/data/50io.json').then(function(data) {
    console.log('JSON data loaded:', data); //log data
    
    createSankey(data);
}).catch(function(error) {
    console.error('Error loading the JSON file:', error);
});

function createSankey(data) {
    console.log('Creating Sankey chart'); //log function call
    
    var width = 500;
    var height = 800;

    var svg = d3.select("#sankey-chart-50").append("svg")
        .attr("width", width)
        .attr("height", height);

    var nodes = Array.from(new Set(data.flatMap(d => [d.source, d.target]))).map(name => ({ name }));
    var links = data.map(d => ({
        source: nodes.find(n => n.name === d.source),
        target: nodes.find(n => n.name === d.target),
        value: d.value
    }));

    console.log('Nodes:', nodes); //log nodes
    console.log('Links:', links); //log links

    var x = d3.scaleBand().domain(nodes.map(d => d.name)).range([0, width]);
    var y = d3.scaleLinear().domain([0, d3.max(links, d => d.value)]).range([height, 0]);

    //simple y scale for bars
    var yBarScale = d3.scaleLinear()
        .domain([0, d3.max(links, d => d.value)])
        .range([0, height]);

    //append the nodes (bars)
    svg.selectAll(".node")
        .data(nodes)
        .enter().append("rect")
        .attr("class", "node")
        .attr("x", d => x(d.name))
        .attr("y", d => {
            var yValue = height - yBarScale(d3.sum(links.filter(l => l.source.name === d.name || l.target.name === d.name).map(l => l.value)));
            console.log('y for', d.name, ':', yValue); //log y value
            return yValue;
        })
        .attr("height", d => {
            var heightValue = yBarScale(d3.sum(links.filter(l => l.source.name === d.name || l.target.name === d.name).map(l => l.value)));
            console.log('height for', d.name, ':', heightValue); //log height value
            return heightValue;
        })
        .attr("width", x.bandwidth())
        .attr("fill", "steelblue");

    console.log('Bars created'); //log after creating bars
}

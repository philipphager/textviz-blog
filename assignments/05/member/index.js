var width = 500,
    height = 500;

var colorscale = d3.scale.ordinal().range(["purple", "green", "black", "red"]);
var colorMap = {
    "spd": "purple",
    "gruene": "green",
    "cducsu": "black",
    "linke": "red"
}

var config = {
    w: width,
    h: height,
    levels: 6,
    ExtraWidthX: 300,
    color: colorscale
}

speakerData = speakerData.map((d) => {
    d["topics"].map((t) => {
        t["color"] = colorMap[d["party"]]
        return t;
    });
    return d;
});
var data = [];

d3.select("#sidebar")
    .selectAll("option")
    .data(speakerData)
    .enter()
    .append("option")
    .attr("value", (d, i) => d["id"])
    .text((d, i) => d["author"]);

d3.select("#sidebar")
    .on("change", () => {
        var id = d3.select("#sidebar").node().value;
        selectSpeaker(id);
    });

var drawLegend = () => {
    var legendTitles = ['SPD', 'Grüne', 'CDU/CSU', 'Linke'];

    // Build legend
    var svg = d3.select('body')
        .selectAll('svg')
        .append('svg')
        .attr("width", width + 300)
        .attr("height", height)

    // Legend title
    var text = svg.append("text")
        .attr("class", "title")
        .attr('transform', 'translate(120,0)')
        .attr("x", width - 70)
        .attr("y", 10)
        .attr("font-size", "12px")
        .attr("fill", "#404040")
        .text("Political party of speaker");

    // Init legend
    var legend = svg.append("g")
        .attr("class", "legend")
        .attr("height", 100)
        .attr("width", 200)
        .attr('transform', 'translate(120,20)');

    // Colour squares
    legend.selectAll('rect')
        .data(legendTitles)
        .enter()
        .append("rect")
        .attr("x", width - 65)
        .attr("y", function (d, i) { return i * 20; })
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", function (d, i) { return colorscale(i); });

    // Text next to squares
    legend.selectAll('text')
        .data(legendTitles)
        .enter()
        .append("text")
        .attr("x", width - 52)
        .attr("y", function (d, i) { return i * 20 + 9; })
        .attr("font-size", "11px")
        .attr("fill", "#737373")
        .text(function (d) { return d; });
}

var showDocuments = (id) => {
    docs = speakerDocuments[id]["docs"];

    d3.select("#documents")
        .selectAll("p")
        .remove();

    d3.select("#documents")
        .selectAll("p")
        .data(docs)
        .enter()
        .append("p")
        .text((d) => d);
}

var showRelatedSpeakers = (id) => {
    speakers = relatedSpeakers[id]["similar_speakers"];
    console.log(speakers)

    d3.select("#related")
        .selectAll("p")
        .remove();

    d3.select("#related")
        .selectAll("p")
        .data(speakers)
        .enter()
        .append("p")
        .text((d) => d);
}

var selectSpeaker = (id) => {
    console.log("Selected id: " + id);
    topics = speakerData[id]["topics"]
    data = [topics];
    config["maxValue"] = Math.max(...topics.map((t) => t["value"])),
        RadarChart.draw("#chart", data, config);
    showDocuments(id);
    showRelatedSpeakers(id);
    drawLegend();
}

selectSpeaker(0);

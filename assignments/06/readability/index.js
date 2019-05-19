var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function (d) { return d.id; }))
    .force("charge", d3.forceManyBody().strength(-40))
    .force("center", d3.forceCenter(width / 2, height / 2));

var data = null;

var color = d3.scaleOrdinal(d3.schemeCategory20);

var selectedTopics = [2, 8];

// https://de.wikipedia.org/wiki/Lesbarkeitsindex
var readabilityMapper = (value) => {
    value = parseInt(value);

    if (value > 90) {
        return "very easy";
    } else if (value > 80) {
        return "easy";
    } else if (value > 60) {
        return "medium";
    } else if (value > 50) {
        return "medium hard";
    } else if (value > 30) {
        return "hard";
    } else {
        return "very hard";
    }
}

var topics = [
    { "id": 0, "name": "Begüßung" },
    { "id": 1, "name": "Ausland" },
    { "id": 2, "name": "Antrag" },
    { "id": 3, "name": "Bund" },
    { "id": 4, "name": "Anfrage" },
    { "id": 5, "name": "Wirtschaft" },
    { "id": 6, "name": "Anrede" },
    { "id": 7, "name": "Energie" },
    { "id": 8, "name": "Europa" },
    { "id": 9, "name": "Wirtschaft" },
    { "id": 10, "name": "Soziales" },
    { "id": 11, "name": "Landwirt." },
    { "id": 12, "name": "Flüchtl." },
    { "id": 13, "name": "Wohnen" },
    { "id": 14, "name": "Arbeit" },
    { "id": 15, "name": "Bundeswehr" },
    { "id": 16, "name": "Entw. Hilfe" },
    { "id": 17, "name": "Familie" },
    { "id": 18, "name": "Datenschutz" },
    { "id": 19, "name": "Haushalt" }
];

function drawGraph(allNodes, allEdges) {
    simulation.restart();
    nodes = allNodes;
    edges = allEdges.filter((d) => selectedTopics.includes(d.target));

    svg.selectAll("*").remove();

    var colorScale = d3.scaleLinear().domain([0, 70])
        .range(["blue", "white"]);

    var selectTopic = (edge) => {
        if (edge) {
            d3.select("#info")
                .selectAll("p")
                .data([edge])
                .enter()
                .append("p")
                .text((d) => "Member: " + d.source.id)
                .append("p")
                .text((d) => "Readability in topic '" + d.target.name + "': " + d.value);
        } else {
            d3.select("#info")
                .selectAll("p")
                .remove();
        }
    };

    var filterTopic = (topic) => {
        if (selectedTopics.includes(topic.id)) {
            selectedTopics.pop(topic.id);
        } else {
            selectedTopics.push(topic.id);
        }

        drawGraph(data.nodes, data.edges);
    };

    var link = svg.append("g")
        .selectAll("line")
        .data(edges)
        .enter().append("line")
        .attr("stroke-width", function (d) { return Math.sqrt(d.value); })
        .attr("stroke", function (d) {
            return colorScale(d.value);
        }).on('mouseover', function (d) {
            d3.select(this)
                .transition()
                .duration(100)
                .attr("stroke-width", function (d) { return 10; });

            selectTopic(d);
        })
        .on('mouseout', function (d) {
            d3.select(this)
                .transition()
                .duration(100)
                .attr("stroke-width", function (d) { return Math.sqrt(d.value); });

            selectTopic();
        });

    d3.select("#topic-selector")
        .selectAll("div")
        .data(topics)
        .enter()
        .append("div")
        .append("label")
        .attr("for", (d) => d.id)
        .text((d) => d.name)
        .append("input")
        .attr("type", "checkbox")
        .attr("id", (d) => d.id)
        .property("checked", (d) => {
            return selectedTopics.includes(d.id)
        })
        .on("change", filterTopic);

    var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("g")
        .data(nodes)
        .enter().append("g")

    var colorNodes = (d) => {
        if (d.type === "topic") {
            return color(d.id);
        } else {
            return colorScale(d.average_speaker_readability);
        }
    };

    var resizeNodes = (d) => {
        if (d.type === "topic") {
            return d.average_topic_readability * 0.5;
        } else {
            return 5;
        }
    };

    var selectSpeaker = (id) => {
        if (id) {
            d3.select("#info")
                .selectAll("p")
                .data([id])
                .enter()
                .append("p")
                .text((d) => {
                    if (d.type == "topic") {
                        return "Topic: " + d.name;
                    } else {
                        return "Member: " + d.id;
                    }
                })
                .append("p")
                .text((d) => {
                    if (d.type == "topic") {
                        return "Average readability of all speeches in topic: " + Math.round(d.average_topic_readability, 2) + " (" + readabilityMapper(d.average_topic_readability) + ")";
                    } else {
                        return "Average readability of all speeches: " + Math.round(d.average_speaker_readability) + " (" + readabilityMapper(d.average_speaker_readability) + ")";
                    }
                });
        } else {
            d3.select("#info")
                .selectAll("p")
                .remove();
        }
    };

    var circles = node.append("circle")
        .attr("r", resizeNodes)
        .attr("fill", colorNodes)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended))
        .on('mouseover', function (d) {
            d3.select(this)
                .transition()
                .duration(100)
                .attr('r', 15);

            selectSpeaker(d);
        })
        .on('mouseout', function (d) {
            d3.select(this)
                .transition()
                .duration(100)
                .attr('r', resizeNodes)
            selectSpeaker()
        });

    var lables = node.append("text")
        .text(function (d) {
            return d.id;
        })
        .attr('x', 6)
        .attr('y', 3)
        .attr('style', 'display:none;');

    node.append("title")
        .text(function (d) { return d.id; });;

    simulation
        .nodes(nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(edges);

    function ticked() {
        link
            .attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; });

        node
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            })
    }
}

function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

d3.json("data.json", function (error, graph) {
    if (error) throw error;
    data = graph;

    drawGraph(data.nodes, data.edges);
});


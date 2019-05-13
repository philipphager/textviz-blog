var width = 500,
    height = 500;

var colorscale = d3.scale.ordinal().range(["purple", "green", "black", "red"]);

var legendTitles = ['SPD (202 speakers)', 'Grüne (71 speakers)', 'CDU/CSU (312 speakers)', 'Linke (67 speakers)'];

var data = [[
    { "axis": "Begüßung", "value": 0.04462631894897639, "color": "purple" },
    { "axis": "Auslandseinsätze", "value": 0.030298982545961035, "color": "purple" },
    { "axis": "Antrag", "value": 0.17560700611761895, "color": "purple" },
    { "axis": "Bund", "value": 0.07978005520624103, "color": "purple" },
    { "axis": "Anfrage", "value": 0.06723973581172867, "color": "purple" },
    { "axis": "Wirtschaft/Rente", "value": 0.021756432741495146, "color": "purple" },
    { "axis": "Anrede", "value": 0.07281972205872525, "color": "purple" },
    { "axis": "Energiewende", "value": 0.035198775544720784, "color": "purple" },
    { "axis": "Europa", "value": 0.026206746343589337, "color": "purple" },
    { "axis": "Wirtschaft", "value": 0.02015431514225945, "color": "purple" },
    { "axis": "Soziales", "value": 0.035853569520036585, "color": "purple" },
    { "axis": "Landwirtschaft", "value": 0.017522608807300777, "color": "purple" },
    { "axis": "Flüchtlingspolitik", "value": 0.04836807339928674, "color": "purple" },
    { "axis": "Wohnen", "value": 0.047162954414010166, "color": "purple" },
    { "axis": "Frauenquote", "value": 0.046806188449461, "color": "purple" },
    { "axis": "Bundeswehr", "value": 0.031334624906131224, "color": "purple" },
    { "axis": "Humanitäre Hilfe", "value": 0.05220294282744657, "color": "purple" },
    { "axis": "Familienpolitik", "value": 0.04109634543171888, "color": "purple" },
    { "axis": "Datenschutz", "value": 0.05632319260162189, "color": "purple" },
    { "axis": "Haushalt", "value": 0.04964140918167015, "color": "purple" }
], [
    { "axis": "Begüßung", "value": 0.026971855540870796, "color": "green" },
    { "axis": "Auslandseinsätze", "value": 0.03418054494600681, "color": "green" },
    { "axis": "Antrag", "value": 0.15935268364146812, "color": "green" },
    { "axis": "Bund", "value": 0.08136658732358806, "color": "green" },
    { "axis": "Anfrage", "value": 0.10041029331399118, "color": "green" },
    { "axis": "Wirtschaft/Rente", "value": 0.0298567596122006, "color": "green" },
    { "axis": "Anrede", "value": 0.0781907882024178, "color": "green" },
    { "axis": "Energiewende", "value": 0.045431686522771395, "color": "green" },
    { "axis": "Europa", "value": 0.034542157803550244, "color": "green" },
    { "axis": "Wirtschaft", "value": 0.024057724547168178, "color": "green" },
    { "axis": "Soziales", "value": 0.030199740713313643, "color": "green" },
    { "axis": "Landwirtschaft", "value": 0.019034640058956335, "color": "green" },
    { "axis": "Flüchtlingspolitik", "value": 0.05824091447543428, "color": "green" },
    { "axis": "Wohnen", "value": 0.04317808518648628, "color": "green" },
    { "axis": "Frauenquote", "value": 0.030466474677261483, "color": "green" },
    { "axis": "Bundeswehr", "value": 0.03016085131995332, "color": "green" },
    { "axis": "Humanitäre Hilfe", "value": 0.05066858829054173, "color": "green" },
    { "axis": "Familienpolitik", "value": 0.04398371656603532, "color": "green" },
    { "axis": "Datenschutz", "value": 0.044136388192486255, "color": "green" },
    { "axis": "Haushalt", "value": 0.03556951906549820, "color": "green" }
], [
    { "axis": "Begüßung", "value": 0.0397858625310752, "color": "black" },
    { "axis": "Auslandseinsätze", "value": 0.02945973501450239, "color": "black" },
    { "axis": "Antrag", "value": 0.16262302673140805, "color": "black" },
    { "axis": "Bund", "value": 0.06553575238770958, "color": "black" },
    { "axis": "Anfrage", "value": 0.06438966258837643, "color": "black" },
    { "axis": "Wirtschaft/Rente", "value": 0.027890686780613166, "color": "black" },
    { "axis": "Anrede", "value": 0.0806315645675773, "color": "black" },
    { "axis": "Energiewende", "value": 0.037698599198761756, "color": "black" },
    { "axis": "Europa", "value": 0.029301364999677164, "color": "black" },
    { "axis": "Wirtschaft", "value": 0.023932716325399683, "color": "black" },
    { "axis": "Soziales", "value": 0.04529330972783279, "color": "black" },
    { "axis": "Landwirtschaft", "value": 0.018955700770346407, "color": "black" },
    { "axis": "Flüchtlingspolitik", "value": 0.04561880958392921, "color": "black" },
    { "axis": "Wohnen", "value": 0.04119482368708466, "color": "black" },
    { "axis": "Frauenquote", "value": 0.044612379508480515, "color": "black" },
    { "axis": "Bundeswehr", "value": 0.03429086553497243, "color": "black" },
    { "axis": "Humanitäre Hilfe", "value": 0.047598300857764016, "color": "black" },
    { "axis": "Familienpolitik", "value": 0.045806926975213894, "color": "black" },
    { "axis": "Datenschutz", "value": 0.06314088180835019, "color": "black" },
    { "axis": "Haushalt", "value": 0.0522390304209249, "color": "black" }
], [
    { "axis": "Begüßung", "value": 0.02675702265694867, "color": "red" },
    { "axis": "Auslandseinsätze", "value": 0.0453910796289782, "color": "red" },
    { "axis": "Antrag", "value": 0.1578900123448166, "color": "red" },
    { "axis": "Bund", "value": 0.08358189609356968, "color": "red" },
    { "axis": "Anfrage", "value": 0.08625736533308886, "color": "red" },
    { "axis": "Wirtschaft/Rente", "value": 0.028426792365906145, "color": "red" },
    { "axis": "Anrede", "value": 0.08463198916879192, "color": "red" },
    { "axis": "Energiewende", "value": 0.028141751923937124, "color": "red" },
    { "axis": "Europa", "value": 0.02945462795168786, "color": "red" },
    { "axis": "Wirtschaft", "value": 0.02012742238927771, "color": "red" },
    { "axis": "Soziales", "value": 0.025745065443364107, "color": "red" },
    { "axis": "Landwirtschaft", "value": 0.016051442087381046, "color": "red" },
    { "axis": "Flüchtlingspolitik", "value": 0.0733780880845482, "color": "red" },
    { "axis": "Wohnen", "value": 0.03256657746373656, "color": "red" },
    { "axis": "Frauenquote", "value": 0.03762759492999284, "color": "red" },
    { "axis": "Bundeswehr", "value": 0.035056387974009416, "color": "red" },
    { "axis": "Humanitäre Hilfe", "value": 0.06647645441214384, "color": "red" },
    { "axis": "Familienpolitik", "value": 0.03905970963665432, "color": "red" },
    { "axis": "Datenschutz", "value": 0.04769695707326723, "color": "red" },
    { "axis": "Haushalt", "value": 0.035681763037899696, "color": "red" }
]];

// Options for radar chart
var config = {
    w: width,
    h: height,
    maxValue: 0.2,
    levels: 6,
    ExtraWidthX: 300,
    color: colorscale
}

// Call function to draw the Radar chart
// Will expect that data is in %'s
RadarChart.draw("#chart", data, config);

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
    .text("Topic distribution over all party members");

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

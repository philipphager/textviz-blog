var viz;

var predicates = [
    { "id": "show all" },
    { "id": "accelerate" },
    { "id": "achieve" },
    { "id": "add" },
    { "id": "address" },
    { "id": "admit" },
    { "id": "announce" },
    { "id": "answer" },
    { "id": "apply" },
    { "id": "appoint" },
    { "id": "approve" },
    { "id": "ask" },
    { "id": "attack" },
    { "id": "back" },
    { "id": "be" },
    { "id": "beat" },
    { "id": "become" },
    { "id": "begin" },
    { "id": "believe" },
    { "id": "blame" },
    { "id": "blindside" },
    { "id": "break" },
    { "id": "bring" },
    { "id": "build" },
    { "id": "bump" },
    { "id": "buy" },
    { "id": "call" },
    { "id": "cancel" },
    { "id": "celebrate" },
    { "id": "challenge" },
    { "id": "cite" },
    { "id": "claim" },
    { "id": "clear" },
    { "id": "close" },
    { "id": "commute" },
    { "id": "confirm" },
    { "id": "continue" },
    { "id": "counter" },
    { "id": "create" },
    { "id": "criticize" },
    { "id": "cut" },
    { "id": "damage" },
    { "id": "defend" },
    { "id": "delay" },
    { "id": "deny" },
    { "id": "detail" },
    { "id": "ding" },
    { "id": "downrank" },
    { "id": "drop" },
    { "id": "encourage" },
    { "id": "enter" },
    { "id": "exit" },
    { "id": "explain" },
    { "id": "extend" },
    { "id": "face" },
    { "id": "find" },
    { "id": "fire" },
    { "id": "follow" },
    { "id": "free" },
    { "id": "further" },
    { "id": "get" },
    { "id": "gift" },
    { "id": "give" },
    { "id": "go" },
    { "id": "greenlight" },
    { "id": "grill" },
    { "id": "have" },
    { "id": "help" },
    { "id": "hire" },
    { "id": "hit" },
    { "id": "ignore" },
    { "id": "invoke" },
    { "id": "join" },
    { "id": "lead" },
    { "id": "let" },
    { "id": "lose" },
    { "id": "lower" },
    { "id": "make" },
    { "id": "mark" },
    { "id": "monitor" },
    { "id": "nab" },
    { "id": "name" },
    { "id": "offer" },
    { "id": "open" },
    { "id": "order" },
    { "id": "outbid" },
    { "id": "overtake" },
    { "id": "pause" },
    { "id": "pay" },
    { "id": "petition" },
    { "id": "pick" },
    { "id": "play" },
    { "id": "poach" },
    { "id": "pocket" },
    { "id": "poke" },
    { "id": "press" },
    { "id": "probe" },
    { "id": "promote" },
    { "id": "pull" },
    { "id": "push" },
    { "id": "quit" },
    { "id": "raise" },
    { "id": "reboot" },
    { "id": "recommend" },
    { "id": "recover" },
    { "id": "reject" },
    { "id": "relase" },
    { "id": "relax" },
    { "id": "release" },
    { "id": "remain" },
    { "id": "remove" },
    { "id": "replace" },
    { "id": "revamp" },
    { "id": "reveal" },
    { "id": "roll" },
    { "id": "rule" },
    { "id": "sell" },
    { "id": "set" },
    { "id": "settle" },
    { "id": "shut" },
    { "id": "sidestep" },
    { "id": "slam" },
    { "id": "slash" },
    { "id": "snag" },
    { "id": "streamline" },
    { "id": "sue" },
    { "id": "summon" },
    { "id": "supercharge" },
    { "id": "take" },
    { "id": "talk" },
    { "id": "tap" },
    { "id": "target" },
    { "id": "tease" },
    { "id": "test" },
    { "id": "think" },
    { "id": "top" },
    { "id": "turn" },
    { "id": "undercut" },
    { "id": "update" },
    { "id": "uphold" },
    { "id": "use" },
    { "id": "visit" },
    { "id": "want" },
    { "id": "win" },
    { "id": "wo" }
];

d3.select("#predicate")
    .selectAll("option")
    .data(predicates)
    .enter()
    .append("option")
    .attr("value", (d, i) => d["id"])
    .text((d, i) => d["id"]);

d3.select("#predicate")
    .on("change", () => {
        var predicate = d3.select("#predicate").node().value;
        draw(predicate);
    });

function draw(predicate) {
    var cypher = "MATCH (s:Subject)-[r:r {id: '" + predicate + "' }]->(o:Subject) RETURN *;"

    if (predicate == "show all") {
        cypher = "MATCH (s:Subject)-[r:r]->(o:Subject) RETURN *;"
    }

    var config = {
        container_id: "viz",
        server_url: "bolt://100.25.165.244:32864",
        server_user: "neo4j",
        server_password: "trick-recess-proportions",
        labels: {
            "Subject": {
                "caption": "id"
            }
        },
        relationships: {
            "r": {
                "caption": "id"
            }
        },
        initial_cypher: cypher
    };

    viz = new NeoVis.default(config);
    viz.render();
}


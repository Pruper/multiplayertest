let connection = new WebSocket('wss://multiplayergametest.leg3ndmagician.repl.co', "this-is-probably-a-protocol");

connection.onopen = function () {
    player.name = prompt("Please enter a username.");
}
connection.onmessage = function (msg) {
    let smsg = JSON.stringify(msg.data);
    let dmsg = JSON.parse(JSON.parse(smsg));
    
    if (dmsg.uuid == player.uuid) {
        // well this is awkward. hello there ig.
    } else {
        let index = otherPlayers.map(function(o) { return o.uuid; }).indexOf(dmsg.uuid);
        if (index != -1) {
            otherPlayers[index].update(dmsg);
        } else {
            otherPlayers.push(new Player());
            otherPlayers[otherPlayers.length - 1].update(dmsg);
        }
    }
}
connection.onclose = function (e) {
    console.log("Connection has been closed!");
}
connection.onerror = function () {
    console.log("An error occured in your connection!");
}
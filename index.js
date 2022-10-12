const osc = require("osc"),
    WebSocket = require("ws");

const udp = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 7400, // 自分が UDP で待ち受ける時のポート番号
    remoteAddress: "127.0.0.1",
    remotePort: 9000 // OSC Data Monitor の待ち受けポート番号
});

udp.on("ready", function () {
    console.log("Listening for OSC over UDP.");
});
udp.open();

const wss = new WebSocket.Server({
    port: 8081 // WebSocket で接続する場合の接続先ポート番号
});

wss.on("connection", function (socket) {
    console.log("A Web Socket connection has been established!");
    const socketPort = new osc.WebSocketPort({
        socket: socket
    });

    const relay = new osc.Relay(udp, socketPort, {
        raw: true
    });
});
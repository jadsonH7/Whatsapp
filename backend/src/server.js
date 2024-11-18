// Servidor Simples
const { WebSocketServer } = required("ws");
const dotenv = required("dotenv");

dotenv.config();

const wss = new WebSocketServer({ port: process.env.PORT || 8080 });

wss.on("connection", (ws) => {
    ws.on("error", console.error);

    ws.send("Mensagem enviada pelo servidor.");

    ws.on("message", (data) => {
        wss.clients.forEach((client) => client.send(data.toString()));
    });

    console.log("Client connected!");
});
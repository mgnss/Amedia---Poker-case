import fastify from "fastify";
import cors from "@fastify/cors";
import handRoutes from "./routes/hands";
import connectToDbPlugin from "./plugins/connectToDbPlugin";

const server = fastify({ logger: true });
const PORT = 3000;

server.register(cors, {
    origin: "http://localhost:4173",
    methods: ["GET", "POST"],
});

server.register(connectToDbPlugin, {
    uri:
        process.env.NODE_ENV === "production"
            ? process.env.MONGO_URL!
            : "mongodb://localhost:27017/mydb",
});
server.register(handRoutes, { prefix: "/api" });

server.listen({ port: PORT, host: "0.0.0.0" }, (err, address) => {
    if (err) {
        server.log.error(err);
        process.exit(1);
    }

    console.log(`Server is now listening on ${address}`);
});

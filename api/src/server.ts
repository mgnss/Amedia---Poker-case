import fastify from "fastify";
import handRoutes from "./routes/hands";

const server = fastify({ logger: true });
const PORT = 3001;

server.register(handRoutes, { prefix: "/api" });

server.listen({ port: PORT, host: "0.0.0.0" }, (err, address) => {
    if (err) {
        server.log.error(err);
        process.exit(1);
    }

    console.log(`Server is now listening on ${address}`);
});

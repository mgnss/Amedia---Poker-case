import fastify from "fastify";
const server = fastify({ logger: true });
const PORT = 3001;

server.get("/api/createHand", (req, reply) => {
    reply.send({ test: "ah" });
});

server.listen({ port: PORT }, (err, address) => {
    if (err) {
        server.log.error(err);
        process.exit(1);
    }

    console.log(`Server is now listening on ${address}`);
});

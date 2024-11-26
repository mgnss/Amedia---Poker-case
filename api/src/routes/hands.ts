import { FastifyInstance } from "fastify";

interface IQuerystring {
    username: string;
    password: string;
}

interface IReply {
    200: { test: string };
    302: { url: string };
    "4xx": { error: string };
}

const handRoutes = async (server: FastifyInstance, options: any) => {
    // Create hand
    server.post<{
        Querystring: IQuerystring;
        Reply: IReply;
    }>("/createHand", (request, reply) => {
        reply.code(200).send({ test: "ah" });

        // reply.code(404).send({ error: 'Not found' });
    });

    // Get hands
    server.get<{
        Reply: IReply;
    }>("/getHands", (request, reply) => {
        reply.code(200).send({ test: "as" });

        // reply.code(404).send({ error: 'Not found' });
    });

    // Check winner
    server.get<{
        Querystring: IQuerystring;
        Reply: IReply;
    }>("/checkWinner", (request, reply) => {
        reply.code(200).send({ test: "ah" });

        // reply.code(404).send({ error: 'Not found' });
    });
};

export default handRoutes;

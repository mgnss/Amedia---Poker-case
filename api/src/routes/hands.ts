import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { v4 as uuidv4 } from "uuid";
import { Hand } from "../models/hand";
import { analyseHand, createRandomHand } from "../lib/utils";

const handRoutes = async (
    server: FastifyInstance,
    options: Record<string, any>
) => {
    // Create hand
    server.get(
        "/createHand",
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const randomHand = createRandomHand();
                const category = analyseHand(randomHand);

                const newHand = new Hand({
                    _id: uuidv4(),
                    cards: randomHand,
                    category: category,
                });

                const savedHand = await newHand.save();
                reply.code(200).send({ message: "Success", data: savedHand });
            } catch (error) {
                console.error("Error:", error);
                reply.code(500).send({ error: "Internal Server Error" });
            }
        }
    );

    // Get hands
    server.get(
        "/getHands",
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const hands = await Hand.find({});
                reply.code(200).send({ message: "Success", data: hands });
            } catch (error) {
                console.error("Error:", error);
                reply.code(500).send({ error: "Internal Server Error" });
            }
        }
    );

    // Check winner
    // server.get(
    //     "/checkWinner",
    //     async (request: FastifyRequest, reply: FastifyReply) => {
    //         try {
    //             const hands = await Hand.find({});
    //             reply.code(200).send({ message: "Success", data: hands });
    //         } catch (error) {
    //             console.error("Error:", error);
    //             reply.code(500).send({ error: "Internal Server Error" });
    //         }
    //     }
    // );
};

export default handRoutes;

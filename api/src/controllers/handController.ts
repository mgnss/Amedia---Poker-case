import type { FastifyRequest, FastifyReply } from "fastify";
import { v4 as uuidv4 } from "uuid";

import { HandT } from "../lib/types";
import { analyseHand, createRandomHand } from "../lib/utils";
import { Hand } from "../models/hand";
import { findWinnerByHands } from "../lib/utils";

export const createHand = async (
    request: FastifyRequest,
    reply: FastifyReply
): Promise<void> => {
    try {
        const randomHand = createRandomHand();
        const category = analyseHand(randomHand);

        const newHand = new Hand({
            _id: uuidv4(),
            cards: [randomHand],
            category: category,
        });

        const savedHand = await newHand.save();
        reply.code(200).send({ message: "Success", data: savedHand });
    } catch (error) {
        console.error("Error:", error);
        reply.code(500).send({ error: "Internal Server Error" });
    }
};

export const getHands = async (
    request: FastifyRequest,
    reply: FastifyReply
): Promise<void> => {
    try {
        const hands = await Hand.find({});
        reply.code(200).send({ message: "Success", data: hands });
    } catch (error) {
        console.error("Error:", error);
        reply.code(500).send({ error: "Internal Server Error" });
    }
};

export const checkWinner = async (
    request: FastifyRequest,
    reply: FastifyReply
): Promise<void> => {
    try {
        const allIds = Object.values(request.query!);

        const hands: HandT[] = await Hand.find({ _id: { $in: allIds } });
        const winner = findWinnerByHands(hands);

        reply.code(200).send({ message: "Success", data: winner });
    } catch (error) {
        console.error("Error:", error);
        reply.code(500).send({ error: "Internal Server Error" });
    }
};

import type { FastifyInstance } from "fastify";
import * as handController from "./../controllers/handController";

const createHandOpts = {
    handler: handController.createHand,
};

const getHandsOpts = {
    handler: handController.getHands,
};

const checkWinnerOpts = {
    handler: handController.checkWinner,
    schema: {
        querystring: {
            type: "object",
            minProperties: 2,
            additionalProperties: false,
            patternProperties: {
                "^id[1-9]$": { type: "string" },
            },
        },
    },
};

const handRoutes = async (
    server: FastifyInstance,
    options: Record<string, any>
) => {
    server.get("/createHand", createHandOpts);
    server.get("/getHands", getHandsOpts);
    server.get("/checkWinner", checkWinnerOpts);
};

export default handRoutes;

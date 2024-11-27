import fastifyPlugin from "fastify-plugin";
import mongoose, { ConnectOptions } from "mongoose";
import type { FastifyInstance, FastifyPluginCallback } from "fastify";

interface MongoosePluginOptions extends ConnectOptions {
    uri: string;
}

const connectToDbPlugin = fastifyPlugin<MongoosePluginOptions>(
    async (server: FastifyInstance, options: Record<string, any>) => {
        const { uri } = options;

        try {
            await mongoose.connect(uri);

            server.addHook("onClose", async () => {
                await mongoose.disconnect();
            });

            server.log.info("Connected to MongoDB");
        } catch (error) {
            server.log.error(error, "Failed to connect to MongoDB");
            throw new Error(`MongoDB connection error: ${error}`);
        }
    }
);

export default connectToDbPlugin;

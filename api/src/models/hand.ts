import mongoose from "mongoose";

const handSchema = new mongoose.Schema({
    _id: String,
    cards: [String],
    category: String,
});

export const Hand = mongoose.model("Hand", handSchema);

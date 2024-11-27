export type HandT = {
    _id: string;
    cards: string[];
    category: string;
};

export type createHandResponseT = {
    data: HandT;
    message: string;
};

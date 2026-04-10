import mongoose from "mongoose";

export const createAuthorImplicit = async (req, res) => {
    try {
    const { name, nationality } = req.body;

    const result = await mongoose.connection
        .collection("authors")
        .insertOne({ name, nationality });

    res.status(201).json({
        message: "Author inserted successfully",
        data: result
    });

    } catch (error) {
    res.status(500).json({
        message: "Error inserting author",
        error: error.message
    });
    }
};

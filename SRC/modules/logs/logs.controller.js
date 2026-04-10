import mongoose from "mongoose";

export const createCappedLogsCollection = async (req, res) => {
    try {
    await mongoose.connection.createCollection("logs", {
        capped: true,
      size: 1024 * 1024 // 1MB
    });

    res.status(201).json({
        message: "Capped logs collection created successfully"
    });

    } catch (error) {
    res.status(500).json({
        message: "Error creating capped collection",
        error: error.message
    });
    }
};





export const insertLog = async (req, res) => {
  try {
    const log = {
      message: req.body.message,
      createdAt: new Date()
    };

    const result = await mongoose.connection
      .collection("logs")
      .insertOne(log);

    res.status(201).json({
      message: "Log inserted successfully",
      data: result
    });

  } catch (error) {
    res.status(500).json({
      message: "Error inserting log",
      error: error.message
    });
  }
};


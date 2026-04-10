import mongoose from "mongoose";

export const createBooksCollection = async (req, res) => {
  try {
    await mongoose.connection.createCollection("books", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["title"],
          properties: {
            title: {
              bsonType: "string",
              description: "Title must be a non-empty string",
              minLength: 1
            }
          }
        }
      }
    });

    res.status(201).json({
      message: "Books collection created with validation"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating collection",
      error: error.message
    });
  }
};


export const createTitleIndex = async (req, res) => {
  try {
    const result = await mongoose.connection
      .collection("books")
      .createIndex({ title: 1 });

    res.status(201).json({
      message: "Index created on title field",
      indexName: result
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating index",
      error: error.message
    });
  }
};


export const insertOneBook = async (req, res) => {
  try {
    const book = req.body;

    const result = await mongoose.connection
      .collection("books")
      .insertOne(book);

    res.status(201).json({
      message: "Book inserted successfully",
      data: result
    });

  } catch (error) {
    res.status(500).json({
      message: "Error inserting book",
      error: error.message
    });
  }
};



export const insertManyBooks = async (req, res) => {
  try {
    const books = req.body; 

    if (!Array.isArray(books)) {
      return res.status(400).json({
        message: "Request body must be an array of books"
      });
    }

    const result = await mongoose.connection
      .collection("books")
      .insertMany(books);

    res.status(201).json({
      message: "Books inserted successfully",
      insertedCount: result.insertedCount
    });

  } catch (error) {
    res.status(500).json({
      message: "Error inserting books",
      error: error.message
    });
  }
};


export const updateBookYear = async (req, res) => {
  try {
    const { title } = req.params;

    const result = await mongoose.connection
      .collection("books")
      .updateOne(
        { title: title },
        { $set: { year: 2022 } }
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    res.status(200).json({
      message: "Book updated successfully",
      modifiedCount: result.modifiedCount
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating book",
      error: error.message
    });
  }
};



export const findBookByTitle = async (req, res) => {
  try {
    const { title } = req.query;

    const book = await mongoose.connection
      .collection("books")
      .findOne({ title: title });

    if (!book) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    res.status(200).json({
      message: "Book found",
      data: book
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching book",
      error: error.message
    });
  }
};




export const findBooksByYearRange = async (req, res) => {
  try {
    const { from, to } = req.query;

    const books = await mongoose.connection
      .collection("books")
      .find({
        year: {
          $gte: Number(from),
          $lte: Number(to)
        }
      })
      .toArray();

    res.status(200).json({
      message: "Books fetched successfully",
      count: books.length,
      data: books
    });

  } catch (error) {
    res.status(500).json({
      message: "Error fetching books",
      error: error.message
    });
  }
};





export const findBooksByGenre = async (req, res) => {
  try {
    const { genre } = req.query;

    const books = await mongoose.connection
      .collection("books")
      .find({ genres: genre })
      .toArray();

    res.status(200).json({
      count: books.length,
      data: books
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const skipLimitBooks = async (req, res) => {
  try {
    const books = await mongoose.connection
      .collection("books")
      .find({})
      .sort({ year: -1 })
      .skip(2)
      .limit(3)
      .toArray();

    res.status(200).json({
      count: books.length,
      data: books
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const findBooksWithIntegerYear = async (req, res) => {
  try {
    const books = await mongoose.connection
      .collection("books")
      .find({ year: { $type: "int" } })
      .toArray();

    res.status(200).json({
      count: books.length,
      data: books
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const excludeGenres = async (req, res) => {
  try {
    const books = await mongoose.connection
      .collection("books")
      .find({
        genres: { $nin: ["Horror", "Science Fiction"] }
      })
      .toArray();

    res.status(200).json({
      count: books.length,
      data: books
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBooksBeforeYear = async (req, res) => {
  try {
    const { year } = req.query;

    const result = await mongoose.connection
      .collection("books")
      .deleteMany({
        year: { $lt: Number(year) }
      });

    res.status(200).json({
      message: "Books deleted successfully",
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const aggregateAfter2000Sorted = async (req, res) => {
  try {
    const books = await mongoose.connection
      .collection("books")
      .aggregate([
        { $match: { year: { $gt: 2000 } } },
        { $sort: { year: -1 } }
      ])
      .toArray();

    res.status(200).json({
      count: books.length,
      data: books
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const aggregateProjectFields = async (req, res) => {
  try {
    const books = await mongoose.connection
      .collection("books")
      .aggregate([
        { $match: { year: { $gt: 2000 } } },
        {
          $project: {
            _id: 0,
            title: 1,
            author: 1,
            year: 1
          }
        }
      ])
      .toArray();

    res.status(200).json({
      count: books.length,
      data: books
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const aggregateUnwindGenres = async (req, res) => {
  try {
    const books = await mongoose.connection
      .collection("books")
      .aggregate([
        { $unwind: "$genres" }
      ])
      .toArray();

    res.status(200).json({
      count: books.length,
      data: books
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const aggregateJoinBooksLogs = async (req, res) => {
  try {
    const books = await mongoose.connection
      .collection("books")
      .aggregate([
        {
          $lookup: {
            from: "logs",
            localField: "_id",
            foreignField: "bookId",
            as: "logs"
          }
        }
      ])
      .toArray();

    res.status(200).json({
      count: books.length,
      data: books
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

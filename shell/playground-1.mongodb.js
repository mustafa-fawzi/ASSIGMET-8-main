
use("MY_DB");
db.createCollection("books", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["title", "author"],
            properties: {
                title: {
                    bsonType: "string",
                    description: "'title' must be a string and is required"
                },
                author: {
                    bsonType: "string",
                    description: "'author' must be a string and is required"
                },
                year: {
                    bsonType: "int",
                    description: "'year' must be an integer if provided"
                },
                genres: {
                    bsonType: "array",
                    items: {
                        bsonType: "string"
                    },
                    description: "'genres' must be an array of strings"
                }
            }
        }
    }
});

db.books.insertOne({
    title: "Dual card",
    author: "",
    year: 2000,
    genres: ["Dystopian", "Science Fiction", "Classic"]
});
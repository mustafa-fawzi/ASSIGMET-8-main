// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("MY_DB");

db.createCollection("logs",{
    capped:true,
    size:10240000,
    max:1000
});

const book = db.books.findOne({ title: "Dual card" });

db.logs.insertMany([
    { book_id: book._id, action: "borrowed" },
    { book_id: book._id, action: "returned" },
    { book_id: book._id, action: "deleted" }
]);



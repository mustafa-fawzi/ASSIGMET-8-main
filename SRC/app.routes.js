import booksRoutes from "./modules/books/books.route.js";
import logsRoutes from "./modules/logs/logs.routes.js";
import authorsRoutes from "./modules/authors/authors.routes.js";

export const appRoutes = (app) => {
    app.use(booksRoutes);
    app.use(authorsRoutes);
    app.use(logsRoutes);
};



import { Router } from "express";
import {
  createBooksCollection,
  createTitleIndex,
  insertOneBook,
  insertManyBooks,
  updateBookYear,
  findBookByTitle,
  findBooksByYearRange,
  findBooksByGenre,
  skipLimitBooks,
  findBooksWithIntegerYear,
  excludeGenres,
  deleteBooksBeforeYear,
  aggregateAfter2000Sorted,
  aggregateProjectFields,
  aggregateUnwindGenres,
  aggregateJoinBooksLogs
} from "./books.controller.js";

const router = Router();

router.post("/collection/books", createBooksCollection);
router.post("/collection/books/index", createTitleIndex);

router.post("/books", insertOneBook);
router.post("/books/batch", insertManyBooks);

router.patch("/books/:title", updateBookYear);

router.get("/books/title", findBookByTitle);
router.get("/books/year", findBooksByYearRange);
router.get("/books/genre", findBooksByGenre);
router.get("/books/skip-limit", skipLimitBooks);
router.get("/books/year-integer", findBooksWithIntegerYear);
router.get("/books/exclude-genres", excludeGenres);

router.delete("/books/before-year", deleteBooksBeforeYear);

router.get("/books/aggregate1", aggregateAfter2000Sorted);
router.get("/books/aggregate2", aggregateProjectFields);
router.get("/books/aggregate3", aggregateUnwindGenres);
router.get("/books/aggregate4", aggregateJoinBooksLogs);

export default router;

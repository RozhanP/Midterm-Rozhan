"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const books_1 = __importDefault(require("../Models/books"));
router.get('/', (req, res, next) => {
    books_1.default.find((err, books) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.render('books/index', {
                title: 'Books',
                page: 'books',
                books: books
            });
        }
    });
});
router.get('/add', (req, res, next) => {
    res.render('books/details', {
        title: 'Books',
        page: 'books',
        books: ''
    });
});
router.post('/add', (req, res, next) => {
    let newBook = new books_1.default({
        "Title": "The Fellowship of the Ring",
        "Description": "Sauron, the Dark Lord, has gathered to him all the Rings of Power – the means by which he intends to rule Middle-earth. All he lacks in his plans for dominion is the One Ring – the ring that rules them all – which has fallen into the hands of the hobbit, Bilbo Baggins.",
        "Price": 10.3,
        "Author": "J. R. R. Tolkien",
        "Genre": "Fantasy"
    });
    books_1.default.create(newBook, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        res.redirect('/books');
    });
});
router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    books_1.default.findById(id, {}, {}, function (err, bookToEdit) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('books/details', {
            title: 'Book Details',
            page: 'books',
            books: bookToEdit,
        });
    });
});
router.post('/:id', (req, res, next) => {
    let id = req.params.id;
    let newBook = new books_1.default({
        "_id": id,
        "Title": req.body.title,
        "Description": '',
        "Price": Number(req.body.price),
        "Author": req.body.author,
        "Genre": req.body.genre
    });
    books_1.default.updateOne({ _id: id }, newBook, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        res.redirect('/books');
    });
});
router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;
    books_1.default.remove({ _id: id }, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        res.redirect('/books');
    });
});
//# sourceMappingURL=books.js.map
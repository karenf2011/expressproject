const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');

const app = express();

const Book = require('./models/book');

mongoose
	.connect('mongodb://localhost:27017/library', {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log('library connected');
	})
	.catch(err => {
		console.log('library connection error');
		console.log(err);
	});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// to use date from the form
app.use(express.urlencoded({ extended: true }));
// to use patch and delete on forms
app.use(methodOverride('_method'));

app.use(express.static(__dirname + '/public'));

// paths for including Bootstrap, jQuery and Popper
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist/'));

// put your routes here
app.get('/', async (req, res) => {
	const books = await Book.find({});
	res.render('layouts/index', { books });
});

// filters the available books
app.get('/available', async (req, res) => {
	const books = await Book.find({ isAvailable: true });
	res.render('pages/available', { books });
});

// adds new books
app.get('/new', (req, res) => {
	res.render('pages/new');
});

app.post('/', async (req, res) => {
	const newBook = new Book(req.body);
	await newBook.save();
	res.redirect(`/${newBook._id}`);
});

// details book
app.get('/:id', async (req, res) => {
	const { id } = req.params;
	const book = await Book.findById(id);
	res.render('pages/detailpage', { book });
});

// edit details book
app.get('/:id/edit', async (req, res) => {
	const { id } = req.params;
	const categories = [ 'fantasy', 'science-fiction', 'mystery', 'thriller' ];
	const book = await Book.findById(id);
	res.render('pages/edit', { book, categories });
});

app.patch('/:id', async (req, res) => {
	const { id } = req.params;
	const book = await Book.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
	res.redirect(`/${book._id}`);
});

// changes isAvailable to false
app.patch('/update/:id', async (req, res) => {
	const { id } = req.params;
	const book = await Book.findByIdAndUpdate(id, { isAvailable: false }, { new: true });
	res.redirect(`/${book._id}`);
});

// deletes from db
app.delete('/:id', async (req, res) => {
	const { id } = req.params;
	await Book.findByIdAndDelete(id);
	res.redirect('/');
});

// set up a port for your localhost
app.listen(8080, () => {
	console.log("Hi! :-) I'm listening to port 8080");
});

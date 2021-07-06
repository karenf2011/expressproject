const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	},
	isAvailable: {
		type: Boolean,
		required: true,
		default: true
	},
	frontPage: {
		type: String
	},
	category: {
		type: String,
		lowercase: true,
		enum: [ 'fantasy', 'science-fiction', 'mystery', 'thriller' ]
	},
	goodreadsRating: {
		type: Number,
		min: 0,
		max: 5
	},
	publicationYear: {
		type: Number,
		min: 1950,
		max: 2021
	},
	numberPages: {
		type: Number
	}
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;

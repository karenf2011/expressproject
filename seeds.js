const mongoose = require('mongoose');
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

const newBooks = [
	{
		title: "Harry Potter and the Sorcerer's Stone",
		author: 'J.K. Rowling',
		frontPage: 'images/hp1.jpg',
		category: 'fantasy',
		goodreadsRating: 4.5,
		publicationYear: 1997,
		numberPages: 309
	},
	{
		title: 'Harry Potter and the Chamber of Secrets',
		author: 'J.K. Rowling',
		frontPage: 'images/hp2.jpg',
		category: 'fantasy',
		goodreadsRating: 4.4,
		publicationYear: 1998,
		numberPages: 341
	},
	{
		title: 'Harry Potter and the Prisoner of Azkaban',
		author: 'J.K. Rowling',
		frontPage: 'images/hp3.jpg',
		category: 'fantasy',
		goodreadsRating: 4.6,
		publicationYear: 1999,
		numberPages: 435
	},
	{
		title: 'Harry Potter and the Goblet of Fire',
		author: 'J.K. Rowling',
		frontPage: 'images/hp4.jpg',
		category: 'fantasy',
		goodreadsRating: 4.6,
		publicationYear: 2000,
		numberPages: 734
	},
	{
		title: 'Harry Potter and the Order of the Phoenix',
		author: 'J.K. Rowling',
		frontPage: 'images/hp5.jpg',
		category: 'fantasy',
		goodreadsRating: 4.5,
		publicationYear: 2004,
		numberPages: 870
	},
	{
		title: 'Harry Potter and the Halfblood Prince',
		author: 'J.K. Rowling',
		frontPage: 'images/hp6.jpg',
		category: 'fantasy',
		goodreadsRating: 4.6,
		publicationYear: 2006,
		numberPages: 652
	},
	{
		title: 'Harry Potter and the Deathly Hallows',
		author: 'J.K. Rowling',
		frontPage: 'images/hp7.jpg',
		category: 'fantasy',
		goodreadsRating: 4.6,
		publicationYear: 2007,
		numberPages: 759
	},
	{
		title: 'Children of Time',
		author: 'Adrian Tchaikovsky',
		frontPage: 'images/cot.jpg',
		category: 'science-fiction',
		goodreadsRating: 4.3,
		publicationYear: 2015,
		numberPages: 600
	},
	{
		title: 'Sleeping Giants',
		author: 'Sylvain Neuvel',
		frontPage: 'images/sg.jpg',
		category: 'science-fiction',
		goodreadsRating: 3.8,
		publicationYear: 2016,
		numberPages: 320
	},
	{
		title: 'Waking Gods',
		author: 'Sylvain Neuvel',
		frontPage: 'images/wg.jpg',
		category: 'science-fiction',
		goodreadsRating: 4.0,
		publicationYear: 2017,
		numberPages: 336
	},
	{
		title: 'Only Human',
		author: 'Sylvain Neuvel',
		frontPage: 'images/oh.jpg',
		category: 'science-fiction',
		goodreadsRating: 3.6,
		publicationYear: 2018,
		numberPages: 336
	},
	{
		title: 'The Swarm',
		author: 'Frank Schätzing',
		frontPage: 'images/swarm.jpg',
		category: 'mystery',
		goodreadsRating: 4.1,
		publicationYear: 2007,
		numberPages: 881
	},
	{
		title: 'Afterwards',
		author: 'Rosamund Lupton',
		frontPage: 'images/afterwards.jpg',
		category: 'mystery',
		goodreadsRating: 3.8,
		publicationYear: 2012,
		numberPages: 386
	},
	{
		title: 'The Passengers',
		author: 'John Marrs',
		frontPage: 'images/passengers.jpg',
		category: 'thriller',
		goodreadsRating: 4.1,
		publicationYear: 2019,
		numberPages: 400
	},
	{
		title: 'The One',
		author: 'John Marrs',
		frontPage: 'images/one.jpg',
		category: 'thriller',
		goodreadsRating: 4.1,
		publicationYear: 2018,
		numberPages: 416
	},

];

// remember deletes all the old data!
const seedBooks = async () => {
	await Book.deleteMany({});
	Book.insertMany(newBooks)
		.then(res => {
			console.log(res);
		})
		.catch(e => {
			console.log(e);
		});
};

seedBooks();
const Book = require("../../models/book");

const getAllBooks = (req,res) => {
    return res.send({'books' : ['atomic habits','harry potter','think and grow rich']})
}

const saveBook = async (req,res) => {
    const {title, author , price } = req.body;
    const newBook = Book({
        title: title,
        author: author,
        price: price
    })
    try {
        await newBook.save()
        res.status(201).json({message: 'book saved successfully'})
    }
    catch (error) {
        console.log(error) 
        res.status(500).json({message: 'Internal Server Error'})
    }
}

const saveBookToLibrary = async (req,res) => {
    try {

    }
    catch (error) {
        console.log(error) 
        res.status(500).json({message: 'Internal Server Error'})
    }
}

module.exports = {
    saveBook
}
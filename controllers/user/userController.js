const Library = require("../../models/library")
const User = require("../../models/user")
const mongoose = require('mongoose')
const { JwtService } = require("../../services/jwtService")

const saveUser = async (req, res) => {
    const { username, email } = req.body

    const newUser = User({
        username: username,
        email: email
    })
    try {
        const user = await newUser.save()
        console.log(user)
        res.status(201).json({ message: 'user saved successfully' })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// const saveBookToLibrary = async (req,res,next) => {
//     const {userId, bookId} = req.body;
//     const libraryRecord = await Library.findOne({user: new mongoose.Types.ObjectId(userId)})
//     try {
//         if(!libraryRecord) {
//             const newLibraryRedord = new Library({
//                 user: userId, 
//                 books: [bookId]
//             })
//             const savedRecord = await newLibraryRedord.save();
//             return res.status(200).json({ message: 'Library record created', data: savedRecord });
//         }
//         libraryRecord.books.push(bookId)
//         const savedRecord = awaitlibraryRecord.save()
//         return res.status(200).json({ message: 'Library record updated successfully', data: savedRecord });
//     } catch(error) {
//         console.log("error => ",error)
//         res.status(500).json({ message: 'Internal Server Error' });
//     }   
// }

const saveBookToLibrary = async (req, res, next) => {
    const { userId, bookId } = req.body;

    try {
        const savedRecord = await Library.findOneAndUpdate({ user: new mongoose.Types.ObjectId(userId) },
            { $addToSet: { books: bookId } },
            { upsert: true, new: true }
        )
        console.log("saved record : ", savedRecord)
        res.status(200).json({message: `book added to library for userId: ${userId}`,data: savedRecord })
    } catch (error) {
        console.log("error => ", error)
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getAllBooksByUser = async (req,res,next) => {
    const {userId} = req.params
    console.log("req params",req.params)
    try{
        const userLibraryBooks = await Library.findOne({user: new mongoose.Types.ObjectId(userId)},{projection: 
       { 'books':1, 'user':1 }}).populate('books')
        console.log("user library books",userLibraryBooks)
        res.status(200).json({message: "user books from library retrieved successfully",data: userLibraryBooks})
    } catch (error) {
        console.log("error => ", error)
        res.status(500).json({ message: error.message });
    }

}


module.exports = {
    saveUser,
    saveBookToLibrary,
    getAllBooksByUser,
}
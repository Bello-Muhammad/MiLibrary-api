const mongoose = require('mongoose')


const bookSchema = new mongoose.Schema({
    buk: {
        type: String,
        required:true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    categories: {
        type: String,
        required: true
    }
})

bookSchema.statics.findByProduct = async ( title ) => {
    const book = await Books.findOne({ title })
    if(book) {
       throw new Error ('Book exist')
    }

}

const Books = mongoose.model('books', bookSchema)

// const book = new Books({
//     title: 'programming',
//     author: 'bello',
//     decipline: 'computer science',
//     year: '22/11/1980'
// })
// book.save().then(() => {
//     console.log(book)
// }).catch((error) => {
//     console.log('error', error)
// })

module.exports = Books
const mongoose = require('mongoose')


const requestSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        default: 'unknown'
    }
})

const Request = mongoose.model('request', requestSchema)

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

module.exports = Request;
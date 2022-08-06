// var User = require('../models/User');
// var Category = require('../models/Category');
// var Department = require('../models/Department');
// var Product = require('../models/Product');
// var Variant = require('../models/Variant');
const Comment = require('../models/Comment')
var mongoose = require('mongoose');
const mongoConfig = require('../configs/mongo-config')
// console.log(`mongoConfig = ${JSON.stringify(mongoConfig)}`)
console.log(`mongoConfig = ${mongoConfig}`)

mongoose.connect(mongoConfig, {useNewUrlParser: true, useCreateIndex: true}, function (error) {
    if (error) throw error
    console.log(`connect mongodb success`);
});


const comments = [
    new Comment({
        productId: '5bedf31cc14d7822b39d9d43',
        comments: [
            {
                name: 'leo yu',
                comment: 'Bootstrap 5 user comment section template snippet is created by BBBootstrap Team using Bootstrap 5. This snippet is free and open source hence you can use it in your project.Bootstrap',
                // time: new Date().
            },
        ]
    }),

    new Comment({
        productId: '5bedf3b9c14d7822b39d9d45',
        comments: [
            {
                name: 'Charles Liu',
                comment: 'Want to become your team\'s MongoDB expert? "Mastering Mongoose" distills 8 years of hard-earned lessons building Mongoose apps at scale into 153 pages. That means you can learn what you need to know to build production-ready full-stack apps with Node.js and MongoDB in a few days. Get your copy!',
                // time: new Date().
            },
        ]
    }),


]

for(const newComment of comments) {
    Comment.createComment(newComment, function (err, comment) {
        if (err) throw err;
        console.log(comment);
    })
}

// for (let i = 0; i < variants.length; i++) {
//     variants[i].save(function (e, r) {
//         if (i === variants.length - 1) {
//             exit();
//         }
//     });
// }

// exit()

function exit() {
    mongoose.disconnect();
}

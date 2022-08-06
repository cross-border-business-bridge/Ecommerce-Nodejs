const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    productId: {
        type: String,
        index: true,
        unique: true,
    },
    comments: [
        {
            user: {
                type: String
            },
            comment: {
                type: String
            },
            date: {
                type: Number
            }
        }
    ],
});

const Comment = module.exports = mongoose.model('Comment', commentSchema);

module.exports.getCommentByProductId = async function (productId)  {
    return (await Comment.findOne({productId}))
}

// module.exports.getCommentById = function (id, callback) {
//   Comment.findById(id, callback);
// }

module.exports.postComment = async function (
    {
        productId,
        content
    }, callback=null) {

    // this.getCommentByProductId(productId, function (error, commentStored) {
    //     if (error) throw error
    //
    //     const newComment = {
    //         comment: content,
    //         name: 'leo yu',
    //         time: new Date()
    //     }
    //
    //     if(commentStored) {
    //         commentStored.comments.push(newComment)
    //     } else {
    //         const newCommentPerProduct = new Comment({
    //             productId,
    //             comments: [
    //                 newComment
    //             ]
    //         })
    //         newCommentPerProduct.save(callback);
    //     }
    // })

    try {
        const commentStored = await this.getCommentByProductId(productId)
        const newComment = {
            comment: content,
            name: 'leo yu', // TODO
            time: new Date()
        }

        if(commentStored) {
            commentStored?.comments.push(newComment)
        } else {
            const newCommentPerProduct = new Comment({
                productId,
                comments: [
                    newComment
                ]
            })
            await newCommentPerProduct.save();
        }
    } catch (e) {
        return new Promise((resolve, reject) => {
            reject(e)
        })
    }
}


module.exports.createComment = function (newComment, callback) {
    newComment.save(callback);
}

import mongodb from 'mongodb'

const ObjectId = mongodb.ObjectId // have to search by object id, which is different from string or integer

let reviews

export default class ReviewsDAO {
    static async injectDB(conn) {
        if (reviews) {
            return
        }
        try {
            reviews = await conn.db("reviews").collection('reviews')
        } catch (e) {
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }

    static async addReview(movieId, user, review) {
        try {
            const reviewDoc = { // our review entry
                movieId: movieId,
                user: user,
                review: review,
            }

            return await reviews.insertOne(reviewDoc) // insertOne is a mongodb command that inserts the reviewDoc into our database
        } catch (e) {
            console.error(`Unable to post review: ${e}`)
            return { error: e }
        }
    }

    static async getReview(reviewId) {
        console.log('get review review id', reviewId)
        try {
            const reviewResponse = await reviews.findOne({ _id: new ObjectId(reviewId) },) //_id was created by mongodb, ObjectId converts the string reviewId into a mongodb ObjectId
            return reviewResponse
            // return await reviews.findOne({ _id: ObjectId(reviewId) },) //_id was created by mongodb, ObjectId converts the string reviewId into a mongodb ObjectId
        } catch (e) {
            console.error(`unable to get review ID review: ${e}`)
            return { error: e}
        }
    }

    static async updateReview(reviewId, user, review) {
        try {
            const updateResponse = await reviews.updateOne(
                { _id: new ObjectId(reviewId) },
                { $set: { user: user, review: review } } // set is specific to mongodb, sets user to user, and review to review
            )
            return updateResponse
        } catch(e) {
            console.error(`Unable to update review: ${e}`)
            return { error: e }
        }
    }

    static async deleteReview(reviewId) {
        try {
            const deleteResponse = await reviews.deleteOne( {
                _id: new ObjectId(reviewId),
            })

            return deleteResponse
        } catch(e) {
            console.error(`Unable to delete review: ${e}`)
            return { error: e}
        }
    }

    static async getReviewsByMovieId(movieId) {
        try {
            const cursor = await reviews.find( {movieId: parseInt(movieId) } ) // when you return multiple items, you return a cursor. parseInt converts a string to an integer
            return cursor.toArray() //cursor is a list of all the documents we want, we need to convert it to an array
        } catch (e) {
            console.error(`Unable to get movie Id review: ${e}`)
            return { error: e }
        }
    }
}


import ReviewsDAO from "../dao/reviewsDAO.js"

// controller  - store all the callback functions you use for the html methods (get, post, put, delete)
export default class ReviewsController {
    static async apiPostReview(req, res, next) { // static because we are calling it from ReviewsController
        try{
            const movieId = parseInt(req.body.movieId) // req.body is some json that was submitted with the html request
            const review = req.body.review
            const user = req.body.user

            const reviewResponse = await ReviewsDAO.addReview(
                movieId,
                user,
                review,
            )

            res.json({ status: 'success' })
        } catch(e) {
            res.status(500).json({error: e.message})
        }
    }

    static async apiGetReview(req, res, next) {
        try {
            let id = req.params.id || {} // get params from the ":" in the url. gets id from object or returns empty object
            console.log('api get review id', id)
            let review = await ReviewsDAO.getReview(id)
            if (!review) {
                res.status(404).json({ error: 'Not found' })
                return
            }
            res.json(review)
        } catch(e) {
            console.log(`api, ${e}`)
            res.status(500).json({error: e})
        }
    }

    static async apiUpdateReview(req, res, next) {
        try {
            const reviewId = req.params.id // data coming from req params (the :id from url)
            const review = req.body.review //data coming from req body
            const user = req.body.user

            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                user,
                review,
            )

            let { error } = reviewResponse

            if (error) {
                res.status(400).json({ error })
            }

            if (reviewResponse.modifiedCount === 0) { // response from MongoDb, if nothing was changed will produce this error
                throw new Error("unable to update review")
            }

            res.json({status: "success"}) // if no error then respond with success
        } catch (e) { // error catch block
            res.status(500).json({error: e.message})
        }
    } 

    static async apiDeleteReview(req, res, next) {
        try {
            const reviewId = req.params.id
            const reviewResponse = await ReviewsDAO.deleteReview(reviewId)
            if (reviewResponse) {

                res.json({ status: 'success' })
            }

        } catch (e) {
            res.status(500).json( { error: e.message })
        }
    }

    static async apiGetReviews(req, res, next) {
        try {
            let id = req.params.id || {}
            let reviews = await ReviewsDAO.getReviewsByMovieId(id)
            if (!reviews) {
                res.status(404).json( {error: 'Not found' })
                return
            }
            res.json(reviews)
        } catch(e) {
            console.log(`api, ${e}`)
            res.status(500).json( { error: e } )
        }
    }
}


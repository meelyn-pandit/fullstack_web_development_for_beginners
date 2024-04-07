import express from 'express'
import ReviewsCtrl from './reviews.controller.js'

const router = express.Router()

// router.route('/').get((req, res) =>  res.send('hello world')) // most url requests are get requests (read data)

router.route('/movie/:id').get(ReviewsCtrl.apiGetReviews) // ":" signifies any id that was put into the url, aka a param

router.route('/new').post(ReviewsCtrl.apiPostReview)

router.route('/:id')
    .get(ReviewsCtrl.apiGetReview) // this set up allows you to chain multiple and multiple different http requests together, get request = read data
    .put(ReviewsCtrl.apiUpdateReview) // put request = update data
    .delete(ReviewsCtrl.apiDeleteReview) // delete request = delete data

export default router
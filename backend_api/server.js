import express from "express"
import cors from "cors" //helps with cross origin resource sharing
import reviews from "./api/reviews.route.js"

const app = express()

app.use(cors())
app.use(express.json())

//.use uses middleware functions to deal with requests and responses

app.use("/api/v1/reviews", reviews) // good to specify version numbers, this is specifying a route
app.use("*", (req, res) =>  // * signifies all other routes
    res.status(404).json({error: "not found"})
    )

export default app
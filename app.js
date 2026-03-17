const express = require("express")
const app = express()
const port = 3000
const cors = require("cors")

app.use(express.json())
app.use(express.static("public"))
app.use(cors())

const moviesRouter = require("./routers/moviesRouter")


app.use("/movies", moviesRouter)


app.get("/", (req, res) => {
    res.send("Hello World")
});


app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})
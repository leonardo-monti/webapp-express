const express = require("express")
const app = express()
const port = 3000

app.use(express.json())

const moviesRouter = require("./routers/moviesRouter")


app.use("/movies", moviesRouter)


app.get("/", (req, res) => {
    res.send("Hello World")
});


app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})
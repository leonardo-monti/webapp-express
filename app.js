const express = require ("express")
const app = express()
const port = 3000
const connection = require("./db/connection")

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Hello World")
})

//INDEX//

app.get("/movies",(req,res)=>{
const sql = "SELECT * FROM movies"
connection.query (sql, (err,results)=>{
    if(err) {
            return res.status(500).json({
                success:false,
                message: "Database query failed"
            })
        }
        res.json({
            success:true,
            message:"Movie of the database",
            movies:results
        })
  })
})

//SHOW//

app.get("/movies/:id",(req,res)=>{
    const movieId=req.params.id
    const sql="SELECT * FROM movies WHERE id = ?"
    connection.query (sql,[movieId],(err,results)=>{
        if(err){
            console.error(err)
            return res.status(500).json({
                success:false,
                message:"Error while searching movie"
            })
        }
        if(results.length===0){
            return res.status(404).json({
                success:false,
                message:"Movie not found"
            })
        }
       const movie = results[0]

       const sqlReviews= "SELECT * FROM reviews WHERE movie_id = ?"
       connection.query(sqlReviews,[movieId],(err,reviews)=>{
        if(err){
            console.error(err)
            return res.status(500).json({
                success:false,
                message:"Error searching for reviews"
            })
        }
         movie.reviews = reviews

         res.json({
            success:true,
            message:"Found movie with reviews",
            movie:movie
         })
       })
    })
})




app.listen(port,()=>{
    console.log("Server listening on http://localhost:3000")
})
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
            message:"Post del database",
            result:results
        })
  })
})




app.listen(port,()=>{
    console.log("Server listening on http://localhost:3000")
})
const connection = require("../db/connection")

// INDEX //

function index(req, res) {
    const sql = "SELECT * FROM movies"
    connection.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Database query failed"
            });
        }
        res.json({
            success: true,
            message: "Movies of the database",
            movies: results
        });
    });
}

// SHOW //

function show(req, res) {
    const movieId = req.params.id;
    const sqlMovie = "SELECT * FROM movies WHERE id = ?"

    connection.query(sqlMovie, [movieId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: "Error while searching movie"
            })
        }

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Movie not found"
            })
        }

        const movie = results[0];

        const sqlReviews = "SELECT * FROM reviews WHERE movie_id = ?";
        connection.query(sqlReviews, [movieId], (err, reviews) => {
            if (err) {
                console.error(err);
                return res.status(500).json({
                    success: false,
                    message: "Error searching for reviews"
                })
            }

            movie.reviews = reviews;

            res.json({
                success: true,
                message: "Found movie with reviews",
                movie: movie
            })
        })
    })
}

function storeReview(req,res){

    const movieId= parseInt(req.params.id)
    const {name,vote,text} = req.body

    const sql= `INSERT INTO reviews (movie_id, name, vote, text)
    VALUES (?, ?, ?, ?)`

    connection.query(sql,[movieId,name,vote,text],(err,result)=>{
        if(err){
            console.log(err)
            return res.status(500).json({
                success:false,
                message: "Database error"
            })
        }
        res.json({
            success:true,
            message:"Added Review"
        })
    })
}


module.exports = { index, show,storeReview }
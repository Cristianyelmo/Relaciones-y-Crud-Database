const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");


//Aqui t☺ienen una forma de llamar a cada uno de los modelos
// const {Movies,Genres,Actor} = require('../database/models');

//Aquí tienen otra forma de llamar a los modelos creados
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;


const moviesController = {
    'list': (req, res) => {
       db.Movie.findAll(
{   
    include:[ 'generos','actores']
}    
        )
            .then((movies) => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id,
            
           { include:['generos','actores']}
            
            
            )
            .then(movie => {

              
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    },
    //Aqui dispongo las rutas para trabajar con el CRUD
    add: function (req, res) {

        db.Genre.findAll(                       
                    )
                        .then((allGenres) => {
                            res.render('moviesAdd.ejs', {allGenres})
                        }) 
    },
    create: function (req,res) {

           
        const{title} =req.body


        db.Movie.create({
        ...req.body,
        title:title.trim()
})





.then(() =>{
    return res.redirect('/movies')
})










    },
    edit: function(req,res) {

      
       


const movie = db.Movie.findByPk(req.params.id
    
    

    
    
    )

    const allGenres = db.Genre.findAll( )

        Promise.all([movie,allGenres])

.then(([movie,allGenres]) =>{
   
    
    
    
    
    return res.render('moviesEdit',{Movie:{
...movie.dataValues,
release_date:movie.release_date.toISOString().split('T')[0]



    }
    
    ,allGenres}
    
    )
})



    },
    update: function (req,res) {


        db.Movie.update(
            {
            ...req.body,
            title: req.body.title.trim()
            },
            {
            where:{
                    id:req.params.id
                }
                
                
                
            }).then(() => {
                
                
              
                return res.redirect('/movies')
            
            })

    },
    delete: function (req,res) {


        db.Movie.findByPk(req.params.id)
        .then(Movie => {
           return res.render('moviesDelete.ejs', {
               
               
               
               
               
               
               
               Movie
        
        });
        })
        .catch(error => console.log(error))    

    },
    destroy: function (req,res) {

        db.Movie.destroy({


            
            where:{
                id:req.params.id
            }



        }





      ).then(result =>{
        console.log(result);
        return res.redirect('/movies')
    
    
    })
    .catch(error=> console.log(error))


    },

    actors: function(req,res) {

      
       


       db.Actor.findByPk(req.params.id,{
            include:['movieFavorite',"movies"]
        })
        
           
        
        .then((actor) =>{
           
            
            
            console.log(actor)
            
            
            return res.render('moviesfav-actores',{
            actor
            }
            
            )
        })
        
        
        
            },










}
   

module.exports = moviesController
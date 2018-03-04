var express = require('express');
var router = express.Router();
var mongoClient=require('mongodb').MongoClient;
var db;
mongoClient.connect("mongodb://127.0.0.1:27017",function(err,connection)
{
    db=connection.db("projector");
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Movies');
});
router.get('/all', function(req, res, next) {
    var moviesCollection=db.collection("movies");
    moviesCollection.find().toArray(function(err,data){
    res.json(data);
    })
  });
router.get('/:n', function(req, res, next) {
    //console.log(req.params.n);
   // res.send('all movies');
   var moviesCollection=db.collection("movies");
    moviesCollection.find({"name":req.params.n}).toArray(function(err,data){
        res.json(data);
    })
  });
  router.post('/addmovie', function(req, res, next) {
    console.log(req.body);
    var moviesCollection=db.collection("movies");
    moviesCollection.insert(req.body,function(err,data){
        if(!err){
        return res.json({
            isSuccess:true
        });
    }
        else{   
        return res.json({ 
        isSuccess:false
    });
    }
  })
  
});

module.exports = router;

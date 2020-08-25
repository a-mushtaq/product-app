let express = require('express');
let signIn= require('./person.js');
let router = express.Router();
let mongoose = require('mongoose');
const jwt=require('jsonwebtoken');

let productSchema=mongoose.Schema({
    id: Number,
    name: String,
    price: Number,
    company: String
});

let Product= mongoose.model("Product",productSchema);

//Displaying all products
router.get('/',function(request,response){
    Product.find(function(err,res){
        if(err) response.send("Error in displaying products");
        else{
            
            //console.log("GET req has been recieved!");
            response.send(res);
        } 
    });
});

//Searching product by partial matching names
router.post('/search',function(request,response){

    if(!request.body.name) 
    {
        response.status('400');
        response.send('Please provide name');
    }
    else
    {    
        Product.find({ name: {"$regex": request.body.name, "$options": "i"}}, function(err,products){
            if(err) response.send("Error in retrieving products");
            else {
                response.send(products);
            }
        })
    }
});


router.get('/one/:id',function(request,response){

    Product.findById(request.params.id,function(err,res){
        if(err) response.send("Error in displaying products");
        else{
            
            //console.log("GET req has been recieved!");
            response.send(res);
        } 
    });
});


//Displaying  products to admin user
router.get('/catalouge',verifyToken,function(request,response){
    Product.find(function(err,res){
        if(err) response.send("Error in displaying products");
        else{
            response.status('200').send(res);
        } 
    });
});

function verifyToken(request,res, next)
{
    if(!request.headers.authorization) res.status('401').send('Unauthorized access');
    let token=request.headers.authorization.split(' ')[1];
    if(token === 'null') res.status('401').send('Unauthorized access');
    let payload=jwt.verify(token,'secreetKey');
    if(!payload)
    {
         res.status('401').send('Unauthorized access');
    }
    request.userId=payload.subject;
    next();
    
}


//Adding product
router.post('/addProd',verifyToken,function(request,response){
    
   if(!request.body.name || !request.body.price || !request.body.company)//id khtm ki hai yaha se
   {
        response.status('400');
        response.send('Please provide all details');
   }
   else
   {
       let newProduct= new Product({
           id: request.body.id,
           name: request.body.name,
           price: request.body.price,
           company: request.body.company
       })

       newProduct.save(function(err,product){
           if(err) res.send('Error in saving product in DB');
           else {
               response.status('200');
               response.json(`${product} saved successfully`);
            }
       });
   }
});


//Updating product
router.put('/updateProd',verifyToken,function(request,response){
    if(!request.body.name || !request.body.price || !request.body.company)
    {
         response.status('400');
         response.send('Please provide all details');
    }
    else
    {
        Product.findByIdAndUpdate({_id:request.body._id},
            {id: request.body.id,name: request.body.name,price: request.body.price,company: request.body.company},function(err,product){        
                if(err) response.send('Error in updating database');
                else{
                     response.status('200');
                     response.json(`${product.name}has been updated sucessfully`);
                    }
        });
    }
});



//Deleteing product
router.delete('/delProd/:id',verifyToken,function(request,response){
    if(!request.params.id)
    {
         response.status('400');
         response.send('Please provide all details');
    }
    else
    {
        Product.findByIdAndRemove({_id:request.params.id},function(err,product){
            if(err) response.send('Error in deleting from DB');
            else {
                response.status('200');
                response.json((`${product.name} has been removed sucessfully`))}
        });
    }
});


module.exports = router;

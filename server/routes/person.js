let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const jwt=require('jsonwebtoken');


let personSchema=mongoose.Schema({
    id: Number,
    name: String,
    password: Number
});

let Person= mongoose.model("Person",personSchema);

router.post('/signup',function(request,response){

    if(!request.body.name||!request.body.password||!request.body.id)
    {
        response.status('400');
        response.send('Please Provide all details');
    }
    else
    {
        let user = new Person({
            id: request.body.id,
            name: request.body.name,
            password: request.body.password 
        })

        user.save(function(err,person){
            if(err)
            {
                response.status('500');
                response.json('error in saving to DB')
            }
            else
            {
                response.status('200');
                response.json('Registered Successfully')
            }
        })

    }
});

router.post('/login',function(request, response){

    if(!request.body.id||!request.body.password)
    {
        response.status('401');
        response.send("Invalid credentials1");
    }
    else
    {
        Person.findOne({id:request.body.id, password:request.body.password},function(err,person){
            if(err)
            {
                response.status('400');
                response.send("DB error in retrieving data");
            }
            else if(person)
            {
                //request.session.user=person;
                let payload={subject:person._id};
                let token=jwt.sign(payload,'secreetKey');
                response.status('200').send({token});

                //response.redirect('/admin/catalouge');
            }
            else  response.send("user does not exists");
            
        });
    }
});



function checkSignIn(req, res,next){
    if(req.session.user){
       next();     
    } else {
       let err = new Error("Not logged in!");
       console.log(req.session.user);
       next(err);  //Error, trying to access unauthorized page!
    }
 }
 
 router.get('/catalouge',checkSignIn,function(req,res){
    res.render('catalouge');
});

module.exports = router;
module.exports.checkSignIn=checkSignIn;
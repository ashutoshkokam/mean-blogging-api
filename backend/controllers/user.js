const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.createUser = (req, res, next) => {
    var userData = req.body.user;
    console.log(userData);
    var query = {email:userData.email},
    //update = {userName:"Tabaka" },
    options = { upsert: true, new: true};
    bcrypt.hash(req.body.password, 10).then((hash) => {

        //const user = new User({...userData,password: hash});
        var update  = {...userData,password:hash};
        //console.log(update);
        User.findOneAndUpdate(query,update,options)
            .then((data) => {
                res.status(201).json({
                    message: 'Registered Successfully',
                    user: data
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    
                        message:'Invalid Credentials!!'
                    
                })
            })
    })
}

exports.login = (req, res, next) => {
    let fetchedUser;
    //console.log(req.body.user)
    User.findOne({ email: req.body.user.email })
        .then((user) => {
           
            if (!user) {
                return res.status(401).json({
                    message: 'Invalid Authentication Credentials!'
                })
            }
            fetchedUser = user;
            //console.log(fetchedUser);
            return bcrypt.compare(req.body.password, user.password)
        })
        .then(result => {
            //console.log(result);
            if (!result) {
                return res.status(401).json({
                    message: 'Invalid Authentication Credentials!'
                })
            }
            //create token
            const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id,userName:fetchedUser.userName }, 
                process.env.SECRET_KEY, 
                { expiresIn: "1h" });
                //console.log(token);
                res.status(200).json(
                    {
                        token:token,
                        expiresIn:3600,
                        userData:{...fetchedUser._doc,userId:fetchedUser._id}
                    });
        })
        .catch(err => {
            //console.log(err);
            return res.status(401).json({
                message: 'Invalid Authentication Credentials!'
            })
        })
}
exports.isUserExists = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            let isUserExists=false;
            if(user)
                isUserExists=true;
            return res.status(200).json({
                isUserExists:  isUserExists,
                message: isUserExists?'User Exists':'User does not exists!'
            })
        })
        .catch((err)=>{
            return res.status(401).json({
                message: 'Invalid Credentials!'
            })       
        })
    }
    exports.isUserExistsByUserName = (req, res, next) => {
        console.log(req.query.userName);
        let searchString = String( req.query.userName);
        User.findOne({userName: searchString})
            .then((user) => {
                console.log(user)
                let isUserExists=false;
                if(user)
                    isUserExists=true;
                return res.status(200).json({
                    isUserExists:  isUserExists
                })
            })
            .catch((err)=>{
                return res.status(401).json({
                    message: 'Invalid Data!'
                })       
            })
        }
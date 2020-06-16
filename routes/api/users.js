const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require('multer');
const mongoose = require("mongoose");
// const { v4: uuidV4 } = require('uuid');
const keys = require("../../config/keys");
const passport = require("passport");
var crypto = require('crypto');
// var nodemailer = require('nodemailer');
// var sgTransport = require('nodemailer-sendgrid-transport');
// const sendEmail = require('./email.send');
// const msgs = require('./email.msgs');
// const templates = require('./email.templates');
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const { check, validationResult } = require('express-validator');

// Load User model and Token model
const User = require("../../models/User");
// const Token = require("../../models/Token")
const registeredemails = require("../../models/RegisteredEmails");  
const Assessment = require("../../models/Assessment");
  


var upload = multer({ dest: 'public/'});
var fs = require('fs');
const { doesNotMatch } = require("assert");

/** Permissible loading a single file, 
    the value of the attribute "name" in the form of "recfile". **/
var type = upload.single('uploadimg');


// var upload = multer({ dest: './public/'})

// @route POST api/users/assessment
// @dsec updates user's firstlogin information
// @access private

// router.post("/assessment", function(req, res){
//  if(!req.body){
//    console.log("Missing data")
//  }
//  User.findOne({ email: req.body.email }).then(user => 
//       {
//         if (user) {return res.status(400).json({ email: "Email already exists" })
//       } 
//       else {
// })



// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", type, function (req, res, next) {
    // var tmp_path = req.file.path;
    if(!req.file){
      console.log("File missing");
    }
    /** The original name of the uploaded file
      stored in the variable "originalname". **/
    // var target_path = 'uploads/' + req.file.originalname;
    // /** A better way to copy the uploaded file. **/
    // var src = fs.createReadStream(tmp_path);
    // var dest = fs.createWriteStream(target_path);
    // src.pipe(dest);
    // fs.unlink(tmp_path);
    // src.on('end', function() { res.render('complete'); });
    // src.on('error', function(err) { res.render('error'); });
  // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    const url = req.protocol + '://' + req.get('host')

    
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    //Checks email against registered emails in database table
    registeredemails.findOne({ email: req.body.email}).select("email").lean().then(result => {
      if (!result) {
          return res.status(400).json({email: "Email not provided"});
      }
    });

    User.findOne({ email: req.body.email }).then(user => 
      {
        if (user) {return res.status(400).json({ email: "Email already exists" })
      } 
      else {
        const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                fileimg: url + '/public/' + req.file.filename
            });
            // // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                .save().then(user => {res.json(user)})
                .catch(err => console.log(err))
       });
      })
    }
  })
});
    //             .then(newUser => 
    //               sendEmail(newUser.email), 
    //               templates.confirm(newUser._id)
    //               )
    //             .then(() => res.json({ msg: msgs.confirm }))
    //             .catch(err => console.log(err))
    //         }
    //           )}
    //         )}
    //   else if (user && !user.confirmed) {
    //               sendEmail(user.email, templates.confirm(user._id))
    //                 .then(() => res.json({ msg: msgs.resend })).catch(err => console.log(err))
    //             }

    //             // The user has already confirmed this email address
    //    else {
    //          res.json({ msg: msgs.alreadyConfirmed })
    //         }
    //  }).catch(err => console.log(err))
 

  
//   router.get('/email/confirm/:id', function(req, res, next){
//     req.assert('email', 'Email cannot be blank').notEmpty();
//     req.assert('token', 'Token cannot be blank').notEmpty();
//     req.sanitize('email').normalizeEmail({ remove_dots: false });

//     // Check for validation errors    
//     var errors = req.validationErrors();
//     if (errors) return res.status(400).send(errors);
 
//     // //Checks email against registered emails in database
//     // registeredemails.findOne({ email: req.body.email}).select("email").lean().then(result => {
//     //   if (!result) {
//     //       return res.status(400).json({email: "Email not provided"});
//     //   }
//     // });

//     // Find a matching token
//     Token.findOne({ token: req.body.token }, function (err, token) {
//         if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
 
//         // If we found a token, find a matching user
//         User.findOne({ _id: token._userId, email: req.body.email }, function (err, newUser) {
//             if (!newUser) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
//             if (newUser.confirmed) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
 
//             // Verify and save the user
//             newUser.confirmed = true;
//             newUser.save(function (err) {
//                 if (err) { return res.status(500).send({ msg: err.message }); }
//                 res.status(200).send("The account has been verified. Please log in.");
//             });
//         });
//     });
// });


// router.post('/resend', function (req, res, next){
//   req.assert('email', 'Email is not valid').isEmail();
//     req.assert('email', 'Email cannot be blank').notEmpty();
//     req.sanitize('email').normalizeEmail({ remove_dots: false });
 
//     // Check for validation errors    
//     var errors = req.validationErrors();
//     if (errors) return res.status(400).send(errors);
 
//     User.findOne({ email: req.body.email }, function (err, user) {
//         if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
//         if (user.isVerified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });
 
//         // Create a verification token, save it, and send email
//         var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
 
//         // Save the token
//         token.save(function (err) {
//             if (err) { return res.status(500).send({ msg: err.message }); }
 
//             // Send the email
//             var transporter = nodemailer.createTransport({ service: 'Gmail', auth: { user: process.env.GMAIL_USERNAME, pass: process.env.GMAIL_PASSWORD } });
//             var mailOptions = { from: 'no-reply@codemoto.io', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
//             transporter.sendMail(mailOptions, function (err) {
//                 if (err) { return res.status(500).send({ msg: err.message }); }
//                 res.status(200).send('A verification email has been sent to ' + user.email + '.');
//             });
//         });
 
//     });
// });

// router.get("/firstlogin", (req, res, next) => {

// })
// var dashboardRouter = express.Router();
// var assessmentRouter = express.Router({mergeParams: true});

// dashboardRouter.use('/:dashboardId/assessment', assessmentRouter);

// dashboardRouter.route('/:dashboardId')

router.get("/dashboard", (req, res, next) => {
  User.find({}).then(user => {
    res.json(user);
  })
})

router.post("/assessment", (req, res, next) => {
  if(!req.body){
    console.log("No assessment data recieved");
  }else{
        User.findOne({_id: req.body.id}).then(user => {
          user.firstLogin = true;
          user.save();
          
              Assessment.findOne({uAge: req.body.uAge}).then(assessment => 
                {
                  if (assessment) {return res.status(400).json({ assessment: "Assessment already exists" })
                } 
                else { 
                      var assessment = new Assessment({
                        uAge: req.body.uAge,
                        uCountry : req.body.uCountry
                      });

                      assessment.save(function (err, data) {
                        if (err) {
                          console.log(err);
                          res.send(err.message);
                          return;
                        }else{
                          res.send('success');
                          return;
                        }
                      });
                    
                    }
                });
            })}
          });
        // })
      //}
    // })
        // Assessment.findOne({uAge: req.body.uAge}).then(assessment => 
        // {
        //   if (assessment) {return res.status(400).json({ assessment: "Assessment already exists" })
        // } 
        // else { 
        //       var assessment = new Assessment({
        //         uAge: req.body.uAge,
        //         uCountry : req.body.uCountry
        //       });

        //       assessment.save(function (err, data) {
        //         if (err) {
        //           console.log(err);
        //           res.send(err.message);
        //           return;
        //         }else{
        //           res.send('success');
        //           return;
        //         }
        //        });
            
        //  }
        // })}});
  

    //     }
    //     )}
    // });




  // User.findOne({_id: req.user.id}, (err, doc) => {
  //   doc.firstLogin = true; 
  //   doc.save(callback)
  // });
  
  // res.redirect('/dashboard');
  
// ).catch(err => console.log(err))
// });

  // updateRecord(req, res);
  // User.findOne({_id: req.user.id}, (err, doc) => {
  //   doc.firstLogin = true; 
  //   doc.save(callback)
  // });
  
  // res.redirect('/dashboard');


// function updateRecord(req, res){
//   const firstAssessment = new firstAssessment({
//                 uAge: req.body.uAge,
//                 uGender: req.body.uGender,
//                 uCountry: req.body.uCountry,
//             });
//   firstAssessment.save().then(assessment =>
//             {res.json(assessment)}).catch(err => console.log(err))
  
//  }
// });

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Make sure the user has been verified
    // if (!user.confirmed) return res.status(401).send({ type: 'not-verified', msg: 'Your account has not been verified.' });

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.firstName,
          firstLogin: user.firstLogin
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const passport = require('passport');
const productsController = require('./products_controller');
const authController = require('./auth_controller');
const adminController = require('./admin_controller');
const stripeController = require('./stripe');


function routes(app) {
  
  router.get("/products", productsController.getProducts);
  
  router.post("/products", productsController.addProduct);

  router.get("/products/:slug", productsController.getProduct);

  router.get("/products/:slug/:brand", productsController.getSimilarProducts);

  router.get("/products/slugs", productsController.getSlugs);

  router.get("/products/:age_type/:brand/:gender/:size/:price/:sort_by/:search", productsController.getFilterProducts);

  router.post("/createAccount", authController.createAccount);

  router.get("/accounts", authController.getAccounts);

  router.get("/profiles", authController.getProfiles);

  router.get("/reviews", authController.getReviews);

  router.get("/reviews/:id", authController.getReviewsById);

  router.get("/email", authController.getEmail);

  router.get("/user", authController.getUser);

  router.get("/user/profile", authController.getProfile);

  router.post("/user/profile/edit", authController.postEditProfile);

  router.post("/review", authController.addReview);

  router.post("/stripe", stripeController.handler);

  router.get("/isNotAuth", (req, res)=>{
    if(!req.isAuthenticated())
    {
      res.redirect("/sign_in");
    }
    else if(req.headers.referer.includes("profile") || req.headers.referer.includes("edit_profile")) res.status(200).send("ok");
  })

  router.get("/isAuth", (req, res)=>{
    if(req.isAuthenticated())
    {
      
      res.redirect("/profile");
    }
    else
    {
      if(req.headers.referer.includes("sign_in") || req.headers.referer.includes("sign_up")) res.status(200).send("ok");
    }
  })

  router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/sign_in',
    failureFlash: true,
    authInfo: true
  }))

  router.delete('/logout', (req, res)=>{
    req.logOut(()=>{
      res.send('Logged out successfully.');
    });
  })

  //ADMIN
  router.get('/admin/products', adminController.getProducts);

  router.post('/admin/product', adminController.addProduct);

  router.put('/admin/product/:id', adminController.editProduct);

  router.delete('/admin/product/:id', adminController.deleteProduct);

  router.get('/admin/accounts', adminController.getAccounts);

  router.get('/admin/account/isAdmin', adminController.isAdmin);

  router.post('/admin/account', adminController.addAccount);

  router.put('/admin/account/:id', adminController.editAccount);

  router.delete('/admin/account/:id', adminController.deleteAccount);

  router.get('/admin/profiles', adminController.getProfiles);

  router.put('/admin/profile/:id', adminController.editProfile);

  router.get("/admin/isNotAuth", (req, res)=>{
    if(!req.isAuthenticated())
    {
      res.redirect("/sign_in");
    }
    else 
    {
      res.status(201).send("ok");
    }
  })


  return router;
};

module.exports = routes;
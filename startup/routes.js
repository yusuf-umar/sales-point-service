const express = require('express');
const auth = require('../routes/auth');
const user = require('../routes/user');
const category = require('../routes/category');

module.exports = function(app){
    app.use(express.json());
    app.use("/auth", auth);
    app.use("/user", user);
    app.use('/category',category);
}
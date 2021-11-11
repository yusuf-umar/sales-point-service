const express = require('express');
const auth = require('../routes/auth');
const user = require('../routes/user');

module.exports = function(app){
    app.use(express.json());
    app.use("/auth", auth);
    app.use("/user", user);
}
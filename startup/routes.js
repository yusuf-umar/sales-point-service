const express = require('express');
const auth = require('../routes/auth');
const user = require('../routes/user');
const category = require('../routes/category');
const ingredient = require('../routes/ingredient');
const shop = require('../routes/shop');
const menu = require('../routes/menu');
const order = require('../routes/order');

module.exports = function (app) {
    app.use(express.json({limit: '50mb'}));
    app.use(express.urlencoded({limit: '50mb'}));
    app.use("/auth", auth);
    app.use("/user", user);
    app.use('/category', category);
    app.use('/ingredient', ingredient);
    app.use('/shop', shop);
    app.use('/menu', menu);
    app.use('/order', order);

    app.use((req, res, next) => {
        return JsonResponse(res, 404, "API endpoint not found")
    })
}
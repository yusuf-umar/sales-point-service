const express = require('express');
const auth = require('../routes/auth');
const user = require('../routes/user');
const category = require('../routes/category');
const ingredient = require('../routes/ingredient');
const shop = require('../routes/shop');
const menu = require('../routes/menu')

module.exports = function (app) {
    app.use(express.json());
    app.use("/auth", auth);
    app.use("/user", user);
    app.use('/category', category);
    app.use('/ingredient', ingredient);
    app.use('/shop', shop);
    app.use('/menu', menu);

    app.use((req, res, next) => {
        return JsonResponse(res, 404, "API endpoint not found")
    })
}
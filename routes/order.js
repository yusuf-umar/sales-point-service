const router = require("express").Router();
const controller = require("../controllers");
const { Auth } = require('../middlewares/auth')

router.post("/",Auth, controller.order.createOrder)

router.get("/:orderId", Auth,controller.order.getOrder)

router.get("/shop/:shopId", Auth, controller.order.getOrdersByShop)

router.get('/user', Auth,controller.order.getOrdersByUser);

router.get('/approve/:orderId', Auth,controller.order.approveOrderOrCancelOrder);

router.get('/cancel/:orderId', Auth,controller.order.approveOrderOrCancelOrder);

module.exports = router
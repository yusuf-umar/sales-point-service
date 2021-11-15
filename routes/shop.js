const router = require("express").Router();
const controller = require("../controllers");
const { Auth } = require('../middlewares/auth');

router.get("/", Auth, controller.shop.getShops);

router.get("/user", Auth, controller.shop.getShopByUser);

router.get("/:shopId", Auth, controller.shop.getShops);

router.post("/", Auth, controller.shop.createShop);

router.patch("/:shopId", Auth, controller.shop.updateShop);

router.delete("/:shopId", Auth, controller.shop.deleteShop);

module.exports = router
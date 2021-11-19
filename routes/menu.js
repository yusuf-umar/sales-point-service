const router = require("express").Router();
const controller = require("../controllers");
const { Auth } = require('../middlewares/auth');

router.get("/", Auth, controller.menu.getMenus);

router.get("/user", Auth, controller.menu.getMenusByUser);

router.get("/:menuId", Auth, controller.menu.getMenu);

router.post("/", Auth, controller.menu.createMenu);

router.post("/upload-file/:menuId", Auth, controller.menu.uploadFile);

router.patch("/:menuId", Auth, controller.menu.updateMenu);

router.delete("/:menuId", Auth, controller.menu.deleteMenu);

module.exports = router
const router = require("express").Router();
const lib = require("jarmlib");

const homeController = require("../controller/home");

router.get("/", lib.route.toHttps, homeController.index);

router.get("/login", lib.route.toHttps, homeController.login);
router.get("/signup", lib.route.toHttps, homeController.signup);
router.get("/logout", lib.route.toHttps, homeController.logout);

router.use("/user", require("./user"));

module.exports = router;
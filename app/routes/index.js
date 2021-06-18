const router = require("express").Router();

const homeController = require("../controller/home");

router.get("/", homeController.index);

router.get("/login", homeController.login);
router.get("/signup", homeController.signup);
router.get("/logout", homeController.logout);

router.use("/user", require("./user"));
// router.use("/admin", require("./admin"));
// router.use("/department", require("./department"));
// router.use("/product", require("./product"));
// router.use("/production", require("./production"));
// router.use("/feedstock", require("./feedstock"));
// router.use("/seam", require("./seam"));
// router.use("/customer", require("./customer"));
// router.use("/sale", require("./sale"));
// router.use("/ecommerce", require("./ecommerce"));
// router.use("/financial", require("./financial"));

module.exports = router;
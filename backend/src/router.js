const express = require("express");

const router = express.Router();

const userControllers = require("./controllers/userControllers");
const auth = require("./middlewares/auth");

router.get("/user", auth, userControllers.browse);
router.get("/user/:id", userControllers.read);
router.post("/user", userControllers.add);
router.delete("/user/:id", userControllers.destroy);

router.post("/login", userControllers.login);

module.exports = router;

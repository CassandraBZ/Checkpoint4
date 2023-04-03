const express = require("express");

const router = express.Router();

const userControllers = require("./controllers/userControllers");
const auth = require("./middlewares/auth");

router.get("/users", auth, userControllers.browse);
router.get("/users/:id", userControllers.read);
router.post("/users", userControllers.add);
router.delete("/users/:id", userControllers.destroy);

router.post("/login", userControllers.login);
router.get("/logout", userControllers.logout);

module.exports = router;

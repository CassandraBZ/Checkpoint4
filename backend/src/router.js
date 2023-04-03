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

const avatarControllers = require("./controllers/avatarControllers");

router.get("/avatars", avatarControllers.browse);
router.get("/avatars/:id", avatarControllers.read);

const noteControllers = require("./controllers/noteControllers");

router.get("/notes", auth, noteControllers.browse);
router.get("/notes/:id", auth, noteControllers.read);
router.get("/notes/user/:userId", auth, noteControllers.readFromUser);
router.post("/notes", auth, noteControllers.add);
router.put("/notes/:id", auth, noteControllers.edit);
router.delete("/notes/:id", auth, noteControllers.destroy);

module.exports = router;

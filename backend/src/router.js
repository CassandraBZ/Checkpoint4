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

const colorControllers = require("./controllers/colorControllers");

router.get("/colors", colorControllers.browse);
router.get("/colors/:id", colorControllers.read);

const noteControllers = require("./controllers/noteControllers");

router.get("/notes", auth, noteControllers.browse);
router.get("/notes/:id", auth, noteControllers.read);
router.get("/notes/user/:userId", auth, noteControllers.readFromUser);
router.get(
  "/notes/user/:userId/category/:categoryId",
  auth,
  noteControllers.readFromCategory
);
router.post("/notes", auth, noteControllers.add);
router.put("/notes/:id", auth, noteControllers.edit);
router.delete("/notes/:id", auth, noteControllers.destroy);

const categoryControllers = require("./controllers/categoryControllers");

router.get("/categories", auth, categoryControllers.browse);
router.get("/categories/:id", auth, categoryControllers.read);
router.get("/categories/user/:userId", auth, categoryControllers.readFromUser);
router.post("/categories", auth, categoryControllers.add);
router.put("/categories/:id", auth, categoryControllers.edit);
router.delete("/categories/:id", auth, categoryControllers.destroy);

module.exports = router;

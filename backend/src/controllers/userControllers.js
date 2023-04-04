const models = require("../models");

const { hashPassword, verifyPassword } = require("../services/hashingService");
const { encodeJWT } = require("../services/jwtService");

const browse = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.user
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = async (req, res) => {
  const user = req.body;

  // TODO validations (length, format...)

  const hashedPassword = await hashPassword(req.body.hashed_password);

  user.hashed_password = hashedPassword;

  models.user
    .insert(user)
    .then(([result]) => {
      res.location(`/user/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.user
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const login = async (req, res) => {
  const user = req.body;

  const [persistedUser] = await models.user.findByEmail(user.email);

  const verif = await verifyPassword(
    persistedUser[0].hashed_password,
    user.hashed_password
  );

  if (verif) {
    delete persistedUser[0].hashed_password;
    const token = encodeJWT(persistedUser[0]);

    res.cookie("auth_token", token, { httpOnly: true, secure: false });

    res.send({ user: persistedUser[0] });
  } else {
    res.sendStatus(401);
  }
};

const logout = (req, res) => {
  res.clearCookie("auth_token").sendStatus(200);
};

module.exports = {
  browse,
  read,
  add,
  destroy,
  login,
  logout,
};

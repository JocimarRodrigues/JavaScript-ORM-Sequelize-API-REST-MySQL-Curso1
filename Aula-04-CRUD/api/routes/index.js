const bodyPaser = require("body-parser");
const pessoas = require("./pessoasRoute.js");

module.exports = (app) => {
  app.use(bodyPaser.json());
  app.use(pessoas);
};

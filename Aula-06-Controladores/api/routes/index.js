const bodyPaser = require("body-parser");
const pessoas = require("./pessoasRoute.js");
const niveis = require("./niveisRoute.js");
const turmas = require("./turmasRoute.js");

module.exports = (app) => {
  app.use(bodyPaser.json());
  app.use(pessoas), app.use(niveis), app.use(turmas);
};

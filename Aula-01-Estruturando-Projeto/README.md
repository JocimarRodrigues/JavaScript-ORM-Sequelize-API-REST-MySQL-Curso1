# Biblioteca Body Parser
- Serve para converter as req do body de JSON para JS.

# Criando o servidor e uma rota de teste
api/index.js
```js
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const port = 3000;

app.get("/teste", (req, res) => {
  res.status(200).send({ mensagem: "Boas-Vindas a API" });
});

app.listen(port, () => console.log(`Servidor está rodando na porta ${port}`))

module.exports = app;
```

# Tu vai instalar o sequelize-cli path para poder usar uns recursos de linha de comando q o sequelize tem, geralmente para fazer interação com o DB.

# npx sequelize-cli init
- Isso vai criar um projeto padrão com todas as pastas no padrao MVC, para iniciar um projeto

# Arquivo .sequelizerc
- É o arquivo de configuração do sequelize

### Tu usou as config do sequelize para indificar um novo caminho de pastas para o sequelize
.sequelizerc
```js
const path = require('path');

module.exports = {
    'config': path.resolve('./api/config', 'config.json'),
    'models-path': path.resolve('./api/models'),
    'seeders-path': path.resolve('./api/seeders'),
    'migrations-path': path.resolve('./api/migrations'),

}
```
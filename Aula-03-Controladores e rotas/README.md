# Padrão MVC
![imagem_2023-06-16_070030432](https://github.com/JocimarRodrigues/JavaScript-ORM-Sequelize-API-REST-MySQL-Curso1/assets/116130103/e19a2887-ff49-4c33-81ab-ad20fd8f8ea1)

# Criando Controller

### 1 Importa os Models
```js
const database = require('../models');
```
- Escrevendo dessa forma, ele vai entrar dentro da pasta models e vai pegar o arquivo index
### 2 Cria a classe do Controller
```js
const database = require("../models");

class PessoaController {
  static async pegaTodasAsPessoas(req, res) {
    try {
      const todasAsPessoas = await database.Pessoas.findAll();
      return res.status(200).json(todasAsPessoas); // Com isso tu converta para json e envia
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = PessoaController;

```
- Tu cria método static, para não ter que instanciar a classe toda vez para usar os métodos, no caso não precisar ter que usar const = new PessoaController.
- O nome Pessoas, NÃO é o nome do arquivo e sim o nome do Retorno da classe do model Pessoas.

# Organizando as rotas
- Cria uma nova pasta chamada routes e dentro dela tu cria o index.js que vai guardar o ponto de entrada das rotas.
```js
const bodyPaser = require("body-parser");

module.exports = app => {
    app.use(bodyPaser.json())
    
    app.get('/', (req, res) => {
        res.send("Olá")
    })
}

```
- Depois dentro do App.js/index.js da app tu importa esse router e usa ele lá
- Como parametro para o router tu passa o app
```js
const express = require("express");
const routes = require("./routes"); // Aqui

const app = express();
const port = 3000;

routes(app); // Aqui

app.listen(port, () => console.log(`Servidor está rodando na porta ${port}`));

module.exports = app;

```

# Definindo a primeira rota

- Cria um novo arquivo dentro de Routes com o nome pessoasRoute.js
- Chama o controller de pessoa, PessoaController
```js
const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController.js");

const router = Router();

router.get("/pessoas", PessoaController.pegaTodasAsPessoas);

```
- Tu instancia o router com o Router, para poder criar a variável e usar os métodos do Router do express
- Tu cria a rota, no caso uma de get, define o endpoint q tu quer na url, no caso tu usou /pessoas; a rota final ficaria assim http://localhost:3000/pessoas
- No final tu exentifica a função statica que tu criou no Controller
- No exemplo tu chamou o pegaTodasAsPessoas que está usando um método get de findAll.

### Importante, Como tu usou o método STATIC tu não precisa instanciar

#### Olhe um exemplo de como tu faria para usar o método do controller se tu não instanciasse ele
```js
const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController.js");

const router = Router();

const pController = new PessoaController // Aqui

router.get("/pessoas", PessoaController.pegaTodasAsPessoas);
```
- Tu ia precisar criar essa istancia para poder usar no caso, se tu n usasse o  static.

## Feito todos os passos acima, tu precisa aviar o index.js de routes que tu criou uma nova rota.
- Tu importa o  pessoasRoute
- Tu usa um middleware para chamar ele e assim sua rota foi criada.

```js
const bodyPaser = require("body-parser");
const pessoas = require("./pessoasRoute.js");

module.exports = (app) => {
  app.use(bodyPaser.json());
  app.use(pessoas); // Aqui
};

```
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

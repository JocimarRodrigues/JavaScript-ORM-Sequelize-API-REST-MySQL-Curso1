# CRUD

### Buscando Usuario por ID
- Cria um novo método static no controller
PessoaController.js
```js
  static async pegaUmaPessoa(req, res) {
    const { id } = req.params;
    try {
      const umaPessoa = await database.Pessoas.findOne({
        where: { id: Number(id) },
      });
      return res.status(200).json(umaPessoa);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
```
- Como tu vai fazer uma busca pelo parametro da url/db tu tem que conseguir pegar esse ID da requisicao, por isso tu criou o objeto ID que recebe = req.params
- O Método para buscar uma pessoa no Sequelize é o FindOne
- O WHERE é a sintaxe do SQL, note que como tu instanciu a req do param por um objeto, tu vai fazer o mesmo com o WHERE
- Dessa forma tu conseguir buscar por mais de um parametro no WHERE, por Exemplo tu poderia buscar por ID e por NOME.

### Feito os passos acima, tu precisa avisar que tu criou essa nova rota no PessoasRoute.js
pessoaRoute.js
```js
const PessoaController = require("../controllers/PessoaController.js");

const router = Router();

router.get("/pessoas", PessoaController.pegaTodasAsPessoas);
router.get("/pessoas/:id", PessoaController.pegaUmaPessoa); // Aqui, note os :

module.exports = router;


```
- Note que como tu usou os : tu define que essa rota vai receber um parametro.
- Dessa forma, tu consegue definir para essa rota no Front um paramtro e enviar ele para o back, que vai ser o parametro usado naquela função do Controller, no caso no req.params
- Exemplo => localhost://3000/pessoas/5 tu vai estar enviando o parametro 5 para o back que vai ser o valor que aquela req.params vai receber do front.

### Exemplo de uso de um Where com dois parametros no sequelize
```js
Livros.findAll({
  where: {
    authorId: 1,
    preco: 10
  }
});
```

### Criando um registro
- Cria o método no controller
PessoasController.js
```js
  static async criaPessoa(req, res) {
    const novaPessoa = req.body;
    try {
      const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
      return res.status(200).json(novaPessoaCriada)
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
```
- Tu vai usar  o req.body para pegar os dados do corpo da requisicao, diferente do params q tu pegava da URL.
- O Método para criar um novo dado na tabela com o Sequelize é o CREATE

#### Depois dos passos acima não esquece de definir a nova rota no pessoaRoute
pessoasRoute.js
```js
const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController.js");

const router = Router();

router.get("/pessoas", PessoaController.pegaTodasAsPessoas);
router.get("/pessoas/:id", PessoaController.pegaUmaPessoa);
router.post("/pessoas", PessoaController.criaPessoa); // Aqui

module.exports = router;

```
- Como é uma rota de POST, tu usa post na rota em vez de get

### Atualizar um registro
- Cria o método no controller.
PessoaController.js
```js
  static async atualizaPessoa(req, res) {
    const { id } = req.params; // Para tu identificar a coluna que tu quer modificar
    const novasInfos = req.body; // Para tu pegar os dados do corpo da req, dados que tu vai atualizar
    try {
      await database.Pessoas.update(novasInfos, {
        where: {
          id: Number(id),
        },
      });
      const pessoaAtualizada = await database.Pessoas.findOne({
        where: {
          id: Number(id),
        },
      });
      return res.status(200).json(pessoaAtualizada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
```
- Tu precisa pegar o ID para identificar a coluna que tu vai atualizar
- Tu também precisa pegar a requisição do body para pegar os dados que tu vai usar para atualizar o registro
- O método para atualizar o dado é o update, O primeiro parametro que tu vai passar é os dados que tu quer atualizar e o 2 é a localização do dado que vai ser atualizado.
- Como tu vai atualizar, tu não precisa guardar esse valor em uma const, tu pode usar apenas o await e o método update que vai atualizar os dados.
- Feito os passos acima, tu precisa criar um novo método para pegar esse ID e mostrar na tela para o usuário que o dado foi atualizado
- Esse método precisa ser atribuido a uma const porque ele vai ser exportado na resposta.
- Tu faz isso porque o método update retorna um dado 0 ou 1 que é se deu certo ou não o update, por isso para deixar mais agradável para o cliente, tu usa outro método para buscar o usuario pelo id e mostrar as alterações na tela.

#### Feito os passos acima, não esquece de criar a rota para ele.
pessoasRoute.js
```js
const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController.js");

const router = Router();

router.get("/pessoas", PessoaController.pegaTodasAsPessoas);
router.get("/pessoas/:id", PessoaController.pegaUmaPessoa);
router.post("/pessoas", PessoaController.criaPessoa);
router.put("/pessoas/:id", PessoaController.atualizaPessoa); // Aqui

module.exports = router;

```
- Em vez de post tu vai usar o método PUT
- Não esquecer de avisar na rota, que ela vai receber um parametro para enviar para o back
- Para fazer isso tu usa :id


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
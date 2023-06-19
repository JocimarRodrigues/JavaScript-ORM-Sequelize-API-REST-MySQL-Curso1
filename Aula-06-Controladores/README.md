# Criando os Controladores para as novas tabelas

- Tu vai criar os controladores e rotas para as novas tabelas, acesse o commit para notar as diferenças.
- Se tiver dúvidas acesse -> https://cursos.alura.com.br/course/orm-nodejs-api-sequelize-mysql/task/77021
- Os arquivos que tu criou e fez alterações foram:

```js
//Controllers/NivelController.js
//Routes/niveisRoutes.js
//Controllers/TurmaController.js
//Routes/turmasRoute.js
//Routes/index.js
```

# Por que tu não criou o Controller e routes de Matriculas

- Vamos pensar em como nosso sistema está organizado. Faz sentido uma rota onde eu posso vir, no Postman, em níveis, com o método post e criar um novo nível, por exemplo: ‘descr_nivel’, e eu crio um novo nível, digamos assim, conversação básica: ‘descr_nivel’: “conversação básica”. Seleciono POST e crio um novo nível.

- Ele criou. Faz sentido existir esse end-point para criarmos novos níveis. Agora, quando falamos de Matrículas, um tipo de dado de matrícula só faz sentido se tivermos associado as matrículas a um estudante em especial. Esse end-point, /matrículas: http://localhost:3000/matriculas/, solto, sem estar relacionado a nenhuma pessoa, não faz muito sentido para o sistema.

- Para deixar organizado, faz mais sentido para o front-end receber um end-point onde ele passa, de repente, o ID da pessoa, e aí ou ver todas as matrículas dela, ou deletar uma matrícula, ou alterar uma matrícula de um ID x, do que receber dessa forma sem estar relacionada a nenhum usuário do sistema.

- E é por isso que faremos o CRUD de matrícula assim, faremos alguns métodos agora, mas não criaremos para Matrículas um controlador próprio e uma rota própria. Faremos isso dentro do controlador de Pessoas. Ou seja, as matrículas vão estar vinculadas a sempre uma pessoa, um aluno.

### Pelos motivos acima, tu não vai criar um Controller e uma Route própria para a tabela matrículas, TU VAI FAZER ISSO no Controller de PESSOAS.

- E é por isso que faremos o CRUD de matrícula assim, faremos alguns métodos agora, mas não criaremos para Matrículas um controlador próprio e uma rota própria. Faremos isso dentro do controlador de Pessoas. Ou seja, as matrículas vão estar vinculadas a sempre uma pessoa, um aluno.

# Lendo uma matrícula
- Tu vai criar o método dentro de PessoasController.js por causa dos motivos acima.
PessoasController.js
```js
  //htttp://localhost:300/pessoas/1/matricula/5
  //htttp://localhost:300/pessoas/:estudanteId/matricula/:matriculaId


  static async pegaUmaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      const umaMatricula = await database.Matriculas.findOne({
        where: { id: Number(matriculaId), estudante_id: Number(estudanteId) },
      });
      return res.status(200).json(umaMatricula);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
```
- A Primeira rota é a rota original de como tu pegaria uma matricula, mas ela não funcionaria
- A 2 Rota é a rota de fato que tu vai criar no routes, note que tu está passando DOIS parametros para ela, que são referentes aos ID necessários para localizar a matrícula
- Como tu está recebendo 2 parametros pela rota, tu precisa avisar o BACK q tu vai receber os dois parametros por isso tu definiu {estudanteId, matriculaID}
- Com esses dados, basta usar o findOne, passando para  o where esses valores.
- Com isso tu vai fazer uma busca pela matricula de Pessoa
- NÃO ESQUECER DE CRIAR A ROTA PARA ISSO

pessoasRoute.js
```js
const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController.js");

const router = Router();

router.get("/pessoas", PessoaController.pegaTodasAsPessoas);
router.get("/pessoas/:id", PessoaController.pegaUmaPessoa);
router.post("/pessoas", PessoaController.criaPessoa);
router.put("/pessoas/:id", PessoaController.atualizaPessoa);
router.delete("/pessoas/:id", PessoaController.deletaPessoa);
router.get( // AQUI
  "/pessoas/:estudanteId/matricula/:matriculaId",
  PessoaController.pegaUmaMatricula
);

module.exports = router;

```

#### Com isso tu termina o seu GET pela matricula de pessoa, basta usar o seguinte get no postman
```
//htttp://localhost:300/pessoas/1/matricula/5 GET
```
#### Se tiver dúvidas a aula referente a isso é => https://cursos.alura.com.br/course/orm-nodejs-api-sequelize-mysql/task/76908

# Criando uma Matrícula

- Tu vai refazer os passos acima
PessoaController.js
```js
  static async criaMatricula(req, res) {
    const { estudanteId } = req.params
    const novaMatricula = {...req.body, estudante_id: Number(estudanteId)}
    try {
      const novaMatriculaCriada = await database.Matriculas.create(novaMatricula);
      return res.status(200).json(novaMatriculaCriada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
```
- Lembra que tu precisa pegar o estudanteId pelos parametros
- O difernte aqui é a const novaMatricula
- Tu usa spread operator para pegar todos os dados do req.body E o estudanteID que tu vai passar como parametros pela URL, note que são dados DIFERENTES, tu vai usar tanto o body quanto o params para fazer isso.

#### Feito os passos acima, não esquece de criar a rota
pessoasRoute.js
```js
router.post("/pessoas/:estudanteId/matricula", PessoaController.criaMatricula);
```

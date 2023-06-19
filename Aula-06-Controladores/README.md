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
- Com esses dados, basta usar o findOne, passando para o where esses valores.
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
router.get(
  // AQUI
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
- O req body também vai pegar os dados refentes as outras tabelas que estão relacionadas.
- Por isso no postMan para tu criar uma nova matricula tu vai usar o seguinte body

```json
// http://localhost:3000/pessoas/1/matricula POST
{
  "status": "confirmado",
  "turma_id": 2
}
```

- Com isso vai criar uma nova matricula para a pessoa 1

#### Feito os passos acima, não esquece de criar a rota

pessoasRoute.js

```js
router.post("/pessoas/:estudanteId/matricula", PessoaController.criaMatricula);
```

# Atualizando e removendo matriculas

## Atualizando Matricula

PessoaController.js

```js
  static async atualizaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    const novasInfos = req.body;
    try {
      await database.Matriculas.update(novasInfos, {
        where: {
          id: Number(matriculaId),
          estudante_id: Number(estudanteId)
        },
      });
      const matriculaAtualizada = await database.Matriculas.findOne({
        where: {
          id: Number(matriculaId),
        },
      });
      return res.status(200).json(matriculaAtualizada);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
```

- A diferença aqui é que no Where tu precisa passar os dois parametros para atualizar
- Lembrando que, no where, teremos que passar duas propriedades, estudanteId e matriculaId. Lembrando que o Id que está na propriedade é a coluna. Como estamos falando do modelo Matrícula, id: Number(matriculaId), e o segundo que temos que passar é a coluna estudante_id: estudante_id: Number(estudanteId).

#### Crie a rota

pessoasRoute.js

```js
router.put(
  "/pessoas/:estudanteId/matricula/:matriculaId",
  PessoaController.atualizaMatricula
);
```

- Aí para testar no postMan tu poder usar o seguinte cmd

```json
// http://localhost:3000/pessoas/1/matricula/5 PUT

{
  "status": "cancelado"
}
```

### Deletando Matriculas

- Do que precisamos para apagar matrícula? Das mesmas informações que precisamos para atualizar uma matrícula: precisamos do estudante_id e matricula_id. Podemos copiar e colar const { estudanteId, matriculaId } = req.params, porque precisamos das mesmas informações para apagarmos matrícula específica do estudante específico.

PessoaController.js

```js
  static async apagaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      await database.Matriculas.destroy({ where: { id: Number(matriculaId) } });
      return res.status(200).json({mensage: `id ${matriculaId} foi deletado.`})
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
```

#### Cria a rota

pessoasRoute.js

```js
router.delete(
  "/pessoas/:estudanteId/matricula/:matriculaId",
  PessoaController.apagaMatricula
);
```

- Aí para testar no postman usa o cmd

```js
// http://localhost:3000/pessoas/2/matricula/6 DELETE
```

### Obersavação na aula foi passado o parametro estudanteId, mas ele não foi utilizando, MAS, tu pode e deve usar ele para deixar a API mais resilente e menos suscetível a erros.

- COmo fazer isso

```js
  static async apagaMatricula(req, res) {
    const { estudanteId, matriculaId } = req.params;
    try {
      await database.Matriculas.destroy({
        where: { id: Number(matriculaId), estudante_id: Number(estudanteId) }, // Aqui
      });
      return res
        .status(200)
        .json({ mensage: `id ${matriculaId} foi deletado.` });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
```

### Obersvações
- O método create() serve para criarmos um novo registro no banco através de uma requisição HTTP POST. Então só é preciso um parâmetro, o objeto com os dados que serão criados no banco (nomes das colunas e valores). A cláusula where com um número de id não tem uso aqui, pois o registro ainda vai ser criado.
```js
Modelo.create({ nome: “Aline”, ativo: true }, { where: { id: 55 }})
```
- O método update() recebe como primeiro parâmetro um objeto com os dados que serão atualizados - nome da coluna e valor. No segundo parâmetro passamos o where que localiza o registro que se quer atualizar. O Sequelize vai enviar ao banco a query correspondente com essas informações.

Durante o projeto, o objeto que passamos no primeiro parâmetro está sendo recebido através do corpo da requisição HTTP com POST.
```js
Modelo.update({ nome: “Marcia M” }, { where: { id: 12 }})
```
- O método destroy() vai enviar para o banco uma query do tipo DELETE. Não podemos esquecer de passar o where como parâmetro, pois uma query dessas, sem a cláusula where vai destruir todos os registros da tabela - afinal de contas, não informamos o banco que só queríamos destruir um registro específico!

- Caso queira utilizar o destroy() para realmente destruir todos os registros, pode passar a opção truncate como parâmetro:

- Modelo.destroy({ truncate: true })
```js
Modelo.destroy()
```
- O findAll() usado sem parâmetro nenhum vai gerar uma query SELECT básica que vai trazer todos os registros da tabela. Se quiser restringir os resultados, pode passar o objeto ``` {where: {}} ``` como parâmetro.
```js
Modelo.findAll()
```
-  Utilizamos o método findOne() passando como parâmetro um objeto com a propriedade where e os atributos/valores com que queremos que o Sequelize faça a query no banco. O método findOne pode utilizar qualquer atributo, ou seja, qualquer valor de qualquer coluna - não precisa ser necessariamente da coluna id. Existem mais métodos para fazer queries de seleção com o Sequelize, você pode pesquisar na documentação o método findByPK, por exemplo.
```js
Modelo.findOne( { where: { id: 25 }} )
```
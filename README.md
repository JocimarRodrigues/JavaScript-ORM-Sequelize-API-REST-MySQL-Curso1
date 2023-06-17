# Links Úteis

- CLI e ORM Sequelize, Comandos CLI => https://cursos.alura.com.br/course/orm-nodejs-api-sequelize-mysql/task/126586
- Documentação oficial do CLI Sequelize => https://github.com/sequelize/cli
- Data Types Sequelize => https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types
- Singular e Plurar, o Sequelize tenta "pluralizar" os nomes da tabela, leia o artigo => https://cursos.alura.com.br/course/orm-nodejs-api-sequelize-mysql/task/77024
- Versionando o Banco => https://cursos.alura.com.br/course/orm-nodejs-api-sequelize-mysql/task/77026
- Para saber mais: Camadas extras no MVC => https://cursos.alura.com.br/course/orm-nodejs-api-sequelize-mysql/task/77007

### Obersvação sobre os vários index.js no projeto

Como vimos até agora, durante o desenvolvimento do projeto foram criados diversos arquivos index.js:

- api/index.js no início do projeto
- api/models/index.js criado direto pelo Sequelize através do comando sequelize init
- api/routes/index.js criado durante o último vídeo

```
api/index.js é o ponto de entrada da aplicação, onde iniciamos o servidor e chamamos a biblioteca Express para gerenciar as rotas da API.
```
```
api/models/index.js é o arquivo que gerencia todos os modelos da pasta models e é atraveś dele que o Sequelize conecta os modelos ao banco de dados de acordo com o ambiente escolhido durante o projeto estamos trabalhando com o ambiente 'development', de desenvolvimento.
```
```
api/routes/index.js é o ponto de entrada que gerencia os arquivos de rotas, importa os métodos de cada arquivo api/routes/[arquivo] através dos require e chama estes métodos de acordo com a rota acessada pelo usuário.
```


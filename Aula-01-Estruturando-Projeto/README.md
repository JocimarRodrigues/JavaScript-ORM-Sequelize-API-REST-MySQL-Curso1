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
- Isso vai criar um projeto padrão com todas as pastas no padrao MVC, para iniciar um projeto,

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

# Tu vai ir na pasta config e no config.json tu vai colocar os dados de conexao do banco
config.json
```json
{
  "development": {
    "username": "root",
    "password": null,
    "database": "escola_ingles_alura",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
}
```

# Anotações importantes sobre ORM 
- ORM significa Mapeador de Objeto Relacional (em uma tradução livre) e usamos para isolar a camada relacional de dados do restante da aplicação
```
Alternativa correta! O ORM é responsável por se conectar ao banco, converter os métodos e funções em queries e resolver as queries com o banco.
```

- ORMs oferecem uma interface única, que pode ser utilizada para vários bancos de dados relacionais diferentes
```
Alternativa correta! Ao usar um ORM para escrever a aplicação, o ORM fará toda a “tradução” para linguagem do banco e resolverá os comandos e queries. Se for necessário migrar de um banco SQL para outro, é possível fazer isso sem mudanças no código.
```

- Ajudam o time a ganhar agilidade no desenvolvimento das aplicações
```
Alternativa correta! Com ORMs não temos que reinventar a roda - ou seja, não precisamos reescrever do zero aplicações que já são “padrão” e muito utilizadas em diversos sistemas.
```

- Esta interface única “esconde” as especificidades dos diversos bancos relacionais, diminuindo a complexidade do código
```
Alternativa correta! Os bancos de dados relacionais, embora compartilhem de uma mesma linguagem (o SQL), têm diferentes dialetos, então os comandos e palavras-chave que utilizamos para dar comandos ao banco podem ser diferentes entre eles. Usando um ORM como o Sequelize, quem desenvolve só precisa usar os métodos do próprio Sequelize, e a aplicação vai “traduzir” o comando para o banco usando o dialeto correto.
```
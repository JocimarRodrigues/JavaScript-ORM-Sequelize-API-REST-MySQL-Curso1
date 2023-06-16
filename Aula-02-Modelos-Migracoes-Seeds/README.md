# Criando Modelos

### Criando um model/tabela com colunas usando o Sequelize CLI

```
 npx sequelize-cli model:create --name Pessoas --attributes nome:string,ativo:boolean,email:string,role:string

```

- No model, name é o nome da tabela
- Em attributes é as colunas que tu vai criar, com o tipo de dados que tu vai usar.
- Importante lembrar que o comando tem que ser exatamente como tu colocou no Exemplo NÃO PODE TER ESPAÇOS ENTRE O : e o atributo
- Com esse comando, ele vai criar a tabela com um ID auto incremental, tu pode ver essa migration na pasta migrations.
- Essa pasta migrations vai ter o nome do arquivo com o começo sendo a data e hora da criação da tabela
- Dentro do migration vai ter o UP que é quando tu cria a tabela e o DOWN que é quando tu deleta a tabela.

# O Que são migrações

- Migração de dados: transferencia de dados entre plataformas
- Basicamente isso serve para ajudar a migrar um banco para outro, por exemplo se tu For migrar teu Banco MYSQL para PostGree, a migração vai ajudar nesse processo.

### Migração com ORM

- AlteraçÕes incrementais e rastreáveis no banco.
- Seria como se tu fosse VERSIONAR a tabela, por exemplo, tu faz uma alteração, ele vai criar uma migration e caso dê algo errado, tu pode voltar para a migration anterior.
- Isso vai ser muito bom quando tu der um DROP sem Where. KKKK
- Coordenar alterações feitas por diferentes pessoas do time nas tabelas do banco.
- Rastrear (e reverter) alterações feitas no banco para debugar os conflitos e erros.

### Rodando migrações

- Tu vai usar o comando

```
npx sequelize-cli db:migrate
```

- Com isso tu vai rodar a migration e criar a tabela no banco
- Tu pode usar o use para o nome da tabela
- Depois tu pode usar o show tables, para ver as tabelas
- Depois tu pode usar o describe nome da tabela, para mostar todos as colunas da tabela.

### Populando o banco direto no terminal

- Tu pode usar o terminal para fazer isso com a sintaxe

```sql
insert into Pessoas(nome, ativo, email, role, createdAt, updatedAt) values ("Carla Gomes", 1, "carla@carla.com", "estudante", NOW(), NOW());
```

- 1 Para Definir o Boolean como True, se quiser false use o 0
- NOW => Para pegar a Data Atual

#### Com isso tu vai popular o banco.

### Populando o banco com Seeders

- O Seeder vai deixar mais prático para tu fazer a população das tabelas
- 1 Tu precisa criar o seeder para a tabela

```
npx sequelize-cli seed:generate --name demo-pessoa
```

- O name não tem nada a ver com o nome da tabela, ele é o nome do SEEDER

#### Com isso tu vai criar um novo seeder com esse formato

20230616093037-demo-pessoa.js

```js
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Pessoas",
      [
        {
          name: "John Doe",
          isBetaMember: false,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Pessoas", null, {});
  },
};
```

- Tu vai apagar os comentários de exemplo, mas deixando os código e Alterando o nome da Tabela People para a tabela Pessoas que é o nome da sua tabela no DB.
- Depois tu vai adicionar as propriedades e definir os valores Com os mesmos VALORES que estão no db
```js
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Pessoas",
      [
        {
          nome: "Ana Souza",
          ativo: true,
          email: "ana@ana.com",
          role: "estudante",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Marcos Cintra",
          ativo: true,
          email: "marcos@marcos.com",
          role: "estudante",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Felipe Cardoso",
          ativo: true,
          email: "felipe@felipe.com",
          role: "estudante",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Sandra Gomes",
          ativo: false,
          email: "sandra@sandra.com",
          role: "estudante",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Paula Morais",
          ativo: true,
          email: "paula@paula.com",
          role: "docente",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nome: "Sergio Lopes",
          ativo: true,
          email: "sergio@sergio.com",
          role: "docente",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Pessoas", null, {});
  },
};

```
#### Feitos os passos acima, basta rodar o Seed, para enviar os dados para o DB.
- O comando é:
```
 npx sequelize-cli db:seed:all
```
- Com isso o Seed vai ser enviado, mandando todos os dados que tu usou no seeder para o DB.

## Desfazendo Operações, Versionamento De Migrations e Seeders

- Rodou o comando de migração antes de fazer alguma alteração importante em algum modelo e agora as tabelas do banco não estão como você precisa? Bom, já comentamos que as migrações em ORM também servem para termos um tipo de “versionamento” (feito através do arquivo "SequelizeMeta" no seu banco) e poder voltarmos o banco a um estado anterior à última alteração.

- Como fazer isso? Através dos comandos:
```
npx sequelize-cli db:migrate:undo
```
- Este comando vai desfazer somente a última migração feita, na ordem em que os arquivos são lidos e executados pelo Sequelize (de acordo com as datas e horários no nome dos arquivos). Se você tiver rodado 3 migrações - por exemplo, das tabelas Niveis, Turmas e Matriculas, o comando npx sequelize-cli db:migrate:undo vai desfazer apenas Matriculas.

- Você pode rodar o mesmo comando novamente para ir desfazendo as migrações na ordem em que foram executadas, ou usar o comando:
```
db:migrate:undo --name [data-hora]-create-[nome-da-tabela].js
```

- Para desfazer uma migração específica. Nesse caso, lembre-se que só irá funcionar se não tiver nenhuma outra tabela relacionada a ela!

### Desfazendo seeds
- Os seeds servem para termos dados iniciais no banco, normalmente dados de exemplo e/ou para teste. Quando você quiser desfazer essa operação para limpar esses dados do banco, pode rodar o comando:
- Para desfazer o último seed feito.
```
npx sequelize db:seed:undo
```
- Para desfazer seeds de uma tabela específica.
```
npx sequelize-cli db:seed:undo --seed nome-do-arquivo
```
- Para desfazer todos os seeds feitos.
```
npx sequelize-cli db:seed:undo:all
```

#### Importante:

- Ao contrário das migrações, não existe nenhum recurso de “versionamento” de seeds, só é possível incluir no banco e desfazer a operação (o que vai deletar os registros do banco).

- Se você rodar o :undo em uma tabela e quiser mais tarde utilizar os seeds novamente na mesma tabela, os IDs deles serão outros. Por exemplo:

- Rodamos o comando npx sequelize-cli db:seed:all e populamos a tabela:

```js
| id | nome           | ativo     | email             | role      | createdAt           | updatedAt           |
|----|----------------|-----------|-------------------|-----------|---------------------|---------------------|
| 1  | Ana Souza      | 1         | ana@ana.com       | estudante | 2020-04-15 01:14:12 | 2020-04-15 01:14:12 |
| 2  | Marcos Cintra  | 1         | marcos@marcos.com | estudante | 2020-04-15 01:14:12 | 2020-04-15 01:14:12 |
| 3  | Felipe Cardoso | 1         | felipe@felipe.com | estudante | 2020-04-15 01:14:12 | 2020-04-15 01:14:12 |
| 4  | Sandra Gomes   | 0         | sandra@sandra.com | estudante | 2020-04-15 01:14:12 | 2020-04-15 01:14:12 |
| 5  | Paula Morais   | 1         | paula@paula.com   | docente   | 2020-04-15 01:14:12 | 2020-04-15 01:14:12 |
| 6  | Sergio Lopes   | 1         | sergio@sergio.com | docente   | 2020-04-15 01:14:12 | 2020-04-15 01:14:12 |

```

- Se rodarmos o comando npx sequelize-cli db:seed:undo:all para deletar esses registros e, em seguida, refazer os seed novamente com npx sequelize-cli db:seed:all, o resultado será o abaixo. Compare os números de id!

```js
| id | nome           | ativo     | email             | role      | createdAt           | updatedAt           |
|----|----------------|-----------|-------------------|-----------|---------------------|---------------------|
| 7  | Ana Souza      | 1         | ana@ana.com       | estudante | 2020-04-15 01:14:12 | 2020-04-15 01:14:12 |
| 8  | Marcos Cintra  | 1         | marcos@marcos.com | estudante | 2020-04-15 01:14:12 | 2020-04-15 01:14:12 |
| 9  | Felipe Cardoso | 1         | felipe@felipe.com | estudante | 2020-04-15 01:14:12 | 2020-04-15 01:14:12 |
| 10 | Sandra Gomes   | 0         | sandra@sandra.com | estudante | 2020-04-15 01:14:12 | 2020-04-15 01:14:12 |
| 11 | Paula Morais   | 1         | paula@paula.com   | docente   | 2020-04-15 01:14:12 | 2020-04-15 01:14:12 |
| 12 | Sergio Lopes   | 1         | sergio@sergio.com | docente   | 2020-04-15 01:14:12 | 2020-04-15 01:14:12 |
```

- Os registros terão novos IDs, pois uma vez deletado o ID nunca é reutilizado. Se você estiver migrando/seedando tabelas relacionadas, é sempre bom conferir os IDs de todas, do contrário o Sequelize vai lançar um erro de relação.

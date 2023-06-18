# Criando mais tabelas
![imagem_2023-06-18_051245381](https://github.com/JocimarRodrigues/JavaScript-ORM-Sequelize-API-REST-MySQL-Curso1/assets/116130103/699e4464-ffa4-41bf-be9a-593e0fa609da)

- Tu começa criando as tabelas primeiro pelas tabelas que não usam chaves estrangeiras = FK(Foreign Key)
#### Tu vai usar o cmd do npx para criar essas tabelas
##### Tabela Niveis
```
npx sequelize-cli model:create --name Niveis --attributes descr_nivel:string
```
- Se tiver dúvidas sobre isso, volte na aula 01 em que está explicando mais detalhado sobre esse comando.
#### Quando tu for criar tabelas que fazem interações com outras a ORDEM é => Primeiro tu cria as tabelas que MAIS tem interação com as outras e deixa as com menor Interação para o Final
- Exemplo => Tu tem uma tabela que faz interação com outras 3 tabelas, e outra que faz interação com 2, tu vai criar PRIMEIRO a tabela que faz as 3 interações.

#### Quando tu tiver criando atributos para uma tabela, tu só vai criar os atributos que NÃO POSSUEM chaves estrangeiras.
##### Tabela Turmas
- Olhe a tabela Turma, ela tem os atributos docente_id e nivel_id, mas ambos são atributos que tem chave estrangeira, por isso o único atributo que tu vai criar na criação da tabela Turmas é o data_inicio
```
npx sequelize-cli model:create --name Turmas --attributes data_inicio:dateonly
```

#### Tabela Matriculas
- Respeitando os requisitos acima, a última tabela a ser criada é a Matriculas e o único atributo vai ser o status
```
npx sequelize-cli model:create --name Matriculas --attributes status:string
```
#### Você tem que ter muito cuidado com os espaços usando o CLI, se tu colocar um espaço errado o código não vai rodar.

### Importante
- Lembra que quando criou o arquivo de migração “pessoas”, o Sequelize colocou um número no começo que corresponde à data e horário? Isso tem uma razão de ser, quando o Sequelize rodar as migrações, que não faremos agora, ele vai rodar todas as migrações que estão na pasta na ordem que criamos, por isso que seguimos também essa ordem de criar. Deixa eu voltar, tirar o zoom. Meu zoom não quer sair. Pronto.

- Por isso que seguimos a ordem de criação, porque se eu tento rodar uma migração no arquivo Turmas e o Sequelize não encontra Pessoas, não existe ainda essa migração feita, ele vai ficar confuso, porque vamos dizer para ele que tem uma chave estrangeira e ele não vai encontrar a tabela, não vai encontrar o modelo. Por isso que quando rodamos as migrações é importante seguir essa ordem, porque ele vai criar primeiro migrações de Níveis e quando ele criar de Turmas, Níveis e Pessoas já existem no banco, então ele não vai ficar perdido.

- A mesma coisa para Matrículas. Então, antes de rodarmos a migração, passaremos para o Sequelize quais são as chaves estrangeiras que cada tabela usa, e vamos fazer isso agora.

- Solange está trabalhando em uma nova API e precisa de uma lista de usuários. Ela já criou o modelo e o arquivo de migração que precisava, utilizando o comando npx sequelize-cli model:create, e rodou o comando de migração npx sequelize-cli db:migrate para gerar a tabela no banco.

- A tabela Usuarios ficou da seguinte forma:
```js
| Field     | Type         | Null | Key | Default | Extra          |
|-----------|--------------|------|-----|---------|----------------|
| id        | int(11)      | NO   | PRI | NULL    | auto_increment |
| nome      | varchar(255) | NO   |     | NULL    |                |
| celular   | varchar(255) | NO   |     | NULL    |                |
| createdAt | datetime     | NO   |     | NULL    |                |
| updatedAt | datetime     | NO   |     | NULL    |                |                  
```
- Porém, só depois de rodar o comando de migração ela conferiu a tabela no banco e notou que havia esquecido de inserir um atributo nessa tabela, o data_nascimento.

- Quais são as alterações de código que ela precisa fazer para incluir essa coluna na tabela?

- Incluir o novo atributo no modelo: data_nascimento: DataTypes.STRING
Incluir a coluna no arquivo de migração:
```js
data_nascimento: {
  type: Sequelize.STRING
},
```
- Rodar novamente o comando de migração para fazer a alteração no banco.

- Utilizamos o comando de migração no ORM para fazer alterações rastreáveis no banco. As migrações ficam indexadas em sequelizeMeta e podem ser revertidas, mas não é preciso desfazer a migração anterior para fazer uma nova alteração no banco, como adicionar uma coluna. É só rodar um novo comando de migração para adicionar as alterações.

### Fazendo Associações regras

- Mas antes de rodarmos o comando de migração para mandar tudo para o banco, vamos dar uma olhada na nossa tabela Turmas. Além do ID, a tabela Turmas tem três colunas,a coluna data_inicio, que definimos quando criamos o modelo, e tem mais duas que estão ligadas à tabela Pessoas através de chaves estrangeiras: docente_id, que é a coluna que liga Turma a Pessoas, e nível_id, que é a coluna que liga Turma a Nível.

- Porém, se viermos no nosso código, em nenhuma parte dele falamos para o Sequelize que existe essa relação entre as tabelas. Por enquanto, nossa tabela Turmas só tem uma coluna no modelo, que é a coluna data_início, e no arquivo de migração também só tem data_início e as outras três colunas que são as que o Sequelize cria.

- Quando criamos o diagrama, usamos uma anotação para ilustrar quais são os relacionamentos entre as tabelas.

-  O risco sozinho e o tridente, que chamamos de pé de galinha porque parece um pé, dizem em conjunto que entre a tabela Pessoas e a tabela Turmas existe uma relação de um para vários. Como assim? Vamos ler essa relação. Na tabela Turmas, essa relação é feita através da coluna docente_id, porque na tabela Pessoas entram professores, alunos, staff, etc. E um professor pode trabalhar em diversas turmas: pode dar aula de básico, pode dar aula de avançado, etc.

- Então o registro de um mesmo ID de professor pode aparecer várias vezes na tabela Turmas. É uma relação de um para vários. A mesma coisa “nível”, cada um dos níveis – básico, avançado, intermediário de inglês – eu posso ter várias turmas desse nível: turmas de manhã, turmas à tarde, etc. Então é uma relação de um nível para várias turmas, e por aí vai.

- A mesma coisa acontece em Matrículas: uma turma pode ter várias matrículas, porque várias pessoas se matriculam na mesma turma, então cada turma tem várias matrículas ou nenhuma, caso ninguém se matricule nela. E um estudante pode ter várias matrículas também, porque ele se matricula no básico, depois se matricula avançado. Podemos abrir depois uma turma de conversação e ele se inscreve em conversação e básico.

- Então, entre as tabelas A e B há vários, podemos usar o método hasMany. Ele diz também que a chave estrangeira, a FK, tem que ser definida na tabela, no modelo B, que é o modelo que está sendo passado por parâmetro do método. Então, vamos copiar A.hasMany(B) e passar para o nosso código, e ver como traduzimos esse exemplo.

### Fazendo a Assosiação no código

- Tu vai fazer a assosiacão direto no model da tabela.
Models/Pessoa.js
```js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {

    static associate(models) { // Aqui
      // define association here
    }
  }
  Pessoas.init({
    nome: DataTypes.STRING,
    ativo: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoas',
  });
  return Pessoas;
};
```
- Fazendo a assosiação
Models/Pessoa.js
```js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {

    static associate(models) {
      Pessoas.hasMany(models.Turmas) // Aqui
      Pessoas.hasMany(models.Matriculas) //
    }
  }
  Pessoas.init({
    nome: DataTypes.STRING,
    ativo: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoas',
  });
  return Pessoas;
};
```
- Com isso tu está associando que a Tabela Pessoa, tem várias assosiações com a tabela Turmas e Matriculas

#####  O que aconteceria se eu rodasse as migrações, se eu mandasse dessa forma para o banco? É um comportamento que é padrão de ORM. O Sequelize, por padrão, se passamos para migração o código Pessoas.hasMany(models.Matriculas), por exemplo, ele vai criar no banco uma coluna chamada PessoaId. Ou seja, ele vai associar que é um plural, vai tentar pegar o singular, “pessoa”, e vai colocar a palavra ID depois.

#####  Só que tem duas coisas, primeiro, que quando criamos o diagrama de banco, dissemos o nome da tabela exato que queremos. E outro, com Pessoa tudo bem, o singular e o plural se resolvem, mas quando chega no modelo Niveis, ele vai tentar criar NiveiId, e não vai dar certo, não é o que estamos esperando. Não é uma palavra que existe em português. Como estamos trabalhando com os nomes em português de modelo, de tabela, isso pode dar problema.

### Como resolver o problema acima.

- Como fazemos, então, para prevenir esse comportamento padrão? O Sequelize tem uma opção para passarmos exatamente o nome da tabela que queremos, na parte de relações de um para vários, nas opções, ele fornece o nome dessa opção. Chama foreignKey.

- Então a passamos como segundo parâmetro, e ela vai dentro de um objeto. Então, podemos voltar no código “api > models > pessoas.js”, eu vou deixar aberto nossos arquivos níveis, pessoas, turmas e matrículas para podermos fechar. Então, todas as relaçõeshasMany, “tem vários”, precisamos colocar essa opção para podermos dizer qual o nome da tabela que desejamos que seja criado, e passamos como segundo parâmetro.

Exemplo
Models/Pessoas.js
```js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {

    static associate(models) {
      Pessoas.hasMany(models.Turmas, {
        foreignKey: 'docente_id' // Aqui
      })
      Pessoas.hasMany(models.Matriculas, {
        foreignKey: 'estudante_id' //
      })
    }
  }
  Pessoas.init({
    nome: DataTypes.STRING,
    ativo: DataTypes.BOOLEAN,
    email: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoas',
  });
  return Pessoas;
};
```
- Assim tu cria a foreignKey com o Nome que tu especificou.

## Agora só falta tu fazer o outro lado da Assosiação, porque tu criou varios hasMany, mas está faltando o belongsTo, para definir para qual tabela faz relação com qual.
- Por que tu associou a Tabela Pessoa com Turma, mas tu não associou a tabela TURMA com Pessoa, por isso tu vai usar o belongsTo para fazer essa assosiação.
Exemplo
Models/Turmas.js
```js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Turmas extends Model {
    static associate(models) {
      Turmas.hasMany(models.Matriculas, {
        foreignKey: 'turma_id'
      })
      Turmas.belongsTo(models.Pessoas) // Aqui
      Turmas.belongsTo(models.Niveis) // Aqui

    }
  }
  Turmas.init({
    data_inicio: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Turmas',
  });
  return Turmas;
};
```
- Com isso, tu associou a tabela Turmas com Pessoas, fazendo assim a relação das duas TABELAS
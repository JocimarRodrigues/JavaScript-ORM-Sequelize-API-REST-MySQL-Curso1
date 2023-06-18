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
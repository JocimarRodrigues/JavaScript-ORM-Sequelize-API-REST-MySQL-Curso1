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
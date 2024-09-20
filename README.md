# Exercita 365

Plataforma que facilita a prática de exercícios com a localização de espaços para atividades físicas. Na plataforma os usuários registrados podem cadastrar novos locais de exercícios, descobrir áreas em uma lista disponível, obter sua geolocalização, e obter informações sobre os atividades físicas possibilitadas.

### 👨‍💻 Tecnologias 

* [Node.js](https://nodejs.org/pt) - Ambiente de execução Javascript server-side
* [Java Script](https://www.javascript.com/) - Linguagem utilizada
* [Express](https://expressjs.com/pt-br/) - Framework usado para a API WEB
* [Sequelize](https://sequelize.org/) - ORM (mapeador objeto-relacional) para Node e SQL
* [PostgreSQL](https://www.postgresql.org/) - Sistema gerenciador de banco de dados objeto relacional


### 📌 Versionamento
Utilizou-se:
[GitFlow](https://docs.github.com/pt/get-started/using-github/github-flow) para controle de versão. Para as versões disponíveis, observe as [tags neste repositório](https://github.com/marcelovntr/Projeto-Modulo-II/branches). 


###### O modelo relacional que orientou a execução do projeto:
![Modelo relacional](https://github.com/marcelovntr/Projeto-Modulo-II/blob/develop/src/images/sql_projeto.jpg)

## 🚀 Começando


#### 📋 Pré-requisitos


Node.js e IDE (Visual Studio Code)

#### 💾 Obter o repositório utilizando:

```
    git pull https://github.com/marcelovntr/Projeto-Modulo-II
```

###### Na primeira vez é necessário instalar as dependências:
```
 npm install ou npm init -y
 ```   
 ```
npm install nodemon --save-dev
```
###### Proceder a série de instalações abaixo garantirá pleno funcionamento do projeto:

#### 📚 Bibliotecas utilizadas:

###### instalar o Express
```
npm install express
```
###### instalar o driver do PostgreSQL
```
npm install pg
```
###### instalar elementos do Sequelize
```
npm install sequelize
```
```
npm install -g sequelize-cli
```
###### Segurança e validações
```
npm install cors
```
```
npm install dotenv
```
```
npm install bcryptjs
```
```
npm install jsonwebtoken
```
###### instalar o axios
```
npm install axios
```
###### Elementos do Swagger UI
```
npm install swagger-ui-express
```
```
npm install swagger-autogen
```


## ⚙️ Executando 


###### Configurar variáveis de ambiente através da cópia do .env_example:
`cp .env_example .env`

###### Para rodar o repositório em ambiente local:
1º `npm run swagger`
2º `npm run start:dev`

###### Rodar uma migrations:
`sequelize db:migrate`

###### Executar os seeders:
`sequelize db:seed:all`

###### Acessar endereço e executar via Swagger:
`https://http://localhost:3000/docs/`

#### Endpoints criados e demonstração no Swagger:
![EndPoinst demonstrados no Swagger](https://github.com/marcelovntr/Projeto-Modulo-II/blob/develop/src/images/endPoinstFull.jpg)

## 🛠️ Melhorias aplicáveis:

● Introdução de biblioteca de validações para melhoria do projeto, como por maior reutilização do código e aumento de segurança
(em virtude do tempo não foi possível inserir);
● Aplicação de validações e/ou melhoria no código para tratar de requisições que utilizem CEPs inexistentes;
● Aplicação de validação consistente para tokens com prazo expirado;
● Reavaliação do posicionamento da rota de geração de link e do local de aplicação da função de obter link a partir das coordenadas.

### 📹 Link do vídeo de defesa do projeto:

https://drive.google.com/file/d/1RDoy1R6rYrgOYxjvCTD715gw6LqOlsy3/view?usp=drive_link


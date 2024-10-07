# GJM Exercises

Plataforma que facilita a prática de exercícios com a localização de espaços para atividades físicas. Na plataforma os usuários registrados podem cadastrar novos locais de exercícios, descobrir áreas em uma lista disponível, obter sua geolocalização, e obter informações sobre os atividades físicas possibilitadas.
Aqui encontra-se o repositório constituidor do backend da aplicação global.

### 👨‍💻 Tecnologias 

* [Node.js](https://nodejs.org/pt) - Ambiente de execução Javascript server-side
* [Java Script](https://www.javascript.com/) - Linguagem utilizada
* [Express](https://expressjs.com/pt-br/) - Framework usado para a API WEB
* [Sequelize](https://sequelize.org/) - ORM (mapeador objeto-relacional) para Node e SQL
* [PostgreSQL](https://www.postgresql.org/) - Sistema gerenciador de banco de dados objeto relacional
* [Swagger](https://swagger.io/) - Ferramenta de documentação e design de APIs web 
* [DrawSql](https://drawsql.app) - Ferramenta para traçar modelos relacionais

#### 📚 Bibliotecas utilizadas:

axios ![axios](https://img.shields.io/badge/npm-1.7.2-blue)

bcrypt ![bcrypt](https://img.shields.io/badge/npm-5.1.1-blue)

bcryptjs ![bcryptjs](https://img.shields.io/badge/npm-2.4.3-blue)

cors ![cors](https://img.shields.io/badge/npm-2.8.5-blue)

dotenv ![dotenv](https://img.shields.io/badge/npm-16.4.5-blue)

express ![express](https://img.shields.io/badge/npm-4.19.2-blue)

jsonwebtoken ![jsonwebtoken](https://img.shields.io/badge/npm-9.0.2-blue)

pg ![pg](https://img.shields.io/badge/npm-8.12.0-blue)

sequelize ![sequelize](https://img.shields.io/badge/npm-6.37.3-blue)

sequelize-cli ![sequelize-cli](https://img.shields.io/badge/npm-6.6.2-blue)

sqlite3 ![sqlite3](https://img.shields.io/badge/npm-5.1.7-blue)

swagger-autogen ![swagger-autogen](https://img.shields.io/badge/npm-2.23.7-blue)

swagger-ui-express ![swagger-ui-express](https://img.shields.io/badge/npm-5.0.1-blue)

yup ![yup](https://img.shields.io/badge/npm-1.4.0-blue)

nodemon ![nodemon](https://img.shields.io/badge/npm-3.1.4-blue)

### 📌 Versionamento
Utilizou-se:
[GitFlow](https://docs.github.com/pt/get-started/using-github/github-flow) para controle de versão. Para as versões disponíveis, observe as tags presentes neste [repositório](https://github.com/FuturoDEV-Fitness/M3P-BackEnd-squad5/branches). 


###### O modelo relacional que orientou a execução do projeto:
![Modelo relacional](https://github.com/FuturoDEV-Fitness/M3P-BackEnd-squad5/blob/feature-013/src/images/modeRelacional.jpg)

## 🚀 Começando


#### 📋 Pré-requisitos


Node.js e IDE (Visual Studio Code)

#### 💾 Obter o repositório utilizando:

```
    git pull https://github.com/FuturoDEV-Fitness/M3P-BackEnd-squad5
```

###### Na primeira vez é necessário instalar as dependências:
```
 npm install ou npm init -y
 ```   
 ```
npm install nodemon --save-dev
```
###### Proceder a série de instalações abaixo garantirá pleno funcionamento do projeto:



## ⚙️ Executando 


###### Configurar variáveis de ambiente através da cópia do .env_example:
`cp .env_example .env`

###### Para rodar o repositório em ambiente local:
1º `npm run swagger`
2º `npm run start:dev`

###### Criar o banco de dados:
`sequelize db:create`

###### Rodar as migrations:
`sequelize db:migrate`

###### Executar os seeders:
`sequelize db:seed:all`

###### Acessar endereço e executar via Swagger:
`https://http://localhost:3000/docs/`

#### Endpoints criados e demonstração no Swagger:
EndPoinst: acesso e funcionalidades de usuário elocais:
![EndPoinst: acesso e funcionalidades de usuário elocais:](https://github.com/FuturoDEV-Fitness/M3P-BackEnd-squad5/blob/feature-013/src/images/endPointsTop.jpg)

EndPoinst: obtenção de link do maps e dashborad:
![EndPoinst: obtenção de link do maps e dashborad:](https://github.com/FuturoDEV-Fitness/M3P-BackEnd-squad5/blob/feature-013/src/images/endPointsbase.jpg)

## 🛠️ Melhorias aplicáveis:




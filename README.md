# Report Dev nobeta, o que é?

Este é um projeto de um painel para medir a produtividade dos desenvolvedores, usando como base a coluna de tempo do Monday (monday.com), acessando via API para obter os dados e fazendo agrupamentos entre os tipos de atividades (previstos, imprevistos, recorrentes e outras específicas).

Feito para meu uso pessoal, para gerar relatórios mais rápido e a criação da apresentação mensal dos heads da nobeta. Foi desenvolvido pensando também na prática do uso do ReactJS.

# O que é legal neste projeto?

Este projeto usa algumas técnicas e tecnologias interessantes, há um uso de leitura de dados do serviço Monday via API e usando GraphQL. É um ótimo exemplo para utilização na vida real da API, o arquivo utilizado é **src/services/ProdutividadeService.js**;

Temos também um exemplo prático do uso do Core-UI, usando os componentes prontos do framework e outros componentes criados de forma personalizada para apresentar dados específico para nossa necessidade, usando ReactJS e SASS. Os componentes estão no diretório **views/dashboard**

Falando em ReactJS, há uma implementação do React Context para disponiblizar o *state* para todos os componentes. Os arquivos referentes são **src/services/AppContext.js** e **src/containers/TheLayout.js**

## Table of Contents

* [TODO](#todo)
* [Tecnologias](#tecnologias)
* [Instalação](#instalação)
* [O que está incluído](#o-que-está-incluído)
* [Criador](#criador)

## TODO

- [x] Preparar e fazer deploy teste projeto no GitHub
- [ ] Adicionar tela diária, com dados do dia anterior (para as dailys)
- [ ] Adicionar um indicador da tarefa atual + horas trabalhadas no dia
- [ ] Sincronizar os dados com banco de dados via API
- [ ] Adicionar um arquivo de configuração para dados sensiveis (base de url, token do monday)
- [ ] Ao recarregar a página fora da home "/dashboard" causa um erro de falta de dados, verificar se os dados existe, em caso negativo, ou manda para home ou tenta recarregar as informações
- [ ] Login e senha dinamico
- [ ] Campanhas, Feriados, hightlights e outros itens que pode ser dinamicos
- [ ] revisar e remover arquivos originais do Core-UI
- [ ] Refatorar todas as referencias de devcode


## Tecnologias

Tecnologias usadas no projeto

* GraphQL querys para acesso do Monday (monday.com)
* ReactJS
* Core-UI
* Charts.js
* API da nobeta

## Instalação

### Projeto

``` bash
# clone the repo
$ git clone https://github.com/webkoder/reportdev.git reportdev

# go into app's directory
$ cd reportdev

# install app's dependencies
$ yarn install

```

### Configuração

Criar o arquivo src/config.json e adicionar as constantes:
```
export const MONDAYAUTHTOKEN = "...";
export const MONDAYENDPOINT = "https://api.monday.com/v2/";
export const contact = 'user';
export const report = 'password';
export const TOKEN = 'cookietoken';
export const ADMENDPOINT = 'url da api';
```
Onde o *TOKEN* é apenas um valor aleatorio que será gravado nos cookies para lembrar do usuário. Já está planejado a retirada do usuario e senha no arquivo de configuração.
ADMENDPOINT é específico para o funcionamento junto aos dados da nobeta

### Uso Básico

``` bash
# dev server with hot reload at http://localhost:3000
$ yarn start
```

Navigate to [http://localhost:3000](http://localhost:3000). The app will automatically reload if you change any of the source files.

### Build

Run `build` to build the project. The build artifacts will be stored in the `build/` directory.

```bash
# build for production with minification
$ yarn build
```

## O que está incluído

Com o projeto baixado, a estrutura de pastas deve ser algo parecido com isso:

```
ReportDev
├── public/              #static files
│   └── index.html       #html template
│
├── src/                 #project root
│   ├── assets/          #assets - js icons object
│   ├── containers/      #container source - template layout
|   │   ├── _nav.js      #sidebar config
|   │   └── ...      
│   ├── reusable/        #arquivos de funções e componentes de suporte
│   ├── models/          #Classes a ser usado no projeto
│   ├── scss/            #user scss/css source
│   ├── services/        #classes e funções para conexão e processamento de dados
│   ├── views/           #views source
|   │   └── ...      
|   │   ├── dashboard    #diretório com os componentes usado no projeto
|   │   └── ...      
│   ├── App.js
│   ├── App.test.js
│   ├── campanhas.js     #lista estatica de campanhas
│   ├── constants.js     #lista de feriados, configuração de metas, códigos e acessos
│   ├── config.json      #arquivo de configuração
│   ├── polyfill.js
│   ├── instrucoes.js    #dados para a seção de Instruções de atividades
│   ├── hightlights.js   #dados para a seção de Highlights
│   ├── index.js
│   ├── projetos.js       #futura tela com o resumo dos projetos da nobeta
│   ├── routes.js         #routes config
│   └── store.js          #template state example 
│
└── package.json
```
## Criador

**Ricardo Rodrigues**
* <https://www.linkedin.com/in/ricardo-rodrigues-1b352855/>

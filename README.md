Angular Condomínio

Bem-vindo ao repositório do projeto angular_condominio! Este é um sistema para a gestão de condomínios, desenvolvido com Angular.

Descrição do Projeto

Este projeto tem como objetivo principal fornecer uma plataforma digital para a administração de condomínios.

Ele permite a gestão de diversas funcionalidades, como:

Cadastros dos imóveis do condomínio.

Gerenciamento de moradores por imóveis, que permite registrar telefone, e-mail, se é proprietário, data de entrada e saída em que o morador residia no imóvel.

Funcionalidades

Dashboard: Visão da listagem de imóveis cadastrados.

Gestão de Moradores: Cadastro, edição e exclusão de moradores e suas unidades.

Comunicados: Ferramenta para envio de e-mail ao morador ao cadastrar ou editar os dados do morador.

Autenticação e Autorização: Sistema de segurança utilizando JWT para garantir que apenas usuários autorizados possam acessar a aplicação.

Tecnologias Utilizadas

Frontend:

Angular

TypeScript

HTML5

CSS

Backend:

Comunica com API disponível no GitHub:

RESTful API em C# - ASP Net Core versão 8 - https://github.com/WaineAlvesCarneiro/AspNetCore_Condominio

Banco de Dados:
    
PostgreSQL

Pré-requisitos

Antes de começar, certifique-se de que você tem as seguintes ferramentas instaladas:

Node.js (versão 14 ou superior recomendada)

npm (geralmente incluído com o Node.js)

Angular CLI (npm install -g @angular/cli)

PostgreSQL instalado juntamente com pgAdmin 4 para criar database e tabelas no banco de dados

Ao instalar o PostgreSQL defina:

username=postgres

password=postgres

Em seguida execute os scripts disponíveis no projeto condomínio de Backend

https://github.com/WaineAlvesCarneiro/AspNetCore_Condominio/tree/master/AspNetCore_Condominio.Infrastructure/SQL_criar_tabelas_jason

Instalação e Execução

Siga os passos abaixo para configurar e executar o projeto localmente:

Clone o repositório:

Bash

git clone https://github.com/WaineAlvesCarneiro/angular_condominio.git

cd angular_condominio

Instale as dependências:

Bash

npm install

Configure o ambiente:

Execute a aplicação:

Bash

ng serve

A aplicação estará disponível em http://localhost:4200/.

Para testar no Swagger ou frontend em Angular use:

Usuário: admin

Senha: 12345

Construção para Produção

Para gerar uma versão de produção otimizada para implantação:

Bash

ng build --configuration=production

Os arquivos de build serão armazenados no diretório dist/.

Testes

Para executar primeiramente é preciso ter a API C# rodando localmente.

API disponível no GitHub:

RESTful API em C# - ASP Net Core versão 8 - https://github.com/WaineAlvesCarneiro/AspNetCore_Condominio

Bash

ng test

Desenvolvido por Waine Alves Carneiro


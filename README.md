Condomínio

Bem-vindo ao repositório do projeto angular_condominio! Este é um sistema para a gestão de condomínios.

Descrição do Projeto

Este projeto tem como objetivo principal fornecer uma plataforma digital para a administração de condomínios, incluindo.

Gerenciamento de Moradores e Unidades: Endpoints para o ciclo de vida completo de moradores e apartamentos.

Ao cadastrar ou editar os dados do morador a API envia um email para o morador.

Validações de campos e ao excluir um imóvel com morador vinculado o sistema exibe uma notificação.

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

ou

RESTful API em Java - JAVA Versão 21 com Spring Boot e utilizando Maven - https://github.com/WaineAlvesCarneiro/java_api_condominio

Banco de Dados:
    
PostgreSQL

Pré-requisitos

Antes de começar, certifique-se de que você tem as seguintes ferramentas instaladas:

Node.js (versão 14 ou superior recomendada)

npm (geralmente incluído com o Node.js)

PostgreSQL instalado juntamente com pgAdmin 4 para criar database e tabelas no banco de dados

Ao instalar o PostgreSQL defina:

username=postgres

password=postgres

Em seguida execute os scripts disponíveis no projeto condomínio de Backend

https://github.com/WaineAlvesCarneiro/PostgreSQL_sql_condominio

Instalação e Execução

Siga os passos abaixo para configurar e executar o projeto localmente:

Clone o repositório:

git clone https://github.com/WaineAlvesCarneiro/angular_condominio.git

cd angular_condominio

Instale as dependências:

npm install

Configure o ambiente:

Execute a aplicação:

ng serve

A aplicação estará disponível em http://localhost:4200/.

Para testar use:

Usuário: admin

Senha: 12345

Desenvolvido por Waine Alves Carneiro
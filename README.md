<h1 align="center">Projeto Next Level Week 6 (React JS)</h1>



<a href="https://github.com/DinowSauron/Projeto-Next-Level-Week-6-Together" title="letmeask" >
    <p align="center">
        <img 
        src="./letmeask/src/assets/images/logo.svg"
        width="50%"
        />
    </p>
</a>

<p align="center">
   <a href="#Como-Inicializar">Como Inicializar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
   <a href="#Comandos-Utilizados">Comandos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
   <a href="/LICENSE">Licença</a>
</p>

 O Projeto desta semana é o **Letmeask**!

 **Letmeask** é um aplicativo de perguntas e respostas, onde uma pessoa cria uma sala em tempo real e outras pessoas entram na sala e realizam suas perguntas para serem respondidas. Perfeito para gerencia de perguntas em massa durante eventos/live/shows/apresentações etc...


## Fotos Da Aplicação:

* Fotos em breve (fotos atuais apenas exemplos.)
<a href="https://github.com/DinowSauron/Projeto-Next-Level-Week-6-Together" target="_blank">
    <p style="display: flex; margin-top: 20px" >
        <img src="https://user-images.githubusercontent.com/68889180/117478123-23949680-af35-11eb-8cb1-aec7eec5e1b1.png" width="49%" alt="">
        <img src="https://user-images.githubusercontent.com/68889180/117478326-62c2e780-af35-11eb-903a-b1918ef62094.png" width="49%" alt="">
    </p>
    <p style="display: flex; margin-top: 20px">
        <img src="https://user-images.githubusercontent.com/68889180/117478424-7ff7b600-af35-11eb-98f0-9f7fb7a0b3f5.png" width="49%" alt="">
        <img src="https://user-images.githubusercontent.com/68889180/117478474-9271ef80-af35-11eb-8403-25d30f79b598.png" width="49%" alt="">
    </p>  
</a>


<hr>

## Tecnologias Utilizadas:

* React 
* Typescript
* HTML
* SASS
* Firebase 
    * Autenticação
    * Banco de dados em tempo real
* SPA: Single Page Application



## Como Inicializar:

* Primeiramente, utilize seu CMD com o [**Yarn**](https://yarnpkg.com/) instalado.
* Instale as dependencias com ``yarn install``.
* Crie uma conta na google e inicie um projeto no [**Firebase**](https://firebase.google.com/?hl=pt).
* No firebase, crie um aplicativo web, permitindo login pelo google e banco de dados em tempo real.
* Tenha certeza de criar as [regras](#Regras-do-Firebase) corretas no banco de dados para permitir leitura/gravação.
* Crie um arquivo chamado ``.env.local`` e coloque as informações do app do firebase nestas variaveis:
    ```
    REACT_APP_API_KEY="xxxxx-xxxx"
    REACT_APP_AUTH_DOMAIN="xxxxxxx.firebaseapp.com"
    REACT_APP_DATABASE_URL="https://xxxxxxx-default-rtdb.firebaseio.com"
    REACT_APP_PROJECT_ID="xxxxx"
    REACT_APP_STORAGE_BUCKET="xxxxxx.appspot.com"
    REACT_APP_MESSAGING_SENDER_ID="0000000"
    REACT_APP_APP_ID="0:0000000000000:web:0x00000000xx00x0"
    ```
* Utilize o comando ``yarn start`` para abrir o site.
* Faça Login com uma conta do google para continuar.




---

## Notas Pessoais:

<p>Neste nlw não tive muito tempo, pois ele conhecidiu com meus estudos para habilitação, porém não deixei de fazer o nlw.</p>
<p>Infelizmente, não tive muito tempo para colocar no projeto, então ele está bem padrão, sem muitas modificações, porém tive bastante aprendizado, principalmente com o firebase entrando nesta edição.</p>

### NOTES:
* www.api.github.com
* https://console.firebase.google.com/
    * https://firebase.google.com/pricing
* Spread operator JavaScript
* React router dom
* https://react-hot-toast.com

- Para o projeto ser iniciado é necessário uma conta no firebase, logo depois uma configuração de um app web e as informaçoes precisam ser repassadas por um arquivo ``.env.local``  
- Cláro, não é um projeto final, ainda faltam muitas coisas, como log-out, verificar se o usuario deseja ter seu login lembrado, etc...

---

## Comandos Utilizados:
OBS: note que não é um tutorial de como executar a aplicação, isto são os comandos anotados, claro que com eles você pode saber como executar a aplicação, basta ler oque cada comando executa.

<br>


* ``yarn create react-app letmeask --template typescript``
* ``cd letmeask``
* ``yarn add firebase``
* ``yarn start``
* ``yarn add node-sass@^5.0.0`` - *versão 6 não suportada*
* ``yarn add react-router-dom``
* ``yarn add @types/react-router-dom -D``

## Regras do Firebase:

```json
{
  "rules": {
    "rooms": {
      ".read": false,
      ".write": "auth != null",
      "$roomId": {
        ".read": true,
        ".write": "auth != null && (!data.exists() || data.child('authorId').val() == auth.id)",
        "questions": {
          ".read": true,
          ".write": "auth != null && (!data.exists() || data.parent().child('authorId').val() == auth.id)",
          "likes": {
            ".read": true,
            ".write": "auth != null && (!data.exists() || data.child('authorId').val() == auth.id)",
          }
        }
      }
    }
  }
}
```

## Licença:
Note que este projeto está sob a licensa MIT. Veja o arquivo para mais detalhes: <a href="/LICENSE">LICENSE</a>

Aula 03 - 6:00 
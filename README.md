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
   <a href="#Resolvendo-o-problema-de-segurança">Adicionando Verificação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
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
<p>Bastante coisa precisou de alterações, principalkmente por erros comuns de formatação e alinhamentos, além de faltar ainda muita coisa a ser feita, já consegui resolver a maioria delas</p>

Sei que é apenas um evento, nada de criar algo real, porém basta qualquer um ter a url de admin e ter uma conta logada(qualquer conta) pra se tornar um admin, qualquer um pode excluir qualquer pergunta, Não possuí nenhuma verificação antes de deletar a pergunta, porem possui verificação para dar like? mds...

Este é o trecho da parte de deletar a sala, nota alguma coisa faltando? alguma falta de verificação do ID do usuario que criou a sala por exemplo... (o de deletar pergutna tá igual)
```tsx
async function handleDeleteQuestion(questionId: string) {
        if (window.confirm("Tem ceteza que deseja excluir esta pergunta?")) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }
```
* Para saber como Resolver o problema cronico de segurança [Clique Aqui](/Resolvendo-o-problema-de-segurança)

<br>
<p>Esta nlw não foi diferente, sempre com seus "erros" que até eu poderia resolver (e resolvo alguns)</p>

### NOTES:
* www.api.github.com
* https://console.firebase.google.com/
    * https://firebase.google.com/pricing
* Spread operator JavaScript
* React router dom
* https://react-hot-toast.com
* Database Serverless:
    * AWS DynamoDB (NoQSL)
    * FunaDB
    * Supabase (Alternativo do Firebase)
* React: algoritimo de reconciliação.
* React Modal.

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

## Resolvendo o problema de segurança:

Como se sabe, o projeto possuí um problema grave de segurança, (bem pelo menos eu sei, já o diego, o realizador do evento não deve saber...)

OBS: continue caso você fez o evento e não solucionou o problema, pois no meu repositório eu jamáis daria upload com uma falha dessas, ou seja, se você deu clone, já possuí a versão onde o problema foi solucionado.

---

observe que no projeto original não há nenhum tipo de verificação se é o propietario da sala antes de deletar uma questo ou encerrar a sala.
```tsx
async function handleDeleteQuestion(questionId: string) {
        if (window.confirm("Tem ceteza que deseja excluir esta pergunta?")) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }
```

Para resolver isso é facíl, basta verificar se o Id do usuário logado é o mesmo do usuário que criou a sala... 


Então para resolver isto, crie uma variavel no useRoom.tsx:
``const [authorId, setAuthorId] = useState("");``

Certifique de colocar o authorId no return do ``parsedQuestions`` e setar o seu estado:
```tsx
roomRef.on("value", room => {
  const databaseRoom = room.val();
  const firebaseQuestions: FirebaseQuestions = databaseRoom.questions  ?? {};

  const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
      return {
          id: key,
          content: value.content,
          author: value.author,
          authorId: value.authorId, // <-
          isHighLighted: value.isHighLighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
      }
  });

  setAuthorId(databaseRoom.authorId); // <-
  setTitle(databaseRoom.title);
  setQuestions(parsedQuestions);
})
```

E também adicione na sua tipagem:
```tsx
type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    authorId: string; // <-
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
    likes: Record<string, {
        authorId: string;
    }>;
}>;
```

Logo depois, exporte o authorId do useRoom:

``return {questions, title, authorId};``


Agora, no adminRoom é possível saber o id da conta que criou a sala, assim podendo ser possível uma verificação antes da remoção no banco de dados!

Certifique-se de importar o authorId no adminRoom:

``const { title, questions, authorId } = useRoom(roomId);``

Agora ao colocar-mos ``console.log(authorId === user?.id);`` podemos ver no console se você é o dono da sala!

porém não basta isso, temos que colocar na condição de deletar pergunta e sala...

Basta usar uma condição simples ``if( user?.id === authorId){}`` pronto! o que estiver ai dentro será executado se o seu Id for o mesmo ID do criador da sala, ou seja, se você for o dono da sala!

No codigo:

```tsx
 async function handleDeleteQuestion(questionId: string) {

        if( user?.id === authorId){ // <-
            if (window.confirm("Tem ceteza que deseja excluir esta pergunta?")) {
                await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
            }
        } else {
            alert("Você precisa ser o dono da sala para excluir perguntas!");
        }
    }

    async function handleEndRoom() {

        if( user?.id === authorId){ // <-
            if (window.confirm("Tem ceteza que deseja encerrar a sessão?")) {
                database.ref(`rooms/${roomId}`).update({
                    endedAt: new Date(),
                })
    
                history.push("/");
            }
        } else {
            alert("Você precisa ser o dono da sala para encerra-la!");
        }
    }
```
Agora, observe logar com outra conta e entrar no mesmo endereço Http do admin e tentar fazer alterações de administrador!
<p style="display: flex; margin-top: 20px">
  <img src="./pictures/acesso-negado.png" width="49%" alt="">
  <img src="./pictures/acesso-negado-2.png" width="49%" alt="">
</p>  

### Conclusão:

Não sei o porque não foi abordado algo tão simples de ser feito, e tão necessáro, diz o diego (executor do projeto) que as regras do banco de dados impede esse tipo de comportamento, mais só na teoria, pois ele nem ousou a testar para ver que não funciona...

Cláro que algo mais complexo pode ser feito, possívelmente poderiamos não deixar que o usuário entra-se na pagina e já redireciona ele pra pagina inicial ao ele tentar entrar como admin em uma sala que não seja sua...

OBS: Estou na aula 4 de 5, o projeto ainda não está finalizado, porém ele não disse deste erro e nem disse que necessitaria de uma solução, pelo contrario, ele disse que se tenta-se não daria certo, porém da certo sim.

---





## Licença:
Note que este projeto está sob a licensa MIT. Veja o arquivo para mais detalhes: <a href="/LICENSE">LICENSE</a>


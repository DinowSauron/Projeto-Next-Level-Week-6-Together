import firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

// Crie sua conta no firebase, e adicione o autenticador, logo em seguida em visão geral do projeto, adicione um novo Web app, e então coloque as informações em um arquivo chamado ".env.local", se estiver usando o create react app utilize o REACT_APP_ antes das variaveis!

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain:  process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL:  process.env.REACT_APP_DATABASE_URL,
    projectId:  process.env.REACT_APP_PROJECT_ID,
    storageBucket:  process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId:  process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId:  process.env.REACT_APP_APP_ID
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();
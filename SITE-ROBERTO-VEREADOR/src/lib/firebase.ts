import { initializeApp } from "firebase/app";

// Configuração do Firebase extraída do console do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCILc0J12DK4njJ8JCyxd2ljeynWuG9zs0",
  authDomain: "site-robertinho-87742.firebaseapp.com",
  projectId: "site-robertinho-87742",
  storageBucket: "site-robertinho-87742.firebasestorage.app",
  messagingSenderId: "843889664495",
  appId: "1:843889664495:web:8a23935545525196fe961a",
};

// Inicializar Firebase
export const app = initializeApp(firebaseConfig);

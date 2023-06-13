import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth } from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyCeVffRxXj0UtgBtb-4xFvwWEUOblntnBU",
  authDomain: "steklolux-try-one.firebaseapp.com",
  projectId: "steklolux-try-one",
  storageBucket: "steklolux-try-one.appspot.com",
  messagingSenderId: "373493876158",
  appId: "1:373493876158:web:4a68f2e9b573b74a19a5ef",
  measurementId: "G-H2SLGXC48Z"
};

// Initialize Firestore & auth
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Getting clients list form clients collection
export default async function getClients(db) {
    const clientsCol = collection(db, 'clients');
    const clientsSnapshot = await getDocs(clientsCol);
    const clientsList = clientsSnapshot.docs.map(doc => doc.data());
    return clientsList
  };

export async function getOrders(db) {
    const ordersCol = collection(db, 'orders');
    const ordersSnapshot = await getDocs(ordersCol);
    const ordersList = ordersSnapshot.docs.map(doc => doc.data());
    return ordersList
  };

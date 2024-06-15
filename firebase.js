import {
  collection,
  doc,
  addDoc,
  where,
  query,
  getDocs,
  getDoc,
  orderBy,
  onSnapshot,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

export const createConversation = async (participants) => {
  const user1Doc = await getDoc(doc(db, "users", participants[0]));
  const user2Doc = await getDoc(doc(db, "users", participants[1]));
  const conversationRef = await addDoc(collection(db, "conversations"), {
    participants,
    participantsInfo: [
      {
        id: participants[0],
        name: user1Doc.data().firstName,
      },
      {
        id: participants[1],
        name: user2Doc.data().firstName,
      },
    ],
    lastMessage: null,
  });

  return conversationRef.id;
};

export const addMessage = async (userId, userName, conversationId, message) => {
  const { text } = message;

  await addDoc(collection(db, "messages"), {
    conversationId,
    text,
    user: {
      _id: userId,
      name: userName,
    },
    createdAt: serverTimestamp(),
  });

  const conversationRef = doc(db, "conversations", conversationId);
  await updateDoc(conversationRef, { lastMessage: message });
};

export const getConversations = async (userId) => {
  const conversationQuery = query(
    collection(db, "conversations"),
    where("participants", "array-contains", userId)
  );

  const snapshot = await getDocs(conversationQuery);
  const conversations = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return conversations;
};

export const getMessages = async (conversationId) => {
  const messagesQuery = query(
    collection(db, "messages"),
    where("conversationId", "==", conversationId),
    orderBy("createdAt", "desc")
  );
  const messagesSnapshot = await getDocs(messagesQuery);

  const messages = messagesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return messages;
};

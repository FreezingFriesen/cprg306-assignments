import { db } from "../../utils/firebase";
import { collection, getDocs, addDoc, query, doc, deleteDoc } from "firebase/firestore";

export async function getItems(userId) {
  if (!userId) return [];

  try {
    // reference the subcollection for this user's items
    const itemsRef = collection(db, "users", userId, "items");

    // fetch all documents in that collection
    const snapshot = await getDocs(itemsRef);

    // map documents to an array of item objects
    const items = [];
    snapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });

    return items;
  } 
  
  // Handle errors
  catch (err) {
    console.error("Failed to get items for user", userId, err);
    return [];
  }
}

// Function to add a new item to the user's shopping list
export async function addItem(userId, item) {
  if (!userId || !item) return null;

  try {
    // reference the subcollection for this user's items
    const itemsRef = collection(db, "users", userId, "items");

    // add the new item document to the collection
    const docRef = await addDoc(itemsRef, item);

    // return the ID of the new document
    return docRef.id;
  } 

  // Handle errors
  catch (err) {
    console.error("Failed to add item for user", userId, err);
    return null;
  }
}


// Delete an item document in users/{userId}/items/{itemId}
export async function deleteItem(userId, itemId) {
  // Validate inputs
  if (!userId || !itemId) return false;
  try {

    // reference the document to delete
    const docRef = doc(db, "users", userId, "items", itemId);
    // delete the document
    await deleteDoc(docRef);
    // return success
    return true;
  } 
  
  // Handle errors
  catch (err) {
    console.error("Failed to delete item", userId, itemId, err);
    return false;
  }
}
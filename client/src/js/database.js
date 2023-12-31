import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // connect to the database
  const db = await openDB('jate', 1);
  // create new transaction and specify database with privelages
  const tx = db.transaction('jate', 'readwrite');
  // open the desired object store
  const store = tx.objectStore('jate');
  // add the content to the object store
  const request = store.put({ content });
  const result = await request;
  console.log('🚀 - data added to the database', result);
  return result;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from database');
  // connect to the database
  const db = await openDB('jate', 1);
  // create new transaction and specify database with privelages
  const tx = db.transaction('jate', 'readonly');
  // open the desired object store
  const store = tx.objectStore('jate');
  // get all the content from the object store
  const request = store.get(1);
  const result = await request;
  console.log('🚀 - data retrieved from the database', result);
  return result?.value;
};

initdb();

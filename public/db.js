const dbRequest = indexedDB.open("transactions_db", 1);

dbRequest.onsuccess = event => {
    console.log("Successfully opened connection to IndexedDB")
};

dbRequest.onerror = event => {
    console.log("Error opening connecttion to IndexedDB")

}
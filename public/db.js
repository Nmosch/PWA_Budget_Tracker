const dbRequest = indexedDB.open("transactions_db", 1);

dbRequest.onupgradeneeded = event => {
    const db = event.target.result;
    console.log(`Initializing db...`);
    db.createObjectStore("transactions", { autoIncrement: true });
};

dbRequest.onsuccess = event => {
    const db = event.target.result;
    console.log(`Successfully opened connection to ${db.name}`);
};

dbRequest.onerror = event => {
    console.log(`Error opening connecttion to IndexedDB: ${event.target.error}`);
};
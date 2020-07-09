const dbRequest = indexedDB.open("transactions_db", 1);

let db;

dbRequest.onupgradeneeded = event => {
    db = event.target.result;
    console.log(`Initializing db...`);
    db.createObjectStore("transactions", { autoIncrement: true });
};

dbRequest.onsuccess = event => {
    db = event.target.result;
    console.log(`Successfully opened connection to ${db.name}`);
    if(navigator.onLine){
        getData(db);
    }
};

dbRequest.onerror = event => {
    console.log(`Error opening connecttion to IndexedDB: ${event.target.error}`);
};

const addData = (record) => {
    // takes to arguemnts; Array and type of access
    const transaction = db.transaction(["transactions"], "readwrite");
    const store = transaction.objectStore("transactions");
    store.add(record);
};

const getData = () => {
    const transaction = db.transaction(["transactions"], "readwrite")
    const store = transaction.objectStore("transactions");
    const getAll = store.getAll();
  
    getAll.onsuccess = () => {
        if (getAll.result.length > 0) {
            console.log(getAll.result);
            fetch(`/api/transaction/bulk`, {
                method: "POST",
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                  }
            })
                .then(response => response.json())
                .then(() => {
                    const transactionStore = db
                    .transaction(["transactions"], "readwrite")
                    .objectStore("transactions");
                transactionStore.clear();
            })
        }
    }
};

window.addEventListener("online", getData);
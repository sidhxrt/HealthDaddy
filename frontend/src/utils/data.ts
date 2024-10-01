import { useState } from "react";

const VERSION = 1;

export interface PersonalInfo {
  name: string;
  info: any;
}

export enum DBs {
  notes = "UserInfoDB",
}

export enum Stores {
  notes = "UserInfo",
}

export interface NotesDbType {
  (): {
    storeTxnStatus: boolean;
    fetchInfo: () => Promise<PersonalInfo>;
    storeInfo: (data: PersonalInfo) => Promise<boolean>;
    deleteInfo: (name: string) => Promise<boolean>;
    editInfo: (note: PersonalInfo) => Promise<PersonalInfo>;
  };
}

const useInfoDb: NotesDbType = () => {
  const [storeTxnStatus, setStoreTxnStatus] = useState(false);
  const [fetchStatus, setFetchStatus] = useState(false);

  const fetchInfo = (): Promise<PersonalInfo> => {
    return new Promise((resolve, reject) => {
      if (storeTxnStatus) reject("Txn already in progress");
      setFetchStatus(true);
      initDb().then((db) => {
        const tx = db.transaction(Stores.notes);

        const res = tx.objectStore(Stores.notes).getAll();
        res.onsuccess = () => {
          console.log("fetch txn success");
          setStoreTxnStatus(false);
          resolve(res.result[0]);
        };
        res.onerror = (event) => {
          setFetchStatus(false);
          reject("Transaction error:" + res.error);
        };
      });
    });
  };

  const fetchNote = (id: string): Promise<PersonalInfo[]> => {
    return new Promise((resolve, reject) => {
      if (storeTxnStatus) reject("Txn already in progress");
      setFetchStatus(true);
      initDb().then((db) => {
        const tx = db.transaction(Stores.notes);

        const res = tx.objectStore(Stores.notes).get(id);
        res.onsuccess = () => {
          console.log("fetch txn success");
          setStoreTxnStatus(false);
          resolve(res.result);
        };
        res.onerror = (event) => {
          setFetchStatus(false);
          reject("Transaction error:" + res.error);
        };
      });
    });
  };

  const storeInfo = (data: PersonalInfo): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (storeTxnStatus) reject("Txn already in progress");
      setStoreTxnStatus(true);
      initDb().then((db) => {
        const tx = db.transaction(Stores.notes, "readwrite");
        const res = tx.objectStore(Stores.notes).add(data);
        res.onsuccess = () => {
          setStoreTxnStatus(false);
          resolve(true);
        };
        res.onerror = () => {
          setStoreTxnStatus(false);
          if (res.error?.name == "ConstraintError")
            console.log("File already exists, please use a valid path");
          reject("Transaction error:" + res.error);
        };
      });
    });
  };

  const deleteInfo = (name: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (storeTxnStatus) reject("Txn already in progress");
      setStoreTxnStatus(true);
      initDb().then((db) => {
        const tx = db.transaction(Stores.notes, "readwrite");
        const res = tx.objectStore(Stores.notes).delete(name);
        res.onsuccess = () => {
          setStoreTxnStatus(false);
          resolve(true);
        };
        res.onerror = () => {
          setStoreTxnStatus(false);
          reject("Transaction error:" + res.error);
        };
      });
    });
  };

  const editInfo = (
    data: Omit<PersonalInfo, "name">
  ): Promise<PersonalInfo> => {
    return new Promise((resolve, reject) => {
      if (storeTxnStatus) reject("Txn already in progress");
      setStoreTxnStatus(true);
      initDb().then((db) => {
        const tx = db.transaction(Stores.notes, "readwrite");
        const store = tx.objectStore(Stores.notes);
        const get = store.getAll();
        get.onsuccess = () => {
          if (!get.result) {
            setStoreTxnStatus(false);
            reject("No data");
          }
          const res = store.put({ ...data, name: get.result[0].name });
          res.onsuccess = () => {
            setStoreTxnStatus(false);
            resolve({ ...data, name: get.result[0].name });
          };
          res.onerror = () => {
            setStoreTxnStatus(false);
            reject("Transaction error:" + res.error);
          };
        };
        get.onerror = () => {
          setStoreTxnStatus(false);
          reject("Transaction error:" + get.error);
        };
      });
    });
  };
  return { storeTxnStatus, fetchInfo, storeInfo, deleteInfo, editInfo };
};

const initDb = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    // open the connection
    const request = indexedDB.open(DBs.notes, VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      // if the data object store doesn't exist, create it
      if (!db.objectStoreNames.contains(Stores.notes)) {
        console.log("Creating notes store");
        const notesStore = db.createObjectStore(Stores.notes, {
          keyPath: "name",
        });
      }
    };

    request.onsuccess = () => {
      const db = request.result;
      console.log("initDB success", VERSION);
      resolve(db);
    };

    request.onerror = (event) => {
      console.error("Database error: ", event);
      reject(false);
    };
  });
};

export default useInfoDb;

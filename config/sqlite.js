import SQLite from 'react-native-sqlite-storage';

// Initialize SQLite
const db = SQLite.openDatabase(
  { name: 'yourdatabase.db', location: 'default' },
  () => { },
  error => {
    console.error('Error opening database', error);
  }
);

// Function to create tables if they don't exist
export const createTables = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS trips (id INTEGER PRIMARY KEY AUTOINCREMENT, place TEXT, country TEXT);'
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS expenses (id INTEGER PRIMARY KEY AUTOINCREMENT, amount REAL, description TEXT, category TEXT,  tripId INTEGER, FOREIGN KEY (tripId) REFERENCES trips(id));'
    );
    console.log("Tables Created");
  });
};

// Function to add a trip
const addTrip = (place, country) => {
  db.transaction(tx => {
    // Corrected SQL statement with two placeholders for place and country
    tx.executeSql('INSERT INTO trips (place, country) VALUES (?, ?)', [place, country], (_, results) => {
      console.log('Added trip with ID:', results.insertId);
    }, (_, error) => {
      console.error('Error adding trip:', error);
    });
  });
};

// Function to get all trips
const getAllTrips = callback => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM trips', [], (_, { rows }) => {
      const data = [];
      for (let i = 0; i < rows.length; i++) {
        data.push(rows.item(i));
      }
      callback(data);
    });
  });
};

// Function to add an expense
const addExpense = (amount, category, description, tripId) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        const sqlQuery = 'INSERT INTO expenses (amount, description, category, tripId) VALUES (?, ?, ?, ?)';
        const values = [amount, description, category, tripId];

        tx.executeSql(
          sqlQuery,
          values,
          (_, { insertId, rowsAffected }) => {
            if (rowsAffected > 0) {
              console.log(`Expense added with ID: ${insertId}`);
              resolve(insertId);
            } else {
              reject(new Error('Failed to add expense. No rows affected.'));
            }
          },
          (_, error) => {
            console.error('Error executing SQL query:', error);
            console.log('SQL Query:', sqlQuery);
            console.log('Values:', values);
            reject(error);
          }
        );
      },
      error => {
        console.error('Transaction error:', error);
      },
      () => {
        console.log('Transaction complete.');
      }
    );
  });
};


const getExpensesForTrip = (tripId) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM expenses WHERE tripId = ?', [tripId], (_, { rows }) => {
        const data = [];
        for (let i = 0; i < rows.length; i++) {
          data.push(rows.item(i));
        }
        resolve(data);
      }, (_, error) => {
        console.error('Error executing SQL query:', error);
        reject(error);
      });
    });
  });
};

// Function to erase all data from tables
const eraseAllData = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        // Delete all records from the trips table
        tx.executeSql('DELETE FROM trips', [], (_, results) => {
          console.log('Deleted all trips. Rows affected:', results.rowsAffected);
        }, (_, error) => {
          console.error('Error deleting trips:', error);
          reject(error);
        });

        // Delete all records from the expenses table
        tx.executeSql('DELETE FROM expenses', [], (_, results) => {
          console.log('Deleted all expenses. Rows affected:', results.rowsAffected);
        }, (_, error) => {
          console.error('Error deleting expenses:', error);
          reject(error);
        });
      },
      error => {
        console.error('Transaction error:', error);
      },
      () => {
        console.log('Erase all data transaction complete.');
        resolve();
      }
    );
  });
};

export { addTrip, getAllTrips, addExpense, getExpensesForTrip, eraseAllData };
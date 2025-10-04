// db.js
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

// MongoDB connection URL with authentication options
let url = `${process.env.MONGO_URL}`;

let dbInstance = null;
const dbName = "giftdb";

async function connectToDatabase() {
    if (dbInstance){
        return dbInstance
    };

    const client = new MongoClient(url);      

    // Task 1: Connect to MongoDB
    // {{insert code}}

    try {
        // connect the client (this establishes connection pool)
        await client.connect();

        // Task 2: Connect to database giftdb and store in variable dbInstance
        const db = client.db(dbName);
        dbInstance = db;

        // Optionally attach the client to the dbInstance so callers can close it if needed
        dbInstance.client = client;

        // Task 3: Return database instance
        return dbInstance;
    } catch (err) {
        // ensure client is closed on error
        try { await client.close(); } catch (e) { /* ignore */ }
        throw err;
    }
}

module.exports = connectToDatabase;

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const dbOps = require("./operations");

const url = "mongodb://localhost:27017";
const dbname = "conFusion";

MongoClient.connect(url, (err, client) => {
    assert.equal(err, null);

    console.log("Connected correctly to server");

    const db = client.db(dbname);

    dbOps.insertDocument(db, {name: "Vadonut", description: "test"}, "dishes", (result) => {
        console.log("Insert Document:\n", result);

        dbOps.findDocuments(db, "dishes", (docs) => {
            console.log("Found Documents:\n", docs);

            dbOps.updateDocument(db, {name: "Vadonut"}, {description: "Updated Test"}, "dishes", (result) => {
                console.log("Updated Document:\n", result.result);

                dbOps.findDocuments(db, "dishes", (docs) => {
                    console.log("Found Documents:\n", docs);

                    db.dropCollection("dishes", (result) => {
                        console.log("Dropped Collection:\n", result);
                        client.close();
                    });
                });
            });
        })
    });
});
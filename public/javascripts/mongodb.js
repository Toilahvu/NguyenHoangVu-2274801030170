const MongoClient = require("mongodb").MongoClient;
const mongodbUrl = 'mongodb://localhost:27017';
const dbName = 'mydatabase';
const collectionName = 'clothes';
let dbCollection;
let client;

// connect to MongoDB
async function connectToMongoDB(){
    try{
        client = await MongoClient.connect(mongodbUrl);
        dbCollection = client.db(dbName).collection(collectionName);
    }catch(err){
        throw err;
    }
}
// close Mongodb 
async function disconnectToMongoDB(){
    if(client)
        await client.close()
            .then(() => {
                console.log("Disconnected from MongoDB");
                process.exit(0);  
            })
            .catch(error => {
                console.log("Failed to close MongoDB", error);
                process.exit(1); // exit with error
            });
    else process.exit(0);
}

async function createClothes(clothes){
    try{
        return await dbCollection.insertMany(clothes);
    }catch(err){
        throw err;
    }
}

async function findClothes(clothes){
    try{
        return await dbCollection.find(clothes).toArray();
    }catch(err){
        throw err;
    }
}
module.exports = {
    connectToMongoDB,
    disconnectToMongoDB,
    createClothes,
    findClothes
}
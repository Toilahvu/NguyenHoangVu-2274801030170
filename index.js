const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const mongoDBModule = require('./public/javascripts/mongodb.js');
const htmlClothesModule = require('./public/javascripts/clothes.js'); 

const bodyPasrser = require('body-parser');
app.use(bodyPasrser.urlencoded({extended: false}));
app.use(bodyPasrser.json());
app.use(express.static(path.join(__dirname, 'public')));

const sever = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// connect to mongodb server
mongoDBModule.connectToMongoDB()
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
        sever.close();
    });

// listen on shutdown sever event
process.on('SIGINT', () => {
    mongoDBModule.disconnectToMongoDB();
})

//home page 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/pages/home.html'))
})

//create clothes
app.post('/create', (req, res) => {
    try {
        const clothes = req.body;
        console.log(clothes);
        // them nhieu den mongodb
        mongoDBModule.createClothes(clothes)
        const content = `${clothes.length} clothes create successfully`
        res.json({message: content}); // response to fetch()
    } catch (err) {
        console.error('failed to create clothes', err);
        res.status(500).send('failed to create clothes');
    }
})

// find clothes
app.get('/read', async(req, res) => {
    try{    
        const name = req.query.name
        const brand = req.query.brand
        const lowPrice = req.query.lowPrice
        const highPrice = req.query.highPrice

        console.log(name,brand,lowPrice, highPrice)
        const query= {}

        if(name)
            query.name = {$regex: name, $options: 'i'}
        if(brand)
            query.brand = brand
        if(lowPrice && highPrice)
            query.price = {$gte: parseInt(lowPrice), $lte: parseInt(highPrice)}
        else if(lowPrice && !highPrice)
            query.price = { $gte: parseInt(lowPrice)}
        else if(!lowPrice && highPrice)
            query.price = { $lte: parseInt(highPrice)}
        
        const clothes = await mongoDBModule.findClothes(query)
        
        const htmlTable = await htmlClothesModule.createTableHtml(clothes)
        
        res.send(htmlTable)
    }
    catch (err) {
        console.error('failed to find clothes', err);
        res.status(500).send('failed to find clothes');
    }
})

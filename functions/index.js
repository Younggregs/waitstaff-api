const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const app = express()

app.use(cors())

const { createCampaign, updateCampaign, listCampaign, deleteCampaign } = require('./controllers/campaign/index')

//campaign Routes
app.post('/create_campaign', createCampaign);
app.post('/update_campaign/:id', updateCampaign);
app.get('/list_campaign', listCampaign);
app.get('/delete_campaign/:id', deleteCampaign);

exports.api = functions.https.onRequest(app);


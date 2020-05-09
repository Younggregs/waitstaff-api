const config = require("../../util/config");
const firebase = require("firebase");
require("firebase/firestore");
firebase.initializeApp(config);
const { addCampaign }= require('./createCampaign');
const { update } = require('./updateCampaign')
const { getCampaignList } = require('./listCampaign')
const { _deleteCampaign } = require('./deleteCampaign')

const db = firebase.firestore();

const createCampaign = (req, res) => addCampaign(req, res, db );
const updateCampaign = (req, res) => update(req, res, db);
const listCampaign = (req, res) => getCampaignList(req, res, db);
const deleteCampaign = (req, res) => _deleteCampaign(req, res, db);

module.exports = {
    createCampaign,
    updateCampaign,
    listCampaign,
    deleteCampaign
}






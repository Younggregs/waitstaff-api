const { BAD_REQUEST, OK, INTERNAL_SERVER_ERROR } = require('http-status-codes');
const { message, status } = require('../../util/constants');

const { error, success } = status;
const { somethingWentWrong } = message;

const mapCampaigns = async (res, campaigns) => {
    const campaign = [];
    campaigns.forEach(doc => {
        campaign.push({
            id: doc.id,
            ...doc.data(),
        });
    });
    return res.status(OK).json({ data: campaign, status: success });
};

const getCampaign = async (res, db) => {
    const campaigns = await db
        .collection('campaigns')
        .orderBy('createdAt', 'desc')
        .get();
    if (!campaigns) {
        return res
            .status(BAD_REQUEST)
            .json({ message: somethingWentWrong, status: error });
    }
    return mapCampaigns(res, campaigns);
};

const getCampaignList = async (req, res, db) => {
    try {
        return getCampaign(res, db);
    } catch (err) {
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json({ message: somethingWentWrong, status: error });
    }
};

module.exports = {
    getCampaignList,
};

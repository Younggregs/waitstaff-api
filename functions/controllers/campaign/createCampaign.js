const { INTERNAL_SERVER_ERROR, CREATED } = require('http-status-codes');
const { status, message } = require('../../util/constants');

const { error, success } = status;
const { somethingWentWrong } = message;

const createCampaign = async (req, res, db) => {
    const { discountType, campaignName, itemCategories, minItemCount, discountPrice, numOfDays, totalRedemptions, validTill, isCategoryMenuOpen } = req.body;
    
    const newCampaign = {
        discountType,
        campaignName,
        itemCategories,
        minItemCount,
        discountPrice,
        numOfDays,
        totalRedemptions,
        validTill,
        isCategoryMenuOpen,
        createdAt: new Date().toISOString(),
    };
    await db.collection('campaigns').add(newCampaign);
    return res.status(CREATED).json({ data: newCampaign, status: success });
};

const errorsReturn = res => {
    res.status(INTERNAL_SERVER_ERROR).json({
        message: somethingWentWrong,
        status: error,
    });
};
const addCampaign = async (req, res, db) => {
    // ensure unique data
    try {
        return createCampaign(req, res, db);
    } catch (err) {
        return errorsReturn(res, err);
    }
};



module.exports = {
    addCampaign,
};

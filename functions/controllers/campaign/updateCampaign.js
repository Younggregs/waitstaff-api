const { OK, INTERNAL_SERVER_ERROR } = require('http-status-codes');
const _ = require('lodash');
const { message, status } = require('../../util/constants');

const { error, success } = status;
const { somethingWentWrong, updateSuccessful } = message;

const setData = async (req, res, db) => {
    await db
        .collection('campaigns')
        .doc(req.params.id)
        .set(
            _.pick(req.body, [
                'campaignName',
                'category',
                'minimumItemCount',
                'discountPrice',
                'numberOfDays',
            ]),
            { merge: true },
        );
    res.status(OK).json({
        message: updateSuccessful,
        status: success,
    });
};

const update = async (req, res, db) => {
    try {
        const campaign = await db.doc(`/campaigns/${req.params.id}`).get();
        if (!campaign.data()) {
            throw error;
        }
        return setData(req, res, db);
    } catch (err) {
        return res.status(INTERNAL_SERVER_ERROR).json({
            message: somethingWentWrong,
            status: error,
        });
    }
};

module.exports = {
    update,
};

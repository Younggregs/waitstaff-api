const { BAD_REQUEST, OK, INTERNAL_SERVER_ERROR } = require('http-status-codes');
const { message, status } = require('../../util/constants');

const { error, success } = status;
const { commentNotLiked, somethingWentWrong, commentNotFound } = message;


const deleteAction = async (req, res, db) => {
    await db.doc(`/campaigns/${req.params.id}`).delete();

    return res.status(OK).json({ status: success });
};


const _deleteCampaign = async (req, res, db) => {
    try {
        return deleteAction(req, res, db);
    } catch (err) {
        return res
            .status(INTERNAL_SERVER_ERROR)
            .json({ message: somethingWentWrong, status: error });
    }
};

module.exports = {
  _deleteCampaign,
};

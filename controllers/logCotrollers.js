var models = require('../models/sequelize');
module.exports = {
    async addToLog(req, res) {
        try {
            if (!req.body.bookId || !req.body.userId)
                return res.status(400).send("Message:bookId and UserId cannot be null");
            var result = await models.LLog.create({ ...req.body })
            var result1 = await models.User.update({ bookId: req.body.bookId }, { where: { id: req.body.userId } });
            console.log(result1);
            res.json(result);
        } catch (err) {
            console.log(err)
            if (err.name === "SequelizeValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`)
        }
    },

    async deleteLog(req, res) {
        try {
            if (!req.params.logId)
                return res.status(400).send("Message:Please enter logId to be deleted")
            await models.LLog.destroy({ where: { id: req.params.logId } })
            res.json({ message: "log deleted" })
        } catch (err) {
            console.log(err)
            if (err.name === "SequelizeValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`)
        }
    },
    async updateLog(req, res) {
        try {
            if (!req.params.logId)
                return res.status(400).send("Message:Please enter logId to be updated.");
            await models.LLog.update({ returnStatus: req.body.returnStatus }, { where: { id: req.params.logId } })
            res.json({ message: "log updated" })
        } catch (err) {
            console.log(err)
            if (err.name === "SequelizeValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`)
        }
    },
    async alllogs(req, res) {
        try {
            var results = await models.LLog.findAll();
            res.json(results);

        } catch (err) {
            console.log(err)
            if (err.name === "SequelizeValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`)
        }
    },
    async specificLog(req, res) {
        try {
            if (!req.params.logId)
                return res.status(400).send("Message:Please enter logId to be fetched.");
            var result = await models.LLog.findOne({ where: { id: req.params.logId } });
            res.json(result);
        } catch (err) {
            console.log(err)
            if (err.name === "SequelizeValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`)
        }
    }
}


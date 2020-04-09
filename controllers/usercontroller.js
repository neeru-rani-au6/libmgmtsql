var models = require('../models/sequelize');
module.exports = {
    async createUser(req, res) {
        try {
            if(!req.body.name||!req.body.email||!req.body.address||!req.body.phoneno)
              {
              return res.send("Message:user details field cannot be empty");
              }
            const foundUser=await models.User.findOne({where:{email:req.body.email}});
            if(foundUser)
                   return res.send("message:User already exist");
            var result = await models.User.create({ ...req.body })
            res.json(result);
        } catch (err) {
            console.log(err)
            if (err.name === "SequelizeValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`)
        }
    },

    async deleteUser(req, res) {
        try {
            await models.User.destroy({ where: { id: req.params.id } })
            res.json({ message: "User deleted" })
        } catch (err) {
            console.log(err)
            if (err.name === "SequelizeValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`)
        }
    },
    async updateUser(req, res) {
        try {
            await models.User.update({ ...req.body }, { where: { id: req.params.id }, individualHooks: true })
            res.json({ message: "User updated" })
        } catch (err) {
            console.log(err)
            if (err.name === "SequelizeValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`)
        }
    },
    async getAllUser(req, res) {
        try {
            var results = await models.User.findAll();
            res.json(results);

        } catch (err) {
            console.log(err)
            if (err.name === "SequelizeValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`)
        }
    },
    async getUser(req, res) {
        try {
            var result = await models.User.findOne({ where: { id: req.params.id } });
             var book = await models.Book.findOne({where:{id:result.bookId}});
             result.bookId = book;
            res.json(result);
        } catch (err) {
            console.log(err)
            if (err.name === "SequelizeValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`)
        }
    }
}


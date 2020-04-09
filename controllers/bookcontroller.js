var models = require('../models/sequelize');
module.exports = {
    async createBook(req, res) {
        try {
            var result = await models.Book.create({ ...req.body })
            res.json(result);
        } catch (err) {
            console.log(err)
            if (err.name === "SequelizeValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`)
        }
    },

    async deleteBook(req, res) {
        try {
            await models.Book.destroy({ where: {id:req.params.id} } )
            res.json({message:"book deleted"})
        } catch (err) {
            console.log(err)
            if (err.name === "SequelizeValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`)
        }
    },
    async updateBook(req, res) {
        try {
           await models.Book.update({ stock: req.body.stock },{  where: {id:req.params.id} })
             res.json({message : "book updated"})
        } catch (err) {
            console.log(err)
            if (err.name === "SequelizeValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`)
        }
    },
    async getAllBook(req, res) {
        try {
            var results = await models.Book.findAll();
            res.json(results);

        } catch (err) {
            console.log(err)
            if (err.name === "SequelizeValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`)
        }
    },
    async getBook(req,res){
        try{
           var result = await models.Book.findOne({where:{id:req.params.id}});
            res.json(result);
        } catch (err) {
            console.log(err)
            if (err.name === "SequelizeValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`)
        }
    } 
}


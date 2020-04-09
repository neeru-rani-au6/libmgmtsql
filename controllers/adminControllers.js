var models = require('../models/sequelize');
var Admin=require('../models/admin');
var bcrypt=require('bcryptjs')
var jwt=require('jsonwebtoken');
module.exports = {
    async adminRegister(req, res) {
        try {
            if(!req.body.name||!req.body.email||!req.body.password||!req.body.address||!req.body.phoneno)
              {
              return res.send("Message:admin details field cannot be empty");
              }
            const foundAdmin=await models.Admin.findOne({where:{email:req.body.email}});
            if(foundAdmin)
                   return res.send("message:Admin already exist");
            req.body.password = await bcrypt.hash(req.body.password, 10);
            var result = await models.Admin.create({ ...req.body })
            res.json(result);
        } catch (err) {
            console.log(err)
            if (err.name === "SequelizeValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`)
        }
    },
    async adminLogin(req, res) {
        try{
            const email=req.body.email;
            const password=req.body.password;
            //CHECK IF EMAIL OR PASSWORD IS EMPTY 
            if(!email||!password) return res.status(400).send("Message:email or password cannot be null");  
            const admin=await models.Admin.findOne({where:{email:email}});
            const isMatched=await bcrypt.compareSync(password,admin.password);
            if(!isMatched) return res.status(404).send("Message:Invalid Email/Password Credentials");
            const token=await jwt.sign({id:admin.id},process.env.JWT_SECRET_KEY,{expiresIn:1000*60*60*4});
            models.Admin.update({ jwt:token }, { where: { id: admin.id }})
            return res.status(200).json({"Status":"successful login","jwttoken":token});        
           }
        catch (error)
          {
            res.status(400).json(error.message);
          }
        },
          
    async deleteAdmin(req, res) {
        try {
            if(!req.params.adminId)
                 return res.stats(403).send("Message:Enter an adminId");
            await models.Admin.destroy({ where: { id: req.params.adminId } })
            res.json({ message: "Admin deleted" })
        } catch (err) {
            console.log(err)
            if (err.name === "SequelizeValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`)
        }
    },
    async adminLogout(req, res) {
         try {
          await models.Admin.update({ jwt:null }, { where: { id: req.admin.id },  })
          res.json({ message: "Admin Logged and updated JWT" })
      } catch (err) {
          console.log(err)
          if (err.name === "SequelizeValidationError")
              return res.status(400).send(`Validation Error: ${err.message}`)
      }
  },
    async adminUpdate(req, res) {
          try {
            if(req.body.email||req.body.password)  
                 return res.status(400).send("Message:cannot update email and password for admin") ; 
            await models.Admin.update({ name:req.body.name,address:req.body.address,phoneno:req.body.phoneno }, { where: { id: req.params.adminId },  })
            res.json({ message: "Admin updated" })
        } catch (err) {
            console.log(err)
            if (err.name === "SequelizeValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`)
        }
    },
    async allAdmins(req, res) {
        try {
            var results = await models.Admin.findAll();
            res.json(results);

        } catch (err) {
            console.log(err)
            if (err.name === "SequelizeValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`)
        }
    },
    async specificAdmin(req, res) {
        try {
            if(!req.params.adminId)
                 return res.stats(403).send("Message:Enter an adminId in req.params");
            var result = await models.Admin.findOne({ where: { id: req.params.adminId } });
            res.json(result);
        } catch (err) {
            console.log(err)
            if (err.name === "SequelizeValidationError")
                return res.status(400).send(`Validation Error: ${err.message}`)
        }
    }
}

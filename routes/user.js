const router = require("express").Router();
const controller = require("../controllers");
const { Auth } = require('../middlewares/auth')
const bcrypt = require('bcrypt')
const { MSG_TYPES } = require('../constant/types');

const { JsonResponse } = require("../lib/apiResponse");
const moment = require("moment");




const User = require('../models/user')
const { mailSender, GenerateCode } = require('../utils/index');


router.get("/",Auth,controller.user.getAllUser)

router.get("/me",Auth,controller.user.getMe)

router.get("/:id",Auth,controller.user.getUser)

// router.post("/",controller.user.createUser)

router.get('/confirmation/:email/:token',controller.user.confirmEmail)

router.patch("/",Auth,controller.user.updateUser)

router.patch("/me",Auth,controller.user.teminateMe)



//Register new user=================================================

router.post('/',   async (req, res) =>{ 
    
    try {
       
        //create new user
        const { name, email, phoneNumber,  gender } = req.body;
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(req.body.password, salt);

        //validating email from the db
        const currentEmail = await User.findOne({email})
        if(currentEmail) {
            return  JsonResponse( res, 404, MSG_TYPES.ACCOUNT_EXIST );
        }
        
        // //validating phoneNumber from the db
        const currentphoneNumber = await User.findOne({phoneNumber})
        if(currentphoneNumber) {
         return JsonResponse( res, 404, MSG_TYPES.PHONE_EXIST );
        

        }  

        const newUser = await new User({
            name,
            email,
            phoneNumber,
            password,
            gender
        });
 

        const token = GenerateCode(16);
                newUser.rememberToken.token = token;
                newUser.rememberToken.expiredDate = moment().add(20, "minutes");

                //email verification link
                let to = {
                    "Email": newUser.email,
                    "Name": newUser.name
                };
                let subject = "Account Verification Link"
                let textpart = "Please Click on verify your account"
                let HTMLPart = 'Hello ' + req.body.name + ',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host +
                    '\/user\/confirmation\/' + newUser.email + '\/' + newUser.rememberToken.token + '\n\nThank You!\n';

                await mailSender(to, subject, textpart, HTMLPart);

        const user = await newUser.save();
      

        // res.status(200).json(user)
        JsonResponse( res, 200, MSG_TYPES.ACCOUNT_CREATED, user );
    } catch (error) {
        // res.status(500).json(error + 'error saving data')
        JsonResponse( res, 500, MSG_TYPES.SERVER_ERROR );
    }
}
);

module.exports = router
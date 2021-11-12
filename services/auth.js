const User = require("../models/user")
const { MSG_TYPES } = require('../constant/types');
const bcrypt = require('bcrypt')

const saltNumber = 10
class AuthService {

    /**
     * User Login
     * @param {Object} body request body object
    */
    static login(body) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findOne({ 
                    $or: [
                        {
                            email: body.emailPhoneNumber
                        },
                        {
                            phoneNumber: body.emailPhoneNumber
                        }
                    ]
                });

                if (!user) {
                    return reject({ statusCode: 404, msg: MSG_TYPES.ACCOUNT_INVALID })
                }

                const validPassword = await bcrypt.compare(body.password, user.password)
                if (!validPassword) {
                    return reject({ statusCode: 404, msg: MSG_TYPES.INVALID_PASSWORD })
                }

                const token = user.generateAuthToken();
                resolve({token, user})
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    /**
     * Update User Password
     * @param {Object} body request body object
     * @param {Objec} user request body object
    */
    static updatedPassword(user, body) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(user, body)
                const currentUser = await User.findOne({
                    _id: user._id,
                    status: "active"
                })
                if (!currentUser) {
                    reject({ statusCode: 404, msg: MSG_TYPES.ACCOUNT_EXIST })
                }

                const validPassword = await bcrypt.compare(
                    body.oldPassword,
                    currentUser.password
                )
                if (!validPassword) {
                    return reject({ statusCode: 404, msg: MSG_TYPES.ACCOUNT_INVALID });
                }

                const salt = await bcrypt.genSalt(saltNumber);
                const updatedPassword = await bcrypt.hash(body.newPassword, salt);

                const updateUser = await User.updateOne(
                    { _id: user._id },
                    {
                        $set: {
                            password: updatedPassword,
                        },
                    }
                );
                resolve({ updateUser })
            } catch (error) {
                return reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error });
            }
        })
    }
}

module.exports = AuthService
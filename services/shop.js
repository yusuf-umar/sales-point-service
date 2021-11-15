const Shop = require("../models/shop")
const { MSG_TYPES } = require('../constant/types');

class ShopService {
    
    /**
     * Create Shop 
     * @param {Object} body request body object
    */
    static create(body) {
        return new Promise(async (resolve, reject) => {
            try {
                const shop = await Shop.findOne({
                    user: body.user,
                    name: body.name
                })

                if (shop) {
                    reject({ statusCode: 404, msg: MSG_TYPES.EXIST });
                    return;
                }

                const newShop = new Shop(body);

                await newShop.save();

                resolve(newShop)
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    /**
     * Get Shops 
     * @param {Number} skip skip
     * @param {Number} pageSize page size
     * @param {Object} filter filter
    */
    static getAllShop(skip, pageSize, filter = {}) {
        return new Promise(async (resolve, reject) => {
            try {
                const shops = await Shop.find(filter)
                    .skip(skip).limit(pageSize)

                const total = await Shop.find(filter).countDocuments()

                resolve({ shops, total })
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    /**
     * Get Shop 
     * @param {Object} filter filter
    */
    static getShop(filter) {
        return new Promise(async (resolve, reject) => {
            try {
                const shop = await Shop.findOne(filter);

                if (!shop) {
                    return reject({ statusCode: 404, msg: MSG_TYPES.NOT_FOUND })
                }
        
                resolve(user)
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    /**
     * Update Shop 
     * @param {object} shopId Shop's id
     * @param {Object} shopObject updated details
     * @param {Object} User user
    */
    static updateShop(shopId, shopObject, user) {
        return new Promise(async (resolve, reject) => {
            try {
                const shop = await Shop.findOne({
                    user: user._id,
                    _id: shopId
                })
                if (!shop) {
                    return reject({ statusCode: 404, msg: MSG_TYPES.NOT_FOUND })
                }

                await shop.updateOne(
                    {
                        $set: shopObject
                    }
                )

                resolve(shop)
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    /**
     * Terminate Shop 
     * @param {Object} user user
    */
    static deleteShop(user, shopId) {
        return new Promise(async (resolve, reject) => {
            try {
                const shop = await Shop.findOne({
                    user: user._id,
                    _id: shopId
                })
                if (!shop) {
                    return reject({ statusCode: 404, msg: MSG_TYPES.NOT_FOUND })
                }
             
                await shop.delete();

                resolve({ msg: MSG_TYPES.DELETED })
            } catch (error) {
                return reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error });
            }
        })
    }
}

module.exports = ShopService
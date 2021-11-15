const Order = require("../models/order")
const { MSG_TYPES } = require('../constant/types');

class ShopService {

    /**
     * Create Order 
     * @param {Object} body request body object
    */
    // static create(body) {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             const order = await Order.findOne({
    //                 user: body.user,
    //                 name: body.name
    //             })

    //             if (order) {
    //                 reject({ statusCode: 404, msg: MSG_TYPES.EXIST });
    //                 return;
    //             }

    //             const newOrder = new Order(body);

    //             await newOrder.save();

    //             resolve(newOrder)
    //         } catch (error) {
    //             reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
    //         }
    //     })
    // }

    /**
     * Get Orders 
     * @param {Number} skip skip
     * @param {Number} pageSize page size
     * @param {Object} filter filter
    */
    static getAllShop(skip, pageSize, filter = {}) {
        return new Promise(async (resolve, reject) => {
            try {
                const orders = await Order.find(filter)
                    .skip(skip).limit(pageSize)

                const total = await Order.find(filter).countDocuments()

                resolve({ orders, total })
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    /**
     * Get Order 
     * @param {Object} filter filter
    */
    static getShop(filter) {
        return new Promise(async (resolve, reject) => {
            try {
                const order = await Order.findOne(filter);

                if (!order) {
                    return reject({ statusCode: 404, msg: MSG_TYPES.NOT_FOUND })
                }

                resolve(order)
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }


    /**
     * Delete Order 
     * @param {Object} user user
    */
    static deleteOrder(user, orderId) {
        return new Promise(async (resolve, reject) => {
            try {
                const order = await Order.findOne({
                    user: user._id,
                    _id: orderId
                })
                if (!order) {
                    return reject({ statusCode: 404, msg: MSG_TYPES.NOT_FOUND })
                }

                await order.delete();

                resolve({ msg: MSG_TYPES.DELETED })
            } catch (error) {
                return reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error });
            }
        })
    }
}

module.exports = ShopService
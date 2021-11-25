const Order = require("../models/order")
const { MSG_TYPES } = require('../constant/types');

class OrderService {

    /**
     * Create Order 
     * @param {Object} body request body object
    */
    static create(body) {
        return new Promise(async (resolve, reject) => {
            try {
                const newOrder = new Order(body);

                await newOrder.save();

                resolve(newOrder)
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    /**
     * Get Orders 
     * @param {Number} skip skip
     * @param {Number} pageSize page size
     * @param {Object} filter filter
    */
    static getAllOrders(skip, pageSize, filter = {}) {
        return new Promise(async (resolve, reject) => {
            try {
                const orders = await Order.find(filter).populate('user shop menu')

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
    static getOrder(filter) {
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

    static updateOrder(filter={}, orderObject){
        return new Promise(async (resolve, reject) => {
            try {
                const order = await Order.findOne(filter)

                if (!order) {
                    return reject({ statusCode: 404, msg: MSG_TYPES.NOT_FOUND })
                }

                await order.updateOne(
                    {
                        $set: orderObject
                    }
                )

                resolve(order)
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }
}

module.exports = OrderService
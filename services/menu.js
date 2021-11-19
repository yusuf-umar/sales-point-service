const Menu = require("../models/menu")
const { MSG_TYPES } = require('../constant/types');

class MenuService {
    
    /**
     * Create Menu 
     * @param {Object} body request body object
    */
    static create(body) {
        return new Promise(async (resolve, reject) => {
            try {
                const menu = await Menu.findOne({
                    user: body.user,
                    shop: body.shop,
                    name: body.name
                })

                if (menu) {
                    reject({ statusCode: 404, msg: MSG_TYPES.EXIST });
                    return;
                }

                const newMenu = new Menu(body);

                await newMenu.save();

                resolve(newMenu)
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    /**
     * Get Menus 
     * @param {Number} skip skip
     * @param {Number} pageSize page size
     * @param {Object} filter filter
    */
    static getAllMenu(skip, pageSize, filter = {}) {
        return new Promise(async (resolve, reject) => {
            try {
                const menus = await Menu.find(filter)
                    .skip(skip).limit(pageSize).populate('category shop ingredient')

                const total = await Menu.find(filter).countDocuments()

                resolve({ menus, total })
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    /**
     * Get Menu 
     * @param {Object} filter filter
    */
    static getMenu(filter) {
        return new Promise(async (resolve, reject) => {
            try {
                const menu = await Menu.findOne(filter).populate('category ingredient shop');

                if (!menu) {
                    return reject({ statusCode: 404, msg: MSG_TYPES.NOT_FOUND })
                }
        
                resolve(menu)
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    /**
     * Update Menu 
     * @param {object} menuId Menu's id
     * @param {Object} menuObject updated details
    */
    static updateMenu(menuId, menuObject, user) {
        return new Promise(async (resolve, reject) => {
            try {
                const menu = await Menu.findOne({
                    user: user._id,
                    _id: menuId
                })
                if (!menu) {
                    return reject({ statusCode: 404, msg: MSG_TYPES.NOT_FOUND })
                }

                await menu.updateOne(
                    {
                        $set: menuObject
                    }
                )

                resolve(menu)
            } catch (error) {
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    /**
     * Terminate Menu 
     * @param {Object} Menu menuId
    */
    static deleteMenu(user, menuId) {
        return new Promise(async (resolve, reject) => {
            try {
                const menu = await Menu.findOne({
                    user: user._id,
                    _id: menuId
                })
                if (!menu) {
                    return reject({ statusCode: 404, msg: MSG_TYPES.NOT_FOUND })
                }
             
                await menu.delete();

                resolve({ msg: MSG_TYPES.DELETED })
            } catch (error) {
                return reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error });
            }
        })
    }
}

module.exports = MenuService
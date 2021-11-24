const { MSG_TYPES } = require('../constant/types');
const Cart = require('../models/cart');
const Menu = require('../models/menu');

class CartService {

    static create(body) {
        return new Promise(async (resolve, reject) => {
            try {
                const cart = await Cart.findOne({
                    user: body.user,
                    menu: body.menu
                })
                if (cart) {
                    await cart.updateOne(
                        {
                            $inc: {
                                quantity:1
                            }
                        }
                    )

                    return resolve(cart)
                }
                
                const newOrder = new Cart(body)
                await newOrder.save()

                resolve(newOrder)
            } catch (error) {
                console.log({ error })
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    static getCart(filter) {
        return new Promise(async (resolve, reject) => {
            try {
                const cart = await Cart.findOne(filter).populate('menu')

                if (!cart) {
                    return reject({ statusCode: 404, msg: MSG_TYPES.NOT_FOUND })
                }

                resolve(cart)
            } catch (error) {
                console.log({ error })
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    static getCarts(filter) {
        return new Promise(async (resolve, reject) => {
            try {
                const carts = await Cart.find(filter).populate({path: 'menu',populate:{path:'shop ingredients category'}})

                let total = 0;
                let calories = 0;
                let caloriesUnit = "";

                if(carts.length > 1) {
                    for(let i = 0; i < carts.length; i++) {
                        let cartTotal = carts[i].amount * carts[i].quantity;
                        total += cartTotal;
                        caloriesUnit = carts[0].menu.ingredients[0].calorieUnit

                        if(carts[i].menu.ingredients.length > 0){
                            for(let x=0;x<carts[i].menu.ingredients.length;x++){
                                let caloriesTotal = carts[i].menu.ingredients[x].calorie * carts[i].quantity;
                                calories += caloriesTotal;
                            }
                        }else if(carts[i].menu.ingredients.length === 1){
                            calories = carts[i].menu.ingredients[0].calories;
                        }
                    }

                }else if (carts.length === 1){
                    total = carts[0].amount * carts[0].quantity
                    caloriesUnit = carts[0].menu.ingredients[0].calorieUnit

                    if(carts[0].menu.ingredients.length > 0){
                        for(let i=0;i<carts[0].menu.ingredients.length;i++){
                            let caloriesTotal = carts[0].menu.ingredients[i].calorie * carts[0].quantity;
                            calories += caloriesTotal;
                        }
                    }else if(carts[0].menu.ingredients.length === 1){
                        calories = carts[0].menu.ingredients[0].calories;
                    }
                }

                calories = parseFloat(calories).toFixed(2);

                resolve({ carts, total, calories, caloriesUnit })
            } catch (error) {
                console.log({ error })
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    static removeCart(cartId, user) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(cartId)
                const cart = await Cart.findOne({ 
                    _id: cartId,
                    user: user._id
                })
                if(!cart){
                    return reject({ statusCode: 404, msg: MSG_TYPES.NOT_FOUND })
                }

                await cart.delete()

                resolve({msg: MSG_TYPES.DELETED})
            } catch (error) {
                console.log({ error })
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }

    static updateCart(cartId, cartObject, user) {
        return new Promise(async (resolve, reject) => {
            try {
                const cart = await Cart.findOne({
                    user: user._id,
                    _id: cartId
                })
                if (!cart) {
                    return reject({ statusCode: 404, msg: MSG_TYPES.NOT_FOUND })
                }

                await cart.updateOne(
                    {
                        $set: cartObject
                    }
                )

                resolve(cart)
            } catch (error) {
                console.log({ error })
                reject({ statusCode: 500, msg: MSG_TYPES.SERVER_ERROR, error })
            }
        })
    }
}

module.exports = CartService
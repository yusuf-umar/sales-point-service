const { MSG_TYPES } = require("../constant/types");
const { JsonResponse } = require("../lib/apiResponse");
const { paginate } = require("../utils/index");
const { validateOrder } = require('../request/order')
const OrderService = require("../services/order")


exports.createOrder = (req, res, next) => {
    try {
        req.body.user = req.user._id

        const { error } = validateOrder(req.body);
        if (error) return JsonResponse(res, 400, error.details[0].message);

        let createOrder = await OrderService.create(req.body)

        JsonResponse(res, 201, MSG_TYPES.CREATED, createOrder)
    } catch {
        JsonResponse(res, error.statusCode, error.msg)
        next(error)
    }
}

exports.getOrder = (req, res, next) => {
    try {
        let filter = {
            _id: req.params.orderId
        }

        const order = await OrderService.getOrder(filter)

        JsonResponse(res, 200, MSG_TYPES.FETCHED, order)
    } catch {
        JsonResponse(res, error.statusCode, error.msg)
        next(error)
    }
}


exports.getOrdersByShop = (req, res, next) => {
    try {
        let filter = {
            shop: req.params.shopId
        }
        const { page, pageSize, skip } = paginate(req);

        const { orders, total } = await OrderService.getAllOrders(skip, pageSize, filter)

        const meta = {
            total,
            pagination: {
                pageSize, page
            }
        }

        JsonResponse(res, 201, MSG_TYPES.FETCHED, orders, meta)
    } catch {
        JsonResponse(res, error.statusCode, error.msg)
        next(error)
    }
}



exports.getOrdersByUser = (req, res, next) => {
    try {
        let filter = {
            user: req.user._id
        }
        const { page, pageSize, skip } = paginate(req);

        const { orders, total } = await OrderService.getAllOrders(skip, pageSize, filter)

        const meta = {
            total,
            pagination: {
                pageSize, page
            }
        }

        JsonResponse(res, 201, MSG_TYPES.FETCHED, orders, meta)
    } catch {
        JsonResponse(res, error.statusCode, error.msg)
        next(error)
    }
}

exports.approveOrder = (req, res, next) => {
    try {
        let body = {
            status: 'Approved'
        }
        let filter = {
            _Id: req.params.orderId
        }

        const order = await OrderService.updateOrder(filter, body)

        return JsonResponse(res, 200, MSG_TYPES.UPDATED, order);
    } catch {
        JsonResponse(res, error.statusCode, error.msg)
        next(error)
    }
}


exports.cancelOrder = (req, res, next) => {
    try {
        let body = {
            status: 'Cancel'
        }
        let filter = {
            _Id: req.params.orderId,
            user: req.user._id
        }

        const order = await OrderService.updateOrder(filter, body)

        return JsonResponse(res, 200, MSG_TYPES.UPDATED, order);
    } catch {
        JsonResponse(res, error.statusCode, error.msg)
        next(error)
    }
}
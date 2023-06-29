const ApiError = require('../error/ApiError')
const {Sector} = require('../models/models')
const uuid = require("uuid");
const path = require("path");

class sectorController {
    async create(req, res, next) {
        try {
            const {address, sectorStatusId} = req.body
            const {Img} = req.files
            let fileName = uuid.v4() + ".jpg"
            await Img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const sector = await Sector.create({address, photo:fileName, sectorStatusId})
            return res.json(sector)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            return res.json(await Sector.findAll())
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            return res.json(await Sector.findOne({where: {id}}))
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new sectorController()
const { combineTableNames } = require("sequelize/lib/utils")
const helper = require("../helper")
const service = require("../service")

const controller = {}

controller.panggilNama = (req, res) => {
    try {
        const fullname = req.body.nama
        const lastName =  req.params.lastName 
        const result = service.panggilNama(fullname, lastName)

        res.status(200).json({
            message: result
        })
    } catch (error) {
        helper.controllerErrorHandler(error,res)
    }
}

controller.registrasi = async (req, res) => {
    try {
        const {firstName, lastName, userName, password, verifikasiPassword} = req.body
        const verificator = service.validasiPassword(password, verifikasiPassword)
        if(!verificator) return res.status(400).json({message: 'Password tidak sesuai'})

        // hash password

        const hashedPassword = await service.hashPassword(password);
        const result = await service.saveNewUser(firstName, lastName, userName, hashedPassword);


        res.status(200).json({message: 'Berhasil registrasi', data: result})

    } catch (error) {
        helper.controllerErrorHandler(error,res)
    }
}

controller.getUser = async ( req, res ) => {
    try {
        const { id_user } = req.params;

        const result = await service.getUserByid(id_user);

        res.status(200).json({message: 'Berhasil', data: result})
    } catch (error) {
        helper.controllerErrorHandler(error,res)
    }
}

controller.putUserByid = async (req, res) => {
    try {
        const { id_user } = req.params;
        const { firstName = null, lastName = null, userName = null } = req.body

        // update to databese with params id
        const result = await service.updateUserByid(id_user, firstName, lastName, userName);

        res.status(200).json({message: 'Berhasil', data: result})
    } catch (error) {
        helper.controllerErrorHandler(error,res)
    }
}

controller.deleteUserByid = async ( req, res ) => {
    try {
        const { id_user } = req.params;
        // delete user in database
        const result = await service.deleteUserByid(id_user);

        res.status(200).json({message: 'Berhasil', data: result})
    } catch (error) {
        helper.controllerErrorHandler(error,res);
    }
} 

module.exports = controller
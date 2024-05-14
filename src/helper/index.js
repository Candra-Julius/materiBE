const helper = {}

helper.controllerErrorHandler = (error, res) => {
    console.log(error)
    res.status(500).json({
        message: error.message
    })
}

module.exports = helper
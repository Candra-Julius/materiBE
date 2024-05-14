const service = {}

service.panggilNama = (nama, lastName) =>{
    try {
        return `Hallo ${nama + lastName}`
    } catch (error) {
        throw error
    }
}
service.validasiPassword = (password, verifikasiPassword)=>{
    try {
        return password == verifikasiPassword
    } catch (error) {
        throw error
    }
}


module.exports = service
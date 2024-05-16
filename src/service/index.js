const service = {}

const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = require('../config/database/database');

service.panggilNama = (nama, lastName) => {
    try {
        return `Hallo ${nama + lastName}`
    } catch (error) {
        throw error
    }
}
service.validasiPassword = (password, verifikasiPassword) => {
    try {
        return password == verifikasiPassword
    } catch (error) {
        throw error
    }
}

service.saveNewUser = async (firstName, lastName, userName, password) => {
    const result = await db.query(`insert into yahya."user" (firstname, lastname, username, "password")
    values ( :firstName, :lastName, :userName, :password) returning id_user, firstname, lastname, username`, {
        plain: true,
        replacements: {
            firstName, lastName, userName, password
        }
    });

    return result;
}

service.hashPassword = async (myPlaintextPassword) => {
    const hashedPassword = await bcrypt.hash(myPlaintextPassword, saltRounds );
    return hashedPassword;
}

service.getUserByid = async (id) => {
    const user = await db.query(`select id_user, firstname, lastname, username from yahya."user" where id_user = :id`, {
        plain: true, 
        replacements: {
            id
        }
    });
    return user
}


module.exports = service
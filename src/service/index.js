const service = {}

const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = require('../config/database/database');
const User = require('../config/model/user');

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
    // const result = await db.query(`insert into yahya."user" (firstname, lastname, username, "password")
    // values ( :firstName, :lastName, :userName, :password) returning id_user, firstname, lastname, username`, {
    //     plain: true,
    //     replacements: {
    //         firstName, lastName, userName, password
    //     }
    // });

    const result = await User.create({
        firstname: firstName, 
        lastname: lastName, 
        username: userName, 
        password: password
    })

    return result;
}

service.hashPassword = async (myPlaintextPassword) => {
    const hashedPassword = await bcrypt.hash(myPlaintextPassword, saltRounds );
    return hashedPassword;
}

service.getUserByid = async (id) => {
    // const user = await db.query(`select id_user, firstname, lastname, username from yahya."user" where id_user = :id`, {
    //     plain: true, 
    //     replacements: {
    //         id
    //     }
    // });
    const user = await User.findOne({
        where: {
            id_user : id
        }
    })
    return user
}

service.updateUserByid = async (id, firstName, lastName, userName ) => {
    // const user = await db.query('update yahya."user" set firstname = coalesce(:firstname, firstname), lastname = coalesce(:lastname, lastname), username = coalesce(:username, username), update_at = :update_at where id_user = :id returning id_user, firstname, lastname, username', {
    //     plain: true, 
    //     replacements: {
    //         firstname: firstName, 
    //         lastname: lastName, 
    //         username: userName, 
    //         update_at: new Date(), 
    //         id, 
    //     }
    // });
    const [ _, user ] = await User.update({
        firstname: firstName, 
        lastname: lastName, 
        username: userName, 
        update_at: new Date(), 
    }, {
        where: {
            id_user: id, 
        }, 
        returning: true, 
        plain: true, 
        raw: true
    })
    return user
}

service.deleteUserByid = async ( id ) => {
    // await db.query(`delete from yahya."user" where id_user = :id`, {
    //     plain: true, 
    //     replacements: {
    //         id, 
    //     }
    // });
    await User.destroy({
        where: {
            id_user : id
        }
    })
    return id
}


module.exports = service
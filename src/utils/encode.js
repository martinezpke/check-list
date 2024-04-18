/* const bcrypt = require('bcrypt');
const config = require("../config/config") */
import bcrypt from 'bcrypt'
import env from '../config/env.js'

console.log(env.SALT_ROUNDS)

const encrypt = async (pass) => {
    // decidimos el numero de rondas de hasting
    const saltRounds = env.SALT_ROUNDS | 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(pass, salt);

    return hashedPassword;
}

const compare = async (passForm, passDB) => {
    const passMatches = await bcrypt.compare(passForm, passDB);
    return passMatches;
}

export default { encrypt, compare };
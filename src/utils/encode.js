const bcrypt = require('bcrypt');
const config = require("../config/config")
console.log(config.SALT_ROUNDS)
const encrypt = async (pass) => {
    // decidimos el numero de rondas de hasting
    const saltRounds = config.SALT_ROUNDS | 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(pass, salt);

    return hashedPassword;
}

const compare = async (passForm, passDB) => {
    const passMatches = await bcrypt.compare(passForm, passDB);
    return passMatches;
}

module.exports = { encrypt, compare }
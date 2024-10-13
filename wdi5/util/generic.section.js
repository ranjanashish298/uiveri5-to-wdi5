"use strict";

const { Idp } = require("../pages");

module.exports = {

    loginWithUser: async (user) => {
        await Idp.login(user);
    }

};
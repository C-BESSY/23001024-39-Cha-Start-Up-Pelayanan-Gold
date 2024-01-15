const Admin = require('../../models/admin');
const { Model } = require('objection');

exports.seed = async function (knex) {
    await knex('admins').del();
    
    // Bind the Objection model to the Knex instance
    Model.knex(knex);

    // Tambahkan admin default
    await Admin.query().insert({
        username: 'admin',
        password: 'password',
    });
};

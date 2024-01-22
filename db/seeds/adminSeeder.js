const Admin = require('../../models/admin');
const { Model } = require('objection');
const fs = require('fs');

exports.seed = async function(knex) {
    await knex('admins').del();
    await knex.raw("ALTER SEQUENCE admins_id_seq RESTART WITH 1")

    Model.knex(knex);

    const adminData = {
        username: 'admin',
        password: 'password',
    };

    await Admin.query().insert(adminData);

    console.log('Success seeding table: "admins"');

    const jsonData = JSON.stringify([adminData], null, 2);
    fs.writeFileSync('./public/admin-data.json', jsonData);
};

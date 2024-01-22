const knex = require('knex');

exports.seed = async function (knex) {
  await knex('cinemas').del();
  await knex.raw("ALTER SEQUENCE cinemas_id_seq RESTART WITH 1")

  await knex('cinemas').insert([
    { name: 'Empire XXI', location: 'Jl. Urip Sumoharjo No.104, Klitren, Gondokusuman, Kota Yogyakarta'},
    { name: 'Ambarukmo XXI', location: 'Plaza Ambarukmo Lantai 3, Jl. Laksda Adisucipto KM 6 Yogyakarta' },
    { name: 'Jogja City XXI', location: 'Jogja City Mall Lt.2, Jl. Magelang KM 6 No.18, Sleman, Daerah Istimewa Yogyakarta' },
    { name: 'Sleman City Hall XXI', location: 'Mall Sleman City Hall Lt. 2, Jln. Gito Gati, Denggung, Tridadi, Kapanewon Sleman, Kabupaten Sleman, Daerah Istimewa Yogyakarta' },
    { name: 'CGV Pakuwon Mall', location: 'Pakuwon Mall Lt. 2, Jl. Ring Road Utara, Kaliwaru, Condongcatur, Depok, Sleman, Daerah Istimewa Yogyakarta' },
    { name: 'CGV J-Walk', location: 'Sahid J-Walk Lt. 3, Jl. Babarsari, Janti, Caturtunggal, Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta' },
    { name: 'CGV Transmart Maguwo', location: 'Transmart Maguwo, Jl. Raya Solo KM 8 No. 234, Kalongan, Maguwoharjo, Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta' },
    { name: 'Cinepolis Lippo Plaza Jogja', location: 'Lippo Plaza Lt. 1 dan 4, Jl. Laksda Adisucipto No.32-34, Demangan, Gondokusuman, Kota Yogyakarta, Daerah Istimewa Yogyakarta' },
  ]);

  console.log('Success seeding table: "cinemas"');
};

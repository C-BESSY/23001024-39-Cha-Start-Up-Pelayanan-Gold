const knex = require('knex');

exports.seed = async function(knex) {
    await knex('auditoriums').del();
    await knex.raw("ALTER SEQUENCE auditoriums_id_seq RESTART WITH 1")

    const cinemaIds = await knex('cinemas').pluck('id');

    const auditoriums = [
        // Auditoriums for the first cinema
        { nama_auditorium: 'Empire 1', cinema_id: cinemaIds[0], price: 35000, price_weekend: 40000, layout_height: 10, layout_width: 20, layout_start_from: 'A1' },
        { nama_auditorium: 'Empire 2', cinema_id: cinemaIds[0], price: 40000, price_weekend: 50000, layout_height: 12, layout_width: 22, layout_start_from: 'B1' },
        { nama_auditorium: 'Empire 3', cinema_id: cinemaIds[0], price: 30000, price_weekend: 40000, layout_height: 10, layout_width: 20, layout_start_from: 'C1' },
        { nama_auditorium: 'Empire 4', cinema_id: cinemaIds[0], price: 40000, price_weekend: 50000, layout_height: 12, layout_width: 22, layout_start_from: 'D1' },
        { nama_auditorium: 'Empire 5', cinema_id: cinemaIds[0], price: 45000, price_weekend: 55000, layout_height: 12, layout_width: 22, layout_start_from: 'E1' },

        // Auditoriums for the second cinema
        { nama_auditorium: 'Amplaz 1', cinema_id: cinemaIds[1], price: 35000, price_weekend: 40000, layout_height: 10, layout_width: 20, layout_start_from: 'A1' },
        { nama_auditorium: 'Amplaz 0', cinema_id: cinemaIds[1], price: 40000, price_weekend: 50000, layout_height: 12, layout_width: 22, layout_start_from: 'B1' },

        // Auditoriums for the third cinema
        { nama_auditorium: 'JCM 1', cinema_id: cinemaIds[2], price: 35000, price_weekend: 40000, layout_height: 10, layout_width: 20, layout_start_from: 'A1' },

        // Auditoriums for the fourth cinema
        { nama_auditorium: 'SCH 1', cinema_id: cinemaIds[3], price: 35000, price_weekend: 40000, layout_height: 10, layout_width: 20, layout_start_from: 'A1' },
        { nama_auditorium: 'SCH 2', cinema_id: cinemaIds[3], price: 40000, price_weekend: 50000, layout_height: 12, layout_width: 22, layout_start_from: 'B1' },

        // Auditoriums for the fifth cinema
        { nama_auditorium: 'Pakuwon 1', cinema_id: cinemaIds[4], price: 35000, price_weekend: 40000, layout_height: 10, layout_width: 20, layout_start_from: 'A1' },
        { nama_auditorium: 'Pakuwon 2', cinema_id: cinemaIds[4], price: 40000, price_weekend: 50000, layout_height: 12, layout_width: 22, layout_start_from: 'B1' },

        // Auditoriums for the sixth cinema
        { nama_auditorium: 'J-Walk 1', cinema_id: cinemaIds[5], price: 35000, price_weekend: 40000, layout_height: 10, layout_width: 20, layout_start_from: 'A1' },
        { nama_auditorium: 'J-Walk 2', cinema_id: cinemaIds[5], price: 40000, price_weekend: 50000, layout_height: 12, layout_width: 22, layout_start_from: 'B1' },

        // Auditoriums for the seventh cinema
        { nama_auditorium: 'Transmart 1', cinema_id: cinemaIds[6], price: 35000, price_weekend: 40000, layout_height: 10, layout_width: 20, layout_start_from: 'A1' },

        // Auditoriums for the eight cinema
        { nama_auditorium: 'Lippo 1', cinema_id: cinemaIds[7], price: 35000, price_weekend: 40000, layout_height: 10, layout_width: 20, layout_start_from: 'A1' },
        { nama_auditorium: 'Lippo 2', cinema_id: cinemaIds[7], price: 40000, price_weekend: 50000, layout_height: 12, layout_width: 22, layout_start_from: 'B1' },
    ];
    await knex('auditoriums').insert(auditoriums)

    console.log('Success seeding table: "auditoriums"');
};

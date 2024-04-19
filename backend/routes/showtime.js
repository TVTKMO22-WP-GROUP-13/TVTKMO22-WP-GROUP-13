const { auth } = require('../middleware/auth');
const { getUser } = require('../database/user_data_db');
const { getGroups, getGroup } = require('../database/user_group_db');
const { getShowtimes, getShowtime, getShowtimeByGroupId, addShowtime, deleteShowtime } = require('../database/showtime_db');

const router = require('express').Router();

router.get('/all', async (req, res) => {
        try {
            const showtimes = await getShowtimes();

            if (showtimes.length === 0) {
                return res.status(404).json({ message: 'No showtimes found'});
            }
            console.log(showtimes);
            res.json({ message: 'Showtimes retrieved successfully', showtimes});
        } catch (error) {
            console.error('Error fetching showtimes: ', showtimes);
            res.status(500).json({ message: 'Failed to retrieve showtimes'});
        }
});

router.post('/addShowtime', async (req, res) => {
    const showtime = req.body.showtime;
    const theater_name = req.body.theater_name;
    const group_id = req.body.group_id;
    const movie_title = req.body.movie_title;


    try {      
        if (!group_id) {
            return res.status(404).json({ message: 'No group' });
        }

        await addShowtime(showtime, theater_name, group_id, movie_title);
        res.status(201).json({ message: `Showtime "${showtime}" saved successfully` });
    } catch (error) {
        console.error('Adding showtime error:', error);
        res.status(400).json({ error: 'Something went wrong adding showtime' });
    }
});

module.exports = router;
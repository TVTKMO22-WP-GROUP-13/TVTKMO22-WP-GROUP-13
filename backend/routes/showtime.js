const { auth } = require('../middleware/auth');
const { getUser } = require('../database/user_data_db');
const { getGroup } = require('../database/user_group_db');
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

router.post('/addShowtime', auth, async (req, res) => {
    const showtime = req.body.showtime;
    const theater_name = req.body.theater_name;
    const group_id = req.body.group_id;
    const movie_title = req.body.movie_title;
    const username = res.locals.username

    try {
        const user = await getUser(username);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const added_by_user_id = user.user_id;
             
        if (!group_id ||!added_by_user_id) {
            return res.status(404).json({ message: 'No group or user' });
        }

        await addShowtime(showtime, theater_name, group_id, movie_title, added_by_user_id);
        res.status(201).json({ message: `Showtime "${showtime}" saved successfully by user ${added_by_user_id}` });
    } catch (error) {
        console.error('Adding showtime error:', error);
        res.status(400).json({ error: 'Something went wrong adding showtime' });
    }
});

router.get('/getShowtimeByGroup:group_id', async (req, res) => {
   
    const { group_id } = req.params;

    try {
        const group = await getGroup(group_id);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        
        const GroupShowtimes = await getShowtimeByGroupId(group_id);
        res.status(201).json({ message: 'Shows get successfully', GroupShowtimes });
        } catch (error) {
        console.error('Show getting error:', error);
        res.status(400).json({ error: 'Show getting failed' });
    }
})

router.get('/showtime:showtime_id', async (req, res) => {
    
   const { showtime_id } = req.params;
   //const showtime_id = req.body.showtime_id

    try {
        const showtime = await getShowtime(showtime_id);
        if (!showtime_id) {
            return res.status(404),json({message : 'Showtime showtime not found'});
        }
        res.json({message: 'Showtime retrieved successfully', showtime});
    } catch (error) {
        console.error('Error fetching showtime:', error);
        res.status(500).json({message: 'Failed to get showtime'})
    }
});


router.delete('/deleteShowtime', auth, async (req, res) => {
    const group_id = req.body.group_id;
    const showtime_id = req.body.showtime_id;
   
    try {
        const group = await getGroup(group_id);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        await deleteShowtime(group_id, showtime_id);
        res.status(201).json({ message: 'Show deleted successfully' });
        } catch (error) {
        console.error('Show deletion error:', error);
        res.status(400).json({ error: 'Show deletion failed' });
    }
});

module.exports = router;
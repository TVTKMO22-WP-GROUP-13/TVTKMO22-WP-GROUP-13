const { getAllMedia, getMediaById, addMedia, deleteMedia } = require('../database/media_db');

const router = require('express').Router();

// endpoint to get all media
router.get('/all', async (req, res) => {
    try {
        const media = await getAllMedia();
        //check if media array is empty
        if (media.length === 0) {
            return res.status(404).json({ message: 'No media found' });
        }
        console.log(media);
        res.json({ message: 'Media retrieved successfully', media });
    } catch (error) {
        console.error('Error fetching media:', error);
        res.status(500).json({ message: 'Failed to retrieve media' });
    }
});

router.get('/getMedia/:media_id', async (req, res) => {
    const { media_id } = req.params;  // Extracting media_id from the route parameter

    try {
        const media = await getMediaById(media_id);
        if (!media) {
            return res.status(404).json({ message: 'Media not found' });
        }
        res.json({ message: 'Media retrieved successfully', media });
    } catch (error) {
        console.error('Error fetching media:', error);
        res.status(500).json({ message: 'Failed to retrieve media' });
    }
});

router.post('/addMedia', async (req, res) => {
    const tmdb_id = req.body.tmdb_id;
    const media_type = req.body.media_type;

    if(media_type !== 'movie' && media_type !== 'tv') {
        return res.status(400).json({ error: 'Invalid media type' });
    }
    try {
        await addMedia(tmdb_id, media_type);
        res.status(201).json({ message: `Media with tmdb_id "${tmdb_id}" added successfully` });
    } catch (error) {
        console.error('Media addition error:', error);
        res.status(400).json({ error: 'Media addition failed' });
    }
});

router.delete('/deleteMedia/:media_id', async (req, res) => {
    const { media_id } = req.params;

    try {
        await deleteMedia(media_id);
        res.json({ message: `Media with id "${media_id}" deleted successfully` });
    } catch (error) {
        console.error('Media deletion error:', error);
        res.status(400).json({ error: 'Media deletion failed' });
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const { getAllListEntries, getListEntriesByGroup, getListEntriesByUser, addListEntry, removeListEntry } = require('../database/list_entry_db');
const { getMediaByTmdbId, addMedia } = require('../database/media_db');
const { auth } = require('../middleware/auth');
const { getUser } = require('../database/user_data_db');

router.get('/all', async (req, res) => {

    try { 
        const listEntries = await getAllListEntries();
        res.json({ message: 'List entries retrieved successfully', listEntries }); 
    }
    catch (error) {
        console.error('Error fetching list entries:', error);
        res.status(500).json({ message: 'Failed to retrieve list entries' });
    }
});

router.get('/getEntries/:user_id/:list_type', async (req, res) => {
    const { user_id, list_type } = req.params;

    try {
        const entries = await getListEntries(user_id, list_type);
        if (entries.length === 0) {
            return res.status(404).json({ message: 'No entries found' });
        }
        res.json({ message: 'Entries retrieved successfully', entries });
    } catch (error) {
        console.error('Error fetching entries:', error);
        res.status(500).json({ message: 'Failed to retrieve entries' });
    }
});

router.get('/getUserFavorites', auth, async (req, res) => {
    
    const user_id  = res.locals.user_id;
    console.log("Used_id", user_id)

    try {
        if (!user_id) {
            return res.status(404).json({ message: 'User not found' });
        }

        const favorites = await getListEntriesByUser(user_id, 'Favorite');
        console.log("Favorites", favorites) 
        if (favorites.length === 0) {
            return res.json({ message: 'No favorites found' })
        }
        res.json({ message: 'Favorites retrieved successfully', favorites });
    } catch (error) {
        console.error('Error fetching favorites:', error);
        res.status(500).json({ message: 'Failed to retrieve favorites' });
    }
});

router.get('/getUserGroupMedia/:group_id', async (req, res) => {
    
    const { group_id } = req.params;
    //const group_id = req.body.group_id;
    console.log("Group_id", group_id)

    try {
        console.log("Group_id", group_id)
        const groupMedia = await getListEntriesByGroup(group_id, 'GroupMedia');
        console.log("Group Media", groupMedia)
        if (groupMedia.length === 0) {
            return res.json({ message: 'No group media found' });
        }
        res.json({ message: 'Group media retrieved successfully', groupMedia });
    } catch (error) {
        console.error('Error fetching group media:', error);
        res.status(500).json({ message: 'Failed to retrieve group media' });
    }
});

router.post('/addEntry', auth, async (req, res) => {
    const user_id = res.locals.user_id;
    const tmdb_id = req.body.tmdb_id;
    const media_type = req.body.media_type;
    const list_type = req.body.list_type;
    const group_id = req.body.group_id;

    //console.log('Body:', req.body);  
    //console.log("UUUSERID", user_id);

    try {
        // Check if the user exists
        //console.log('TNDSFG ID:', tmdb_id)

        if (!user_id) {
            return res.status(404).json({ message: 'User not found' });
        }

        const added_by_user_id = user_id;

        // Check if the media_id exists
        let media = await getMediaByTmdbId(tmdb_id);
        if (!media) {
            // If media doesn't exist, add it
            await addMedia(tmdb_id, media_type);
            // Fetch the media again after adding it
            //console.log('3RD TMDB ID:', tmdb_id)
            media = await getMediaByTmdbId(tmdb_id);
            if (!media) {
                return res.status(500).json({ message: 'Failed to add media' });
            }
        }
        // Extract the media_id from the fetched media
        const media_id = media.media_id;

        // Define valid list types
        const validListTypes = ['Favorite', 'GroupMedia'];
        
        // Check if the provided list type is valid
        if (!validListTypes.includes(list_type)) {
            return res.status(400).json({ message: 'Invalid list type' });
        }

        // Check if the group_id is required for the list type
        if (list_type === 'GroupMedia' && !group_id) {
            return res.json({ message: 'Group ID required for GroupMedia list type' });
        }

        if(list_type === 'Favorite' && group_id) {
            return res.status(400).json({ message: 'Group ID not required for Favorite list type' });
        }

        const finalGroupId = group_id || null

        // Add list entry
        await addListEntry(user_id, media_id, list_type, finalGroupId, added_by_user_id);
        res.json({ message: 'List entry added successfully' });
    } catch (error) {
        console.error('Error adding list entry:', error);
        res.status(500).json({ message: 'Failed to add list entry' });
    }
});

router.delete('/removeEntry', auth, async (req, res) => {
   
    const user_id = res.locals.user_id;
   const entry_id = req.body.entry_id;
   const list_type = req.body.list_type;
   
   try {
        if (!user_id) {
        return res.status(404).json({ message: 'User not found' });
    }
        
       await removeListEntry(user_id, entry_id, list_type);
       res.json({ message: 'List entry removed successfully' });
    } catch (error) { 
        console.error('Error removing list entry:', error);
        res.status(500).json({ message: 'Failed to remove list entry' });
    }
});

module.exports = router;
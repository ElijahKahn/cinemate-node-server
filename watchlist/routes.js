const User = require("../users/model"); // Adjust the path as necessary
function WatchlistRoutes(app) {
    // Endpoint to add an item to the watchlist
    app.post('/api/profile/watchlist/add', async (req, res) => {
        const { userId, mediaItem } = req.body; // mediaItem contains media_id, media_type, etc.

        try {
            // Add mediaItem to the user's watchlist
            await User.updateOne(
                { _id: userId },
                { $push: { watchlist: mediaItem } }
            );
            res.status(200).send('Added to watchlist');
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    });

    // Endpoint to remove an item from the watchlist
    app.post('/api/profile/watchlist/remove', async (req, res) => {
        const { userId, mediaId } = req.body;

        try {
            // Remove mediaItem from the user's watchlist
            await User.updateOne(
                { _id: userId },
                { $pull: { watchlist: { media_id: mediaId } } }
            );
            res.status(200).send('Removed from watchlist');
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    });

    // Endpoint to get the user's watchlist
    app.get('/api/profile/watchlist/:userId', async (req, res) => {
        const userId = req.params.userId;

        try {
            const user = await User.findById(userId);
            res.status(200).json(user.watchlist);
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    });

    // Other watchlist-related routes can be added here
};

WatchlistRoutes.export 
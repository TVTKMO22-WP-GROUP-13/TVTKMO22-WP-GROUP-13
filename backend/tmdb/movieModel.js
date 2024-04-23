

class movieModel {
    constructor(id, title, poster_path, overview) {
        this.id = id;
        this.title = title;
        this.poster_path = poster_path !== null ? `https://image.tmdb.org/t/p/w342${poster_path}` : null;
        this.overview = overview;
    }
}

module.exports = movieModel;
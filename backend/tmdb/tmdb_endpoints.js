import tmdbConfig from "./tmdb.config.js";

const tmdbEndpoints = {
    mediaList: ({ mediaType, mediaCategory, page }) => tmdbConfig.getUrl(
      `${mediaType}/${mediaCategory}`, { page }
    ),
    mediaDetail: ({ mediaType, mediaId }) => tmdbConfig.getUrl(
      `${mediaType}/${mediaId}`
    ),
    mediaGenres: ({ mediaType }) => tmdbConfig.getUrl(
      `genre/${mediaType}/list`
    ),
    mediaCredits: ({ mediaType, mediaId }) => tmdbConfig.getUrl(
      `${mediaType}/${mediaId}/credits`
    ),
    mediaImages: ({ mediaType, mediaId }) => tmdbConfig.getUrl(
      `${mediaType}/${mediaId}/images`
    ),
    mediaSearch: ({ mediaType, query, page }) => tmdbConfig.getUrl(
      `search/${mediaType}`, { query, page }
    )
  };
  
  export default tmdbEndpoints;
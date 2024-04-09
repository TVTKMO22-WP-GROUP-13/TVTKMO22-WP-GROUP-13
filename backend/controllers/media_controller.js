import responseHandler from "../handlers/response_handler.js";
import tmdbApi from "../tmdb/tmdb_api.js";

const getList = async (req, res) => {
    try {
      const { page } = req.query;
      const { mediaType, mediaCategory } = req.params;
  
      const response = await tmdbApi.mediaList({ mediaType, mediaCategory, page });
  
      return responseHandler.ok(res, response);
    } catch {
      responseHandler.error(res);
    }
  };
  
  const getGenres = async (req, res) => {
    try {
      const { mediaType } = req.params;
  
      const response = await tmdbApi.mediaGenres({ mediaType });
  
      return responseHandler.ok(res, response);
    } catch {
      responseHandler.error(res);
    }
  };
  
  const search = async (req, res) => {
    try {
      const { mediaType } = req.params;
      const { query, page } = req.query;
  
      const response = await tmdbApi.mediaSearch({
        query,
        page,
        mediaType: mediaType === "people" ? "person" : mediaType
      });
  
      responseHandler.ok(res, response);
    } catch {
      responseHandler.error(res);
    }
  };
  
  const getDetail = async (req, res) => {
    try {
      const { mediaType, mediaId } = req.params;
  
      const params = { mediaType, mediaId };
  
      const media = await tmdbApi.mediaDetail(params);
  
      media.credits = await tmdbApi.mediaCredits(params);
  
      media.images = await tmdbApi.mediaImages(params);

          responseHandler.ok(res, media);
        } catch (e) {
          console.log(e);
          responseHandler.error(res);
        }
      };

export default { getList, getGenres, search, getDetail };
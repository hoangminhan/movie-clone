import { EMBED_TO, EMBED_TO_TRAILER, IMAGE_URL } from "constant";

// get img base on width and url
export const getImage = (url, width = "original") => {
  return `${IMAGE_URL}/${width}/${url}`;
};

export const embedMovie = (id) => `${EMBED_TO}/movie?id=${id}`;
export const embedMovieTrailer = (id) => `${EMBED_TO_TRAILER}/movie?id=${id}`;

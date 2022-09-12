import { notification } from "antd";
import { EMBED_TO, EMBED_TO_TRAILER, IMAGE_URL } from "constant";

// get img base on width and url
export const getImage = (url, width = "original") => {
  return `${IMAGE_URL}/${width}${url}`;
};

export const embedMovie = (id) => `${EMBED_TO}/movie?id=${id}`;
export const embedMovieTrailer = (url) => `${EMBED_TO_TRAILER}${url}`;

// open notification

export const handleOpenNotification = (type, message, description) => {
  notification[type]({
    message,
    description,
  });
};

export const formatNumber = (number, type = 1) => {
  // 1 => math.round , 10 =>.1, 100=>.12
  return number
    ? new Intl.NumberFormat().format(Math.round(number * type) / type)
    : 0;
};

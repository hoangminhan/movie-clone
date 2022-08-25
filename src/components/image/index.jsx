import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const ImageCustom = ({
  src,
  size,
  alt = "loading",
  width,
  height,
  ...props
}) => {
  return (
    <LazyLoadImage
      {...props}
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  );
};

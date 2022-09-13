import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./style.scss";

export const ImageCustom = ({
  src,
  alt = "loading",
  width,
  height,
  typeEffect,
  ...props
}) => {
  return (
    <LazyLoadImage
      className="w-full"
      {...props}
      src={src}
      alt={alt}
      width={width}
      height={height}
      effect={typeEffect}
    />
  );
};

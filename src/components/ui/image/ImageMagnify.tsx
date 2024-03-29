"use client"
import React from 'react'
import "./style.module.css"

function ImageMagnify() {
  const imageBaseUrl =
    "https://res.cloudinary.com/olanetsoft/image/upload/cat.jpg";

  const sizes = [
    "355",
    "481",
    "584",
    "687",
    "770",
    "861",
    "955",
    "1033",
    "1112",
    "1192",
    "1200"
  ];

  const srcSet = () => {
    sizes.forEach((i) => {
      return `https://res.cloudinary.com/olanetsoft/image/upload/w_${i},c_scale/cat.jpg`;
    });
  };
  return (
    <div className="body">
      <div className="image max-w-max">
        
      </div>
      <div className="text">
        <h2>E-commerce Product Image Zoom Lens in Next.js</h2>
        <h3>Touch</h3>

        <p>Hover image to magnify</p>
      </div>
    </div>
  )
}

export default ImageMagnify
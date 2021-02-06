import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

export default function ImageMap({ src, map, onClick }) {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const [highlightedArea, setHighlightedArea] = useState(null);
  useEffect(() => {
    loadImage(src).then(img => {
      imgRef.current = img
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.canvas.width = img.naturalWidth;
      ctx.canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);

      for (let area of map) {
        if (area.id == highlightedArea) {
          ctx.fillStyle = "rgb(0, 255, 0, 0.5)";
        } else {
          ctx.fillStyle = "rgb(255, 0, 0, 0.5)";
        }
        ctx.fillRect(area.coords[0], area.coords[1], area.coords[2] - area.coords[0], area.coords[3] - area.coords[1]);
      }
    });
  }, [ src, map, canvasRef, imgRef, highlightedArea ]);

  function onMouseMove(event) {
    const area = getArea(eventCoordinates(canvasRef.current, imgRef.current, event), map);
    setHighlightedArea(area ? area.id : null);
  }

  function onMouseClick(event) {
    const area = getArea(eventCoordinates(canvasRef.current, imgRef.current, event), map);
    if (area !== null) {
      onClick(area);
    }
    event.preventDefault();
  }

  function onMouseLeave() {
    setHighlightedArea(null);
  }

  return (
    <canvas
      ref={ canvasRef }
      onMouseMove={ onMouseMove }
      onClick={ onMouseClick }
      onMouseLeave={ onMouseLeave }
      style={{ width: "100%", userSelect: "none" }}
    />
  );
}
ImageMap.propTypes = {
  src: PropTypes.any,
  map: PropTypes.any,
  onClick: PropTypes.any,
}

function getArea(point, map) {
  for (let area of map) {
    if (within(point, area.coords)) {
      return area;
    }
  }
  return null;
}

function eventCoordinates(canvas, img, event) {
  const rect = canvas.getBoundingClientRect();
  const canvasWidth = rect.right - rect.left;
  const canvasHeight = rect.bottom - rect.top;
  const imgWidth = img.naturalWidth;
  const imgHeight = img.naturalHeight;
  const x = (event.clientX - rect.left) * imgWidth / canvasWidth;
  const y = (event.clientY - rect.top) * imgHeight / canvasHeight;
  return [x, y];
}

function within(point, rect) {
  const [x, y] = point;
  const [x1, y1, x2, y2] = rect;
  return (
    x1 <= x && x <= x2 &&
    y1 <= y && y <= y2
  );
}

function loadImage(src) {
  const img = new Image();
  img.src = src;
  return new Promise((resolve) => {
    img.addEventListener("load", () => {
      resolve(img);
    }, false);
  });
}

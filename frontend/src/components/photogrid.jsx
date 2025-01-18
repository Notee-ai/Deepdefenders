import React from "react";

const PhotoGrid = () => {
  const images = [
    "https://cdn.usegalileo.ai/sdxl10/4f5a385c-9d4f-4291-82af-f3972ab7c296.png",
    "https://cdn.usegalileo.ai/sdxl10/5841e98d-50ac-4e78-b0a8-668cb46e082e.png",
    "https://cdn.usegalileo.ai/sdxl10/4aeb7be8-d04c-4b31-9ce8-7cb71fc0987d.png",
    "https://cdn.usegalileo.ai/sdxl10/f92ae234-9a86-4b73-a690-25d8ef178f62.png",
  ];

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
      {images.map((image, index) => (
        <div key={index} className="flex flex-col gap-3">
          <div
            className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
            style={{ backgroundImage: `url("${image}")` }}
          />
        </div>
      ))}
    </div>
  );
};

export default PhotoGrid;

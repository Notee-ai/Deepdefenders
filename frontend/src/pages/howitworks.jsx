import React, { useState } from "react";

const HowItWorks = () => {
  const [step1Images] = useState([
    "https://cdn.usegalileo.ai/sdxl10/cfba15c0-08d5-49a7-853c-03d95bbc35a9.png",
    "https://cdn.usegalileo.ai/sdxl10/113d9d82-2041-459e-a01d-cf34dcdf3d22.png",
    "https://cdn.usegalileo.ai/sdxl10/dd1df1bc-cff8-4525-91fa-2b7d3c171387.png",
  ]);

  const [step2Images] = useState([
    "https://cdn.usegalileo.ai/sdxl10/837b7a4b-71e5-4c1a-9dd6-19b71dd1c8da.png",
    "https://cdn.usegalileo.ai/sdxl10/b7c8df97-b927-488a-ace8-e737e56af08c.png",
    "https://cdn.usegalileo.ai/sdxl10/b187ec87-74da-4fa9-8640-451996b641c9.png",
  ]);

  const [step3Images] = useState([
    "https://cdn.usegalileo.ai/sdxl10/579b1395-a05c-4291-82c7-511a3bc41e63.png",
    "https://cdn.usegalileo.ai/sdxl10/e1e49f26-954e-4d26-8991-6ff313c8eaa9.png",
    "https://cdn.usegalileo.ai/sdxl10/dd1df1bc-cff8-4525-91fa-2b7d3c171387.png",
  ]);

  const [modalImage, setModalImage] = useState(null);

  const openModal = (image) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#111a22] overflow-x-hidden"
      style={{ fontFamily: "Space Grotesk, Noto Sans, sans-serif" }}
    >
      <div className="layout-container flex flex-col">
        <div className="px-6 sm:px-10 flex flex-1 justify-center py-5">
          <div
            className="layout-content-container w-full"
            style={{ maxWidth: "1237.6px", margin: "0 auto" }}
          >
            <section className="flex justify-between items-center gap-3 p-4">
              <p className="text-white text-3xl sm:text-4xl font-black">
                How Deep Defenders Works
              </p>
              <button className="rounded-xl h-10 px-6 bg-[#243647] text-white text-sm font-bold hover:bg-[#1d2c3b] transition duration-300">
                Start Now
              </button>
            </section>

            {[
              {
                title: "Step 1: Upload Media",
                description:
                  "Upload an image or video that you suspect is deepfake media.",
                images: step1Images,
              },
              {
                title: "Step 2: Analyze Media",
                description: "Our system will analyze the uploaded media.",
                images: step2Images,
              },
              {
                title: "Step 3: Review Results",
                description:
                  "Receive a detailed report with actionable insights.",
                images: step3Images,
              },
            ].map((step, index) => (
              <div
                key={index}
                className="py-6 px-4 border-b border-gray-700 last:border-none"
              >
                <h2 className="text-white text-lg sm:text-2xl font-bold mb-2">
                  {step.title}
                </h2>
                <p className="text-gray-300 text-sm sm:text-base mb-4">
                  {step.description}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {" "}
                  {/* Increased gap */}
                  {step.images.map((img, i) => (
                    <div
                      key={i}
                      className="relative group overflow-hidden rounded-xl bg-center bg-no-repeat aspect-square bg-cover"
                      style={{ backgroundImage: `url(${img})` }}
                    >
                      <div
                        className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition duration-300 flex items-center justify-center cursor-pointer"
                        onClick={() => openModal(img)}
                      >
                        <p className="text-white opacity-0 group-hover:opacity-100 transition duration-300 text-sm font-medium">
                          View Image
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {modalImage && (
              <div
                className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                onClick={closeModal}
              >
                <div
                  className="relative max-w-3xl w-full p-4 bg-white rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="absolute top-4 right-4 text-black text-2xl font-bold"
                    onClick={closeModal}
                  >
                    &times;
                  </button>
                  <img
                    src={modalImage}
                    alt="Full View"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;

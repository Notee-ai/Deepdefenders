import React from "react";
import Navbar from "./components/navbar";
import Hero from "./components/Hero";
import Footer from "./components/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/accordion"; // Import Accordion components

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#111a22] font-sans">
      <Navbar />
      <Hero />

      {/* Accordion Component */}
      <div className="px-8 py-6 flex justify-center items-center">
        <div className="w-[917.6px] h-[230.4px] shadow-lg rounded-lg">
          <Accordion type="single" collapsible>
            {/* Question 1 */}
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-white">
                What is Deep Defenders?
              </AccordionTrigger>
              <AccordionContent className="text-white">
                Deep Defenders is an advanced system designed to detect and
                mitigate threats posed by deepfake media, combining machine
                learning, deep learning, and blockchain technologies for
                real-time media authentication.
              </AccordionContent>
            </AccordionItem>

            {/* Question 2 */}
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-white">
                How does Deep Defenders detect deepfake media?
              </AccordionTrigger>
              <AccordionContent className="text-white">
                Deep Defenders uses deep learning models like CNN for image
                detection, 3D CNNs or sequential models (LSTM, GRU) for video
                detection, and Wav2Vec for audio detection.
              </AccordionContent>
            </AccordionItem>

            {/* Question 3 */}
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-white">
                How does the real-time processing work in Deep Defenders?
              </AccordionTrigger>
              <AccordionContent className="text-white">
                The system processes live video frames using OpenCV and
                optimizes models with TensorFlow Lite or ONNX Runtime to ensure
                minimal latency during real-time media verification.
              </AccordionContent>
            </AccordionItem>

            {/* Question 4 */}
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-white">
                What is the role of blockchain in Deep Defenders?
              </AccordionTrigger>
              <AccordionContent className="text-white">
                Blockchain is used to store detection results in a tamper-proof
                and immutable manner. It ensures that media authentication is
                verified and recorded securely using smart contracts.
              </AccordionContent>
            </AccordionItem>

            {/* Question 5 */}
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-white">
                What technologies are used in Deep Defenders?
              </AccordionTrigger>
              <AccordionContent className="text-white">
                The project uses TensorFlow, PyTorch, Keras for machine learning
                and deep learning, Ethereum for blockchain, and tools like
                OpenCV, Solidity, and Web3.js for integration and deployment.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;

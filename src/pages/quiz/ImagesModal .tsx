import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaTimes } from "react-icons/fa";

interface ImagesModalProps {
  onClose: () => void;
  images: string[];
}




const ImagesModal: React.FC<ImagesModalProps> = ({ onClose, images }) => {

  console.log(images);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-75 bg-gray-800">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
        <Carousel showArrows={true} showThumbs={false}>
          {images.map((image, index) => (

           
            <div key={index}>
              <img src={image} alt={`Image ${index}`} />
            </div>
          ))}
        </Carousel>

        console.log(image);
        <button
          onClick={onClose}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ImagesModal;

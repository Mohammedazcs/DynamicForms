import React, { useState, useRef, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ImageUploader.scss";
import noImage from "../../images/no_image.png";

const VALID_FILE_FORMATS = ["image/jpeg", "image/png", "image/gif"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB (in bytes)
const MAX_IMAGES_ALLOWED = 6;

interface UploadedImage {
  file: File;
  imageUrl: string;
}

const ImageUploader = () => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileToDataURL = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      toast.error("No files selected. Please select one or more images.");
      return; // No files selected, return early
    }

    if (images.length + files.length > MAX_IMAGES_ALLOWED) {
      toast.error(`You can upload a maximum of ${MAX_IMAGES_ALLOWED} images.`);
      return; // Number of selected images exceeds the limit, return early
    }

    const uploadedImages: UploadedImage[] = [];

    const promises: Promise<UploadedImage | void>[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        toast.error(
          `File "${file.name}" exceeds the maximum allowed size of 5MB.`
        );
        continue;
      }

      // Check file format
      if (!VALID_FILE_FORMATS.includes(file.type)) {
        toast.error(
          `File "${file.name}" is not a valid image format. Supported formats are JPEG, PNG, and GIF.`
        );
        continue;
      }

      // Convert file to data URL and save it in imageUrl property
      const promise = fileToDataURL(file)
        .then((dataURL) => {
          uploadedImages.push({ file, imageUrl: dataURL });
        })
        .catch((error) => {
          console.error(`Error converting file to data URL: ${error}`);
        });

      promises.push(promise);
    }

    // Wait for all the conversions to complete before updating the state
    Promise.all(promises).then(() => {
      setImages((prevImages) => [...prevImages, ...uploadedImages]);

      // Clear the file input value after processing images
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    });
  };

  const handleRemoveImage = (index: number) => {
    URL.revokeObjectURL(images[index].imageUrl); // Clean up the URL
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const handleCameraClick = () => {
    // Programmatically trigger the file input click event
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <div>
      <input
        type="file"
        multiple
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      <button onClick={handleCameraClick}>Select Images</button>
      {(images.length === 0 || !fileInputRef.current) && (
        <div className="image-uploader-placeholder" onClick={handleCameraClick}>
          <img src={noImage} alt="Camera Icon" className="camera-icon" />
        </div>
      )}
      <ToastContainer />
      <div className="image-list">
        {images.map((image, index) => (
          <div key={index} className="image-item">
            <img
              src={image.imageUrl}
              alt={`Image ${index + 1}`}
              className="uploaded-image"
            />
            <button onClick={() => handleRemoveImage(index)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;



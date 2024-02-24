import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import * as imageCompression from "browser-image-compression";
import "./Dropimages.styles.scss";
import { Gallery } from "..";

interface ImageUploadProps {
  onSave: (files: File[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onSave }) => {
  const [compressedFiles, setCompressedFiles] = useState<File[]>([]);

  const onDrop = async (acceptedFiles: File[]) => {
    const options: imageCompression.Options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1200,
      useWebWorker: true,
      alwaysKeepResolution: true,
    };

    const compressed = await Promise.all(
      acceptedFiles.map(async (file) => {
        try {
          const compressedFile = await imageCompression.default(file, options);
          const convertedFile = new File(
            [compressedFile as Blob],
            `image_${Date.now()}.jpg`,
            { type: "image/jpeg" }
          );
          return convertedFile;
        } catch (error) {
          console.error("Error al comprimir la imagen:", error);
          return null;
        }
      })
    );

    const filteredCompressed = compressed.filter(
      (file) => file !== null
    ) as File[];
    setCompressedFiles(filteredCompressed);
    onSave(filteredCompressed);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".gif"] },
    onDrop,
  });
  return (
    <div className="drop-images">
      {!!compressedFiles.length && (
        <Gallery
          images={compressedFiles.map((file) => URL.createObjectURL(file))}
        />
      )}
      <main
        {...getRootProps()}
        className={`drop-images__drop ${isDragActive && "active"}`}
      >
        <input {...getInputProps()} className="drop-images__drop-input" />
        <p className="drop-images__drop-text">
          {isDragActive
            ? "Suelta los archivos"
            : "Arrastre o suba archivos aquí"}
        </p>
      </main>
    </div>
  );
};

export default ImageUpload;

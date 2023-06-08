import React from "react";

const Download = () => {
  const imageUrl = "https://th.bing.com/th/id/OIP.DvKic9NKqCyOwHxwaqzi9QHaQE?pid=ImgDet&rs=1";

  const handleDownload = (url, fileName) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a download link
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName;

        // Trigger the click event on the link
        link.click();

        // Clean up
        URL.revokeObjectURL(link.href);
      })
      .catch((error) => {
        console.log("Download error:", error);
      });
  };

  return (
    <div>
      <button onClick={() => handleDownload(imageUrl, "image.jpg")}>
        Download Image
      </button>
    </div>
  );
};

export default Download;

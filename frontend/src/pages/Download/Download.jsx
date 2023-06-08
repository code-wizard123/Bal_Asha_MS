import React from "react";


const downloadImage=(url,filName)=>{
  const link = document.createElement('a');
  link.href = url;
  link.download = filName;

  // Append the anchor element to the body
  document.body.appendChild(link);

  // Trigger the click event on the anchor element
  link.click();

  // Clean up
  document.body.removeChild(link);
    };
const Download=()=>{

  const imageUrl = "https://i.pinimg.com/originals/88/fd/03/88fd03d6d0ce054c5b443f54b6db5685.jpg";
  const fileName = 'imageDownload.jpg';

  const handleDownload = () => {
    downloadImage(imageUrl, fileName);
  };
    return(
    //     <button onClick={handleDownload}>
    //   Download Image
    // </button>
    <div>
        <a href={imageUrl} download={fileName}>Download</a>
    </div>
    );
}

export default Download;

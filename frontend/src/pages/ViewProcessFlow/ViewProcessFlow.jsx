import React, { useEffect, useState } from "react";
import axios from "axios";
import ChildImage from "../../Images/ChildImage.jpg";
import "./css/viewprocessflow.css";
import { useParams } from "react-router-dom";

const ViewProcessFlow = () => {
  const [screenshot, setScreenshot] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchScreenshot = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/process/me/${id}`
        );
        console.log(response.data)
        const screenshotData = response.data.process[0].ScreenShot[0];

        // Extract date and time
        const dateRegistered = new Date(screenshotData.dateRegistered);
        const formattedDate = dateRegistered.toDateString();
        const formattedTime = dateRegistered.toLocaleTimeString();

        setScreenshot({ ...screenshotData, formattedDate, formattedTime });
      } catch (error) {
        console.log("Error fetching screenshot:", error);
      }
    };

    fetchScreenshot();
  }, []);

  return (
    <div>
      <div className="process-flow">
        {screenshot && (
          <div>
            <img
              className="view-process-img"
              src={screenshot.url}
              alt={screenshot.dateRegistered}
            />
            <p>Updated On:</p>
            <p>Date: {screenshot.formattedDate}</p>
            <p>Time: {screenshot.formattedTime}</p>
          </div>
        )}
        {!screenshot && (
          <div>
            <img className="view-process-img" src={ChildImage} alt="ChildImage" />
            <p>Loading screenshot...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewProcessFlow;

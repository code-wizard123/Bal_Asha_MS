import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Component = ({ pincode, handleSubmit, id }) => {
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    const getGroundWorker = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/groundworker/getChild/${pincode}`);
        setWorkers(response.data.employee);
      } catch (error) {
        console.log(error)
      }
    };

    getGroundWorker();
  }, [pincode]);

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e, id)}>
        <select>
          <option key="default">Select GroundWorker</option>
          {workers.map((worker, index) => (
            <option value={worker._id} key={index}>{worker.name}</option>
          ))}
        </select>
        <button className="DeleteChildButton">Assign</button>
      </form>
    </div>
  );
};

export default Component;

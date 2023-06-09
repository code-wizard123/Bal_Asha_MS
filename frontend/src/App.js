import React from "react";
import {
  Opening,
  CaseManager,
  AddChild,
  GroundWorker,
  ActionLeft,
  ProcessDone,
  OperationWorker,
  Orphanages,
  Login,
  Landing,
  SetFlow,
  CaughtUp,
  Download,
  ProtectedGroundRoutes,
  ProtectedCaseRoutes,
  Profile
} from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Opening />} />
          <Route exact path="/landing" element={<Landing />} />
          <Route exact path="/AddChild" element={<AddChild />} />
          <Route exact path="/ActionLeft/:id" element={<ActionLeft />} />
          <Route exact path="/ProcessDone" element={<ProcessDone />} />
          <Route exact path="/Orphanages" element={<Orphanages />} />
          <Route exact path="/ReactFlow" element={<SetFlow />} />
          <Route exact path="/Download" element={<Download />} />
          <Route exact path="/Profile" element={<Profile />} />



          <Route path="/GroundWorker" element={<GroundWorker />} />
          <Route path="/CaseManager" element={<CaseManager />} />

          {/* <Route element={<ProtectedGroundRoutes />}>
            <Route path="/GroundWorker" element={<GroundWorker />} />
          </Route>

          <Route element={<ProtectedCaseRoutes />}>
            <Route path="/CaseManager" element={<CaseManager />} />
          </Route> */}
        </Routes>
      </BrowserRouter>
      <ToastContainer /> {/* Place the ToastContainer at the root level */}
    </div>
  );
};

export default App;

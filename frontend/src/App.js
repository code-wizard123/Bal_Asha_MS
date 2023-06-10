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
  ProtectedOperationRoutes,
  Profile,
  FlowTemp
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
          
          {/* <Route exact path="/ActionLeft/:id" element={<ActionLeft />} />
          <Route exact path="/ProcessDone/:id" element={<ProcessDone />} /> */}
          <Route exact path="/Orphanages" element={<Orphanages />} />
          
          <Route exact path="/Download" element={<Download />} />
          {/* <Route path="/OperationWorker" element={<OperationWorker />} /> */}
          
          {/* <Route path="/GroundWorker" element={<GroundWorker />} /> */}
          {/* <Route path="/CaseManager" element={<CaseManager />} /> */}
          {/* <Route path="/FlowTemp" element={<FlowTemp />} /> */}

          <Route element={<ProtectedGroundRoutes />}>
            <Route exact path="/ActionLeft/:id" element={<ActionLeft />} />
            <Route exact path="/ProcessDone/:id" element={<ProcessDone />} />
            <Route path="/GroundWorker" element={<GroundWorker />} />
            <Route exact path="/Profile" element={<Profile />} />
          </Route>

          <Route element={<ProtectedOperationRoutes />}>
            <Route path="/OperationWorker" element={<OperationWorker />} />
            <Route exact path="/ReactFlow" element={<SetFlow />} />
          </Route>

          <Route element={<ProtectedCaseRoutes />}>
            <Route path="/CaseManager" element={<CaseManager />} />
            <Route exact path="/AddChild" element={<AddChild />} />
          </Route>
          
        </Routes>
      </BrowserRouter>
      <ToastContainer /> {/* Place the ToastContainer at the root level */}
    </div>
  );
};

export default App;

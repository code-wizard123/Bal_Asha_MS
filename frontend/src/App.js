import React, { useState } from "react";
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
} from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// import ProtectedStudent from './Protected Routes/ProtectedStudent';
// import ProtectedInstitute from './Protected Routes/ProtectedInstitute';
// import ProtectedAdmin from './Protected Routes/ProtectedAdmin';
// import ProtectedLanding from './Protected Routes/ProtectedLanding';
// import ProtectedTest from './Protected Routes/ProtectedTest';

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

          <Route element={<ProtectedGroundRoutes />}>
            <Route path="/GroundWorker" element={<GroundWorker />} />
          </Route>

          <Route element={<ProtectedCaseRoutes />}>
            <Route path="/CaseManager" element={<CaseManager />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

import React from 'react';
import HomePage from "./pages/HomePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import CreatePage from "./pages/CreatePage";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div data-theme="synthwave">
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/create" element={<CreatePage />} />
        <Route path="/NoteDetailPage" element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
}

export default App

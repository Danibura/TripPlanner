import { Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import JoinPage from "./pages/JoinPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create/:tripCode" element={<CreatePage />} />
      <Route path="/join" element={<JoinPage />} />
    </Routes>
  );
}

export default App;

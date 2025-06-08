import { Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import JoinPage from "./pages/JoinPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import MyTripsPage from "./pages/MyTripsPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/create/:tripCode" element={<CreatePage />} />
      <Route path="/join" element={<JoinPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/myTrips" element={<MyTripsPage />} />
    </Routes>
  );
}

export default App;

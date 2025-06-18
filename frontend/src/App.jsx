import { Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import JoinPage from "./pages/JoinPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import MyTripsPage from "./pages/MyTripsPage";
import PublicTripsPage from "./pages/PublicTripsPage";
import FriendsPage from "./pages/FriendsPage";
import NotificationsPage from "./pages/NotificationsPage";
import ForgotPage from "./pages/ForgotPage";
import ResetPage from "./pages/ResetPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/create/:tripCode" element={<CreatePage />} />
      <Route path="/join" element={<JoinPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/myTrips" element={<MyTripsPage />} />
      <Route path="/publicTrips" element={<PublicTripsPage />} />
      <Route path="/friends" element={<FriendsPage />}></Route>
      <Route path="/notifications" element={<NotificationsPage />}></Route>
      <Route path="/forgot" element={<ForgotPage />}></Route>
      <Route path="/reset-password/:resetToken" element={<ResetPage />}></Route>
    </Routes>
  );
}

export default App;

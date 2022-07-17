import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import EditUser from "./components/EditUser";
import UserList from "./components/UserList";
import New from "./components/New";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="users" />} />
          <Route path="users">
            <Route index element={<UserList />} />
            <Route path="edit">
              <Route path=":userId" element={<EditUser />} />
            </Route>
            <Route path="new" element={<New />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;

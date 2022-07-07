import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
//components
import Navbar from "./components/Navbar";
//pages
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
//styles
import "./App.css";
import { useAuthContext } from "./hooks/useAuthContext";
function App() {
  const { AuthIsReady, user } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        {AuthIsReady && (
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {user && <Home />}
                  {!user && <Navigate to="/login" />}
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  {user && <Navigate to="/" />}
                  {!user && <Login />}
                </>
              }
            />
            <Route
              path="/signup"
              element={
                <>
                  {user && <Navigate to="/" />}
                  {!user && <Signup />}
                </>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;

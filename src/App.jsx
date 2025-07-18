import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import User from "./Pages/User";
import Transactions from "./Pages/Transactions";
import PrivateRoute from "./routes/PrivateRoute";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/user"
            element={
              <PrivateRoute>
                <User />
              </PrivateRoute>
            }
          />
          <Route
            path="/transactions/:accountId"
            element={
              <PrivateRoute>
                <Transactions />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;

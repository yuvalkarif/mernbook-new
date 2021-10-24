import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Suspense } from "react";
import { lazily } from "react-lazily";
import "./App.css";
import { useAuth } from "./hooks/useAuth";
import UserContext from "./constants/context";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import ROUTES from "./constants/routes";

// import Login from "./components/login/Login";
const { Login } = lazily(() => import("./components/login/Login"));
const { Signup } = lazily(() => import("./components/signup/Signup"));
const { Profile } = lazily(() => import("./components/profile/Profile"));
const { Dashboard } = lazily(() => import("./components/dashboard/Dashboard"));
const { Search } = lazily(() => import("./components/search/Search"));

function App() {
  const [user, checkForUser] = useAuth();

  return (
    <UserContext.Provider value={user}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <ProtectedRoute path={ROUTES.DASHBOARD} exact>
              <Dashboard />
            </ProtectedRoute>
            <ProtectedRoute path={ROUTES.PROFILE + ":username"} exact>
              <Profile />
            </ProtectedRoute>
            <ProtectedRoute path={ROUTES.SEARCH} exact>
              <Search />
            </ProtectedRoute>
            <ProtectedRoute path={ROUTES.LOGIN} exact alt>
              <Login checkForUser={checkForUser} />
            </ProtectedRoute>
            <Route path={ROUTES.SIGNUP} exact>
              <Signup checkForUser={checkForUser} />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

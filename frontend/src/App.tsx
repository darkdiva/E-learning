import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SignupForm from './components/Signupform/SignupForm';
import SigninForm from './components/SigninForm/signinForm';
const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
          <li>
            <Link to="/signin">Sign in</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/signup">
          <SignupForm />
        </Route>
        <Route path="/signin">
          <SigninForm />
        </Route>
        <Route path="/">
          <div>Home</div>
        </Route>
        <Route path="api/home" element={<HomePage />} />
        <Route path="/api/admin/community" element={<Community />} />
      </Routes>
    </Router>
  );
};

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignInPage from './pages/SignInPage'
import HomePage from './pages/HomePage';
import ErrorPage from './pages/404page';
import UserDetails from './pages/UserDetails';
import stores from "./storage/store";
import { Provider } from "react-redux";
function App() {
  return (
    <Provider store={stores}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/SignIn" element={<SignInPage />} />
          <Route path="/details/:id/:email" element={<UserDetails />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

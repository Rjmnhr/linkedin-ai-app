import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home-page";
// import AIModelComponent from "./pages/AI-Model";
import ResultsPage from "./pages/results-page";
import LoginPage from "./pages/login-page";
import OtpVerification from "./pages/otp-verification";

import CarouselApp from "./components/carousel-component";

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div>
                  <HomePage />
                </div>
              </>
            }
          />
          <Route
            path="/details"
            element={
              <>
                <div>
                  <CarouselApp />
                </div>
              </>
            }
          />
          <Route
            path="/results"
            element={
              <>
                <div>
                  <ResultsPage />
                </div>
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <div>
                  <LoginPage />
                </div>
              </>
            }
          />
          <Route
            path="/otp-validation"
            element={
              <>
                <div>
                  <OtpVerification />
                </div>
              </>
            }
          />
          <Route
            path="/login-app"
            element={
              <>
                <div>
                  <LoginPage />
                </div>
              </>
            }
          />
          <Route
            path="/test"
            element={
              <>
                <div>
                  <CarouselApp />
                </div>
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home-page";
import AIModelComponent from "./pages/AI-Model";
import ResultsPage from "./pages/results-page";
import CareerFlowChart from "./flow-chart";

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
                  <AIModelComponent />
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
            path="/flow-chart"
            element={
              <>
                <div>
                  <CareerFlowChart />
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

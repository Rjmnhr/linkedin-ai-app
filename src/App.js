import "./App.css";
import { AppContextProvider } from "./app-context";
import AppRouter from "./app-router";

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <AppRouter />
      </AppContextProvider>
    </div>
  );
}

export default App;

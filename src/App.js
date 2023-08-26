import "./App.css";
import { AppContextProvider } from "./app-context";
import AppRouter from "./app-router";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <div className="App">
      <GoogleOAuthProvider clientId="661727724872-th06926h9p00270am6mid1dq0opdoeqc.apps.googleusercontent.com">
        <AppContextProvider>
          <AppRouter />
        </AppContextProvider>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;

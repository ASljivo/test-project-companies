import React, { FC } from "react";
import { Provider } from "react-redux";
import store from "./store";
import Routes from "./routes/Routes";
import { GoogleAuthProvider } from "./context/GoogleAuthProvider";

const App: FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <GoogleAuthProvider>
          <Routes />
        </GoogleAuthProvider>
      </Provider>
    </div>
  );
};

export default App;

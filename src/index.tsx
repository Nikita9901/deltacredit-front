import React /*, { createContext }*/ from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ModalProvider from "mui-modal-provider";
// import Store from "./store/store";

// interface State {
//   store: Store;
// }
// const store = new Store();

// export const Context = createContext<State>({ store });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <Context.Provider value={{ store }}>
  <Provider store={store}>
    <ModalProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ModalProvider>
  </Provider>
  // </Context.Provider>
);

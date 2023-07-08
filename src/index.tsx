import React /*, { createContext }*/ from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ModalProvider from "mui-modal-provider";
import { ToastContainer } from "react-toastify";
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
    <ToastContainer
      position="top-right"
      autoClose={1000}
      closeOnClick
      draggable
      closeButton={true}
    />
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
  // </Context.Provider>
);

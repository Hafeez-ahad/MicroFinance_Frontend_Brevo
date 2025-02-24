import React from "react";
import { Route, Routes } from "react-router-dom";
import { router } from "./router";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";


const App = () => {
  return (
    //   <Provider store={store}>
    //   <Routes>
    //    {router.map((value,ind)=>  <Route path={value.path} element={value.page} key={ind} />)}
    //   </Routes>

    // </Provider>

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          {router.map((value, ind) => (
            <Route path={value.path} element={value.page} key={ind} />
          ))}
        </Routes>
      </PersistGate>
    </Provider>
  );
};

export default App;

import React from "react";
import { Route, Routes } from "react-router-dom";
import { router } from "./router";
import { Provider } from "react-redux";
import { store } from "./redux/store";


const App = () => {
  return (
    //   <Provider store={store}>
    //   <Routes>
    //    {router.map((value,ind)=>  <Route path={value.path} element={value.page} key={ind} />)}
    //   </Routes>

    // </Provider>

    <Provider store={store}>
        <Routes>
          {router.map((value, ind) => (
            <Route path={value.path} element={value.page} key={ind} />
          ))}
        </Routes>
    </Provider>
  );
};

export default App;

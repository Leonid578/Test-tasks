import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LinksPrograss from "./component/LinksPrograss/Link";
import Calculator from "./component/Calculator/Calculator";
// import Header from "./component/Header/HeaderMenu";
import "./App.css";

function App() {
  function Loading() {
    return <h2>🌀 Loading...</h2>;
  }

  return (
    <div className="App">
      {/* <Header /> */}
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<LinksPrograss />}></Route>
          <Route path="/calculator" element={<Calculator />}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

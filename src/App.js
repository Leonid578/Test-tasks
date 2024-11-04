import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LinksPrograss from "./component/LinksPrograss/Link";
import Calculator from "./component/Calculator/Calculator";
import { ThemeProvider } from "./component/providers/ThemeProvider";
import "./App.css";

function App() {
  function Loading() {
    return <h2>🌀 Loading...</h2>;
  }

  return (
    <div className="App">
      <Suspense fallback={<Loading />}>
        <ThemeProvider>
            <Routes>
              <Route path="/" element={<LinksPrograss />}></Route>
              <Route path="/calculator" element={<Calculator />}></Route>
            </Routes>
        </ThemeProvider>
      </Suspense>
    </div>
  );
}

export default App;

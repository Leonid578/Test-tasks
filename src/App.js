import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LinksPrograss from "./component/LinksPrograss/Link";
import Calculator from "./component/Calculator/Calculator";
// import Layout from "./component/theme/Layout";
import { ThemeProvider } from "./component/providers/ThemeProvider";
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
        <ThemeProvider>
          {/* <Layout> */}
            <Routes>
              <Route path="/" element={<LinksPrograss />}></Route>
              <Route path="/calculator" element={<Calculator />}></Route>
            </Routes>
          {/* </Layout> */}
        </ThemeProvider>
      </Suspense>
    </div>
  );
}

export default App;

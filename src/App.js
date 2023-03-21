import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const [pageSize, country] = [12, "in"];
const apiKey = process.env.REACT_APP_API_KEY;
function App() {
  const [progress, setProgress] = useState(0);
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ paddingTop: "50px" }}>
        <LoadingBar color="#f11946" progress={progress} onLoaderFinished={() => setProgress(0)} />
        <Routes>
          <Route
            path="/"
            element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country={country} category="general" />}
          ></Route>
          <Route
            path="/business"
            element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country={country} category="business" />}
          ></Route>
          <Route
            path="/entertainment"
            element={
              <News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country={country} category="entertainment" />
            }
          ></Route>
          <Route
            path="/sports"
            element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country={country} category="sports" />}
          ></Route>
          <Route
            path="/science"
            element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country={country} category="science" />}
          ></Route>
          <Route
            path="/technology"
            element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country={country} category="technology" />}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

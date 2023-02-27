import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import { BrowserRouter, Route,  Routes } from "react-router-dom";

const [pageSize, country] = [12, "us"];

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<News key="general" pageSize={pageSize} country={country} category="general" />}></Route>
        <Route path="/business" element={<News key="business" pageSize={pageSize} country={country} category="business" />}></Route>
        <Route
          path="/entertainment"
          element={<News key="entertainment" pageSize={pageSize} country={country} category="entertainment" />}
        ></Route>
        <Route path="/sports" element={<News key="sports" pageSize={pageSize} country={country} category="sports" />}></Route>
        <Route path="/science" element={<News key="science" pageSize={pageSize} country={country} category="science" />}></Route>
        <Route
          path="/technology"
          element={<News key="technology" pageSize={pageSize} country={country} category="technology" />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

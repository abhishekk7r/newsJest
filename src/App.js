import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import { BrowserRouter, Route,  Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<News key="general" pageSize={6} country="in" category="general" />}></Route>
        <Route path="/business" element={<News key="business" pageSize={6} country="in" category="business" />}></Route>
        <Route
          path="/entertainment"
          element={<News key="entertainment" pageSize={6} country="in" category="entertainment" />}
        ></Route>
        <Route path="/sports" element={<News key="sports" pageSize={6} country="in" category="sports" />}></Route>
        <Route path="/science" element={<News key="science" pageSize={6} country="in" category="science" />}></Route>
        <Route path="/technology" element={<News key="technology" pageSize={6} country="in" category="technology" />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

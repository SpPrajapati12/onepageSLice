import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import UserList from "./components/UserList";
import { useSelector } from "react-redux";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route eaxct path="/" element={<UserList />}></Route>
          <Route exact path="/edit/:id" element={<UserList/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

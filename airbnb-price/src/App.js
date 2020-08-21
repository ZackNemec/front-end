import React from "react";
import Navigation from "./components/navigation";
import Login from "./components/login";
import Register from "./components/register";
import Routes from "./components/Routes";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Login />
        <Register />
      </Routes>
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import WorldClock from "./pages/WorldClock";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/world-clock" element={<WorldClock />} />
      </Routes>
    </Router>
  );
}

export default App;
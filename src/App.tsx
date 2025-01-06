import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import WorldClock from "./pages/WorldClock";
import TimeGPT from "./pages/TimeGPT";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/world-clock" element={<WorldClock />} />
        <Route path="/time-gpt" element={<TimeGPT />} />
      </Routes>
    </Router>
  );
}

export default App;
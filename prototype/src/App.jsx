import { Routes, Route, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useAutoAuth } from "./lib/useAutoAuth";
import { useSubmissionGuard } from "./lib/useSubmissionGuard";
import Home from "./pages/home/HomePage.jsx";
import Instructions from "./pages/instruction/InstructionPage.jsx";
import Survey from "./pages/survey/Survey.jsx";
import Panel from "./pages/panel/Panel.jsx";
import ScenarioEveryday from "./pages/scenarios/ScenarioEveryday.jsx";
import ScenarioDuress from "./pages/scenarios/ScenarioDuress.jsx";
import ThankYou from "./pages/ThankYou/ThankYou.jsx";
import "./App.css";

function App() {
  const { user, loading } = useAutoAuth();
  const [searchParams] = useSearchParams();
  useSubmissionGuard(!loading);

  useEffect(() => {
    const variant = searchParams.get("variant");
    if (variant) {
      sessionStorage.setItem("variant", variant);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Toaster position="top-left" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/ScenarioEveryday" element={<ScenarioEveryday />} />
        <Route path="/ScenarioDuress" element={<ScenarioDuress />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </>
  );
}

export default App;

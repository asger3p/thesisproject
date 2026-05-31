import { useState } from "react";
import { useBlockBrowserBack } from "../../lib/useBlockBrowserBack";
import { saveSessionData, getCurrentUserId } from "../../lib/parseService";
import PrimaryButton from "../../components/buttons/PrimaryButton/PrimaryButton";
import { SurveyLayout } from "./SurveySC";

const SURVEY_URL = "https://www.survey-xact.dk/LinkCollector?key=L41CU39UJP3J";

export default function Survey() {
  const [loading, setLoading] = useState(false);
  useBlockBrowserBack();

  const handleSurveyClick = async () => {
    setLoading(true);

    try {
      const sessionData = JSON.parse(
        localStorage.getItem("session_data") || "{}",
      );
      await saveSessionData(sessionData);
      const userId = await getCurrentUserId();
      window.location.href = `${SURVEY_URL}&id=${userId}`;
    } catch (err) {
      console.error("Submit failed:", err);
      setLoading(false);
    }
  };

  return (
    <SurveyLayout>
      <h1>Please complete the survey</h1>
      <PrimaryButton onClick={handleSurveyClick} disabled={loading}>
        {loading ? "Saving..." : "Go to Survey"}
      </PrimaryButton>
    </SurveyLayout>
  );
}

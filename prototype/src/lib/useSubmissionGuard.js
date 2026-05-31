import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getParse } from "./parseClient";
import { checkSubmissionStatus } from "./parseService";

export function useSubmissionGuard(ready = true) {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!ready) return;
    if (localStorage.getItem("survey_completed") === "true") {
      navigate("/thank-you");
      setChecking(false);
      return;
    }

    let cancelled = false;

    async function check() {
      const Parse = await getParse();
      if (!Parse.User.current()) {
        setChecking(false);
        return;
      }

      try {
        const submitted = await checkSubmissionStatus();
        if (cancelled) return;
        if (submitted) {
          localStorage.setItem("survey_completed", "true");
          navigate("/thank-you");
        }
      } catch (err) {
        console.error("useSubmissionGuard: check failed", err);
      } finally {
        if (!cancelled) setChecking(false);
      }
    }

    check();
    return () => {
      cancelled = true;
    };
  }, [ready]);

  return { checking };
}

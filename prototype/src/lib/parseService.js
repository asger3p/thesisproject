import { getParse } from "./parseClient";

//Get current user ID
export async function getCurrentUserId() {
  const Parse = await getParse();
  return Parse.User.current()?.id ?? "";
}

//Check if user already submitted response
export async function checkSubmissionStatus() {
  const Parse = await getParse();
  const result = await Parse.Cloud.run("checkSubmissionStatus");
  return result.submitted;
}

//Save answers to Database
export async function saveSessionData(sessionData) {
  const Parse = await getParse();
  const rawVariant = sessionStorage.getItem("variant");
  const result = await Parse.Cloud.run("submitSessionData", {
    ...sessionData,
    variant: rawVariant ? Number(rawVariant) : null,
    credentialsDestroyed:
      localStorage.getItem("credentials_destroyed") === "true",
  });
  return result;
}

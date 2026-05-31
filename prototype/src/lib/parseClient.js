let cached;

export async function getParse() {
  if (cached) return cached;

  if (typeof window === "undefined") {
    throw new Error("Parse needs the browser");
  }

  await import("parse/dist/parse.min.js");

  const Parse = window.Parse;
  if (!Parse || typeof Parse.initialize !== "function") {
    throw new Error("Parse did not attach to window.Parse (bundle mismatch)");
  }

  Parse.initialize(
    "kpwqm2gToQDj8TfmWOk1TJGFmnqL1VVuq2TdeA6f", // App ID
    "SvfdnlnVLhKnWSGuCIzXViWfFEXLU9SGJDVXr2Kj", // JS Key
  );

  Parse.serverURL = "https://parseapi.back4app.com/";

  cached = Parse;
  return Parse;
}

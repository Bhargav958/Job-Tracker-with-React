import { functions } from "./config";

/**
 * Executes the Appwrite Function that calls Gemini server-side.
 * Set `VITE_APPWRITE_AI_FUNCTION_ID` in your frontend env.
 */
export async function runAiInsight({ jobText, mode }) {
  const functionId = import.meta.env.VITE_APPWRITE_AI_FUNCTION_ID;
  if (!functionId) {
    throw new Error(
      "Missing VITE_APPWRITE_AI_FUNCTION_ID. Set it in your .env file."
    );
  }

  const payload = {
    mode, // "job_insights" | "interview_prep"
    jobText,
  };

  const res = await functions.createExecution(
    functionId,
    JSON.stringify(payload)
  );

  // Appwrite returns `responseBody` as a string
  try {
    return JSON.parse(res.responseBody || "{}");
  } catch {
    return { text: res.responseBody };
  }
}


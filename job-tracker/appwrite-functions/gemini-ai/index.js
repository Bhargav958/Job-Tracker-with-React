/**
 * Appwrite Function (Node runtime) - Gemini AI
 *
 * Env vars to set in Appwrite Function:
 * - GEMINI_API_KEY: your Gemini API key
 *
 * Expected input (JSON string):
 * {
 *   "mode": "job_insights" | "interview_prep",
 *   "jobText": "..."
 * }
 */

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

function buildPrompt({ mode, jobText }) {
  if (mode === "interview_prep") {
    return `You are an interview coach.
Given the job description below, produce:
1) 10 interview questions (mix behavioral + technical)
2) For each question: what a great answer should cover (bullet points)
3) 5 quick role-specific questions I should ask the interviewer

Return in clean markdown with headings.

JOB DESCRIPTION:
${jobText}`.trim();
  }

  // job_insights
  return `You are a recruiter + ATS optimizer.
Given the job description below, produce:
1) 10 key skills/keywords to include
2) 5 core responsibilities (bullet points)
3) 5 resume bullet rewrites (generic, no personal claims) tailored to this role
4) A short 1-paragraph summary of what the company likely wants

Return in clean markdown with headings.

JOB DESCRIPTION:
${jobText}`.trim();
}

export default async ({ req, res, log, error }) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.json(
        { error: "Missing GEMINI_API_KEY in function environment" },
        500
      );
    }

    const bodyRaw = req.bodyRaw || "";
    let input = {};
    try {
      input = bodyRaw ? JSON.parse(bodyRaw) : {};
    } catch {
      input = {};
    }

    const mode = input.mode === "interview_prep" ? "interview_prep" : "job_insights";
    const jobText = String(input.jobText || "").trim();
    if (!jobText) {
      return res.json({ error: "jobText is required" }, 400);
    }

    const prompt = buildPrompt({ mode, jobText });

    const geminiRes = await fetch(`${GEMINI_URL}?key=${encodeURIComponent(apiKey)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 900,
        },
      }),
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      error(errText);
      return res.json({ error: "Gemini request failed", details: errText }, 502);
    }

    const data = await geminiRes.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") || "";

    return res.json({ text, mode });
  } catch (e) {
    error(String(e?.stack || e));
    return res.json({ error: "Function crashed" }, 500);
  }
};


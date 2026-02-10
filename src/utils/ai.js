export async function extractIntent({ text, lang }) {
  const key = import.meta.env.VITE_OPENAI_KEY
  const model = import.meta.env.VITE_OPENAI_MODEL || "gpt-4o-mini"

  if (!key) {
    throw new Error("No AI key configured (VITE_OPENAI_KEY)")
  }

  const system = `You are an intent-extraction assistant. Respond ONLY with a JSON object, with keys: \n"category" (a dot-path like categories.health or plain key), and \n"keywords" (an array of short lowercase keywords). Do not include any explanation or additional text.`

  const userPrompt = `User language: ${lang}\nUser text: ${text}`

  const body = {
    model,
    messages: [
      { role: "system", content: system },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.0,
    max_tokens: 300,
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const textErr = await res.text().catch(() => "")
    throw new Error(`AI request failed: ${res.status} ${textErr}`)
  }

  const json = await res.json()
  const reply = json?.choices?.[0]?.message?.content || ""

  // Strict parse: try to find JSON substring
  try {
    const firstBrace = reply.indexOf('{')
    const lastBrace = reply.lastIndexOf('}')
    const candidate = firstBrace !== -1 && lastBrace !== -1 ? reply.slice(firstBrace, lastBrace + 1) : reply
    const parsed = JSON.parse(candidate)
    return {
      category: parsed.category || null,
      keywords: Array.isArray(parsed.keywords) ? parsed.keywords.map(k => String(k).toLowerCase()) : [],
      raw: reply,
    }
  } catch (err) {
    // fallback: return empty intent with raw reply
    return { category: null, keywords: [], raw: reply }
  }
}

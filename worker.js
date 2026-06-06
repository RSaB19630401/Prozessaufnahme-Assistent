/**
 * Cloudflare Worker – Proxy zur Anthropic/Claude-API für den Prozessaufnahme-Assistenten.
 *
 * Einrichtung:
 *  1. Neuen Worker anlegen (z. B. "prozess-api"). Diesen Code einfügen.
 *  2. Secret setzen:  npx wrangler secret put ANTHROPIC_API_KEY
 *     (oder im Dashboard: Settings > Variables and Secrets > ANTHROPIC_API_KEY)
 *  3. Worker deployen, die resultierende URL in index.html als WORKER_URL eintragen.
 *
 * Sicherheit: Es wird nur die unten gelistete(n) Origin(s) zugelassen.
 * Trage deine GitHub-Pages-Domain unter ALLOWED_ORIGINS ein.
 */

const ALLOWED_ORIGINS = [
  "https://rsab19630401.github.io",
  "http://localhost:8000",
  "http://127.0.0.1:5500",
];

// Modell der Claude-API. Bei Bedarf auf ein aktuelles Modell deines Kontos anpassen.
const DEFAULT_MODEL = "claude-sonnet-4-20250514";

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const cors = corsHeaders(origin);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }
    if (request.method !== "POST") {
      return json({ error: "Method Not Allowed" }, 405, cors);
    }
    if (!env.ANTHROPIC_API_KEY) {
      return json({ error: "ANTHROPIC_API_KEY ist nicht gesetzt." }, 500, cors);
    }

    let body;
    try {
      body = await request.json();
    } catch (e) {
      return json({ error: "Ungültiger Request-Body (kein JSON)." }, 400, cors);
    }

    const payload = {
      model: body.model || DEFAULT_MODEL,
      max_tokens: Math.min(body.max_tokens || 2500, 8000),
      system: body.system || "",
      messages: Array.isArray(body.messages) ? body.messages : [],
    };

    try {
      const upstream = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify(payload),
      });

      const text = await upstream.text();
      return new Response(text, {
        status: upstream.status,
        headers: { ...cors, "content-type": "application/json" },
      });
    } catch (e) {
      return json({ error: "Upstream-Fehler: " + String(e) }, 502, cors);
    }
  },
};

function corsHeaders(origin) {
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...cors, "content-type": "application/json" },
  });
}

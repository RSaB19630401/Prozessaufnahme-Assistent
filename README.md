# Prozessaufnahme-Assistent

Eine schlanke Web-App, die per geführtem Interview Geschäftsprozesse aufnimmt und modelliert –
mit jeweils genau einer Frage pro Schritt, deterministischem Prozessdiagramm und vollständigem Export.

Läuft als statische Seite (GitHub Pages); die KI-Anfragen laufen über einen eigenen
Cloudflare Worker als Proxy zur Claude-API. Kein Build, keine lokale Toolchain nötig.

## Funktionen

- **Drei Einstiege:** Grüne Wiese (Soll-/Zielprozess), bestehende Aktivitäten (Ist-Prozess, auch per Excel-/CSV-Upload) und Stand importieren.
- **Geführtes Interview:** immer genau eine Frage; die KI wählt die jeweils nächste wichtigste Lücke entlang eines festen Erhebungsrasters.
- **Befehle als Buttons:** Prozessbild anzeigen · Gesamtexport erstellen · Zwischenstand exportieren (JSON) · Stand importieren · Neu starten.
- **Exporte:** Prozessbeschreibung, Gesprächsprotokoll, Mermaid-Diagramm, offene Fragen, Automatisierungsvorschläge, JSON-Prozessstand.
- **Automatisches Speichern** im Browser (localStorage) mit „Fortsetzen".

## Prozessbild

Das Diagramm wird **deterministisch im Code** aus dem JSON-Stand erzeugt (kein zweiter KI-Aufruf):
Aktivitäten als Kästen, Entscheidungen als Rauten, Start/Ende abgerundet. Sind Vorgänger
oder Entscheidungsziele gepflegt, wird der echte Ablauf-Graph gezeichnet, sonst eine lineare
Kette. Rollen werden farblich codiert (mit Legende). So spiegelt das Bild exakt die erfassten
Daten wider, ohne Neu-Interpretation – und dasselbe Diagramm landet unverändert im Gesamtexport.

## Dateien

| Datei | Zweck | Wohin |
|-------|-------|-------|
| `index.html` | Die komplette App (React via CDN) | GitHub-Repo (Wurzel) |
| `worker.js` | Cloudflare Worker als Claude-Proxy | Cloudflare (nicht zwingend ins Repo) |
| `README.md` | Diese Beschreibung | GitHub-Repo (Wurzel) |

## Einrichtung

### 1. Cloudflare Worker
1. Neuen Worker anlegen (Vorschlag: `prozess-api`), Inhalt von `worker.js` einfügen.
2. Secret setzen: `ANTHROPIC_API_KEY` (Dashboard → Settings → Variables and Secrets).
3. Deployen. Ergebnis-URL z. B. `https://prozess-api.rsab1963.workers.dev`.
4. In `worker.js` bei Bedarf `DEFAULT_MODEL` anpassen. `ALLOWED_ORIGINS` enthält bereits
   `https://rsab19630401.github.io` (eine Origin ist Schema + Host, der Repo-Pfad spielt keine Rolle).

### 2. GitHub Pages
1. `index.html` (und `README.md`) ins Repo legen, committen.
2. Settings → Pages → „Deploy from a branch", Branch `main`, Ordner `/ (root)`.
3. Seite läuft unter `https://rsab19630401.github.io/Prozessaufnahme-Assistent/`.

### 3. Verdrahten
In `index.html` die Konstante `WORKER_URL` auf die Worker-URL setzen (ersetzt `DEINE_WORKER_URL_HIER`),
committen. **Reihenfolge:** erst Worker (Schritt 1), dann WORKER_URL eintragen – sonst meldet die App „WORKER_URL fehlt".

## Hinweise

- CSV-Zeichenkodierung: UTF-8 wird erkannt; bei alten Windows-1252-Dateien können Umlaute verfälscht ankommen – dann als UTF-8 oder echtes `.xlsx` speichern.
- Das verwendete Claude-Modell steuerst du über `DEFAULT_MODEL` im Worker.

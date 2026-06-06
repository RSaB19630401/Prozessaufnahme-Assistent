# KI-Lernplattform – GitHub-Paket

Statische Single-File-App (HTML + React via CDN). Kein Build, kein npm nötig.

## Inhalt
- `index.html` – die komplette App
- `.nojekyll` – verhindert Jekyll-Verarbeitung auf GitHub Pages

## Deployment auf GitHub Pages (Web-Editor, ohne CLI)
1. Neues Repository anlegen (oder vorhandenes nutzen).
2. `index.html` und `.nojekyll` per Drag & Drop hochladen (Add file → Upload files → Commit).
3. Settings → Pages → Source: **Deploy from a branch** → Branch `main`, Ordner `/ (root)` → Save.
4. Nach ein paar Minuten ist die Seite unter `https://<dein-name>.github.io/<repo>/` erreichbar.

## KI-Chat aktivieren
Der Tab **KI-Berater** spricht über einen Cloudflare-Worker (siehe Cloudflare-Paket).
1. Worker deployen und dessen URL kopieren.
2. In `index.html` die Zeile mit `const WORKER_URL = "https://DEIN-WORKER.workers.dev";`
   auf deine echte Worker-URL ändern (im Web-Editor: Bleistift-Symbol, Strg+F nach `WORKER_URL`).
3. Committen – fertig. Ohne gültige `WORKER_URL` zeigt der Chat einen Hinweis und bleibt inaktiv.

## Hinweise
- Die App enthält 30 Use Cases (filterbar nach Abteilung und Mitarbeitergruppe), Prompt-Bibliothek,
  Reifegradmodell, Tool-Überblick und Governance.
- Der Chat schickt zu jeder Frage automatisch die passenden Use Cases als Kontext an den Worker.
- Bitte keine vertraulichen oder personenbezogenen Daten in den Chat eingeben.

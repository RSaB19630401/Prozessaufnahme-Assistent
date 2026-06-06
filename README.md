# KI-Lernplattform

Statische Single-File-Lernplattform (HTML + React via CDN). Kein Build, kein npm,
keine externen Dienste, keine KI-Funktionalität – läuft rein im Browser.

## Inhalt
- `index.html` – die komplette App
- `.nojekyll` – verhindert Jekyll-Verarbeitung auf GitHub Pages

## Inhalte der Plattform
- KI verstehen (Grundlagen, Fähigkeiten, Modelle, Grenzen)
- Strategie & 30-Tage-Quickstart
- 30 Use Cases, filterbar nach Abteilung und Mitarbeitergruppe
  (je mit Governance-Ampel, Beispiel, KPIs und fertigen Prompts)
- Prompt-Bibliothek (durchsuchbar)
- Reifegradmodell
- Tool-Überblick
- Governance & Sicherheit

## Deployment auf GitHub Pages (Web-Editor, ohne CLI)
1. Repository anlegen (oder vorhandenes nutzen).
2. `index.html` und `.nojekyll` hochladen (Add file → Upload files → Commit).
3. Settings → Pages → Source: **Deploy from a branch** → Branch `main`, Ordner `/ (root)` → Save.
4. Nach wenigen Minuten ist die Seite unter `https://<dein-name>.github.io/<repo>/` erreichbar.

## Hinweis
Die Prompts sind zum Kopieren gedacht und in einem KI-Tool deiner Wahl einzusetzen.
Die Plattform selbst sendet keine Daten und ruft keine KI-Dienste auf.

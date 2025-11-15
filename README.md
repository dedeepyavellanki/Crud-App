# Simple CRUD App

Simple Express + SQLite example to create, read, update and delete items.

Quick start

1. Install dependencies:

	For PowerShell (Windows):

	```powershell
	npm install
	```

2. Run the app:

	```powershell
	npm start
	```

	The server listens on http://localhost:3000 by default.

Windows notes

- On PowerShell, to start the server in the background you can use:

  ```powershell
  Start-Process -FilePath node -ArgumentList 'server.js' -PassThru
  ```

- The app stores data in `data.db` in the project root. Add `data.db` to `.gitignore` (already done).

API

- GET /api/items — list items
- POST /api/items — create { name, description }
- GET /api/items/:id — get item
- PUT /api/items/:id — update { name, description }
- DELETE /api/items/:id — delete

Simple verification (smoke test)

After starting the server, you can verify with PowerShell:

```powershell
# show empty list (should return JSON array)
Invoke-WebRequest -UseBasicParsing http://localhost:3000/api/items | Select-Object -ExpandProperty Content
```

Frontend

Open http://localhost:3000 in your browser to access the minimal UI at `public/index.html` which exercises the API.

Resetting data

To remove all data, stop the server and delete `data.db` then restart; a fresh DB will be created.

# Troubleshooting

---

## React Blank Page

### Cause

React hooks used outside component.

### Solution

Move all useState hooks inside the React component.

---

## Empty Alembic Migration

### Cause

Model not imported.

### Solution

Import model inside app/models/__init__.py

---

## CORS Error

### Cause

Missing CORSMiddleware.

### Solution

```python
app.add_middleware(
    CORSMiddleware,
    ...
)
```

---

## Port Already in Use

### Cause

Existing uvicorn process already running.

### Solution

```bash
lsof -i :8000
kill -9 PID
```

or stop the running uvicorn process.

---

## Path Alias Issue

### Cause

Incorrect TypeScript path alias configuration.

### Solution

Configure alias in tsconfig.app.json and Vite.
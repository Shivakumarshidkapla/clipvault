from fastapi import FastAPI

app = FastAPI(
    title="ClipVault API",
    version="1.0.0"
)


@app.get("/")
def root():
    return {"message": "ClipVault API Running"}
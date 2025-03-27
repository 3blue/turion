from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import router

app = FastAPI(
    title="Telemetry API",
    docs_url=None,
    redoc_url=None
)

origins = [
    "http://localhost:5173",  # frontend dev server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,            # allow your frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

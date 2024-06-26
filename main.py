# main.py

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from routers import auth, apis, views, smartphones, display, goods, xhr, pf

app = FastAPI()

app.mount("/sec/static", StaticFiles(directory="static"), name="static")

app.include_router(auth.router)
app.include_router(views.router)
app.include_router(apis.router)
app.include_router(smartphones.router)
app.include_router(display.router)
app.include_router(goods.router)
app.include_router(pf.router)
app.include_router(xhr.router)

@app.get("/")
async def home():
    return {"message": "Hell World"}

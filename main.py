# main.py

from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

from routers import auth, apis, views, smartphones, display, goods, xhr, cxhr, pf

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
app.include_router(cxhr.router)

templates = Jinja2Templates(directory="templates")

@app.get("/")
async def home():
    return {"message": "Hell World"}

@app.get("/google4692736c0f1c2826.html")
async def verify(request: Request):
    pageData = {"request": request}

    response = templates.TemplateResponse("google4692736c0f1c2826.html", pageData)

    return response

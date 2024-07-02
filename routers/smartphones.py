from fastapi import APIRouter, Request, Depends, Form
from fastapi.responses import HTMLResponse, Response, JSONResponse
from fastapi.templating import Jinja2Templates
from fastapi.encoders import jsonable_encoder
from core import schemas

# Dummy Data
import routers.dummy as dummy

import json

router = APIRouter(
  prefix="/sec/smartphones",
  tags=['smartphones'],
  responses={404: {"description": "Not found"}}
)

templates = Jinja2Templates(directory="templates")

@router.get("/", response_class=HTMLResponse)
async def smartphones(request: Request):
    template_data = {
        "request": request
    }

    response = templates.TemplateResponse("smartphones.html", template_data)
    return response

@router.get("/", response_class=HTMLResponse)
async def all_smartphones(request: Request):
    template_data = {
        "request": request
    }

    response = templates.TemplateResponse("smartphones.html", template_data)
    return response

@router.get("/all-smartphones/", response_class=HTMLResponse)
async def all_smartphones(request: Request):
    template_data = {
        "request": request
    }

    response = templates.TemplateResponse("all-smartphones.html", template_data)
    return response

@router.get("/{category}/", response_class=HTMLResponse)
async def category(request: Request, category: str):
    template_data = {
        "request": request
    }

    response = templates.TemplateResponse(f"{category}.html", template_data)
    return response

@router.get("/{model_name}/{model_no}/", response_class=HTMLResponse)
async def smartphone(request: Request, model_name: str, model_no: str):
    print("model_name:", model_name, "model_no:", model_no)
    template_data = {
        "request": request
    }

    response = templates.TemplateResponse(f"{model_no}.html", template_data)
    return response

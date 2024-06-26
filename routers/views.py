from fastapi import APIRouter, Request, Depends, Form
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

router = APIRouter(
  prefix="",
  tags=['views'],
  responses={404: {"description": "Not found"}}
)

templates = Jinja2Templates(directory="templates")

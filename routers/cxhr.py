from fastapi import APIRouter, Request, Depends, Form, HTTPException
from fastapi.responses import HTMLResponse, Response, JSONResponse
from fastapi.templating import Jinja2Templates
from fastapi.encoders import jsonable_encoder
from core import schemas

import routers.dummy as dummy

router = APIRouter(
    prefix="/sec/cxhr",
    tags=['cßxhr'],
    responses={404: {"description": "Not found"}}
)

templates = Jinja2Templates(directory="templates/details")

@router.get("/display/getGnbByUrl", response_class=JSONResponse)
async def get_gnb_by_url(stId: int,
                         linkUrl: str):
    print('/sec/cxhr/display/getGnbByUrl')
    print("params:", stId, ",", linkUrl)
    
    response = dummy.cxhr_display_gnb_by_url_json

    return JSONResponse(content=jsonable_encoder(response))

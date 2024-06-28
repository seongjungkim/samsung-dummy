from fastapi import APIRouter, Request, Depends, Form, HTTPException
from fastapi.responses import HTMLResponse, Response, JSONResponse, PlainTextResponse
from fastapi.templating import Jinja2Templates
from fastapi.encoders import jsonable_encoder
from core import schemas

import routers.dummy as dummy
import routers.dummy_goods as dummy_goods

router = APIRouter(
    prefix="/sec/xhr",
    tags=['xhr'],
    responses={404: {"description": "Not found"}}
)

templates = Jinja2Templates(directory="templates")

#req: schemas.GoodsListRequest = Depends()
@router.post("/pf/personalization", response_class=JSONResponse)
async def personalization(request: Request):
    print('/sec/xhr/pf/personalization')
    
    response = dummy.personalization_json

    return JSONResponse(content=jsonable_encoder(response))

@router.post("/member/getLoginFlag", response_class=PlainTextResponse)
async def get_login_flag(request: Request):
    print('/member/getLoginFlag')
    
    response = "{\"mbrNo\":0,\"appAutoLogin\":\"Y\",\"kdpAutoLogin\":\"Y\",\"appWebsamsungaccount\":\"Y\"}"

    return response

@router.post("/member/auto/loginSucces", response_class=JSONResponse)
async def login_succes(request: Request):
    print('/member/auto/loginSucces')
    
    response = dummy.auto_login_success_json

    return JSONResponse(content=jsonable_encoder(response))

@router.post("/member/getSession", response_class=PlainTextResponse)
async def get_session(request: Request):
    print('/member/getSession')
    
    response = "{\"mbrNo\":0,\"membershipYn\":\"N\",\"mbrNm\":\"GUEST\",\"stId\":1,\"gcsMbrNo\":0}"

    return response

@router.post("/order/gnbCartCount", response_class=PlainTextResponse)
async def get_session(request: Request):
    print('/order/gnbCartCount')
    
    response = "0"

    return response

@router.post("/display/getGoods", response_class=HTMLResponse)
async def get_goods(request: Request):
    print('/sec/xhr/display/getGoods')
    
    pageData = {"request": request}

    response = templates.TemplateResponse("get_goods.html", pageData)

    return response

@router.post("/display/getIncGoodsPfCompare", response_class=HTMLResponse)
async def get_inc_goods_pf_compare(request: Request):
    print('/sec/xhr/display/getIncGoodsPfCompare')
    
    pageData = {"request": request}

    response = templates.TemplateResponse("get_inc_goods_pf_compare.html", pageData)

    return response

@router.post("/display/componentGoodsCouponPrice", response_class=JSONResponse)
async def component_goods_coupon_price(request: Request):
    print('/sec/xhr/display/componentGoodsCouponPrice')
    
    response = dummy_goods.component_goods_coupon_price_json

    return JSONResponse(content=jsonable_encoder(response))

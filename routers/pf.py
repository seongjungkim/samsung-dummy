from fastapi import APIRouter, Request, Depends, Form, HTTPException
from fastapi.responses import HTMLResponse, Response, JSONResponse
from fastapi.templating import Jinja2Templates
from fastapi.encoders import jsonable_encoder
from core import schemas

import routers.goods_list as goodsList

router = APIRouter(
    prefix="/sec/pf",
    tags=['xhr'],
    responses={404: {"description": "Not found"}}
)

#req: schemas.GoodsListRequest = Depends()
@router.get("/goodsList", response_class=JSONResponse)
async def goods_list(searchFilter: str,
                    dispClsfNo: int,
                    sortType: int,
                    page: int,
                    rows: int,
                    ehcacheYn: bool,
                    soldOutExceptYn: bool,
                    pfFasterUseYn: bool,
                    secApp: bool,
                    secIos: bool):
    print('/sec/pf/goodsList')
    #print(req)
    
    response = goodsList.goodslist_json

    return JSONResponse(content=jsonable_encoder(response))

#async def goods_list_more(req: schemas.GoodsListRequest):
@router.get("/goodsListMore", response_class=JSONResponse)
async def goods_list_more(searchFilter: str,
                          dispClsfNo: int,
                          sortType: int,
                          page: int,
                          offset: int,
                          rows: int,
                          soldOutExceptYn: bool,
                          pfFasterUseYn: bool,
                          secApp: bool,
                          secIos: bool):
    print('/sec/pf/goodsListMore')
    #print(req)
    
    if page == 2:
        response = goodsList.goodslist_more_2_json
    elif page == 3:
        response = goodsList.goodslist_more_3_json

    return JSONResponse(content=jsonable_encoder(response))
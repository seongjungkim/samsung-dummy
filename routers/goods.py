from fastapi import APIRouter, Request, Body, Depends, Form, HTTPException
from fastapi.responses import HTMLResponse, PlainTextResponse, Response, JSONResponse
from fastapi.templating import Jinja2Templates
from fastapi.encoders import jsonable_encoder
from core import schemas

import routers.dummy as dummy

router = APIRouter(
    prefix="/sec/xhr/goods",
    tags=['xhr'],
    responses={404: {"description": "Not found"}}
)

templates = Jinja2Templates(directory="templates")

@router.post("/loadGoodsAdvancedCommentList", response_class=HTMLResponse)
async def load_goods_advanced_comment_list(request: Request):
    print('/sec/xhr/goods/loadGoodsAdvancedCommentList')
    
    pageData = {"request": request}

    response = templates.TemplateResponse("goods_advanced_comment_list.html", pageData)

    return response

@router.get("/getCompExcptUrl", response_class=JSONResponse)
async def get_comp_excpt_url():
    print('/sec/xhr/goods/getCompExcptUrl')
    
    response = dummy.get_comp_excpt_url_json

    return JSONResponse(content=jsonable_encoder(response))

@router.post("/getFirstRecentGoods", response_class=PlainTextResponse)
async def get_first_recent_goods(request: Request):
    print('/sec/xhr/goods/getFirstRecentGoods')
    #print(req)
    
    response = "{\"stContextPath\":\"/sec/\",\"recentGoodsNm\":\"갤럭시 S24 Ultra 자급제\",\"recentYn\":\"Y\",\"recentImgPath\":\"//images.samsung.com/kdp/goods/2023/12/27/1b274202-3256-415d-9ddb-e3a40e7c94d2.png\",\"recentGoodsLength\":1}"

    return response

@router.post("/membershipPolicy", response_class=JSONResponse)
async def membership_policy(request: Request):
    print('/sec/xhr/goods/membershipPolicy')
    #print(req)
    
    response = {
        "isLogin": False,
        "totalPoint": 1914,
        "basicRate": "0.1",
        "basicRatePoint": 1914,
        "aplPoint": 0,
        "mdlAddPoint": 0,
        "limitPoint": 0,
        "addRate": None,
        "addRatePoint": 0,
        "membershipGrdNm": None,
        "membershipGrd": None
    }

    return JSONResponse(content=jsonable_encoder(response))

@router.post("/goodsSpec", response_class=HTMLResponse)
async def goods_spec(request: Request):
    print('/sec/xhr/goods/goodsSpec')

    form_data = await request.form()
    print(form_data)
    goods_id = form_data.get("goodsId")
    goods_tp_cd = form_data.get("goodsTpCd")
    
    pageData = {"request": request}

    if goods_id == 'G000380038':
        response = templates.TemplateResponse("specs/SM-S928NZTNKOO.html", pageData)
    elif goods_id == 'G000380048':
        response = templates.TemplateResponse("specs/SM-S928NLBNKOO.html", pageData)
    elif goods_id == 'G000380020':
        response = templates.TemplateResponse("specs/SM-S926NZVEKOO.html", pageData)
    elif goods_id == 'G000380027':
        response = templates.TemplateResponse("specs/SM-S926NLBEKOO.html", pageData)
    elif goods_id == 'G000380013':
        response = templates.TemplateResponse("specs/SM-S921NLBFKOO.html", pageData)
    elif goods_id == 'G000380067':
        response = templates.TemplateResponse("specs/SM-S928NZTEKOD.html", pageData)
    elif goods_id == 'G000380059':
        response = templates.TemplateResponse("specs/SM-S926NZVAKOD.html", pageData)
    elif goods_id == 'G000380051':
        response = templates.TemplateResponse("specs/SM-S921NZYEKOD.html", pageData)
    elif goods_id == 'G000326308':
        response = templates.TemplateResponse("specs/SM-S711NZPWKOO.html", pageData)
    elif goods_id == 'G000326310':
        response = templates.TemplateResponse("specs/SM-S711NZBWKOO.html", pageData)
    elif goods_id == 'G000381004':
        response = templates.TemplateResponse("specs/SM-S711NZPWKOD.html", pageData)
    elif goods_id == 'G000290075':
        response = templates.TemplateResponse("specs/SM-S918NZGEKOO.html", pageData)
    elif goods_id == 'G000290062':
        response = templates.TemplateResponse("specs/SM-S916NLIAKOO.html", pageData)
    elif goods_id == 'G000290056':
        response = templates.TemplateResponse("specs/SM-S911NZEEKOO.html", pageData)
    #else:
    #    response = templates.TemplateResponse("specs/SM-S928NZTNKOO.html", pageData)

    return response

@router.post("/getGoodsSpecList", response_class=HTMLResponse)
async def get_goods_spec_list(request: Request):
    print('/sec/xhr/goods/getGoodsSpecList')

    form_data = await request.form()
    print(form_data)
    goods_id = form_data.get("goodsId")
    goods_tp_cd = form_data.get("goodsTpCd")
    
    pageData = {"request": request}

    if goods_id == 'G000380038':
        response = templates.TemplateResponse("speclist/SM-S928NZTNKOO.html", pageData)
    elif goods_id == 'G000380048':
        response = templates.TemplateResponse("speclist/SM-S928NLBNKOO.html", pageData)
    elif goods_id == 'G000380020':
        response = templates.TemplateResponse("speclist/SM-S926NZVEKOO.html", pageData)
    elif goods_id == 'G000380027':
        response = templates.TemplateResponse("speclist/SM-S926NLBEKOO.html", pageData)
    elif goods_id == 'G000380013':
        response = templates.TemplateResponse("speclist/SM-S921NLBFKOO.html", pageData)
    elif goods_id == 'G000380067':
        response = templates.TemplateResponse("speclist/SM-S928NZTEKOD.html", pageData)
    elif goods_id == 'G000380059':
        response = templates.TemplateResponse("speclist/SM-S926NZVAKOD.html", pageData)
    elif goods_id == 'G000380051':
        response = templates.TemplateResponse("speclist/SM-S921NZYEKOD.html", pageData)
    elif goods_id == 'G000326308':
        response = templates.TemplateResponse("speclist/SM-S711NZPWKOO.html", pageData)
    elif goods_id == 'G000326310':
        response = templates.TemplateResponse("speclist/SM-S711NZBWKOO.html", pageData)
    elif goods_id == 'G000381004':
        response = templates.TemplateResponse("speclist/SM-S711NZPWKOD.html", pageData)
    elif goods_id == 'G000290075':
        response = templates.TemplateResponse("speclist/SM-S918NZGEKOO.html", pageData)
    elif goods_id == 'G000290062':
        response = templates.TemplateResponse("speclist/SM-S916NLIAKOO.html", pageData)
    elif goods_id == 'G000290056':
        response = templates.TemplateResponse("speclist/SM-S911NZEEKOO.html", pageData)
    #else:
    #    response = templates.TemplateResponse("speclist/SM-S928NZTNKOO.html", pageData)

    return response

@router.post("/goodsManual", response_class=HTMLResponse)
async def goods_manual(request: Request):
    print('/sec/xhr/goods/goodsManual')

    form_data = await request.form()
    print(form_data)
    goods_id = form_data.get("goodsId")
    goods_tp_cd = form_data.get("goodsTpCd")
    
    pageData = {"request": request}

    if goods_id == 'G000380038':
        response = templates.TemplateResponse("manuals/SM-S928NZTNKOO.html", pageData)
    elif goods_id == 'G000380048':
        response = templates.TemplateResponse("manuals/SM-S928NLBNKOO.html", pageData)
    elif goods_id == 'G000380020':
        response = templates.TemplateResponse("manuals/SM-S926NZVEKOO.html", pageData)
    elif goods_id == 'G000380027':
        response = templates.TemplateResponse("manuals/SM-S926NLBEKOO.html", pageData)
    elif goods_id == 'G000380013':
        response = templates.TemplateResponse("manuals/SM-S921NLBFKOO.html", pageData)
    elif goods_id == 'G000380067':
        response = templates.TemplateResponse("manuals/SM-S928NZTEKOD.html", pageData)
    elif goods_id == 'G000380059':
        response = templates.TemplateResponse("manuals/SM-S926NZVAKOD.html", pageData)
    elif goods_id == 'G000380051':
        response = templates.TemplateResponse("manuals/SM-S921NZYEKOD.html", pageData)
    elif goods_id == 'G000326308':
        response = templates.TemplateResponse("manuals/SM-S711NZPWKOO.html", pageData)
    elif goods_id == 'G000326310':
        response = templates.TemplateResponse("manuals/SM-S711NZBWKOO.html", pageData)
    elif goods_id == 'G000381004':
        response = templates.TemplateResponse("manuals/SM-S711NZPWKOD.html", pageData)
    elif goods_id == 'G000290075':
        response = templates.TemplateResponse("manuals/SM-S918NZGEKOO.html", pageData)
    elif goods_id == 'G000290062':
        response = templates.TemplateResponse("manuals/SM-S916NLIAKOO.html", pageData)
    elif goods_id == 'G000290056':
        response = templates.TemplateResponse("manuals/SM-S911NZEEKOO.html", pageData)
    #else:
    #    response = templates.TemplateResponse("manuals/SM-S928NZTNKOO.html", pageData)

    return response

#async def goods_detail(request: Request, req: schemas.GoodsDetailRequest):
"""
goodsId: str,
    goodsTpCd: int,
    adminYn: bool = No,
    adminPriceYn: bool = No,
    samsungstore: str = None
async def goods_detail(request: Request, goodsId: str, goodsTpCd: int, adminYn: bool, adminPriceYn: bool, samsungstore: str):
"""
#goodsId=G000380048&goodsTpCd=10&adminYn=&adminPriceYn=&samsungstore=
@router.post("/goodsDetail", response_class=HTMLResponse)
async def goods_detail(request: Request):

    print('/sec/xhr/goods/goodsDetail')

    #오류
    #request.query_params['goodsId']

    #정상
    #body = request.form()
    #print('params:', body)

    form_data = await request.form()
    print(form_data)
    goods_id = form_data.get("goodsId")
    goods_tp_cd = form_data.get("goodsTpCd")
    admin_yn = form_data.get("adminYn")
    admin_price_yn = form_data.get("adminPriceYn")
    samsungstore = form_data.get("samsungstore")

    #print(req)
    pageData = {"request": request}

    if goods_id == 'G000380038':
        response = templates.TemplateResponse("details/SM-S928NZTNKOO.html", pageData)
    elif goods_id == 'G000380048':
        response = templates.TemplateResponse("details/SM-S928NLBNKOO.html", pageData)
    elif goods_id == 'G000380020':
        response = templates.TemplateResponse("details/SM-S926NZVEKOO.html", pageData)
    elif goods_id == 'G000380027':
        response = templates.TemplateResponse("details/SM-S926NLBEKOO.html", pageData)
    elif goods_id == 'G000380013':
        response = templates.TemplateResponse("details/SM-S921NLBFKOO.html", pageData)
    elif goods_id == 'G000380067':
        response = templates.TemplateResponse("details/SM-S928NZTEKOD.html", pageData)
    elif goods_id == 'G000380059':
        response = templates.TemplateResponse("details/SM-S926NZVAKOD.html", pageData)
    elif goods_id == 'G000380051':
        response = templates.TemplateResponse("details/SM-S921NZYEKOD.html", pageData)
    elif goods_id == 'G000326308':
        response = templates.TemplateResponse("details/SM-S711NZPWKOO.html", pageData)
    elif goods_id == 'G000326310':
        response = templates.TemplateResponse("details/SM-S711NZBWKOO.html", pageData)
    elif goods_id == 'G000381004':
        response = templates.TemplateResponse("details/SM-S711NZPWKOD.html", pageData)
    elif goods_id == 'G000290075':
        response = templates.TemplateResponse("details/SM-S918NZGEKOO.html", pageData)
    elif goods_id == 'G000290062':
        response = templates.TemplateResponse("details/SM-S916NLIAKOO.html", pageData)
    elif goods_id == 'G000290056':
        response = templates.TemplateResponse("details/SM-S911NZEEKOO.html", pageData)
    #else:
    #    response = templates.TemplateResponse("details/SM-S928NZTNKOO.html", pageData)

    return response
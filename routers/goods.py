from fastapi import APIRouter, Request, Body, Depends, Form, HTTPException
from fastapi.responses import HTMLResponse, Response, JSONResponse
from fastapi.templating import Jinja2Templates
from fastapi.encoders import jsonable_encoder
from core import schemas

import routers.dummy as dummy

router = APIRouter(
    prefix="/sec/xhr/goods",
    tags=['xhr'],
    responses={404: {"description": "Not found"}}
)

detail_templates = Jinja2Templates(directory="templates/details")
spec_templates = Jinja2Templates(directory="templates/specs")
speclist_templates = Jinja2Templates(directory="templates/speclist")
manual_templates = Jinja2Templates(directory="templates/manuals")

@router.post("/loadGoodsAdvancedCommentList", response_class=JSONResponse)
async def load_goods_advanced_comment_list(request: Request):
    print('/sec/xhr/goods/loadGoodsAdvancedCommentList')
    #print(req)
    
    response = {
        "result": {
            "source": "dialogflow",
            "score": 0.0,
            "simpleResponses": {
                "simpleResponses": [
                    {
                        "textToSpeech": "오류가 발생했습니다.",
                        "ssml": "",
                        "displayText": "오류가 발생했습니다."
                    }
                ]
            }
        },
        "status": {
            "code": 200
        },
        "genAi": True,
        "eventTags": []
    }

    return JSONResponse(content=jsonable_encoder(response))

@router.get("/getCompExcptUrl", response_class=JSONResponse)
async def get_comp_excpt_url():
    print('/sec/xhr/goods/getCompExcptUrl')
    
    response = dummy.get_comp_excpt_url_json

    return JSONResponse(content=jsonable_encoder(response))

@router.post("/getFirstRecentGoods", response_class=JSONResponse)
async def get_first_recent_goods(request: Request):
    print('/sec/xhr/goods/getFirstRecentGoods')
    #print(req)
    
    response = {
        "result": {
            "source": "dialogflow",
            "score": 0.0,
            "simpleResponses": {
                "simpleResponses": [
                    {
                        "textToSpeech": "오류가 발생했습니다.",
                        "ssml": "",
                        "displayText": "오류가 발생했습니다."
                    }
                ]
            }
        },
        "status": {
            "code": 200
        },
        "genAi": True,
        "eventTags": []
    }

    return JSONResponse(content=jsonable_encoder(response))

@router.post("/membershipPolicy", response_class=JSONResponse)
async def membership_policy(request: Request):
    print('/sec/xhr/goods/membershipPolicy')
    #print(req)
    
    response = {
        "result": {
            "source": "dialogflow",
            "score": 0.0,
            "simpleResponses": {
                "simpleResponses": [
                    {
                        "textToSpeech": "오류가 발생했습니다.",
                        "ssml": "",
                        "displayText": "오류가 발생했습니다."
                    }
                ]
            }
        },
        "status": {
            "code": 200
        },
        "genAi": True,
        "eventTags": []
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
        response = spec_templates.TemplateResponse("SM-S928NZTNKOO.html", pageData)
    elif goods_id == 'G000380048':
        response = detail_templates.TemplateResponse("SM-S928NLBNKOO.html", pageData)
    elif goods_id == 'G000380020':
        response = spec_templates.TemplateResponse("SM-S926NZVEKOO.html", pageData)
    elif goods_id == 'G000380027':
        response = spec_templates.TemplateResponse("SM-S926NLBEKOO.html", pageData)
    elif goods_id == 'G000380013':
        response = spec_templates.TemplateResponse("SM-S921NLBFKOO.html", pageData)
    elif goods_id == 'G000380067':
        response = spec_templates.TemplateResponse("SM-S928NZTEKOD.html", pageData)
    elif goods_id == 'G000380059':
        response = spec_templates.TemplateResponse("SM-S926NZVAKOD.html", pageData)
    elif goods_id == 'G000380051':
        response = spec_templates.TemplateResponse("SM-S921NZYEKOD.html", pageData)
    elif goods_id == 'G000326308':
        response = spec_templates.TemplateResponse("SM-S711NZPWKOO.html", pageData)
    elif goods_id == 'G000326310':
        response = spec_templates.TemplateResponse("SM-S711NZBWKOO.html", pageData)
    elif goods_id == 'G000381004':
        response = spec_templates.TemplateResponse("SM-S711NZPWKOD.html", pageData)
    elif goods_id == 'G000290075':
        response = spec_templates.TemplateResponse("SM-S918NZGEKOO.html", pageData)
    elif goods_id == 'G000290062':
        response = spec_templates.TemplateResponse("SM-S916NLIAKOO.html", pageData)
    elif goods_id == 'G000290056':
        response = spec_templates.TemplateResponse("SM-S911NZEEKOO.html", pageData)
    #else:
    #    response = spec_templates.TemplateResponse("SM-S928NZTNKOO.html", pageData)

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
        response = speclist_templates.TemplateResponse("SM-S928NZTNKOO.html", pageData)
    elif goods_id == 'G000380048':
        response = speclist_templates.TemplateResponse("SM-S928NLBNKOO.html", pageData)
    elif goods_id == 'G000380020':
        response = speclist_templates.TemplateResponse("SM-S926NZVEKOO.html", pageData)
    elif goods_id == 'G000380027':
        response = speclist_templates.TemplateResponse("SM-S926NLBEKOO.html", pageData)
    elif goods_id == 'G000380013':
        response = speclist_templates.TemplateResponse("SM-S921NLBFKOO.html", pageData)
    elif goods_id == 'G000380067':
        response = speclist_templates.TemplateResponse("SM-S928NZTEKOD.html", pageData)
    elif goods_id == 'G000380059':
        response = speclist_templates.TemplateResponse("SM-S926NZVAKOD.html", pageData)
    elif goods_id == 'G000380051':
        response = speclist_templates.TemplateResponse("SM-S921NZYEKOD.html", pageData)
    elif goods_id == 'G000326308':
        response = speclist_templates.TemplateResponse("SM-S711NZPWKOO.html", pageData)
    elif goods_id == 'G000326310':
        response = speclist_templates.TemplateResponse("SM-S711NZBWKOO.html", pageData)
    elif goods_id == 'G000381004':
        response = speclist_templates.TemplateResponse("SM-S711NZPWKOD.html", pageData)
    elif goods_id == 'G000290075':
        response = speclist_templates.TemplateResponse("SM-S918NZGEKOO.html", pageData)
    elif goods_id == 'G000290062':
        response = speclist_templates.TemplateResponse("SM-S916NLIAKOO.html", pageData)
    elif goods_id == 'G000290056':
        response = speclist_templates.TemplateResponse("SM-S911NZEEKOO.html", pageData)
    #else:
    #    response = speclist_templates.TemplateResponse("SM-S928NZTNKOO.html", pageData)

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
        response = manual_templates.TemplateResponse("SM-S928NZTNKOO.html", pageData)
    elif goods_id == 'G000380048':
        response = manual_templates.TemplateResponse("SM-S928NLBNKOO.html", pageData)
    elif goods_id == 'G000380020':
        response = manual_templates.TemplateResponse("SM-S926NZVEKOO.html", pageData)
    elif goods_id == 'G000380027':
        response = manual_templates.TemplateResponse("SM-S926NLBEKOO.html", pageData)
    elif goods_id == 'G000380013':
        response = manual_templates.TemplateResponse("SM-S921NLBFKOO.html", pageData)
    elif goods_id == 'G000380067':
        response = manual_templates.TemplateResponse("SM-S928NZTEKOD.html", pageData)
    elif goods_id == 'G000380059':
        response = manual_templates.TemplateResponse("SM-S926NZVAKOD.html", pageData)
    elif goods_id == 'G000380051':
        response = manual_templates.TemplateResponse("SM-S921NZYEKOD.html", pageData)
    elif goods_id == 'G000326308':
        response = manual_templates.TemplateResponse("SM-S711NZPWKOO.html", pageData)
    elif goods_id == 'G000326310':
        response = manual_templates.TemplateResponse("SM-S711NZBWKOO.html", pageData)
    elif goods_id == 'G000381004':
        response = manual_templates.TemplateResponse("SM-S711NZPWKOD.html", pageData)
    elif goods_id == 'G000290075':
        response = manual_templates.TemplateResponse("SM-S918NZGEKOO.html", pageData)
    elif goods_id == 'G000290062':
        response = manual_templates.TemplateResponse("SM-S916NLIAKOO.html", pageData)
    elif goods_id == 'G000290056':
        response = manual_templates.TemplateResponse("SM-S911NZEEKOO.html", pageData)
    #else:
    #    response = manual_templates.TemplateResponse("SM-S928NZTNKOO.html", pageData)

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
        response = detail_templates.TemplateResponse("SM-S928NZTNKOO.html", pageData)
    elif goods_id == 'G000380048':
        response = detail_templates.TemplateResponse("SM-S928NLBNKOO.html", pageData)
    elif goods_id == 'G000380020':
        response = detail_templates.TemplateResponse("SM-S926NZVEKOO.html", pageData)
    elif goods_id == 'G000380027':
        response = detail_templates.TemplateResponse("SM-S926NLBEKOO.html", pageData)
    elif goods_id == 'G000380013':
        response = detail_templates.TemplateResponse("SM-S921NLBFKOO.html", pageData)
    elif goods_id == 'G000380067':
        response = detail_templates.TemplateResponse("SM-S928NZTEKOD.html", pageData)
    elif goods_id == 'G000380059':
        response = detail_templates.TemplateResponse("SM-S926NZVAKOD.html", pageData)
    elif goods_id == 'G000380051':
        response = detail_templates.TemplateResponse("SM-S921NZYEKOD.html", pageData)
    elif goods_id == 'G000326308':
        response = detail_templates.TemplateResponse("SM-S711NZPWKOO.html", pageData)
    elif goods_id == 'G000326310':
        response = detail_templates.TemplateResponse("SM-S711NZBWKOO.html", pageData)
    elif goods_id == 'G000381004':
        response = detail_templates.TemplateResponse("SM-S711NZPWKOD.html", pageData)
    elif goods_id == 'G000290075':
        response = detail_templates.TemplateResponse("SM-S918NZGEKOO.html", pageData)
    elif goods_id == 'G000290062':
        response = detail_templates.TemplateResponse("SM-S916NLIAKOO.html", pageData)
    elif goods_id == 'G000290056':
        response = detail_templates.TemplateResponse("SM-S911NZEEKOO.html", pageData)
    #else:
    #    response = detail_templates.TemplateResponse("SM-S928NZTNKOO.html", pageData)

    return response
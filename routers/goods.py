from fastapi import APIRouter, Request, Body, Depends, Form, HTTPException
from fastapi.responses import HTMLResponse, Response, JSONResponse
from fastapi.templating import Jinja2Templates
from fastapi.encoders import jsonable_encoder
from core import schemas

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
    #print(req)
    
    pageData = {"request": request}

    response = spec_templates.TemplateResponse("SM-S928NZTNKOO.html", pageData)

    return response

@router.post("/getGoodsSpecList", response_class=HTMLResponse)
async def get_goods_spec_list(request: Request):
    print('/sec/xhr/goods/getGoodsSpecList')
    #print(req)
    
    pageData = {"request": request}

    response = speclist_templates.TemplateResponse("SM-S928NZTNKOO.html", pageData)

    return response

@router.post("/goodsManual", response_class=HTMLResponse)
async def goods_manual(request: Request):
    print('/sec/xhr/goods/goodsManual')
    #print(req)
    
    pageData = {"request": request}

    response = manual_templates.TemplateResponse("SM-S928NZTNKOO.html", pageData)

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

    return response
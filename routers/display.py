from fastapi import APIRouter, Request, Depends, Form, HTTPException
from fastapi.responses import HTMLResponse, Response, JSONResponse
from fastapi.templating import Jinja2Templates
from fastapi.encoders import jsonable_encoder
from core import schemas

router = APIRouter(
    prefix="/sec/display",
    tags=['display'],
    responses={404: {"description": "Not found"}}
)

templates = Jinja2Templates(directory="templates/details")

@router.get("/getGnbDepth2", response_class=JSONResponse)
async def get_gnb_depth2(upDispClsfNo: int,
                         dispClsfNm: str,
                         dispClsfEnNm: str):
    print('/getGnbDepth2')
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

@router.post("/member/getSession", response_class=JSONResponse)
async def get_session(request: Request):
    print('/member/getSession')
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

@router.post("/order/gnbCartCount", response_class=JSONResponse)
async def get_session(request: Request):
    print('/order/gnbCartCount')
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

@router.post("/goods/loadGoodsAdvancedCommentList", response_class=JSONResponse)
async def load_goods_advanced_comment_list(request: Request):
    print('/goods/loadGoodsAdvancedCommentList')
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

@router.post("/goods/getFirstRecentGoods", response_class=JSONResponse)
async def get_first_recent_goods(request: Request):
    print('/goods/getFirstRecentGoods')
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

#async def goods_detail(request: Request, req: schemas.GoodsDetailRequest):
"""
goodsId: str,
    goodsTpCd: int,
    adminYn: bool,
    adminPriceYn: bool,
    samsungstore: str
async def goods_detail(request: Request, goodsId: str, goodsTpCd: int, adminYn: bool, adminPriceYn: bool, samsungstore: str):
"""
@router.post("/goods/goodsDetail", response_class=HTMLResponse)
async def goods_detail(request: Request):

    print('/goods/goodsDetail')
    #print(req)
    pageData = {"request": request}

    response = templates.TemplateResponse("SM-S928NZTNKOO.html", pageData)

    return response
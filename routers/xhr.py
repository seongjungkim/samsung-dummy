from fastapi import APIRouter, Request, Depends, Form, HTTPException
from fastapi.responses import HTMLResponse, Response, JSONResponse
from fastapi.templating import Jinja2Templates
from fastapi.encoders import jsonable_encoder
from core import schemas

import routers.dummy as dummy

router = APIRouter(
    prefix="/sec/xhr",
    tags=['xhr'],
    responses={404: {"description": "Not found"}}
)

templates = Jinja2Templates(directory="templates/details")

#req: schemas.GoodsListRequest = Depends()
@router.post("/pf/personalization", response_class=JSONResponse)
async def personalization(request: Request):
    print('/sec/xhr/pf/personalization')
    #print(req)
    
    response = dummy.personalization_json

    return JSONResponse(content=jsonable_encoder(response))

@router.post("/member/getLoginFlag", response_class=JSONResponse)
async def get_login_flag(request: Request):
    print('/member/getLoginFlag')
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

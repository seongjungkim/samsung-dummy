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

@router.get("/all-smartphones/", response_class=HTMLResponse)
async def init(request: Request):
    template_data = {
        "request": request, "basicCard": None, 
        "contextPath": "/resource",
        "corpCd": "VertexAI",
        "locale": "ko_KR",
        "activeProfile": "remote",
        "genAi": "Yes"
    }

    response = templates.TemplateResponse("all-smartphones.html", template_data)
    return response

@router.get("/galaxy-s24-ultra-s928/SM-S928NZTNKOO/", response_class=HTMLResponse)
async def init(request: Request):
    template_data = {
        "request": request, "basicCard": None, 
        "contextPath": "/resource",
        "corpCd": "VertexAI",
        "locale": "ko_KR",
        "activeProfile": "remote",
        "genAi": "Yes"
    }

    response = templates.TemplateResponse("SM-S928NZTNKOO.html", template_data)
    return response

@router.get("/galaxy-s24-ultra-s928-cpo/SM-S928NLBNKOO/", response_class=HTMLResponse)
async def init(request: Request):
    template_data = {
        "request": request, "basicCard": None, 
        "contextPath": "/resource",
        "corpCd": "VertexAI",
        "locale": "ko_KR",
        "activeProfile": "remote",
        "genAi": "Yes"
    }

    response = templates.TemplateResponse("SM-S928NLBNKOO.html", template_data)
    return response

@router.get("/galaxy-s24-ultra-s928-cpo/SM-S928NLBNKOO/", response_class=HTMLResponse)
async def init(request: Request):
    template_data = {
        "request": request, "basicCard": None, 
        "contextPath": "/resource",
        "corpCd": "VertexAI",
        "locale": "ko_KR",
        "activeProfile": "remote",
        "genAi": "Yes"
    }

    response = templates.TemplateResponse("SM-S928NLBNKOO.html", template_data)
    return response

@router.get("/galaxy-s24-plus-s926/SM-S926NZVEKOO/", response_class=HTMLResponse)
async def init(request: Request):
    template_data = {
        "request": request, "basicCard": None, 
        "contextPath": "/resource",
        "corpCd": "VertexAI",
        "locale": "ko_KR",
        "activeProfile": "remote",
        "genAi": "Yes"
    }

    response = templates.TemplateResponse("SM-S926NZVEKOO.html", template_data)
    return response

@router.post("/query", response_class=JSONResponse)
async def init(request: Request, req: schemas.QueryRequest):
    print('/chatbot/init')
    print(req)
    
    if req.query == 'welcome':
        response = dummy.welcome_json
    elif req.query == 'GenAI Assistant Guide':
        response = dummy.assistant_guide_json
    elif req.query == 'test':
        response = dummy.test_json
    elif req.query == 'simple response':
        response = dummy.simple_response_json
    elif req.query == 'basic card':
        response = dummy.basic_card_json
    elif req.query == 'browse carousel':
        response = dummy.browse_carousel_json
    elif req.query == 'carousel select':
        response = dummy.carousel_select_json
    else:
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

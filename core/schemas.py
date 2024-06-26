from typing import Union
from pydantic import BaseModel

from typing import Generic, List, TypeVar, Optional
from pydantic import BaseModel, Field
        
################# APIS ###################
## Common
class BaseRequest(BaseModel):
    sessionId: str
    userId: Optional[str] = ''

class BaseResponse(BaseModel):
    result_cd: int
    result_msg: str

class QueryRequest(BaseRequest):
    corpCd: str
    locale: str
    platform: str
    query: str

#searchFilter=&dispClsfNo=33010000&sortType=10&page=1&rows=11&ehcacheYn=Y&soldOutExceptYn=N&pfFasterUseYn=Y&secApp=false&secIos=false
#searchFilter=&dispClsfNo=33010000&sortType=10&page=1&rows=11&ehcacheYn=Y&soldOutExceptYn=N&pfFasterUseYn=Y&secApp=false&secIos=false
class GoodsListRequest(BaseRequest):
    searchFilter: str
    dispClsfNo: int
    sortType: int
    page: int
    offset: int
    rows: int
    soldOutExceptYn: bool
    pfFasterUseYn: bool
    secApp: bool
    secIos: bool

#goodsId=G000380038&goodsTpCd=10&adminYn=&adminPriceYn=&samsungstore=
class GoodsDetailRequest(BaseRequest):
    goodsId: str
    goodsTpCd: int
    adminYn: bool
    adminPriceYn: bool
    samsungstore: str


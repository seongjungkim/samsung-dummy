/**
 * 바로구매(crawling)_단일건
 * @param mdlCode 모델코드
 */
function crawlingBuyDirect(mdlCode) {
	buyDirect(mdlCode, "_self");
};

/**
 * 바로구매(crawling)_단일건 - target 추가
 * @param mdlCode 모델코드
 * @param target 타겟
 */
function buyDirect(mdlCode, target) {
	// URL - stContextPath 적용 
	var stContextPath = $("#viewStContextPath").val();
	
	if (mdlCode === null || mdlCode === undefined
			|| $.trim(mdlCode).length == 0) {
		var alertData = {
			title : "",
			content : "모델코드가 없습니다.",
			callBack : "",
			btnText : "확인"
		};
		commonAlert(alertData);
		openLayer('commonAlert');
		return false;
	}

	var goodsId;

	var option = {
		url : stContextPath+"/xhr/bespoke/goodsIdsAjax",
		dataType : "json",
		type : "POST",
		async : false,
		data : {
			bspkGrpKeys : mdlCode
		},
		success : function(result) {

			if (result.exCode !== null && result.exCode !== undefined) {
				var alertData = {
					title : "",
					content : "상품을 준비중입니다.",
					callBack : "",
					btnText : "확인"
				};
				commonAlert(alertData);
				openLayer('commonAlert');
				return false;
			} else {
				if (result.goodsIdList != null) {
					goodsId = result.goodsIdList[0];
				}
			}

		},
		error : function(response, status, error) {
			var alertData = {
				title : "",
				content : "오류",
				callBack : "",
				btnText : "확인"
			};
			commonAlert(alertData);
			openLayer('commonAlert');
			return false;
		},
		beforeSend : function(xhr) {
			xhr.setRequestHeader("ajax", true);
		},
		complete : function() {
		}

	};

	$.ajax(option);

	if (goodsId !== null && goodsId !== undefined) {
		var reqData = {
			goodsIds : goodsId,
			stGbCd : "${view.stGbCd}",
			stId : "${view.stId}",
			mbrNo : "${session.mbrNo}",
			nowBuyYn : "Y",
			buyQtys : 1,
			orderType : "ONCE",
		};

		var nowBuyOptions = {
			url : stContextPath+"/xhr/order/insertCart",
			dataType : "json",
			type : "POST",
			data : reqData,
			success : function(result) {

				if (result.exCode !== null && result.exCode !== undefined) {
					var alertData = {
						title : "",
						content : result.exMsg,
						callBack : "",
						btnText : "확인"
					};
					commonAlert(alertData);
					openLayer('commonAlert');
					return false;
				} else {
					var form = document.createElement('form');

					form.setAttribute('action', stContextPath+"order/");
					form.setAttribute('target', target);
					form.setAttribute('method', 'post');

					document.body.appendChild(form);
					form.submit();
				}

			},
			error : function(response, status, error) {
				var alertData = {
					title : "",
					content : "오류",
					callBack : "",
					btnText : "확인"
				};
				commonAlert(alertData);
				openLayer('commonAlert');
				return false;
			},
			beforeSend : function(xhr) {
				xhr.setRequestHeader("ajax", true);
			},
			complete : function() {
			}
		};
		$.ajax(nowBuyOptions);
	}
};

/**
 * 바로구매_복수건 (모델코드)
 * @param mdlList
 */
function fnBuyDirect(mdlList) {

	// URL - stContextPath 적용 
	var stContextPath = $("#viewStContextPath").val();
	
	console.log("mdlList 222222=====> " + JSON.stringify(mdlList));

	// @ Test 모델코드 리스트
	// @ ex: { mdlCode:상품모델코드, qty:수량, compNo:업체번호(@닷컴기준: [312:삼성전자한국총괄],[313:삼성판매주식회사],[0:없음]) }
	// var mdlList = [
	// { mdlCode:"SM-G986NZPAKOO", qty:2, compNo:312 },
	// { mdlCode:"SM-N976NZSEKOO", qty:4, compNo:313 },
	// { mdlCode: "RF85T98A2AP", qty:1, compNo:313, bespokeYn:"Y", pannelCode:"RA-F18DUU32|RA-F18DUU38|RA-F18DBB35|RA-F18DBB38" }
	// ];

	// @ 상품아이디 조회를 위한 모델코드 및 업체 리스트(String)
	// @ searchMdlParams: SM-G986NZPAKOO^SM-N976NZSEKOO^...
	// @ searchCompNoParams: 000^312^313...
	var searchMdlParams = "";
	var searchCompNoParams = "";

	// @ 수량 리스트
	var qtyList = new Array();

	// 트레이드인 리스트
	var tradeInList = new Array();
	// @ Validate Check
	if (0 < mdlList.length) {
		var mdlCodeI = "";
		var qtyI = 0;
		var compNoI = "";
		var content = "";
		var goodsOrdTpCd = "";
		var galaxyClubTpCd = "";
		var bespokeYnI = "";
		var bspkPannelCodeI = "";
		var bspkPannelCodeListI = "";

		for (var i = 0; i < mdlList.length; i++) {
			mdlCodeI = mdlList[i].mdlCode;
			qtyI = mdlList[i].qty;
			
			// 업체번호 체크
			if (mdlList[i].compNo === null || mdlList[i].compNo === undefined || $.trim(mdlList[i].compNo).length == 0) {
				compNoI = 0;
			}else{
				compNoI = mdlList[i].compNo;
			}
			
			// 비스포크여부 체크
			if (mdlList[i].bespokeYn === null || mdlList[i].bespokeYn === undefined ) {
				bespokeYnI = "N";
			} else {
				bespokeYnI = mdlList[i].bespokeYn;
			}

			// 모델코드 체크
			if (mdlCodeI === null || mdlCodeI === undefined || $.trim(mdlCodeI).length == 0) {
				if( bespokeYnI == "Y") {
					content = "모델이 선택되지 않았습니다.<br/>선택 완료 후 구매해 주시기 바랍니다.";
				}else{
					content = "모델코드를 확인하여 주시기 바랍니다."
				}
			}
			
			// 수량 체크
			if (qtyI === null || qtyI === undefined || qtyI < 1) {
				content = "수량을 확인하여 주시기 바랍니다."
			}
			
			// 비스포크 패널 수량 체크
			if( bespokeYnI == "Y" ) {
				
				bspkPannelCodeI = mdlList[i].pannelCode;
				bspkPannelCodeListI = mdlList[i].pannelCode.split("|");
				
				var mdlOptions = {
					url: stContextPath+"/xhr/bespoke/bespokeModelType",
					dataType : 'json',
					type : 'POST',
					async : false,
					data : {
						mdlCode : mdlCodeI
					},
					success : function(result) {
						
						// 패널 수량 체크 - 1door, 2door, 3door, 4door (패밀리허브(21)는 패널 3개 선택으로, 3door type seq에 포함)
						var oneDoorTypeSeq = ["4", "5", "6", "8"];
						var twoDoorTypeSeq = ["3"];
						var threeDoorTypeSeq = ["7", "9", "21"];
						var pannelReqLength = 0;
						
						if(oneDoorTypeSeq.indexOf(result.typeSeq) > -1) {
							pannelReqLength = 1;
						} else if(twoDoorTypeSeq.indexOf(result.typeSeq) > -1) {
							pannelReqLength = 2;
						} else if(threeDoorTypeSeq.indexOf(result.typeSeq) > -1) {
							pannelReqLength = 3;
						} else {
							pannelReqLength = 4;
						}
						
						if(bspkPannelCodeListI == "" || bspkPannelCodeListI == undefined || bspkPannelCodeListI == null) {
							content = "컬러가 선택되지 않았습니다.<br/>선택 완료 후 구매해 주시기 바랍니다.";
						} else if(bspkPannelCodeListI.length < pannelReqLength) {
							content = "모든 컬러가 선택되지 않았습니다.<br/>선택 완료 후 구매해 주시기 바랍니다.";
						}
						
						// 모델코드 및 수량 이상 있을시 alert
						if (content !== "") {
							var alertData = {
								title : "",
								content : content,
								callBack : "",
								btnText : "확인"
							};
							commonAlert(alertData);
							openLayer('commonAlert');
							return false;
						} else {
							var bspkCodes = mdlCodeI + "|" + bspkPannelCodeI;
							buyfixedMatchAjax(bspkCodes, qtyI, 'buy', '');
						}
						return false;
					}
					, error: function() {
						var alertData = {
							title : "",
							content : "데이터 확인이 필요합니다.",
							callBack : "",
							btnText : "확인"
						};
						commonAlert(alertData);
						openLayer('commonAlert');
						return false;
					}
				}
				$.ajax(mdlOptions);
				
				return false;

			} else {
				mdlList[i].pannelCode = "";
				bspkPannelCodeI = mdlList[i].pannelCode;
				bspkPannelCodeListI = mdlList[i].pannelCode.split("|");
				
				// ---- 트레이드인 구매 관련 start;
				//트레이드인
				if(mdlList[i].tradeIn == "Y") {
					goodsOrdTpCd = "TRD";
				}else if(mdlList[i].ceTradeIn == "Y"){
					goodsOrdTpCd = "CETRD";
				}else{
					// 트레이드인 / 갤럭시 클럽 상품 파라메터 초기화
					goodsOrdTpCd = "";
				}
				
				if(mdlList[i].galaxyClub == "Y") {
					goodsOrdTpCd += "GC";
					if (mdlList[i].galaxyClubTpCd === null || mdlList[i].galaxyClubTpCd === undefined || $.trim(mdlList[i].galaxyClubTpCd).length == 0) {
						content = "갤럭시 클럽 캠페인 코드를 확인하여 주시기 바랍니다.";
					} else {
						galaxyClubTpCd = mdlList[i].galaxyClubTpCd;
					}
				}
				
				console.log("goodsOrdTpCd=====> " + goodsOrdTpCd);
				// ---- 트레이드인 구매 관련 end;

				// 모델코드 및 수량 이상 있을시 alert
				if (content !== "") {
					var alertData = {
						title : "",
						content : content,
						callBack : "",
						btnText : "확인"
					};
					commonAlert(alertData);
					openLayer('commonAlert');
					return false;
				} else {
					// 모델코드 정제
					if (i !== (mdlList.length - 1)) {
						searchMdlParams += mdlCodeI + "^";
						searchCompNoParams += compNoI + "^";
					} else {
						searchMdlParams += mdlCodeI;
						searchCompNoParams += compNoI;
					}
					// 수량 정제
					qtyList.push(qtyI);
					
					tradeInList.push(goodsOrdTpCd);
				}
			}
		}
	} else {
		var alertData = {
			title : "",
			content : "데이터 확인이 필요합니다.",
			callBack : "",
			btnText : "확인"
		};
		commonAlert(alertData);
		openLayer('commonAlert');
		return false;
	}
	
	// @ 상품아이디 리스트
	var goodsIdList = [];
	// @ 상품아이디 조회
	var option = {
		url : stContextPath+"/xhr/bespoke/goodsIdsAjax",
		dataType : "json",
		type : "POST",
		async : false,
		data : {
			bspkGrpKeys : searchMdlParams,
			compNos : searchCompNoParams
		},
		success : function(result) {

			if (result.exCode !== null && result.exCode !== undefined) {
				var alertData = {
					title : "goodsIdsAjax",
					content : result.exMsg,
					callBack : "",
					btnText : "확인"
				};
				commonAlert(alertData);
				openLayer('commonAlert');
				return false;
			} else {
				if (result.goodsIdList !== null) {
					goodsIdList = result.goodsIdList;
				}
			}

		},
		error : function(response, status, error) {
			var alertData = {
				title : "goodsIdsAjax.err",
				content : "오류",
				callBack : "",
				btnText : "확인"
			};
			commonAlert(alertData);
			openLayer('commonAlert');
			return false;
		},
		beforeSend : function(xhr) {
			xhr.setRequestHeader("ajax", true);
		},
		complete : function() {
		}
	};
	$.ajax(option);

	// @ Cart Insert
	if (goodsIdList !== null && goodsIdList !== undefined
			&& goodsIdList.length > 0) {
		
		// @ goodsIds, buyQtys의 배열값을 String으로 넘겨주지 않으면 컨트롤러에서 param이 null로 받아져서 String처리,
		var reqData = {
			goodsIds : String(goodsIdList),
			nowBuyYn : "Y",
			buyQtys : String(qtyList),
			orderType : "ONCE",
			goodsOrdTpCd : String(tradeInList),
			galaxyClubTpCd : galaxyClubTpCd
		};			

		var orderUrl = stContextPath + "order/";
		var mobidooYn = location.search.indexOf("orderCallBackId") != -1 ? true : false
		
		var nowBuyOptions = {
			url : stContextPath+"/xhr/order/insertCart",
			dataType : "json",
			type : "POST",
			data : reqData,
			success : function(result) {
				if (result.exCode !== null && result.exCode !== undefined) {
					var alertData = {
						title : "insertCart",
						content : result.exMsg,
						callBack : "",
						btnText : "확인"
					};
					commonAlert(alertData);
					openLayer('commonAlert');
					return false;
				} else {
					if(tradeInList.includes('CETRD') || tradeInList.includes('TRD')) { // TradeIn 체크
						if (fnChkLogin("구매하기", orderUrl)) { // 로그인 체크
							//모비두 여부 true, 삼성닷컴인 경우
							if(mobidooYn && stGbCd == '10'){
								fnGetCrossDomain("order");
							}else{
								location.href= orderUrl;
							}
						}
					} else if(tradeInList.includes('GC') || tradeInList.includes('TRDGC')) { // GalaxyClub 체크
						fnChkGalaxyClub(reqData);	// 로그인 체크 & 멤버십 체크
					} else {
						// @ 주문 페이지로..
						var form = document.createElement('form');
						form.setAttribute('action', orderUrl);
						form.setAttribute('target', "_self");
						form.setAttribute('method', 'post');
						document.body.appendChild(form);
						form.submit();
					}
				}
			},
			error : function(response, status, error) {
				var alertData = {
					title : "insertCart.err",
					content : "오류",
					callBack : "",
					btnText : "확인"
				};
				commonAlert(alertData);
				openLayer('commonAlert');
				return false;
			},
			beforeSend : function(xhr) {
				xhr.setRequestHeader("ajax", true);
			},
			complete : function() {
			}
		};
		$.ajax(nowBuyOptions);
	}

};

// bespoke buyAjax
var buyAjax = function (data) {
	// URL - stContextPath 적용 
	var stContextPath = $("#viewStContextPath").val();
    var ids = '';

    var option1 = {
        url: stContextPath+"/xhr/bespoke/goodsIdsAjax",
        dataType: "json",
        type: "POST",
        async: false,
        data: {bspkGrpKeys : data},
        success: function (result) {

        	if(typeof(result.exCode) !== 'undefined') {
                var alertData ={
                    title : ""
                    , content : "상품을 준비중입니다."
                    , callBack : ""
                    , btnText : "확인"
                };
                commonAlert(alertData);
                openLayer('commonAlert');
                return false;
            } else {
                ids =  JSON.stringify(result.goodsIdList);
            }
        },
        error: function (response, status, error) {
            alert('오류');
            return false;
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("ajax", true);
        },
        complete: function () { }
    };
    $.ajax(option1);

    if(ids != '') {
        var option = {
            url: stContextPath+"/xhr/order/insertCart",
            dataType: "json",
            type: "POST",
            data: {
                nowBuyYn : 'Y',
                bspkGrpKeys : data,
                goodsIds : ids
            },
            success: function (result) {
            	if(typeof(result.exCode) !== 'undefined') {
                    var alertData ={
                        title : ""
                        , content : result.exMsg
                        , callBack : ""
                        , btnText : "확인"
                    };
                    commonAlert(alertData);
                    openLayer('commonAlert');
                    return false;
                } else {
                    var form = document.createElement('form');
                    form.setAttribute('action', stContextPath+"order/");
                    form.setAttribute('target', "_self");
                    form.setAttribute('method', 'post');

                    document.body.appendChild(form);
                    form.submit();
                }

            },
            error: function (response, status, error) {
                alert('오류');
            },
            beforeSend: function (xhr) {
                xhr.setRequestHeader("ajax", true);
            },
            complete: function () { }
        };
        $.ajax(option);
    }

};

/**
 * 장바구니_복수건 (모델코드)
 * @param mdlList
 */
function fnCartDirect(mdlList, cartCallMethod) {
	
	// URL - stContextPath 적용
	var stContextPath = $("#viewStContextPath").val();
	console.log("mdlList=====> " + JSON.stringify(mdlList));

	// @ Test 모델코드 리스트
	// @ ex: { mdlCode:상품모델코드, qty:수량, compNo:업체번호(@닷컴기준: [312:삼성전자한국총괄],[313:삼성판매주식회사],[0:없음]), bespokeYn:비스포크여부, pannelCode:비스포크일때 패널코드 }
	// var mdlList = [
	// { mdlCode:"SM-G986NZPAKOO", qty:2, compNo:312 },
	// { mdlCode:"SM-N976NZSEKOO", qty:4, compNo:313 },
	// { mdlCode: "RF85T98A2AP", qty:1, compNo:313, bespokeYn:"Y", pannelCode:"RA-F18DUU32|RA-F18DUU38|RA-F18DBB35|RA-F18DBB38" }
	// ];
	
	// cartCallMethod : 장바구니 이동 여부 확인 파라미터
	// var cartCallMethod = "move" (default) 장바구니 이동
	//						"confirm" 동일한 상품 확인 / 장바구니 이동 팝업 띄우기

	// @ 상품아이디 조회를 위한 모델코드 및 업체 리스트(String)
	// @ searchMdlParams: SM-G986NZPAKOO^SM-N976NZSEKOO^...
	// @ searchCompNoParams: 000^312^313...
	var searchMdlParams = "";
	var searchCompNoParams = "";

	// @ 수량 리스트
	var qtyList = new Array();

		
	// @ Validate Check
	if (0 < mdlList.length) {
		var mdlCodeI = "";
		var qtyI = 0;
		var compNoI = "";
		var content = "";
		var bespokeYnI = "";
		var bspkPannelCodeI = "";
		var bspkPannelCodeListI = "";
		
		for (var i = 0; i < mdlList.length; i++) {
			mdlCodeI = mdlList[i].mdlCode;
			qtyI = mdlList[i].qty;

			// 업체번호 체크
			if (mdlList[i].compNo === null || mdlList[i].compNo === undefined || $.trim(mdlList[i].compNo).length == 0) {
				compNoI = 0;
			}else{
				compNoI = mdlList[i].compNo;
			}
			
			// 비스포크여부 체크
			if (mdlList[i].bespokeYn === null || mdlList[i].bespokeYn === undefined ) {
				bespokeYnI = "N";
			} else {
				bespokeYnI = mdlList[i].bespokeYn;
			}

			// 모델코드 체크
			if (mdlCodeI === null || mdlCodeI === undefined || $.trim(mdlCodeI).length == 0) {
				if( bespokeYnI == "Y") {
					content = "모델이 선택되지 않았습니다.<br/>선택 완료 후 구매해 주시기 바랍니다.";
				}else{
					content = "모델코드를 확인하여 주시기 바랍니다."
				}
			}
			
			// 수량 체크
			if (qtyI === null || qtyI === undefined || qtyI < 1) {
				content = "수량을 확인하여 주시기 바랍니다."
			}
			
			// 비스포크 패널 수량 체크
			if( bespokeYnI == "Y" ) {
				bspkPannelCodeI = mdlList[i].pannelCode;
				bspkPannelCodeListI = mdlList[i].pannelCode.split("|");
				
				var mdlOptions = {
					url: stContextPath+"/xhr/bespoke/bespokeModelType",
					dataType : 'json',
					type : 'POST',
					async : false,
					data : {
						mdlCode : mdlCodeI
					},
					success : function(result) {
						
						// 패널 수량 체크 - 1door, 2door, 3door, 4door (패밀리허브(21)는 패널 3개 선택으로, 3door type seq에 포함)
						var oneDoorTypeSeq = ["4", "5", "6", "8"];
						var twoDoorTypeSeq = ["3"];
						var threeDoorTypeSeq = ["7", "9", "21"];
						var pannelReqLength = 0;
						
						if(oneDoorTypeSeq.indexOf(result.typeSeq) > -1) {
							pannelReqLength = 1;
						} else if(twoDoorTypeSeq.indexOf(result.typeSeq) > -1) {
							pannelReqLength = 2;
						} else if(threeDoorTypeSeq.indexOf(result.typeSeq) > -1) {
							pannelReqLength = 3;
						} else {
							pannelReqLength = 4;
						}
						
						if(bspkPannelCodeListI == "" || bspkPannelCodeListI == undefined || bspkPannelCodeListI == null) {
							content = "컬러가 선택되지 않았습니다.<br/>선택 완료 후 구매해 주시기 바랍니다.";
						} else if(bspkPannelCodeListI.length < pannelReqLength) {
							content = "모든 컬러가 선택되지 않았습니다.<br/>선택 완료 후 구매해 주시기 바랍니다.";
						}
						
						// 모델코드 및 수량 이상 있을시 alert
						if (content !== "") {
							var alertData = {
								title : "",
								content : content,
								callBack : "",
								btnText : "확인"
							};
							commonAlert(alertData);
							openLayer('commonAlert');
							return false;
						} else {
							var bspkCodes = mdlCodeI + "|" + bspkPannelCodeI;
							buyfixedMatchAjax(bspkCodes, qtyI, 'cart', cartCallMethod);
						}
						return false;
					}
					, error : function() {
						var alertData = {
							title : "",
							content : "데이터 확인이 필요합니다.",
							callBack : "",
							btnText : "확인"
						};
						commonAlert(alertData);
						openLayer('commonAlert');
						return false;
					}
				}
				$.ajax(mdlOptions);
				
				return false;
				
			} else  {
				
				mdlList[i].pannelCode = "";
				bspkPannelCodeI = mdlList[i].pannelCode;
				bspkPannelCodeListI = mdlList[i].pannelCode.split("|");
				
				// 모델코드 및 수량 이상 있을시 alert
				if (content !== "") {
					var alertData = {
						title : "",
						content : content,
						callBack : "",
						btnText : "확인"
					};
					commonAlert(alertData);
					openLayer('commonAlert');
					return false;
				} else {
					// 모델코드 정제
					if (i !== (mdlList.length - 1)) {
						searchMdlParams += mdlCodeI + "^";
						searchCompNoParams += compNoI + "^";
					} else {
						searchMdlParams += mdlCodeI;
						searchCompNoParams += compNoI;
					}
					// 수량 정제
					qtyList.push(qtyI);
				}
			}
			
		}
		
	} else {
		var alertData = {
			title : "",
			content : "데이터 확인이 필요합니다.",
			callBack : "",
			btnText : "확인"
		};
		commonAlert(alertData);
		openLayer('commonAlert');
		return false;
	}
	
	//일반상품 goodsId 조회
	getGoodsIds(searchMdlParams, searchCompNoParams, qtyList, cartCallMethod);
};

function getGoodsIds(searchMdlParams, searchCompNoParams, qtyList, cartCallMethod) {

	// @ 상품아이디 리스트
	var goodsIdList = [];
	
	// URL - stContextPath 적용 
	var stContextPath = $("#viewStContextPath").val();
	
	// @ 상품아이디 조회
	var option = {
		url : stContextPath + "xhr/bespoke/goodsIdsAjax",
		dataType : "json",
		type : "POST",
		async : false,
		data : {
			bspkGrpKeys : searchMdlParams,
			compNos : searchCompNoParams
		},
		success : function(result) {
			if (result.exCode !== null && result.exCode !== undefined) {
				var alertData = {
					title : "",
					content : result.exMsg,
					callBack : "",
					btnText : "확인"
				};
				commonAlert(alertData);
				openLayer('commonAlert');
				return false;
			} else {
				if (result.goodsIdList !== null) {
					goodsIdList = result.goodsIdList;
					var goodsList = [];
					for(var i = 0; i < goodsIdList.length ; i ++ ){
						var goods = {};
						goods.goodsId = goodsIdList[i].trim();
						goods.qty = qtyList[i];
						goodsList.push(goods);
					}
					fnCartDirectByMultiId1(goodsList , "confirm" );
				}
				//일반상품 장바구니 goodsCnt 조회
				//goodsCntCart(goodsIdList, qtyList, cartCallMethod);
			}
		},
		error : function(response, status, error) {
			var alertData = {
				title : "",
				content : "오류",
				callBack : "",
				btnText : "확인"
			};
			commonAlert(alertData);
			openLayer('commonAlert');
			return false;
		},
		beforeSend : function(xhr) {
			xhr.setRequestHeader("ajax", true);
		},
		complete : function() {
		}
	};
	$.ajax(option);
	
}

function goodsCntCart(goodsIdList, qtyList, cartCallMethod) {
	// @ Cart Insert
	if (goodsIdList !== null && goodsIdList !== undefined && goodsIdList.length > 0) {
		// @ goodsIds, buyQtys의 배열값을 String으로 넘겨주지 않으면 컨트롤러에서 param이 null로 받아져서 String처리,
		var reqData = {
			goodsIds : String(goodsIdList),
			stGbCd : "${view.stGbCd}",
			stId : "${view.stId}",
			mbrNo : "${session.mbrNo}",
			nowBuyYn : "N",
			buyQtys : String(qtyList),
			orderType : "ONCE",
		};
		
		// URL - stContextPath 적용 
		var stContextPath = $("#viewStContextPath").val();
		
		if (cartCallMethod == "confirm") {
			var options = {
				url : stContextPath + "xhr/order/goodscnt"
				, data : reqData 
				, done : function(data){
					var cartCnt = data.goodsCnt;
					if ( cartCnt > 0 ) {
						let confirmData = {
							content : "이미 동일한 상품이 장바구니에 있습니다.</br>추가하시겠습니까?"
					        ,okBtnText : "확인"
					        ,cancelBtnText : "취소"
				        };
						commonConfirm(confirmData);
						openLayer('commonConfirm');
						$("#closeCommonConfirmBtn").css("display", "none");
						
						$("#commonConfirmOkBtn").on('click' , function(){
							if($("#commonConfirmOkBtn").text() == "확인") {
								insertCartItemFn(reqData, cartCallMethod);
							}
						});
						$("#commonConfirmCancelBtn").on('click' , function(){
							//취소
							return false;
						});
					} else {
						insertCartItemFn(reqData, cartCallMethod);
					}
				}
			};
			ajax.call(options);
		} else {
			insertCartItemFn(reqData, cartCallMethod);
		}
	}
}

function insertCartItemFn(reqData, cartCallMethod) {
	// URL - stContextPath 적용 
	var stContextPath = $("#viewStContextPath").val();
	
	var nowBuyOptions = {
			url : stContextPath + "xhr/order/insertCart",
			dataType : "json",
			type : "POST",
			data : reqData,
			async: false,
			success : function(result) {
				if (result.exCode !== null && result.exCode !== undefined) {
					var alertData = {
						title : "",
						content : result.exMsg,
						callBack : "",
						btnText : "확인"
					};
					commonAlert(alertData);
					openLayer('commonAlert');
					return false;
				} else {
					if(cartCallMethod == "confirm") {
						let confirmData = {
							content : "제품이 장바구니에 추가되었습니다.<br>(현재 총 " +result.cartCnt + "개의 제품이 장바구니에 담겼습니다.)"
						    ,okBtnText : "쇼핑 계속하기"
						    ,cancelBtnText : "장바구니 이동"
					    };
						commonConfirm(confirmData);
						openLayer('commonConfirm');
						$("#closeCommonConfirmBtn").css("display", "none");
						
						$("#commonConfirmOkBtn").on('click' , function(){
							//취소
							return false;
						});
						
						$("#commonConfirmCancelBtn").on('click' , function(){
							if($("#commonConfirmCancelBtn").text() == "장바구니 이동") {
								location.href = stContextPath + "cart/";
							}
						});
						if (result.cartCnt !== 0) {
							$(".cart-inner-count").css("display", "block");
							$(".cart-inner-count").html(result.cartCnt);
						} else {
							$(".cart-inner-count").css("display", "none");
						}
						
					} else {
						location.href = stContextPath + "cart/";
					}
					return false;
				}
			},
			error : function(response, status, error) {
				var alertData = {
					title : "",
					content : "오류",
					callBack : "",
					btnText : "확인"
				};
				commonAlert(alertData);
				openLayer('commonAlert');
				return false;
			},
			beforeSend : function(xhr) {
				xhr.setRequestHeader("ajax", true);
			},
			complete : function() {
			}
		};
		$.ajax(nowBuyOptions);
		return false;
}

var buyfixedMatchAjax = function (dataParam, qtyList, type, cartCallMethod) { 
	// URL - stContextPath 적용 
	var stContextPath = $("#viewStContextPath").val();
    var self_ = this;
    var fixedmodel = "";
    var yesCallback = function () {
        buyAjax(fixedmodel + ':::1'); // 매칭제품 있으면 'Y' : fixedMdl구매
    }
    
    dataParam = dataParam.replace(/\|/g, "^");
    
    var noCallback = function () {
        buyAjax(dataParam);
    }
    var coCallback = function () {
    }
    
    var params = {
        'storeCd': 'sec',
        'productCode': + dataParam
    };

    var option = {
        url: stContextPath+'/xhr/bespoke/fixedMatchAjax',
        dataType: "json",
        type: "POST",
        data: params,
        jsonpCallback: "jsonpcallback_bespoke",
        success: function (rtnjson) {
            var price1 = "0";
            var price2 = "0";

            if (rtnjson.fixedMatchResult.code == 'Y') {
                fixedmodel = rtnjson.fixedMatchResult.data.fixedMdl;
                price1 = controlNumber.numberWithCommas(selectPrice);
                price2 = controlNumber.numberWithCommas(rtnjson.fixedMatchResult.data.bPrice);
                
                popup.confirm8(1, '가격비교 안내 및 fixed 제품 구매', price1, price2, yesCallback, noCallback, coCallback)
                return false;
            } else {
                if(type == 'cart'){
                	
                    cartAjax(dataParam, qtyList, cartCallMethod);
                } else {
                    buyAjax(dataParam);
                }
            }
        },
        error: function (response, status, error) {
            alert('fixedMatchAjax.오류');
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("ajax", true);
        },
        complete: function () { }
    };

    $.ajax(option);
};

// bespoke cartAjax
var cartAjax = function (data, qtyList, cartCallMethod) {
	// URL - stContextPath 적용 
	var stContextPath = $("#viewStContextPath").val();
    var cartParam = "";
    var ids = '';

    var option1 = {
        url: stContextPath+"/xhr/bespoke/goodsIdsAjax",
        dataType: "json",
        type: "POST",
        async: false,
        data: {bspkGrpKeys : data},
        success: function (result) {
        	
            if(typeof(result.exCode) !== 'undefined') {
                var alertData ={
                    title : ""
                    , content : "상품을 준비중입니다."
                    , callBack : ""
                    , btnText : "확인"
                };
                commonAlert(alertData);
                openLayer('commonAlert');
                return false;
            } else {
                ids =  JSON.stringify(result.goodsIdList);
            }
        },
        error: function (response, status, error) {
            alert('오류');
            return false;
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("ajax", true);
        },
        complete: function () { }
    };
    $.ajax(option1);

    goodsIdsTmp = ids.replace(/\"/g, '');
    goodsIdsTmp = goodsIdsTmp.replace("[", '');
    goodsIdsTmp = goodsIdsTmp.replace("]", '');
    var bspkGoodsIdsList = goodsIdsTmp.split(",");
    
    if (cartCallMethod == "confirm") {
		var options = {
			url : stContextPath+"/xhr/order/goodscnt"
			, data : {
				goodsIds: bspkGoodsIdsList, //본체 goodsId와 패널 goodsId를 list로 전달
				nowBuyYn : "N",
				buyQtys : String(qtyList),
				orderType : "ONCE",
				bspkGrpKeys : data,
				bspkGoodsYn : "Y"
			}
			, done : function(resData){
				var cartCnt = resData.goodsCnt;
				
				if ( cartCnt > 0 ) {
					let confirmData = {
						content : "이미 동일한 상품이 장바구니에 있습니다.</br>추가하시겠습니까?"
				        ,okBtnText : "확인"
				        ,cancelBtnText : "취소"
			        };
					commonConfirm(confirmData);
					openLayer('commonConfirm');
					$("#closeCommonConfirmBtn").css("display", "none");
					
					$("#commonConfirmOkBtn").on('click' , function(){
						if($("#commonConfirmOkBtn").text() == "확인") {
							insertBespokeCartFn(data, ids, cartCallMethod);
						}
					});
					$("#commonConfirmCancelBtn").on('click' , function(){
						//취소
						return false;
					});
				} else {
					insertBespokeCartFn(data, ids, cartCallMethod);
				}
			}
		};
		ajax.call(options);
	} else {
		insertBespokeCartFn(data, ids, cartCallMethod);
	}

};

// bespoke insert cart
var insertBespokeCartFn = function(data, ids, cartCallMethod) {
	// URL - stContextPath 적용 
	var stContextPath = $("#viewStContextPath").val();
	
	 if(ids != '') {
	        var option = {
	            url: stContextPath+"/xhr/order/insertCart",
	            dataType: "json",
	            type: "POST",
	            data: {
	                nowBuyYn : 'N',
	                bspkGrpKeys : data,
	                goodsIds : ids
	            },
	            success: function (result) {
	            	
	                if(typeof(result.exCode) !== 'undefined') {
	                    var alertData ={
	                        title : ""
	                        , content : result.exMsg
	                        , callBack : ""
	                        , btnText : "확인"
	                    };
	                    commonAlert(alertData);
	                    openLayer('commonAlert');
	                    return false;
	                } else {
	                	
	                	if(cartCallMethod == "confirm") {
							let confirmData = {
								content : "제품이 장바구니에 추가되었습니다.<br>장바구니로 이동하시겠습니까?"
							    ,okBtnText : "이동"
							    ,cancelBtnText : "취소"
						    };
							commonConfirm(confirmData);
							openLayer('commonConfirm');
							
							$("#closeCommonConfirmBtn").css("display", "none");
							
							$("#commonConfirmOkBtn").on('click' , function(){
								if($("#commonConfirmOkBtn").text() == "이동") {
									location.href = stContextPath+"cart/";
								}
							});
							
							$("#commonConfirmCancelBtn").on('click' , function(){
								//취소
								return false;
							});
							
						} else {
							location.href = stContextPath+"cart/";
						}
						return false;
	                }

	            },
	            error: function (response, status, error) {
	                alert('오류');
	            },
	            beforeSend: function (xhr) {
	                xhr.setRequestHeader("ajax", true);
	            },
	            complete: function () { }
	        };
	        $.ajax(option);
	    }
}

/**
 * 선물하기(crawling)_단일건 - target 추가
 * @param mdlCode 모델코드
 * @param target 타겟
 */
function presentDirect(mdlCode, target) {
	if (mdlCode === null || mdlCode === undefined
			|| $.trim(mdlCode).length == 0) {
		var alertData = {
			title : "",
			content : "모델코드가 없습니다.",
			callBack : "",
			btnText : "확인"
		};
		commonAlert(alertData);
		openLayer('commonAlert');
		return false;
	}
	
	// URL - stContextPath 적용 
	var stContextPath = $("#viewStContextPath").val();
	var goodsId;

	var option = {
		url : stContextPath+"/xhr/bespoke/goodsIdsAjax",
		dataType : "json",
		type : "POST",
		async : false,
		data : {
			bspkGrpKeys : mdlCode
		},
		success : function(result) {

			if (result.exCode !== null && result.exCode !== undefined) {
				var alertData = {
					title : "",
					content : "상품을 준비중입니다.",
					callBack : "",
					btnText : "확인"
				};
				commonAlert(alertData);
				openLayer('commonAlert');
				return false;
			} else {
				if (result.goodsIdList != null) {
					goodsId = result.goodsIdList[0];
				}
			}

		},
		error : function(response, status, error) {
			var alertData = {
				title : "",
				content : "오류",
				callBack : "",
				btnText : "확인"
			};
			commonAlert(alertData);
			openLayer('commonAlert');
			return false;
		},
		beforeSend : function(xhr) {
			xhr.setRequestHeader("ajax", true);
		},
		complete : function() {
		}

	};

	$.ajax(option);

	if (goodsId !== null && goodsId !== undefined) {
		var reqData = {
			goodsIds : goodsId,
			stGbCd : "${view.stGbCd}",
			stId : "${view.stId}",
			mbrNo : "${session.mbrNo}",
			nowBuyYn : "Y",
			buyQtys : 1,
			orderType : "ONCE",
		};

		var nowBuyOptions = {
			url : stContextPath+"/xhr/order/insertCart",
			dataType : "json",
			type : "POST",
			data : reqData,
			success : function(result) {
				if (result.exCode !== null && result.exCode !== undefined) {
					var alertData = {
						title : "",
						content : result.exMsg,
						callBack : "",
						btnText : "확인"
					};
					commonAlert(alertData);
					openLayer('commonAlert');
					return false;
				} else {
					var msg = "선물하기";
					
					if (fnChkLogin(msg, location.pathname)) {
						var cartId = document.createElement('input');
						
						cartId.setAttribute('name', "cartId");
						cartId.setAttribute('value', result.cartId);
						
						var presentYn = document.createElement('input');
						
						presentYn.setAttribute('name', "presentYn");
						presentYn.setAttribute('value', 'Y');
						
						var form = document.createElement('form');
						
						form.setAttribute('action', stContextPath+"present/presentSend/");
						form.setAttribute('target', target);
						form.setAttribute('method', 'post');

						form.appendChild(cartId);
						form.appendChild(presentYn);
						document.body.appendChild(form);
						form.submit();
					}
				}
			},
			error : function(response, status, error) {
				var alertData = {
					title : "",
					content : "오류",
					callBack : "",
					btnText : "확인"
				};
				commonAlert(alertData);
				openLayer('commonAlert');
				return false;
			},
			beforeSend : function(xhr) {
				xhr.setRequestHeader("ajax", true);
			},
			complete : function() {
			}
		};
		$.ajax(nowBuyOptions);
	}
};

/**
 * crawlingBuyDirectById : 바로구매(crawling)_단일건 (상품아이디)
 * @param goodsId 상품아이디
 */
function crawlingBuyDirectById(goodsId) {
	fnBuyDirectBySingleId(goodsId, "_self");
};

/**
 * fnCartDirectByMultiId1 : 장바구니_복수건 (상품아이디) : 추후 삭제예정
 * @param goodsList
 */
function fnCartDirectByMultiId1(goodsList, cartCallMethod) {
	
	console.log("goodsList=====> " + JSON.stringify(goodsList));

	// @ Test 상품아이디 리스트
	// @ ex: { goodsId:상품아이디, qty:수량, compNo:업체번호(@닷컴기준: [312:삼성전자한국총괄],[313:삼성판매주식회사],[0:없음]) }
	// var goodsList = [
	// { goodsId:"G000001111", qty:2, compNo:312 },
	// { goodsId:"G000001112", qty:4, compNo:313 },
	// { goodsId:"G000001113", qty:1, compNo:313, tradeIn:"Y", galaxyClub:"Y", galaxyClubTpCd:"CLB008" }
	// ];
	
	// cartCallMethod : 장바구니 이동 여부 확인 파라미터
	// var cartCallMethod = "move" (default) 장바구니 이동
	//						"confirm" 동일한 상품 확인 / 장바구니 이동 팝업 띄우기

	// @ 상품아이디 조회를 위한 모델코드 및 업체 리스트(String)
	// @ searchGoodsParams: G000001111^G000001112^...
	// @ searchCompNoParams: 000^312^313...
	var searchGoodsParams = "";
	var searchCompNoParams = "";

	// @ 수량 리스트
	var qtyList = new Array();

		
	// @ Validate Check
	if (0 < goodsList.length) {
		var goodsId = "";
		var qtyI = 0;
		var compNoI = "";
		var content = "";
		
		for (var i = 0; i < goodsList.length; i++) {
			goodsId = goodsList[i].goodsId;
			qtyI = goodsList[i].qty;

			// 상품아이디 체크
			if (goodsId === null || goodsId === undefined || $.trim(goodsId).length == 0) {
				content = "상품아이디를 확인하여 주시기 바랍니다."
			}
			
			// 업체번호 체크
			if (goodsList[i].compNo === null || goodsList[i].compNo === undefined || $.trim(goodsList[i].compNo).length == 0) {
				compNoI = 0;
			}else{
				compNoI = goodsList[i].compNo;
			}
			
			// 수량 체크
			if (qtyI === null || qtyI === undefined || qtyI < 1) {
				content = "수량을 확인하여 주시기 바랍니다."
			}
					
			// 상품아이디 및 수량 이상 있을시 alert
			if (content !== "") {
				fnAlertMessage(content);
				return false;
			} else {
				// 상품아이디 정제
				if (i !== (goodsList.length - 1)) {
					searchGoodsParams += goodsId + "^";
					searchCompNoParams += compNoI + "^";
				} else {
					searchGoodsParams += goodsId;
					searchCompNoParams += compNoI;
				}
				// 수량 정제
				qtyList.push(qtyI);
			}	
		}
	} else {
		fnAlertMessage("데이터 확인이 필요합니다.");
		return false;
	}
	
	// 상품 판매 상태 체크
	var goodsIdList = fnCheckGoodsStatus(searchGoodsParams);
	
	// @ Cart Insert
	if (goodsIdList !== null && goodsIdList !== undefined && goodsIdList.length > 0) {
		//일반상품 장바구니 goodsCnt 조회
		goodsCntCart(goodsIdList, qtyList, cartCallMethod);
	}
};

/**
 * 장바구니 담기 모델코드 넣기 (단/복수)
 * 수량(qty) 사용시 mdlCode 와 type 맞춰서 보내야함 
 * @param mdlCode 필수 (String , Array  / 구분자 : , )
 * @param qty(수량) 필수아님 없을경우 1 (Array , String  / 구분자 : , )
 */
function cartDirectMdlCode(mdlCode , qty) {
	var mdlList = [];
	var vel = true;
	
	if(Array.isArray(mdlCode)){
		for(var i = 0; i < mdlCode.length ; i ++){
			var mdl = {};
			mdl.mdlCode = mdlCode[i].trim();
			mdl.qty = ifNullQty(qty , i);
			mdlList.push(mdl);
		}
	} else if(typeof(mdlCode) == "string"){
		if(mdlCode.includes(",")){
			var spiltList = mdlCode.split(",")
			for(var i = 0; i < spiltList.length ; i ++){
				var mdl = {};
				mdl.mdlCode = spiltList[i].trim();
				mdl.qty = ifNullQty(qty , i);
				mdlList.push(mdl);
			}
		} else {
			var mdl = {};
			mdl.mdlCode = mdlCode;
			mdl.qty = ifNullQty(qty);
			mdlList.push(mdl);
		}
	} else {
		vel = false;
		fnAlertMessage("잘못된 모델코드 형식입니다.");
	}
	if(vel){
		fnCartDirect(mdlList, "confirm");		
	}
}

/**
 * 장바구니 담기 상품아이디 넣기 (단/복수) 
 * 수량(qty) 사용시 goodsID 와 type 맞춰서 보내야함 
 * @param goodsId 필수 (String , Array  / 구분자 : , )
 * @param qty(수량) 필수아님 없을경우 1 (Array , String / 구분자 : , )
 */
function cartDirectGoodsId(goodsId , qty) {
	var goodsList = [];
	var vel = true;
	
	if(Array.isArray(goodsId)){
		for(var i = 0; i < goodsId.length ; i ++){
			var goods = {};
			goods.goodsId = goodsId[i].trim();
			goods.qty = ifNullQty(qty , i);
			goodsList.push(goods);
		}
	} else if(typeof(goodsId) == "string"){
		if(goodsId.includes(",")){
			var spiltList = goodsId.split(",")
			for(var i = 0; i < spiltList.length ; i ++){
				var goods = {};
				goods.goodsId = spiltList[i].trim();
				goods.qty = ifNullQty(qty , i);
				goodsList.push(goods);
			}
		} else {
			var goods = {};
			goods.goodsId = goodsId;
			goods.qty = ifNullQty(qty);
			goodsList.push(goods);
		}
	} else {
		vel = false;
		fnAlertMessage("잘못된 상품아이디 형식");
	}
	if(vel){
		fnCartDirectByMultiId1(goodsList, "confirm");
	}
}

/**
 * 수량(qty) validation
 * @param qty 필수  (Array , String  / 구분자 : , )
 * @param index 필수 아님 (int)
 * @returns 수량
 */
function ifNullQty(qty , index){
	if(qty != null && qty.length != 0){
		if(Array.isArray(qty) && index != null){
			return qty[index].trim();
		} else if(typeof(qty) == "string"){
			if(qty.includes(",") && index != null){
				var qtyList = qty.split(",")
				return qtyList[index].trim();
			} else {
				return qty;
			}
		} else {
			return 1;
		}
	} else {
		return 1;
	}
}






/**********************************************************************************************************
 * 상품 아이디 버전
 **********************************************************************************************************/

/**
 * fnChkLogin : 로그인 유효성 검사
 * @param msg : 구매 / 선물하기 등
 * @param returnUrl : 주문 / 뒤로가기
 */
function fnChkLogin(msg, returnUrl) {
	// URL - stContextPath 적용
	var stContextPath = $("#viewStContextPath").val();
	var ret = false;
	var options = {
		url : stContextPath+"/xhr/goods/loginCheck"
		, type: 'POST'
		, async : false
		, done : function(data) {
			if(!data.isLogin) {
				ret = false;
				let confirmData = {
					content : "로그인 후 " + msg + "가 가능합니다.<br/>로그인 하시겠습니까?"
					,okBtnText : "확인"
					,cancelBtnText : "취소"
				};
				commonConfirm(confirmData);
				openLayer('commonConfirm');

				$("#closeCommonConfirmBtn").hide();

				$("#commonConfirmOkBtn").on('click' , function(){
					location.href= stContextPath + "member/indexLogin/?returnUrl=" + encodeURIComponent(returnUrl);
					return false;
				});

				$("#commonConfirmCancelBtn").on('click' , function(){
					return false;
				});
			} else {
				ret = true;
			}
		}
	};
	ajax.call(options);
	return ret;
}

/**
 * fnChkGalaxyClub : Galaxy Club 유효성 검사
 * @param reqData : 캠페인코드
 */
function fnChkGalaxyClub (reqData) {
	// URL - stContextPath 적용
	var stContextPath = $("#viewStContextPath").val();
	var ret = false;
			
	var options = {
		url : stContextPath+"xhr/goods/galaxyClubCheck"
		, type: 'POST'
		, data : reqData
		, async : false
		, done : function(data) {
			if(!data.isLogin) {
				let confirmData = {
					content : "로그인 이후 구매하기가 가능 합니다<br/>로그인 하시겠습니까?"
					,okBtnText : "확인"
					,cancelBtnText : "취소"
				};
				commonConfirm(confirmData);
				openLayer('commonConfirm');

				$("#closeCommonConfirmBtn").hide();

				$("#commonConfirmOkBtn").on('click' , function(){
					location.href= stContextPath + "member/indexLogin/?returnUrl=" + location.pathname;
					return false;
				});

				$("#commonConfirmCancelBtn").on('click' , function(){
					return false;
				});
			} else {
				var alertMsg = "";
				// 멤버십 가입 여부
				if(data.membershipNo != null){
					// 캠페인 가입 여부
					if(data.isGalaxyCmpnYn != null){
						if(data.isGalaxyCmpnYn == 'N' && data.prgrStatCd == null){
							// 주문 페이지로
							location.href = fnGetOrderUrl(reqData);
						}else if(data.isGalaxyCmpnYn == 'N' && data.prgrStatCd != null){
							if(data.prgrStatCd == '01'){// 가입상태:접수
								alertMsg = "<span class='blue-color'>" + data.clubNm + "</span>에<br class='pc-ver'> 가입신청이 진행 중이므로<br class='pc-ver'> My 갤럭시 클럽 대상 제품을<br class='pc-ver'> 추가 구매할 수 없습니다.";
							}else if(data.prgrStatCd == '02'){// 가입상태:가입대기
								alertMsg = "<span class='blue-color'>" + data.clubNm + "</span>에<br class='pc-ver'> 가입신청이 완료되었으므로<br class='pc-ver'> My 갤럭시 클럽 대상 제품을<br class='pc-ver'> 추가 구매할 수 없습니다.";
							}else if(data.prgrStatCd == '03'){// 가입상태:가입완료
								alertMsg = "<span class='blue-color'>" + data.clubNm + "</span>에<br class='pc-ver'> 가입이 완료되었으므로<br class='pc-ver'> My 갤럭시 클럽 대상 제품을<br class='pc-ver'> 추가 구매할 수 없습니다.";
							}
						}else{
							alertMsg = "이미 <span class='blue-color'>" + data.clubNm + "</span>에<br class='pc-ver'> 포함되어 있는 제품을 구매하셨습니다.<br>"
								+ "동일 " + data.clubNm + "에<br class='pc-ver'> 포함되어 있는 제품은<br class='pc-ver'> 회원 1인당 1대만 구매 가능합니다.";
						}
						// pop alert msg
						if (alertMsg != "") {
							let confirmData = {
								content : alertMsg
								,cancelBtnText : "닫기"
							};
							commonConfirm(confirmData);
							openLayer('commonConfirm');

							$("#commonConfirmOkBtn").hide();

							$("#commonConfirmCancelBtn").on('click' , function(){
								return false;
							});
							return ret;
						}
					}
				}else{
					let confirmData = {
						content : "My 갤럭시 클럽 제품을 구매하시려면<br class='pc-ver'> 멤버십 회원으로 먼저 가입하셔야 합니다.<br>멤버십 회원으로 가입 하시겠습니까?"
						,okBtnText : "확인"
						,cancelBtnText : "취소"
					};
					commonConfirm(confirmData);
					openLayer('commonConfirm');

					$("#commonConfirmOkBtn").on('click' , function(){
						location.href=stContextPath+"membership/point/";
						return false;
					});

					$("#commonConfirmCancelBtn").on('click' , function(){
						return false;
					});
					return ret;
				}
				ret = true;
			}

		}
	};
	ajax.call(options);
	return ret;
}

/**
 * fnCheckGoodsStatus : 상품 판매 상태 체크
 * @param goodsIdParam 상품아이디
 */
function fnCheckGoodsStatus(goodsIdParam) {
	var stContextPath = $("#viewStContextPath").val();
	var goodsIdList = [];
	var checkOption = {
		url : stContextPath+"xhr/goods/checkGoodsStatus",
		dataType : "json",
		type : "POST",
		async : false,
		data : {
			grpKeys : goodsIdParam
		},
		success : function(result) {
			if (result.exCode !== null && result.exCode !== undefined) {
				fnAlertMessage("상품을 준비중입니다.");
				return false;
			} else {
				if (result != null) {
					goodsIdList = result;
				}
			}
		},
		error : function(response, status, error) {
			fnAlertMessage("[오류] goodsIdsAjax");
			return false;
		},
		beforeSend : function(xhr) {
			xhr.setRequestHeader("ajax", true);
		},
		complete : function() {
		}
	};

	$.ajax(checkOption);
	return goodsIdList;
}

/**
 * fnAlertMessage : 알림메세지
 * @param alertMsg 메세지 내용
 */
function fnAlertMessage(alertMsg) {
	var alertData = {
		title : "",
		content : alertMsg,
		callBack : "",
		btnText : "확인"
	};
	commonAlert(alertData);
	openLayer('commonAlert');
}

/**
 * fnGetOrderUrl : 주문페이지로 이동
 * @param reqData :  요청 데이터
 */
function fnGetOrderUrl(reqData) {
	var stContextPath = $("#viewStContextPath").val();
	var urlStr = "order/";

	// 선물하기 주문 파라메터 셋팅
	if(!!reqData.presentYn && !!reqData.cartId && "Y" == reqData.presentYn) {
		urlStr = "present/presentSend/";
		var queryStr = "?";
		if(urlStr.includes("?")) {
			queryStr = "&";
		}
		urlStr += queryStr + "presentYn=" + reqData.presentYn + "&cartId=" + reqData.cartId;
	}

	// 네이버페이 주문 파라메터 셋팅
	if(!!reqData.naverPay && "Y" == reqData.naverPay){
		var queryStr = "?";
		if(urlStr.includes("?")) {
			queryStr = "&";
		}
		urlStr += queryStr + "naverPay=" + reqData.naverPay;
	}

	if(!!reqData.mobidooYn && reqData.mobidooYn && "10" == stGbCd) {
		urlStr = fnGetCrossDomain(urlStr);
	} else {
		urlStr = stContextPath + urlStr;
	}

	return urlStr;
}


/**
 * getCookie : 모비두 트레킹 로직
 * @param cookieName 쿠키명
 */
function getCookie(cookieName){
	var cookies = document.cookie.split(';') 
    for (var cookie of cookies) {
    	var [name, value] = cookie.trim().split('=')
    	if (name === cookieName) {
    		return decodeURIComponent(value)
		}
    }
    return undefined
}

/**
 * fnGetCrossDomainGl : 모비두 gl 매개변수 호출
 * @param 
 */
function fnGetCrossDomainGl(){
	try {
		if (window.google_tag_data && window.google_tag_data.glBridge) {
			var mId = "G-HKQZDLVWPN".replace("G-", "")
            , currentGaCookie = getCookie("_ga")
            , currentGaMIdCookie = getCookie("_ga_".concat(mId))
            , gaCookie = Array.isArray(currentGaCookie) ? currentGaCookie[0] : currentGaCookie
            , gaMIdCookie = Array.isArray(currentGaMIdCookie) ? currentGaMIdCookie[0] : currentGaMIdCookie
            , cookieObject = {_ga: null == gaCookie ? void 0 : gaCookie.substr(6)};
			
			cookieObject["_ga_".concat(mId)] = null == gaMIdCookie ? void 0 : gaMIdCookie.substr(6);
			
		    var gl = window.google_tag_data.glBridge.generate(cookieObject);
		    
			if (gl) {
				window.dataLayer?.push({
					event: 'gl_ready',
					gtagApiResult: {
						_gl: gl,
					},
				})
			}
			return gl	
		}
	} catch (error) {
		console.log('_gl creation error', error)
        return ''
	}
}

/**
 * fnUtmCode : 모비두 UTM 코드 호출 관련
 * @param url 링크URL
 */
function fnUtmCode(url){
	/* Step1. 삼성 URL에서 UTM 쿼리스트링 가져오기 */  
	var urlQueryStrings = window.location.search;

	/* Step2. 소스라이브 플레이어 URL에 UTM 쿼리스트링 붙이기 */
	var originalPlayerURLStr = url;
	
	if(originalPlayerURLStr.includes("?")) {
		urlQueryStrings = "&" + urlQueryStrings.substring(1);
	}
	var playerURLStr = originalPlayerURLStr + urlQueryStrings;  
	var playerURL = new URL(playerURLStr)

	/* Step3. 기존에 안내한 _gl 쿼리스트링 붙이기 */
	playerURL.searchParams.append('_gl', fnGetCrossDomainGl())

	/* Step4. 이후 페이지에 구현되어 있는 방식으로 링크 이동 */
	// ...
	return playerURL;
}

function fnGetCrossDomain(pathGb){
	var urlQueryCheck = location.href;
	var playURL = null;
	
	var stContextPath = $("#viewStContextPath").val();
	var urlSet = window.location.origin + stContextPath + pathGb;

	playURL = fnUtmCode(urlSet);

	return playURL.href;
}

/**
 * fnInsertCart : 장바구니 등록
 * @param reqData ->
 goodsIds : goodsIdList,
 nowBuyYn : 바로구매 여부,
 buyQtys : 수량,
 orderType : "ONCE"
 */
function fnInsertCart(reqData) {
	var stContextPath = $("#viewStContextPath").val();
	var mobidooYn =  location.search.indexOf("orderCallBackId") != -1 ? true : false;
	var cartResult = null;
	var nowBuyOptions = {
		url : stContextPath+"/xhr/order/insertCart",
		dataType : "json",
		type : "POST",
		data : reqData,
		async : false,
		success : function(result) {
			if (!!result.exMsg || !!result.exMsg2) {
				fnAlertMessage(!!result.exMsg ? result.exMsg : result.exMsg2);
				return false;
			} else {
				cartResult = result;

				if("N" === reqData.nowBuyYn) {
					if("confirm" === reqData.cartCallMethod) {
						let confirmData = {
							content : "제품이 장바구니에 추가되었습니다.<br>(현재 총 " +result.cartCnt + "개의 제품이 장바구니에 담겼습니다.)"
							,okBtnText : "쇼핑 계속하기"
							,cancelBtnText : "장바구니 이동"
						};
						commonConfirm(confirmData);
						openLayer('commonConfirm');
						$("#closeCommonConfirmBtn").css("display", "none");

						$("#commonConfirmOkBtn").on('click' , function(){
							//취소
							return false;
						});

						$("#commonConfirmCancelBtn").on('click' , function(){
							if($("#commonConfirmCancelBtn").text() == "장바구니 이동") {
								if(mobidooYn && stGbCd == '10'){
									fnGetCrossDomain("cart");
								}else{
									location.href = stContextPath + "cart/";
								}
								return false;
							}
						});
						if (result.cartCnt !== 0) {
							$(".cart-inner-count").css("display", "block");
							$(".cart-inner-count").html(result.cartCnt);
						} else {
							$(".cart-inner-count").css("display", "none");
						}
					} else {
						if(mobidooYn && stGbCd == '10'){
							fnGetCrossDomain("cart");
						}else{
							location.href = stContextPath + "cart/";
						}
						return false;
					}
				}
			}
		},
		error : function(response, status, error) {
			fnAlertMessage("[오류] insertCart");
			return false;
		},
		beforeSend : function(xhr) {
			xhr.setRequestHeader("ajax", true);
		},
		complete : function() {
		}
	};
	$.ajax(nowBuyOptions);
	return cartResult;
}

/**
 * fnCartDirectByMultiId : 장바구니_복수건 (상품아이디)
 * @param goodsList
 */
function fnCartDirectByMultiId(goodsList, cartCallMethod) {
	var stContextPath = $("#viewStContextPath").val();
	console.log("goodsList=====> " + JSON.stringify(goodsList));

	// @ Test 상품아이디 리스트
	// @ ex: { goodsId:상품아이디, qty:수량, compNo:업체번호(@닷컴기준: [312:삼성전자한국총괄],[313:삼성판매주식회사],[0:없음]) }
	// var goodsList = [
	// { goodsId:"G000001111", qty:2, compNo:312 },
	// { goodsId:"G000001112", qty:4, compNo:313 },
	// { goodsId:"G000001113", qty:1, compNo:313, tradeIn:"Y", galaxyClub:"Y", galaxyClubTpCd:"CLB008" }
	// ];

	// cartCallMethod : 장바구니 이동 여부 확인 파라미터
	// var cartCallMethod = "move" (default) 장바구니 이동
	//						"confirm" 동일한 상품 확인 / 장바구니 이동 팝업 띄우기

	// @ 상품아이디 조회를 위한 모델코드 및 업체 리스트(String)
	// @ searchGoodsParams: G000001111^G000001112^...
	// @ searchCompNoParams: 000^312^313...
	var searchGoodsParams = "";
	var searchCompNoParams = "";

	// @ 수량 리스트
	var qtyList = new Array();

	// 트레이드인 리스트
	var tradeInList = new Array();
	// @ Validate Check
	if (0 < goodsList.length) {
		var goodsId = "";
		var qtyI = 0;
		var compNoI = "";
		var content = "";
		var goodsOrdTpCd = "";
		var galaxyClubTpCd = "";

		for (var i = 0; i < goodsList.length; i++) {
			goodsId = goodsList[i].goodsId;
			qtyI = goodsList[i].qty;

			// 상품아이디 체크
			if (goodsId === null || goodsId === undefined || $.trim(goodsId).length == 0) {
				content = "상품아이디를 확인하여 주시기 바랍니다."
			}

			// 업체번호 체크
			if (goodsList[i].compNo === null || goodsList[i].compNo === undefined || $.trim(goodsList[i].compNo).length == 0) {
				compNoI = 0;
			}else{
				compNoI = goodsList[i].compNo;
			}

			// 수량 체크
			if (qtyI === null || qtyI === undefined || qtyI < 1) {
				content = "수량을 확인하여 주시기 바랍니다."
			}

			// ---- 트레이드인 구매 관련 start;
			//트레이드인
			if(goodsList[i].tradeIn == "Y") {
				goodsOrdTpCd = "TRD";
			}else if(goodsList[i].ceTradeIn == "Y"){
				goodsOrdTpCd = "CETRD";
			}else{
				// 트레이드인 / 갤럭시 클럽 상품 파라메터 초기화
				goodsOrdTpCd = "";
			}

			if(goodsList[i].galaxyClub == "Y") {
				content = "My 갤럭시 클럽 상품은 장바구니에 담을 수 없습니다.";
				// goodsOrdTpCd += "GC";
				// if (goodsList[i].galaxyClubTpCd === null || goodsList[i].galaxyClubTpCd === undefined || $.trim(goodsList[i].galaxyClubTpCd).length == 0) {
				// 	content = "갤럭시 클럽 캠페인 코드를 확인하여 주시기 바랍니다.";
				// } else {
				// 	galaxyClubTpCd = goodsList[i].galaxyClubTpCd;
				// }
			}

			console.log("goodsOrdTpCd=====> " + goodsOrdTpCd);
			// ---- 트레이드인 구매 관련 end;

			// 상품아이디 및 수량 이상 있을시 alert
			if (content !== "") {
				fnAlertMessage(content);
				return false;
			} else {
				// 상품아이디 정제
				if (i !== (goodsList.length - 1)) {
					searchGoodsParams += goodsId + "^";
					searchCompNoParams += compNoI + "^";
				} else {
					searchGoodsParams += goodsId;
					searchCompNoParams += compNoI;
				}
				// 수량 정제
				qtyList.push(qtyI);

				tradeInList.push(goodsOrdTpCd);
			}
		}

		if(tradeInList.includes('CETRD') || tradeInList.includes('TRD')) { // TradeIn 체크
			if (!fnChkLogin("중고 추가 보상 상품 장바구니 담기", location.pathname)) { // 로그인 체크
				return false;
			}
		}
	} else {
		fnAlertMessage("데이터 확인이 필요합니다.");
		return false;
	}

	// 상품 판매 상태 체크
	var goodsIdList = fnCheckGoodsStatus(searchGoodsParams);

	// @ Cart Insert
	if (goodsIdList !== null && goodsIdList !== undefined && goodsIdList.length > 0) {
		//일반상품 장바구니 goodsCnt 조회
		var reqData = {
			goodsIds : String(goodsIdList),
			nowBuyYn : "N",
			buyQtys : String(qtyList),
			orderType : "ONCE",
			cartCallMethod : cartCallMethod,
			goodsOrdTpCd : String(tradeInList),
			galaxyClubTpCd : galaxyClubTpCd
		};

		if (cartCallMethod == "confirm") {
			var options = {
				url : stContextPath + "xhr/order/goodscnt"
				, data : reqData
				, async : false
				, done : function(data){
					var cartCnt = data.goodsCnt;
					if ( cartCnt > 0 ) {
						let confirmData = {
							content : "이미 동일한 상품이 장바구니에 있습니다.</br>추가하시겠습니까?"
							,okBtnText : "확인"
							,cancelBtnText : "취소"
						};
						commonConfirm(confirmData);
						openLayer('commonConfirm');
						$("#closeCommonConfirmBtn").css("display", "none");

						$("#commonConfirmOkBtn").on('click' , function(){
							if($("#commonConfirmOkBtn").text() == "확인") {
								fnInsertCart(reqData);
								return false;
							}
						});
						$("#commonConfirmCancelBtn").on('click' , function(){
							//취소
							return false;
						});
					} else {
						fnInsertCart(reqData);
					}
				}
			};
			ajax.call(options);
		} else {
			fnInsertCart(reqData);
		}
	}
};

/**
 * fnBuyDirectBySingleId : 바로구매_단일건 (상품아이디)
 * @param goodsId 상품아이디
 * @param target 타겟
 * @param naverPay 네이버 페이
 */
function fnBuyDirectBySingleId(goodsId, target, naverPay) {
	if (goodsId === null || goodsId === undefined
		|| $.trim(goodsId).length == 0) {
		fnAlertMessage("상품아이디가 없습니다.");
		return false;
	}

	// 상품 판매 상태 체크
	var goodsIdList = fnCheckGoodsStatus(goodsId);

	if (goodsIdList !== null && goodsIdList !== undefined && goodsIdList.length > 0) {
		var reqData = {
			goodsIds : goodsIdList,
			nowBuyYn : "Y",
			buyQtys : 1,
			orderType : "ONCE",
			mobidooYn : location.search.indexOf("orderCallBackId") != -1 ? true : false,
			naverPay : !!naverPay ? naverPay : ""
		};

		// 장바구니 등록
		if(fnInsertCart(reqData) != null) {
			location.href = fnGetOrderUrl(reqData);
		}
	}
};

/**
 * fnBuyDirectByMultiId : 바로구매_복수건 (상품아이디)
 * @param goodsList
 * @param naverPay
 */
function fnBuyDirectByMultiId(goodsList, naverPay) {

	var stContextPath = $("#viewStContextPath").val();

	console.log("goodsList 222222=====> " + JSON.stringify(goodsList));

	// @ Test 상품아이디 리스트
	// @ ex: { goodsId:상품아이디, qty:수량, compNo:업체번호(@닷컴기준: [312:삼성전자한국총괄],[313:삼성판매주식회사],[0:없음]) }
	// var goodsList = [
	// { goodsId:"G000001111", qty:2, compNo:312 },
	// { goodsId:"G000001112", qty:4, compNo:313 },
	// { goodsId:"G000001113", qty:1, compNo:313, tradeIn:"Y", galaxyClub:"Y", galaxyClubTpCd:"CLB008" }
	// { goodsId:"G000001112", qty:4, compNo:313, pckStrNo : 1 },
	// { goodsId:"G000001112", qty:4, compNo:313, pckStrNo : 1, pickupCapaDate: '20240108', pickupCapaTime: 9 },
	// { goodsId:"G000001112", qty:4, compNo:313, pckStrNo : 1, pickupCapaDate: '20240108', pickupCapaTime: 9, plazaRsvYn : "Y"},
	// { goodsId:"G000001114", qty:4, compNo:313, tradeIn:"Y", dividePayment:"Y"}
	// ];

	// @ 상품아이디 조회를 위한 모델코드 및 업체 리스트(String)
	// @ searchGoodsParams: G000001111^G000001112^...
	// @ searchCompNoParams: 000^312^313...
	var searchGoodsParams = "";
	var searchCompNoParams = "";

	// @ 수량 리스트
	var qtyList = new Array();

	// 트레이드인 리스트
	var tradeInList = new Array();
	// @ Validate Check
	if (0 < goodsList.length) {
		var goodsId = "";
		var qtyI = 0;
		var compNoI = "";
		var content = "";
		var goodsOrdTpCd = "";
		var galaxyClubTpCd = "";
		var pckStrNo = "";
		var pickupCapaDate = "";
		var pickupCapaTime = "";
		var plazaRsvYn = "";
		var pckGoodsIdList = [];

		
		if (!fnDividePaymentAplChk(goodsList)) {
			fnAlertMessage("데이터 확인이 필요합니다.");
			return false;
		}

		for (var i = 0; i < goodsList.length; i++) {
			goodsId = goodsList[i].goodsId;
			qtyI = goodsList[i].qty;
			pckStrNo = goodsList[i].pckStrNo;
			pickupCapaDate = goodsList[i].pickupCapaDate;
			pickupCapaTime = goodsList[i].pickupCapaTime;
			plazaRsvYn = goodsList[i].plazaRsvYn;
			pckGoodsIdList.push(goodsId);

			// 상품아이디 체크
			if (goodsId === null || goodsId === undefined || $.trim(goodsId).length == 0) {
				content = "상품아이디를 확인하여 주시기 바랍니다."
			}

			// 업체번호 체크
			if (goodsList[i].compNo === null || goodsList[i].compNo === undefined || $.trim(goodsList[i].compNo).length == 0) {
				compNoI = 0;
			}else{
				compNoI = goodsList[i].compNo;
			}

			// 수량 체크
			if (qtyI === null || qtyI === undefined || qtyI < 1) {
				content = "수량을 확인하여 주시기 바랍니다."
			}

			// ---- 트레이드인 구매 관련 start;
			//트레이드인
			if(goodsList[i].tradeIn == "Y") {
				goodsOrdTpCd = "TRD";
			}else if(goodsList[i].ceTradeIn == "Y"){
				goodsOrdTpCd = "CETRD";
			}else{
				// 트레이드인 / 갤럭시 클럽 상품 파라메터 초기화
				goodsOrdTpCd = "";
			}

			if(goodsList[i].galaxyClub == "Y") {
				goodsOrdTpCd += "GC";
				if (goodsList[i].galaxyClubTpCd === null || goodsList[i].galaxyClubTpCd === undefined || $.trim(goodsList[i].galaxyClubTpCd).length == 0) {
					content = "갤럭시 클럽 캠페인 코드를 확인하여 주시기 바랍니다.";
				} else {
					galaxyClubTpCd = goodsList[i].galaxyClubTpCd;
				}
			}

			// 기프트 펀딩(분할 결제)
			if(goodsList[i].dividePayment == "Y") {
				if (goodsList[i].galaxyClub == "Y") {
					content = "My 갤럭시 클럽 이용 시, 기프트 펀딩 이용이 불가합니다.";
				}
				if(!fnChkLogin("구매하기", location.pathname)) {
					return false;
				}
				if(!!goodsOrdTpCd) {
					goodsOrdTpCd += "^";
				}
				goodsOrdTpCd += "DIV";
			}

			// galaxy trial program
			if(goodsList[i].galaxyTrial == "Y") {
				if(!fnChkLogin("구매하기", location.pathname)) {
					return false;
				}
				if(!!goodsOrdTpCd) {
					goodsOrdTpCd += "^";
				}
				goodsOrdTpCd += "GTP";
			}
			
			//MX 케어플러스												
			if(goodsList[i].mxCarePlusYn == 'Y'){
				if (goodsOrdTpCd == "")	goodsOrdTpCd = "MXCPY";
				else					goodsOrdTpCd += "^MXCPY";
			} else if(goodsList[i].mxCarePlusYn == 'N'){
				if (goodsOrdTpCd == "")	goodsOrdTpCd = "MXCPN";
				else					goodsOrdTpCd += "^MXCPN";
			}			
									
			console.log("goodsOrdTpCd=====> " + goodsOrdTpCd);
			// ---- 트레이드인 구매 관련 end;

			// 매장 픽업 관련 로그인 체크
			if(!!goodsList[i].pckStrNo) {
				if(!fnChkLogin("구매하기", location.pathname)) {
					return false;
				}
			}

			// 상품아이디 및 수량 이상 있을시 alert
			if (content !== "") {
				fnAlertMessage(content);
				return false;
			} else {
				// 상품아이디 정제
				if (i !== (goodsList.length - 1)) {
					searchGoodsParams += goodsId + "^";
					searchCompNoParams += compNoI + "^";
				} else {
					searchGoodsParams += goodsId;
					searchCompNoParams += compNoI;
				}
				// 수량 정제
				qtyList.push(qtyI);

				tradeInList.push(goodsOrdTpCd);
			}
		}
	} else {
		fnAlertMessage("데이터 확인이 필요합니다.");
		return false;
	}

	// 상품 판매 상태 체크
	var goodsIdList;
	if(!pckStrNo){
		goodsIdList = fnCheckGoodsStatus(searchGoodsParams);
	}else{
		goodsIdList = pckGoodsIdList;
	}


	// @ Cart Insert
	if (goodsIdList !== null && goodsIdList !== undefined && goodsIdList.length > 0) {
		// @ goodsIds, buyQtys의 배열값을 String으로 넘겨주지 않으면 컨트롤러에서 param이 null로 받아져서 String처리,
		var reqData = {
			goodsIds : String(goodsIdList),
			nowBuyYn : "Y",
			buyQtys : String(qtyList),
			orderType : "ONCE",
			goodsOrdTpCd : String(tradeInList),
			galaxyClubTpCd : galaxyClubTpCd,
			pckStrNo : pckStrNo,
			pickupCapaDate : pickupCapaDate,
			pickupCapaTime : pickupCapaTime,
			plazaRsvYn : plazaRsvYn,
			mobidooYn : location.search.indexOf("orderCallBackId") != -1 ? true : false,
			naverPay : !!naverPay ? naverPay : ""
		};

		// 장바구니 등록
		if(fnInsertCart(reqData) != null) {
			if(!!reqData.goodsOrdTpCd) {	// TradeIn, CeTradeIn, GalaxyClub, Buy&Try, DividePayment
				if(reqData.goodsOrdTpCd.includes('GC')) {	// GalaxyClub
					fnChkGalaxyClub(reqData);	// 로그인 체크 & 멤버십 체크
				} else {	// TradeIn, CeTradeIn, Buy&Try
					var orderUrl = fnGetOrderUrl(reqData);
					if (fnChkLogin("구매하기", orderUrl)) { // 로그인 체크
						// 주문 페이지로
						location.href = orderUrl;
					}
				}
			} else {
				// 주문 페이지로
				location.href = fnGetOrderUrl(reqData);
			}
		}
	}
};

/**
 * fnDividePaymentAplChk : 기프트 펀딩(분할 결제) 가능 여부 체크
 * @param goodsList
 */
function fnDividePaymentAplChk(goodsList) {
	var dividePaymentY = false;
	var dividePaymentN = false;

	for (var i = 0; i < goodsList.length; i++) {
		if (goodsList[i].dividePayment == "Y") {
			dividePaymentY = true;
		} else {
			dividePaymentN = true;
		}
	}
	
	// 다 Y거나 다 N이여야 주문 가능
	// dividePaymentY, dividePaymentY 둘 다 true면 주문 불가능
	return !(dividePaymentY && dividePaymentN)
}

/**
 * fnPresentDirectBySingleId : 선물하기 단일건 (상품아이디)
 * @param goodsId 상품아이디
 * @param target 타겟
 */
function fnPresentDirectBySingleId(goodsId, target) {
	if (goodsId === null || goodsId === undefined
		|| $.trim(goodsId).length == 0) {
		fnAlertMessage("상품아이디가 없습니다.");
		return false;
	}

	// 상품 판매 상태 체크
	var goodsIdList = fnCheckGoodsStatus(goodsId);

	if (goodsIdList !== null && goodsIdList !== undefined && goodsIdList.length > 0) {
		var reqData = {
			goodsIds : goodsIdList,
			nowBuyYn : "Y",
			buyQtys : 1,
			orderType : "ONCE",
			presentYn : "Y",
			cartId : ""
		};

		// 장바구니 등록
		var cartResult = fnInsertCart(reqData);
		if(cartResult != null) {
			var msg = "선물하기";

			// 로그인 체크
			if (fnChkLogin(msg, location.pathname)) {
				reqData.cartId = cartResult.cartId;
				location.href = fnGetOrderUrl(reqData);
			}
		}
	}
};

function fnOpenEnergyCalculatorPopUpLayer () { // 에너지계산기 iframe
	//var iframe = '<iframe  src="'+$(location).attr('origin') + "/sec/"+'energyCalculator/"></iframe><button type="button" class="pop-close" data-focus-next="popupEnergy" onClick="closeLayer(\'popupEnergy\');">팝업닫기</button>';

	var popAddr = $(location).attr('origin') + "/sec/energyCalculator/";
	
	 window.open(popAddr);
    
    
/*	
    //ifream 경우
 	$('#popupEnergy').empty();
 	openLayer('popupEnergy');
 	$('#popupEnergy').append(iframe);
 */	
}

function fnOpenEnergyBefore(){ // 에너지 계산기 계산전
	var option = {
	        url: $(location).attr('origin') + "/sec/"+"energyPopUp/",
	        dataType : "html",
	        type: "GET",
	        success: function (data) {
	        	$('#layer').empty();
	        	$('#layer').append(data);
	        }
	    };
	    $.ajax(option);
}


function getEnergyOptions(param){
	var option = {
	        url: $(location).attr('origin') + "/sec/"+"xhr/energy/getEnergyOptions",
	        type: 'POST',
	        data: param,
	        done: function (data) {
	        	var gbUl = $("#gbUl");
				var testYearUl = $("#testYearUl");
				var grdUl = $("#grdUl");
				var cateUl = $(".energy-prd-slider");
	        	
				if(data.energyOptions != null){
					if('testYear' in param){
						grdUl.empty();
						var htmlGrUl = '';
						for(var i=0; i<data.energyOptions.length; i++){
							var option = data.energyOptions[i];
							htmlGrUl += '<li name="energyGrd" role="option" class="droplist-item" data-omni="'+option.dataOmni+'">'+option.energyGrd+'</li>';
						}
						grdUl.append(htmlGrUl);
						
					}else if('ctgryGbCd' in param){
						testYearUl.empty();
						grdUl.empty();
						var testYearUlHtml = '';
						
						for(var i=0; i<data.energyOptions.length; i++){
							var option = data.energyOptions[i];
							testYearUlHtml += '<li name="testYear" role="option" class="droplist-item" data-omni="'+option.dataOmni+'">'+option.testYear+'</li>';
						}
						testYearUl.append(testYearUlHtml);
						
					}else if('energyCalCtgry' in param){	
						gbUl.empty();						
						testYearUl.empty();
						grdUl.empty();
						var gbUlHtml = '';
						
						for(var i=0; i<data.energyOptions.length; i++){
							var option = data.energyOptions[i];
							gbUlHtml += '<li name="gbItem" role="option" class="droplist-item" data-checked="false" data-cate="'+option.energyCalCtgry+'" data-gb="'+option.ctgryGbCd+'" data-omni="'+option.dataOmni+'">'+option.gbStr+'</li>';
						}
						gbUl.append(gbUlHtml);
					}
				}	        	
	        }
	    };
	 ajax.call(option);
}


/**
 * 에너지 계산기 상품 추천 화면 오픈
 */
function fnOpenEnergyRecommendGoodsPopUpLayer (data) {
	var option = {
	        url: $(location).attr('origin') + "/sec/"+"xhr/energy/getEnergyRecommendGoods/",
	        dataType : "html",
	        type: "POST",
	        data: data,
	        success: function (data) {
	        	$('#layer').empty();
	        	$('#layer').append(data);
	        	//$('#energyBtn').trigger('click');
	        }
	    };
	    $.ajax(option);
}


/**
 * @ 상품평관련 Data
 * @ Test fnGoodsCommentData(goodsId, stId, bestYn, limit);
 * 							 bestYn - 베스트 상품평 여부 / limit - 받아올 베스트 상품평 정보 갯수
 *
 * @ ex: var goodsCommentData = fnGoodsCommentData('G100172469',1,'Y',3);
 *
 * 베스트 상품평 정보 (해당 상품평 별점/이미지/본문내용/뱃지-베스트&일반, 한달, 선물하기 상품평 )
 * 총 상품평 별점 평균점수 및 갯수
 */
function fnGoodsCommentData(goodsId, stId, bestYn, limit){
	var stContextPath = $("#viewStContextPath").val();
	var returnUrl = '';
	var goodsCommentData = '';

	var selectParam = {
		goodsId : goodsId
		, stId : stId
		, bestYn : bestYn == 'Y' ? bestYn : ''
		, limit : limit
		, viewType : "img"
	}

	var options = {
		url : stContextPath + "xhr/goods/selectTopBestGoodsComment",
		data : selectParam,
		async : false,
		done: function (data) {
			if(!!data) {
				if(data.topBestGoodsCommentList.length > 0){
					returnUrl = stContextPath + data.topBestGoodsCommentList[0].goodsDetailUrl + "?focus=review";
					data.returnUrl = returnUrl;
					goodsCommentData = data;
				} else {
					goodsCommentData = '';
				}
			}
		}
	}
	ajax.call(options);
	return goodsCommentData;
}

/**
 * 매장픽업 팝업 오픈
 */
function fnOpenPickUpStorePop(goodsInfo){
	// var goodsInfo =
	// { goodsId:"G000231889", goodsNm:"매장픽업 SM-S908NDREKOO", mdlCode:"SM-S908NDREKOO", saleStat:12, isEvent:"Y" };
	
	if ('Y' == goodsInfo.activatePhoneYn && !goodsInfo.carrierCd) {
		fnAlertMessage("통신사 선택을 완료해주세요.");
		return false;
	}
	
	var pickupAvailableOptions = {
		url : $(location).attr('origin') + "/sec/" + "xhr/goods/isStorePickupGoods"
		, type : "GET"
		, data : {           
			goodsId : goodsInfo.goodsId
		}
		, done : function(pickupData){
			if (!pickupData.isPickupGoods) {
				fnAlertMessage("매장 픽업 가능한 모델이 아닙니다.");
				return false;
			} else {
				var storePickUpOptions = {
					url : $(location).attr('origin')  + "/sec/"+ "xhr/goods/storePickupList"
					, data : goodsInfo
					, type: 'POST'
					, dataType : "html"
					, done : function(data) {
						$objLayer = $("#popupLayer").addClass("layer-storepickup advancement");
						var t = $objLayer.attr('id');
						$objLayer.html(data);
						if($(".layer-pop").is(":visible")) {
							LAYERZINDEX++; // 200729 팝업 두 개 이상 띄울 경우 z-index ++
						} else {
							LAYERZINDEX = 300; // 200729 팝업 두 개 이상 띄울 경우 z-index ++
						}
						$objLayer.show().css("z-index", LAYERZINDEX).attr("aria-hidden", false).attr("data-zindex", LAYERZINDEX).focus(); // 200729 z-index 값 data attr에 저장
						$objLayer.find(".pop-close").data("activeTarget", t);
						// 딤드팝업 마스크 생성 및 활성화  // 200729
						if(!$objLayer.hasClass("nomask")){
							var zidx = parseInt($("#"+t).attr("data-zindex")) - 1;
							$("body").append("<div id='mask' data-mask-target='"+t+"' style='z-index:"+zidx+"'></div>");
			
							$("#mask").fadeIn().data("activeTarget", t);
							scrollLock('lock');
						}
			
						if(!$("body").children().is("#mask")) $("body").append("<div id='mask'></div>");
						$("#mask").fadeIn().data("activeTarget", $objLayer.data("popup-layer"));
						$("#commonAlert a").attr("onblur", "$('#commonAlert').focus();")
						$("#commonAlert").attr("onblur", "$('#commonAlert a').focus();")
			
						$objLayer.find('.pop-close').off().on('click', function (){
							$objLayer.removeAttr("style").removeAttr("data-zindex").attr("aria-hidden", true).hide();  // 200729
							$objLayer.empty();
							$("body").css("overflow", "");
			
							if ($objLayer.hasClass("layer-storepickup")) $objLayer.removeClass("layer-storepickup");
							if ($objLayer.hasClass("layer-gatherview")) $objLayer.removeClass("layer-gatherview");
							if ($objLayer.hasClass("popup-comm-video")) $objLayer.removeClass("popup-comm-video");
							if ($objLayer.hasClass("popup-comm-img360")) $objLayer.removeClass("popup-comm-img360");
							if ($objLayer.hasClass("popup-comm-gallery")) $objLayer.removeClass("popup-comm-gallery");
			
							$("#mask[data-mask-target='"+t+"']").fadeOut("fast").remove();  // 200729
							scrollLock('unlock');
			
							LAYERZINDEX--;  // 200729 레이어팝업 z-index값 초기화
			
							$(this).off();
			
						});
			
					}
				};
				ajax.call(storePickUpOptions);
			}
		}
	}
	ajax.call(pickupAvailableOptions);
	
}

/**
 * 매장 픽업 매장 선택 완료
 */
function setChoosenPickupStoreForBuyNow(data, pickupCount, buyNowYn){

	var plazaNmId = '#plazaNm-'+data.goodsId;
	var plazaNoId = '#plazaNo-'+data.goodsId;
	var storeAddrId = '#storeAddr-'+data.goodsId;
	var pickupCapaDate = '#pickupCapaDate-'+data.goodsId;
	var pickupCapaTime = '#pickupCapaTime-'+data.goodsId;
	$(plazaNmId).text(data.plazaNm);
	$(plazaNoId).text(data.plazaNo);
	$(storeAddrId).text("(" + storePickupManager.genFullAddress(data) + ")");
	$(pickupCapaDate).text(!!data.pickupCapaDate ? data.pickupCapaDate : '');
	$(pickupCapaTime).text(!!data.pickupCapaTime ? data.pickupCapaTime : '');

	if(buyNowYn == 'Y') {
		var goodsList = [
			{
				goodsId	:	data.goodsId,
				qty		:	1,
				compNo	:	data.goodsId,
				pckStrNo:	data.plazaNo,
				pickupCapaDate: data.pickupCapaDate,
				pickupCapaTime: data.pickupCapaTime,
				plazaRsvYn: data.plazaRsvYn
			}
		];
		fnBuyDirectByMultiId(goodsList);
	}
}

/**
 * 재입고 알림 신청
 * @param goodsId		상품 아이디 (*)
 * @param ntcSndTg		회원 이메일주소
 * @param ntcSndTgHp	회원 핸드폰 번호
 */
function fnRegisterRestockAlarm (goodsId, ntcSndTg, ntcSndTgHp) {
	// @ Test
	// @ ex: fnRegisterRestockAlarm('G000183088', 'test@test.com', '01011111111');
	// ntcSndTg, ntcSndTgHp 둘 중 한가지는 필수

	if(!goodsId) {
		let alertData = {
			title: ""
			, content : "오류가 발생하였습니다.<br>관리자에게 문의하시기 바랍니다.<br> [No Parameter]"
			, callback : ""
			, btnText : "확인"
		};
		commonAlert(alertData);
		openLayer('commonAlert');
		return false;
	}

	if(!ntcSndTgHp) {
		let alertData = {
			title: ""
			, content : "휴대폰 번호를 입력해 주세요"
			, callback : ""
			, btnText : "확인"
		};
		commonAlert(alertData);
		openLayer('commonAlert');
		return false;
	}

	var stContextPath = $("#viewStContextPath").val();
	var result = false;

	var param = {
		goodsId : goodsId
		// , ntcSndTg : ntcSndTg
		, ntcSndTgHp : ntcSndTgHp
	}

	var options = {
		url : stContextPath + "xhr/mypage/interest/registerRestockAlarm",
		data : param,
		async : false,
		done: function (data) {
			if(!!data) {
				result = data.result;

				let alertData = {
					title: ""
					, content : data.msg
					, callback : ""
					, btnText : "확인"
				};
				commonAlert(alertData);
				openLayer('commonAlert');
			} else {
				let alertData = {
					title: ""
					, content : "오류가 발생하였습니다.<br>관리자에게 문의하시기 바랍니다.<br> [No response]"
					, callback : ""
					, btnText : "확인"
				};
				commonAlert(alertData);
				openLayer('commonAlert');
			}
		}
	}
	ajax.call(options);

	return result;
}

/**
 * 상품 상태 체크
 * @param goodsId        상품 아이디 (*)
 * @param carrierCd        통신사 코드 (개통폰)
 */
function fnGetSaleStatCd (param) {
	// param = {goodsId : "", carrierCd : ""}
	// carrierCd { SKT -> SKT, KT -> KTF, LGU+ -> LGT }

	if(!param || !param.goodsId) {
		fnAlertMessage("오류가 발생하였습니다.<br>관리자에게 문의하시기 바랍니다.<br> [No Parameter]");
		return false;
	}

	var stContextPath = $("#viewStContextPath").val();
	var result = false;

	var options = {
		url : stContextPath + "xhr/goods/getSaleStatCd",
		data : param,
		async : false,
		done: function (data) {
			if(!!data) {
				if("12" == data.saleStatCd) {
					result = true;
				}
			} else {
				fnAlertMessage("오류가 발생하였습니다.<br>관리자에게 문의하시기 바랍니다.<br> [No response]");
				return false;
			}
		}
	}
	ajax.call(options);

	return result;
}

/**
 * 개통폰 허브 페이지 랜딩
 * @param goodsId		상품 아이디 (*)
 * @param mdlCode		모델 코드
 * @param carrierCd		통신사 코드
 */
function fnOpenActivatePhoneApplyHub (param) {
	// param = {goodsId : "", mdlCode : "", carrierCd : ""}
	// carrierCd { SKT -> SKT, KT -> KTF, LGU+ -> LGT }

	if(!param || !param.goodsId || !param.mdlCode || !param.carrierCd) {
		fnAlertMessage("오류가 발생하였습니다.<br>관리자에게 문의하시기 바랍니다.<br> [No Parameter]");
		return false;
	}

	var stContextPath = $("#viewStContextPath").val();

	var reqData = {goodsId : param.goodsId,
		mdlCode : param.mdlCode,
		carrierCd : param.carrierCd//,
		//planDataTpCd	: 10,
		//planJoinTpCd	: 10
	};

	var options = {
		url : stContextPath + "xhr/goods/getActvPhoneInfoForHub",
		//url : stContextPath + "xhr/goods/getActvPhoneInfoForNewHub",
		data : reqData
		, type: 'POST'
		, done : function(data) {
				let activatePhoneVO = data.activatePhoneVO;
				if (!activatePhoneVO || !activatePhoneVO.goodsId || !activatePhoneVO.mdlCode || !activatePhoneVO.keyMdlCode || !activatePhoneVO.carrierCd || !activatePhoneVO.actvPhonePlanVer) {
				//if (!activatePhoneVO || !activatePhoneVO.goodsId || !activatePhoneVO.carrierCd || !activatePhoneVO.telLinkUrl) {
					fnAlertMessage("오류가 발생하였습니다.");
					return false;
				}

				var url = stContextPath + "activatePhone/activatePhoneApplyHub/";
				//var url = stContextPath + "activatePhone/activatePhoneApplyNewHub/";
				if(!!location.search) {
					url += location.search;
				}

				let activatePhoneHubForm = $("<form/>", {action : url, method : "POST"});
				$('<input>', {type : "hidden", id : "goodsId", 			name : "goodsId", 			value : activatePhoneVO.goodsId}).appendTo(activatePhoneHubForm);
				$('<input>', {type : "hidden", id : "mdlCode", 			name : "mdlCode", 			value : activatePhoneVO.mdlCode}).appendTo(activatePhoneHubForm);
				$('<input>', {type : "hidden", id : "keyMdlCode", 		name : "keyMdlCode", 		value : activatePhoneVO.keyMdlCode}).appendTo(activatePhoneHubForm);
				$('<input>', {type : "hidden", id : "carrierCd", 		name : "carrierCd", 		value : activatePhoneVO.carrierCd}).appendTo(activatePhoneHubForm);
				$('<input>', {type : "hidden", id : "actvPhonePlanVer", name : "actvPhonePlanVer", 	value : activatePhoneVO.actvPhonePlanVer}).appendTo(activatePhoneHubForm);
				$('<input>', {type : "hidden", id : "pckStrNo", 		name : "pckStrNo", 			value : param.pckStrNo}).appendTo(activatePhoneHubForm);
				//$('<input>', { type: "hidden", id : "planJoinTpCd", 	name: "planJoinTpCd", 		value: 10 }).appendTo(activatePhoneHubForm);
				//$('<input>', { type: "hidden", id : "planDataTpCd", 	name: "planDataTpCd", 		value: 10 }).appendTo(activatePhoneHubForm);
				$('body').append(activatePhoneHubForm);
				activatePhoneHubForm.submit();
			}
		}
	ajax.call(options);
}
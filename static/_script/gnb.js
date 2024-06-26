// function siblingsJs(t) {
//   var children = t.parentElement.children;
//   var tempArr = [];

//   for (var i = 0; i < children.length; i++) {
//     tempArr.push(children[i]);
//   }

//   return tempArr.filter(function (e) {
//     return e != t;
//   });
// }

const gnbObj = (function(){
  const gnbInner = document.querySelector(".header__inner");
  const menu = document.querySelector(".menu__wrap");
  const menuItems = document.querySelectorAll(".menuitem__l0");
  const menuButton = document.querySelectorAll(".item__button");
  const depth1 = document.querySelectorAll(".menuitem__l1__container");
  const mOpen = document.querySelector(".menu__button");
  const mClose = document.querySelector(".menu__close__button");
  const outerMask = document.querySelector(".outer__mask");
  const innerMask = document.querySelector(".inner__mask");
  let bnbStatus =
    document.querySelector("#bottom__navi") == null
      ? false
      : document.querySelector("#bottom__navi").classList.contains("_hide")
      ? true
      : false; 
  let _thisActiveDepth = null;
  let _thisActiveUtility = null;
  let menuActive = false;
  let depthActive = false;
  let isOpenMenu = false;
  function init() {
    console.log("...GNB initialized");
    console.log(`device mode is "${device.val}"`);

    $(".utility__wrap")
      .children()
      .on("click", function () {
        let buttonType = this.dataset.name.split("__")[1];
        ultilityEvent(buttonType);
      });

    $(".utility__wrap")
      .find("[class*=__button]")
      .on("focus", function () {
          $(".menuitem__l0").removeClass("active");
          $("[class*=utility__button__]").removeClass("active");
          $(".outer__mask").hide();
      });

    $(".utility__button__user li:last-of-type").on("focusout", function () {
      $(".utility__button__user").removeClass("active");
      $(".outer__mask").hide();
    });

    document.addEventListener("click", function (e) {
      e.stopPropagation();
      let _thisNode = e.target.className;

      if (_thisNode == "outer__mask" || _thisNode == "inner__mask") {
        $(".utility__wrap").children().removeClass("active");
        mask("close");
        close(menuItems, "close");
      }
    });

    if (device.val == "m" || device.val == "t" || window.innerWidth < 1280) {
        let menulistT = document.querySelector(".menu__list").offsetTop;
        let menuheadH = document.querySelector(".menu__head").clientHeight;
        let mainListH = document.querySelector(".menu__list").clientHeight; 

        document.querySelector("#header__navi").classList.remove("invert");

        mOpen.addEventListener("click", function () {
            document.querySelector('#wrap')?.classList.add('topbanner');
            open();
            // menu.style.paddingTop = menuheadH + "px";
            if($(menuButton[0]).data("menulinkgbcd") == "10"){
      	        menuButton[0].click();
            }
            
           /*
              2024.04.02 hyungu.id - 프로모션팀 요청으로 변경 KDP-51617
              B2C 1뎁스 메뉴가 '모바일'이면 active 
            */
            /*
	             2024.05.02 dongsik0.id - 프로모션팀 요청으로 변경 KDP-53776
	             B2C 1뎁스 메뉴가 'AI'로 선택되야해서 주석처리, AI는 최상위 메뉴이다.
             */
	        /*if(__ST_GB_CD == "b2c"){
	        	for(var i=0; i < menuItems.length; i++){
	        		var menuText = $(menuItems[i]).children('a').text();
	        		if(menuText == "모바일"){
	        			var depth1 = $(".menuitem__l0").eq(i).children('a');
	        			var menuLinkGbCd = $(depth1).data("menulinkgbcd");
	        			if(menuLinkGbCd == '10'){
	        				getGnbDepth2(depth1);
	        			}
	        			$(".menuitem__l0").removeClass("active");
	        			menuItems[i].classList.add('active');
	        			break;
	        		}
	        	}
	        }*/
        });

        mClose.addEventListener("click", function () {
            document.querySelector('#wrap')?.classList.remove('topbanner');
            close(menuItems, "close");
            mOpen.focus();
            $('#header__navi').removeClass('open_mo'); /* FN 신 GNB 도입 */
        });

      [].forEach.call(menuButton, function (el, idx) {
        el.addEventListener("click", function () {
          try {
            let boxMenuLen = el.parentNode.querySelector(".menuitem__slider").querySelectorAll('li').length;
            let boxMenuWidth = document
                .querySelector(".menuitem__slider")
                .querySelector("li").clientWidth;
            depthMove(el, boxMenuLen, boxMenuWidth);
            // $(".menuitem__slider").slick("slickGoTo", 0);
            $(".menu__wrap").animate({scrollTop: 0}, 200);
          } catch(e) {
            return false;
          }
        });
      });

      $("#header__navi .logo > a").on('keydown', function(e){
        if(e.key == 'Tab') $(".utility__button__search__m").focus();
      });
      $(".logout").on("keydown", function (e) {
        if (e.key == "Tab") menu.focus();
      });
      $(".user__mypage__list li:last-of-type").on("keydown", function (e) {
        if (e.key == "Tab") menu.focus();
      });
      
      setTimeout(() => {
        const depth2Wrap = $(".menuitem__l1__container"); 
        
        depth2Wrap.css({ height: mainListH + "px" });
        // menu.style.paddingTop = menuheadH + "px";
        menuItems[0].classList.add('active');
        
       /*
          2024.04.02 hyungu.id - 프로모션팀 요청으로 변경 KDP-51617
          B2C 1뎁스 메뉴가 '모바일'이면 active 
        */
        /*
	        2024.05.02 dongsik0.id - 프로모션팀 요청으로 변경 KDP-53776
	        B2C 1뎁스 메뉴가 'AI'로 선택되야해서 주석처리, AI는 최상위 메뉴이다.
        */
        /*if(__ST_GB_CD == "b2c"){
      	    for(var i=0; i < menuItems.length; i++){
      	  	    var menuText = $(menuItems[i]).children('a').text();
      	  	    if(menuText == "모바일"){
      	  	  	    var depth1 = $(".menuitem__l0").eq(i).children('a');
      	  	  	    var menuLinkGbCd = $(depth1).data("menulinkgbcd");
      	  	  	    if(menuLinkGbCd == '10'){
      	  	  	        getGnbDepth2(depth1);
      	  	  	    }
      	  	  	    $(".menuitem__l0").removeClass("active");
      	  	  	    menuItems[i].classList.add('active');
      	  	  	    break;
      	  	    }
      	    }
        }*/
        
        menu.setAttribute("aria-hidden", true);
        menu.setAttribute("tabindex", -1);
      }, 100);

    } else if (window.innerWidth >= 1280 || device.val == "p") {
      
      [].forEach.call(menuButton, function (el, idx) {
        el.addEventListener("mouseenter", function (e) {
          $(".utility__wrap").children().removeClass("active");
          // mask("open", "menu", el.parentNode);
          open(el);
        });

        el.addEventListener("focus", function (e) {
          // mask("open", "menu", el.parentNode);
          open(el);
        });
      });

      gnbInner.addEventListener("mouseleave", function (e) {
        e.stopPropagation();
        if (isOpenMenu) {
          close(menuItems, "close");
        }
      });

      menu.addEventListener("mouseleave", function (e) {
        e.stopPropagation();
        if (isOpenMenu) {
          close(menuItems, "close");
        }
      });
    
      $(".menuitem__l1__container").css({ height: "auto" });
      $(".menuitem__slider").css({ width: "auto" });
      menuItems[0].classList.remove("active");
      // menu.style.paddingTop = 0;
      menu.setAttribute("aria-hidden", false);
      menu.removeAttribute("tabindex");
    }
  }
  function mask(action, data, element) {
    const elem = element || null;
    
    if(action == 'close') { // hide
      innerMask.style.display = 'none';
      outerMask.style.display = 'none';
      innerMask.dataset.type = data;
      outerMask.dataset.type = data;
      screenLock("unlock");
    }else{ // show
      if (device.val == "m" || device.val == "t" || window.innerWidth < 1280) { // m, t size
        handleMask(data);
        screenLock("lock");
      } else { // p size
        if (elem == null) {
          // element 미지정시(null) mask on / data type 삽입
          outerMask.style.display = "block";
          outerMask.dataset.type = data;
        } else if (elem.children.length <= 1) {
          // element 는 있으나 하위자식이 없으면 mask off
          outerMask.style.display = "none";
          screenLock("unlock");
          return;
        } else {
          // element 가 있고 하위자식도 있으면 mask on :
          outerMask.style.display = "block";
          // outerMask.dataset.type = data;
        }
      }
    }
    
    function handleMask(data) {
      // console.log("thisdata : " + data);

      if (data == "cart" || data == 'location') {
        outerMask.style.display = "block";
        outerMask.dataset.type = data;
      } else {
        innerMask.style.display = "block";
        innerMask.dataset.type = data;
      }
      screenLock("lock");
    }

    function screenLock(action){
      if(action == 'lock'){
        $("html, body").css({
          height: 100 + "%",
          overflow: "hidden",
        });
      }else{
        $("html, body").css({
          height: "auto",
          overflow: "unset",
        });
      }
    }
  }
  function open(el) {
    const _thisMenu = el == undefined ? menu : el.parentElement;

    if (device.val == "m" || device.val == "t" || window.innerWidth < 1280) {
      // if (document.querySelector(".toast-pop")) toastPopCloseFunc();
      _thisMenu.style.right = 0;
      menu.setAttribute("aria-hidden", false);
      menu.setAttribute("tabindex", 0);
      if (document.querySelector("#bottom__navi")) {
        if ($("#bottom__navi").length > 0) bnb.bnbHide();
        gnbObj.bnbStatus = true;
      }

      $('#header__navi').addClass('open_mo'); /* FN 신 GNB 도입 */

    } else {
      $(".menuitem__l0").siblings().removeClass("active");
      _thisMenu.classList.add("active");
      // console.log(menuActive + " : " + el);
    }
    
    setTimeout(() => {
      _thisMenu.focus();
    }, 0);

    // console.log(_thisMenu);
    isOpenMenu = true;
    mask("open", "menu", _thisMenu);
  }
  function close(list) {
    if (device.val == "m" || device.val == "t" || window.innerWidth < 1280) {
      $(".menuitem__l0").removeClass("active");
      menuItems[0].classList.add("active");
      menu.setAttribute("aria-hidden", true);

      if (depthActive == true) {
        // gotoBack();
        menu.style.right = "-" + 100 + "%";
      }
      menu.style.right = "-" + 100 + "%";

      if (document.querySelector("#bottom__navi") && gnbObj.bnbStatus == true) {
        if ($("#bottom__navi").length > 0) bnb.bnbShow();
        gnbObj.bnbStatus = false;
      }
    } else {
      [].forEach.call(list, function (el, idx) {
        if (el.classList.contains("active")) {
          el.classList.remove("active");
          // list[idx].querySelector("a").setAttribute(ariaSelected, false);
        }
      });
    }

    isOpenMenu = false;
    mask("close");
  }
  function focusEvent() {
    console.log(this);
    const list = menuItems;
    [].forEach.call(list, function (el, idx) {
      if (el.classList.contains("active")) {
        list[idx].classList.remove("active");
        // el.parentNode.classList.remove("onDepth");
        el.classList.add("active");
      }
    });
  }
  function depthMove(el, boxMenuLen, boxMenuWidth) {
    if (window.innerWidth >= 1280) return;
    depthActive = true;
    let _thisItem = el;
    _thisActiveDepth = _thisItem.nextElementSibling;
    const boxMenuWrap = _thisActiveDepth.querySelector(".menuitem__slider");
    let boxMenuHalfCeil = Math.ceil(boxMenuLen / 2);
    let boxMenuWrapWidth = boxMenuWidth * boxMenuHalfCeil + 13 * boxMenuHalfCeil;

    // console.log("박스형 메뉴의 총개수 " + boxMenuLen + " / 2 의 반올림 : " + boxMenuHalfCeil);

    if (_thisActiveDepth == null) return;

    // 초기화
    [].forEach.call(menuItems, function (el) {
      el.classList.remove("active");
    });

    // 박스형 메뉴 width
    boxMenuWrap.style.width = boxMenuWrapWidth + "px";

    _thisItem.parentElement.classList.add("active");
    // mBack.classList.add("active");
  }
  function gotoBack() {
    let _thisItem = _thisActiveDepth;

    if (depthActive == true) {
      // mBack.classList.remove("active");
      _thisItem.classList.remove("active");
      depthActive = false;
    }
  }
  function ultilityEvent(buttonType) {
    let btnType = buttonType;
    // console.log("button Type : " + _thisActiveUtility);
    // console.log("ultility button Type : " + btnType);
    // console.log($(".utility__button__" + btnType));

    $(".utility__wrap").children().removeClass("active");
    $(".utility__button__" + btnType).addClass("active");

    // 각 버튼 기능 호출
    switch (btnType) {
      case "back":
        return false;
      case "home":
        // location.href = "https://samsung.com/sec/";
        return false;
      case "search":
        // search();
        return false;
      case "location":
        return false;
      case "barcode":
        mask("close");
        return false;
      case "cart":
        cart();
        break;
      case "user":
        user();
        break;
      case "menu":
        break;
      default:
        break;
    }

    // mask
    if (device.val == "m" || device.val == "t" || window.innerWidth < 1280) {
      // console.log(_thisActiveUtility == btnType);
      if (_thisActiveUtility != buttonType) {
        mask("close");
        mask("open", btnType);
        _thisActiveUtility = buttonType;
      } else {
        mask("open", btnType);
      }
    } else {
      mask("open", btnType);
    }
  }
  function search() {
    const searchBar = document.querySelector(".unified-search-input-wrap");
    // const searchList = document.querySelector(".unified-search-layer");

    isOpenMenu = false;
    menu.style.right = "-" + 100 + "%";

    $("html, body").css({ overflow: "hidden" });
    searchBar.style.display = "block";
    document.querySelector("#unifiedInputSearch").focus();

    const handleSearchClose = () => {
      // searchList.style.display = "none";
      searchBar.style.display = "none";
      $("html, body").css({ overflow: "unset" });
    };

    document.addEventListener("click", function (e) {
      let _thisNode = e.target.className;
      if (_thisNode == "btn-close-search" || _thisNode == "outer__mask" || _thisNode == "inner__mask" ) {
        handleSearchClose();
        mask("close");
      }
    });
  }
  function location() {
    console.log("location active!");
  }
  function cart() {
    close(menuItems, "close");
    if($('#bottom__navi').length > 0) bnb.allClose();    

    $(".cart__list").on("mouseleave", function () {
      $(this).parent().removeClass("active");
      mask("close");
    });
  }
  function user(){
    $(".user__list").on("mouseleave", function () {
      $(this).parent().removeClass("active");
      mask("close");
    });
  }

  return {
    init: init,
    ultilityEvent: ultilityEvent,
    bnbStatus : bnbStatus
  };
})();

window.addEventListener("DOMContentLoaded", function () {
  gnbObj.init();
});

// resize init
let delay = 300;
let resizeTimer = null;

window.addEventListener("resize", function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    gnbObj.init();
  }, delay);
});

//s : 2023 접근성 b2c - 10p 
$(document).on("keydown", ".user__list > ul > li:last-of-type", function (e) {
    var charCode = e.keyCode;              
    if (charCode == 9 ) {
        $('.utility__button__user').removeClass('active');
        $('.outer__mask').css('display','none');
    }
});

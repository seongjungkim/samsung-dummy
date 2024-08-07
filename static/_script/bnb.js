const bnb = {
  bnbWrap: null,
  bnbWrapLi: null,
  bnbMoreBox: null,
  bnbMoreCircle: null,
  moreList: null,
  maskNode: null,
  init: function () {
    bnb.bnbWrap = document.querySelector("#bottom__navi");
    bnb.bnbWrapLi = bnb.bnbWrap.querySelectorAll("li");
    bnb.bnbMoreBox = document.querySelector(".botnavi__more");
    bnb.bnbMoreCircle = document.querySelector(".more__circle");
    bnb.moreList = document.querySelector(".more__list");
    //bnb.moreList = document.querySelector(".more__list"); KDP-53472 240430 위치 이동


    $(".floating-sticky").css("margin-bottom", $("#bottom__navi").outerHeight());

    $(".more__list li:last-of-type a").on("focusout", function () {
      $(".button__more").focus();
    });

    [].forEach.call(bnb.bnbWrapLi, function (elem, idx) {
      elem.addEventListener("click", function (e) {
        // e.preventDefault();
        // console.log(elem.dataset.type);
        bnb.handleItems(elem, idx);
      });
    });
  },

  handleItems: function (elem, idx) {
    switch (elem.dataset.type) {
      case "bnb__menu":
        basicClose();
        break;
      case "bnb__more":
        bnb.moreList.setAttribute("tabindex", 0); //KDP-53472 240430 위치 이동
        // if(document.querySelector('.toast-pop')) toastPopCloseFunc();
        bnb.mask();
        bnb.bnbMoreBox?.classList.toggle("active");
        bnb.bnbMoreCircle?.classList.toggle("active");
        document.querySelector("html").classList.toggle("scrollLock");

        setTimeout(() => {
          bnb.moreList.children[0].children[0].focus();
        }, 100);
        break;
      case "bnb__recent":
        basicClose();
        break;

      default:
        bnb.bnbWrapLi.forEach(function (el) {
          el.classList.remove("active");
        });
        elem.classList.add("active");
        basicClose();
        break;
    }
    function basicClose (){
      if (document.querySelector(".botnavi__mask")) {
        bnb.allClose();
      }
    }
  },

  mask: function () {
    const mask = '<div class="botnavi__mask"></div>';
    if (bnb.maskNode == null) {
      document.querySelector("#wrap").insertAdjacentHTML("beforeend", mask);
      bnb.maskNode = document.querySelector(".botnavi__mask");

      bnb.maskNode.addEventListener("click", function () {
        bnb.allClose();
        bnb.maskNode = null;
      });
    } else {
      bnb.maskNode.remove();
      bnb.maskNode = null;
    }
  },

  allClose: function () {
    document.querySelector("html").classList.remove("scrollLock");
    if (!(bnb.maskNode == null)) {
      bnb.maskNode.remove();
      bnb.maskNode = null;
    }
    bnb.bnbWrapLi.forEach(function (el) {
      el.classList.remove("active");
    });
    bnb.bnbMoreBox?.classList.remove("active");
    bnb.bnbMoreCircle?.classList.remove("active");
  },

  bnbToggle: function () {
    if (!bnb.bnbWrap.classList.contains("_hide")) {
      bnb.bnbHide();
    } else {
      bnb.bnbShow();
    }
  },

  bnbShow: function () {
    bnb.bnbWrap.classList.remove("_hide");
  },
  
  bnbHide: function () {
    bnb.bnbWrap.classList.add("_hide");
    // bnb.allClose();
  },
};

document.addEventListener("DOMContentLoaded", function () {
  function bnbCheck(callback) {
    const elem = document.querySelector("#bottom__navi");

    if (elem) {
      callback.init();
    }
  }

  bnbCheck(bnb);
});

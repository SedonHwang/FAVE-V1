// 드롭다운되어있는 애들을 눌렀을 때 새로운 input 숫자 태그가 추가되어야 한다.
// label을 추가한다.
// input의 속성은 type=number, min 1 max=20 value=1
import numberUnCommas from "../../lib/numberUnCommas";
import numberWithCommas from "../../lib/numberWithComma";

const selectSelected = document.getElementsByClassName("js--selected")[0];
const selectItems = document.getElementsByClassName("select--item");
const faveNum = document.getElementById("product");
const totalPrice = document.getElementById("totalPrice");
const productsWrapper = document.getElementsByClassName("products--wrapper")[0];
const displayImg = document.getElementById("displayImg");
const productPrice = {
  kr: 124000,
  en: 129,
  jp: 14000,
};
const [urlProduct, urlLanguage] = extractFromUrl(
  window.location.href.split("/store/")[1]
);
const accordionHeaders = document.getElementsByClassName("accordion__header");

if (selectSelected) {
  selectSelected.addEventListener("click", function () {
    const carret = this.children[1].children[0].children[0];
    if (carret.classList.contains("fa-caret-down")) {
      carret.classList.remove("fa-caret-down");
      carret.classList.add("fa-caret-up");
    } else {
      carret.classList.remove("fa-caret-up");
      carret.classList.add("fa-caret-down");
    }
    this.nextSibling.classList.toggle("select--hide");
  });
}

if (selectItems.length) {
  const productsWrapper = document.getElementsByClassName(
    "products--wrapper"
  )[0];
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      selectSelected.children[0].innerHTML = this.innerHTML;

      if (checkExistedItem(`${urlProduct} ${this.innerHTML}`)) {
        // 같은 값이 있음
        selectSelected.click();
        return;
      } else {
        // 같은 값이 없음
        let productWrapper = document.createElement("DIV");
        productWrapper.setAttribute("class", "product--wrapper");
        // .product--wrapper 완성

        let labelText = `${faveNum.value} ${this.innerHTML}`;
        // 이렇게 만들면 450 때에도 그대로 쓸 수 있음
        let label = document.createElement("DIV");
        label.innerHTML = labelText;
        label.setAttribute("class", "label--text");
        // .label--text 완성

        let optionDetail = document.createElement("DIV");
        optionDetail.setAttribute("class", "option--detail");
        // .option--detail 완성

        let productItems = document.createElement("DIV");
        productItems.setAttribute("class", "product--items");
        // .product--items 완성

        let productText = document.createElement("DIV");
        let productTextP = document.createElement("P");
        if (urlLanguage === "en") {
          productTextP.innerHTML = "Please select the number.";
        } else if (urlLanguage === "jp") {
          productTextP.innerHTML = "個数を選択してください.";
        } else {
          productTextP.innerHTML = "개수를 선택해 주세요.";
        }
        productText.setAttribute("class", "product--text");
        productText.appendChild(productTextP);
        // .product--text 밑에 p까지 완성

        let productCount = document.createElement("DIV");
        productCount.setAttribute("class", "product--count");
        // .product--count 완성

        let countInput = document.createElement("INPUT");
        countInput.setAttribute("type", "text");
        countInput.setAttribute("value", "1");
        countInput.setAttribute("readOnly", true);
        countInput.setAttribute("name", `${this.innerHTML}Cnt`);
        // 인풋태그 우선 1차 버전

        let icons = document.createElement("DIV");
        icons.setAttribute("class", "icons");
        // .icons 만듦

        let ul = document.createElement("UL");

        let liUp = document.createElement("LI");
        let upButton = document.createElement("BUTTON");
        upButton.setAttribute("type", "button");
        let iUp = document.createElement("I");
        iUp.setAttribute("class", "fa fa-caret-up");
        upButton.appendChild(iUp);
        upButton.addEventListener("click", countHandler);
        liUp.appendChild(upButton);
        // li up 버튼 완성

        let liDown = document.createElement("LI");
        let downButton = document.createElement("BUTTON");
        downButton.setAttribute("type", "button");
        let iDown = document.createElement("I");
        iDown.setAttribute("class", "fa fa-caret-down");
        downButton.appendChild(iDown);
        downButton.addEventListener("click", countHandler);
        liDown.appendChild(downButton);
        // li down 버튼 완성

        ul.appendChild(liUp);
        ul.appendChild(liDown);
        // ul 태그 완성

        let cancelBtn = document.createElement("DIV");
        cancelBtn.setAttribute("class", "cancel--btn");
        cancelBtn.addEventListener("click", cancelBtnHandler);

        let closeIcon = document.createElement("I");
        closeIcon.setAttribute("class", "far fa-window-close");
        cancelBtn.appendChild(closeIcon);
        // .cancel--btn 완성

        icons.appendChild(ul);
        icons.appendChild(cancelBtn);
        // icons 완성

        productCount.appendChild(countInput);
        productCount.appendChild(icons);
        // productCount 완성

        productItems.appendChild(productText);
        productItems.appendChild(productCount);

        optionDetail.appendChild(productItems);

        productWrapper.appendChild(label);
        productWrapper.appendChild(optionDetail);
        productsWrapper.appendChild(productWrapper);

        //totalPrice 값이 바뀜
        totalPrice.value = numberWithCommas(
          Number(numberUnCommas(totalPrice.value)) + productPrice[urlLanguage]
        );
        selectSelected.click();
      }
    });
  }
}

if (displayImg) {
  const smallImgs = document.getElementsByClassName("small--img");
  // 클릭하면 자기의 이미지소스가 윗놈의 이미지 소스에 바뀌고, .choice 클래스를 가지고,
  // 형제들 중에 .choice를 가진놈을 없앤다?
  function hanldeImg() {
    displayImg.src = this.firstElementChild.src;
    for (let i = 0; i < smallImgs.length; i++) {
      if (smallImgs[i].classList.contains("choice")) {
        smallImgs[i].classList.remove("choice");
        break;
      }
    }
    this.classList.add("choice");
  }
  for (let i = 0; i < smallImgs.length; i++) {
    smallImgs[i].addEventListener("click", hanldeImg);
    smallImgs[i].addEventListener("mouseover", hanldeImg);
  }
}

if (accordionHeaders.length) {
  function carretToggle(carret) {
    if (carret.classList.contains("fa-caret-down")) {
      carret.classList.remove("fa-caret-down");
      carret.classList.add("fa-caret-up");
    } else {
      carret.classList.remove("fa-caret-up");
      carret.classList.add("fa-caret-down");
    }
  }
  for (let i = 0; i < accordionHeaders.length; i++) {
    accordionHeaders[i].addEventListener("click", function () {
      const siblings = this.parentElement.children;
      const carret = this.children[1].children[0].children[0];
      for (let j = 0; j < siblings.length; j += 2) {
        if (siblings[j].classList.contains("current")) {
          // 펼쳐져있는 것을 누르면 닫힘
          if (siblings[j].innerHTML === this.innerHTML) {
            siblings[j].classList.toggle("current");
            carretToggle(carret);
            return;
          }
          siblings[j].classList.remove("current");
          const siblingsCarret =
            siblings[j].children[1].children[0].children[0];
          carretToggle(siblingsCarret);
          break;
        }
      }
      this.classList.add("current");
      carretToggle(carret);
    });
  }
}
// function numberWithCommas(x) {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }

// function numberUnComma(x) {
//   let str = String(x);
//   return str.replace(/[^\d]+/g, "");
// }

function checkExistedItem(item) {
  if (productsWrapper.children.length == 0) return false;
  // 자식의 수가 없다는건 아이템이 하나도 없다는 뜻이니 함수는 바로 false를 리턴
  let result = false; //같은 아이템이 들어있으면 true 아니면 false
  for (let i = 0; i < productsWrapper.children.length; i++) {
    //자식들 숫자만큼 돈다.
    const existedItem = productsWrapper.children[i].children[0].innerHTML;
    if (existedItem === item) {
      result = true;
      // 이미 같은 아이템이 들어있다면 true
      break;
    }
  }
  return result;
}

function cancelBtnHandler() {
  const inputCount = this.parentElement.previousSibling;
  // console.log(typeof inputCount.value);
  // type이 스트링이 됨
  const productWrapper = this.parentElement.parentElement.parentElement
    .parentElement.parentElement;
  productWrapper.parentElement.removeChild(productWrapper);
  totalPrice.value = numberWithCommas(
    Number(numberUnCommas(totalPrice.value)) -
      Number(inputCount.value) * productPrice[urlLanguage]
  );
}

function countHandler(e) {
  e.preventDefault();
  const countInput = this.parentElement.parentElement.parentElement
    .previousSibling;
  if (this.children[0].classList.contains("fa-caret-up")) {
    countInput.value = Number(countInput.value) + 1;
    totalPrice.value = numberWithCommas(
      Number(numberUnCommas(totalPrice.value)) + productPrice[urlLanguage]
    );
  } else {
    if (Number(countInput.value) <= 1) {
      return;
    }
    countInput.value = Number(countInput.value) - 1;
    totalPrice.value = numberWithCommas(
      Number(numberUnCommas(totalPrice.value)) - productPrice[urlLanguage]
    );
  }
}

function extractFromUrl(splitedUrl) {
  let product, language;
  const fave350 = [
    "fave350",
    "fave350/",
    "fave350/kr",
    "fave350/kr/",
    "fave350/jp",
    "fave350/jp/",
  ];
  // 서프가 추가될 상황을 대비해서 남겨둠
  const fave450 = [
    "fave450",
    "fave450/",
    "fave450/kr",
    "fave450/kr/",
    "fave450/jp",
    "fave450/jp/",
  ];
  if (fave350.includes(splitedUrl)) {
    product = "FAVE 350";
    if (splitedUrl === "fave350" || splitedUrl === "fave350/") {
      language = "en";
    } else if (splitedUrl === "fave350/kr" || splitedUrl === "fave350/kr/") {
      language = "kr";
    } else {
      language = "jp";
    }
  } else {
    product = "FAVE 450";
    if (splitedUrl === "fave450" || splitedUrl === "fave450/") {
      language = "en";
    } else if (splitedUrl === "fave450/kr" || splitedUrl === "fave450/kr/") {
      language = "kr";
    } else {
      language = "jp";
    }
  }

  return [product, language];
}

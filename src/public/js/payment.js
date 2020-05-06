import axios from "axios";
import numberUnCommas from "../../lib/numberUnCommas";
import shipPay from "../../lib/shipPay";
import numberWithComma from "../../lib/numberWithComma";

const IMP = window.IMP;
IMP.init("imp99764133");

const ordererPhone = document.getElementById("ordererPhoneNumber");
const recipientPhone = document.getElementById("recipientPhoneNumber");
const sameRecipientCheck = document.getElementById("sameRecipient");
const paymentBtn = document.getElementById("paymentBtn");
const paymentBtnKr = document.getElementById("paymentBtnKr");
const paymentBtnJp = document.getElementById("paymentBtnJp");
const productCnt = document.getElementsByClassName("productCnt");
const countrySelected = document.getElementsByClassName("js--countrySelected");
const ordererCountries = document.getElementsByClassName("orderer--country");
const recipientCountries = document.getElementsByClassName(
  "recipient--country"
);
const productPrice = document.getElementById("productPrice");
const shipPrice = document.getElementById("shipPrice");
const totalPrice = document.getElementById("totalPrice");

function setInputFilter(textbox, inputFilter) {
  [
    "input",
    "keydown",
    "keyup",
    "mousedown",
    "mouseup",
    "select",
    "contextmenu",
    "drop",
  ].forEach(function (event) {
    textbox.addEventListener(event, function () {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}

if (ordererPhone) {
  setInputFilter(ordererPhone, function (value) {
    return /^-?\d*$/.test(value);
  });
}

if (recipientPhone) {
  setInputFilter(ordererPhone, function (value) {
    return /^-?\d*$/.test(value);
  });
}

if (sameRecipientCheck) {
  sameRecipientCheck.addEventListener("click", function (e) {
    if (this.checked) {
      const orderForm = document.forms.orderForm;
      //이름
      orderForm.recipientName.value = orderForm.ordererName.value;
      //번호
      orderForm.recipientPhoneNumber.value = orderForm.ordererPhoneNumber.value;
      //국가
      const country = orderForm.ordererCountry.value;
      orderForm.recipientCountry.value = country;
      const checkLang = extractPathname(window.location.pathname);
      if (checkLang === "en") {
        console.log("country is", country);
        countrySelected[1].children[0].innerHTML = country;
        let pinkCnt, greenCnt;
        // 여기서 나라에 따라 배송비와 계산비가 달라지는게 처리되어야함
        for (let i = 0; i < productCnt.length; i++) {
          const product = productCnt[i].innerHTML.split(" ");
          if (product[0] === "Green") {
            greenCnt = product[1];
          } else {
            pinkCnt = product[1];
          }
        }
        const pPrice = Number(
          numberUnCommas(productPrice.innerHTML.split(" ")[0])
        );
        // 배가격하고 해당 pPrice를 합쳐서 전체 가격을 변환시킨다.
        const sPrice = shipPay(country, pinkCnt, greenCnt);
        // 배가격 값을 바꿔야함
        shipPrice.innerHTML = `${numberWithComma(sPrice)} USD`;
        totalPrice.innerHTML = `${numberWithComma(pPrice + sPrice)} USD`;
      }
      // 여기에 en일경우 country 선택창 바꾸고,
      // shipping fee 바꾸고
      // 총 가격 바꿔야함
      //주소1
      orderForm.recipientAddress1.value = orderForm.ordererAddress1.value;
      //주소2
      orderForm.recipientAddress2.value = orderForm.ordererAddress2.value;
      //우편번호
      orderForm.recipientPostalCode.value = orderForm.ordererPostalCode.value;
    }
  });
}

const paymentBtnHandler = async (e) => {
  const name = document.getElementById("productName").innerHTML;
  const orderForm = document.forms.orderForm;
  const amount = Number(numberUnCommas(totalPrice.innerHTML.split(" ")[0]));
  const buyer_name = orderForm.ordererName.value;
  const recipient_name = orderForm.recipientName.value;
  const buyer_tel = orderForm.ordererPhoneNumber.value;
  const recipient_tel = orderForm.recipientPhoneNumber.value;
  const buyer_email = orderForm.ordererEmail.value;
  const recipientCountry = orderForm.recipientCountry.value;
  const buyer_addr = `(${recipientCountry}) ${orderForm.ordererAddress1.value} ${orderForm.ordererAddress2.value}`;
  const recipient_addr = `(${orderForm.ordererCountry.value}) ${orderForm.recipientAddress1.value} ${orderForm.recipientAddress2.value}`;
  const buyer_postcode = orderForm.ordererPostalCode.value;
  const recipient_postcode = orderForm.recipientPostalCode.value;
  const shipMessage = orderForm.shipMessage.value;
  console.log("recipientCountry is", recipientCountry);
  let pinkCnt, greenCnt;
  // 제품의 개수까지 보내야함
  for (let i = 0; i < productCnt.length; i++) {
    const product = productCnt[i].innerHTML.split(" ");
    if (product[0] === "Green") {
      greenCnt = product[1];
    } else {
      pinkCnt = product[1];
    }
  }
  if (
    [
      name,
      amount,
      buyer_name,
      recipient_name,
      buyer_tel,
      recipient_tel,
      buyer_email,
      buyer_addr,
      recipient_addr,
      buyer_postcode,
      recipient_postcode,
      recipientCountry,
    ].includes("")
  )
    return;
  try {
    const {
      data: { productList },
    } = await axios({
      url: "/store/payment",
      method: "POST",
      data: {
        name,
        buyer_name,
        recipient_name,
        buyer_tel,
        recipient_tel,
        buyer_email,
        recipientCountry,
        recipient_addr,
        recipient_postcode,
        pinkCnt,
        greenCnt,
        shipMessage,
      },
    });
    IMP.request_pay(
      {
        pg: "paypal",
        currency: "USD",
        tax_free: amount,
        m_redirect_url: "https://www.faves.co.kr/store/payment/complete/paypal",
        pay_method: "card",
        merchant_uid: productList.purchaseInfo,
        name: productList.productName,
        amount, // 이거 넣어야함
        buyer_email: productList.ordererEmail,
        buyer_name: productList.ordererName,
        buyer_tel: productList.ordererPhoneNum,
        //이건 위에서 갖고오자
        buyer_addr: buyer_postcode, // 이것도
      },
      async function (rsp) {
        if (rsp.success) {
          const { data } = await axios({
            url: "/store/payment/complete",
            method: "post",
            headers: { "Content-Type": "application/json" },
            data: {
              imp_uid: rsp.imp_uid,
              merchant_uid: rsp.merchant_uid,
            },
          });
          console.log(data);
          // 성공하면 data 잘뜨네
          // 성공했으니 리다이렉트 시켜줘야함

          switch (data.status) {
            case "success":
              // 성공시 로직인데 물건 산 곳을 확인할 수 있는 곳으로 리다이렉트 되어야함
              // 여기에 폼을 만들고 값을 넣어서 보내버린다
              // 회원이랑 회원이 아닌 사람을 구분해야함?
              // 왜냐면 폼을 만들면 postOrdersCheck로 보내야 하니까?
              let lang = window.location.pathname.split("/"); // /payment, /payment/kr, /payment/jp
              lang = lang[lang.length - 1];
              console.log(lang);
              let form = document.createElement("form");
              if (lang === "kr") {
                form.action = "/store/orders/check/kr";
              } else if (lang === "jp") {
                form.action = "/store/orders/check/jp";
              } else {
                form.action = "/store/orders/check";
              }
              form.method = "POST";
              form.id = "redirectForm";
              let orderInfoInput = document.createElement("input");
              orderInfoInput.type = "hidden";
              orderInfoInput.name = "orderInfo";
              orderInfoInput.value = rsp.merchant_uid;
              let emailInput = document.createElement("input");
              emailInput.type = "hidden";
              emailInput.name = "email";
              emailInput.value = rsp.buyer_email;
              form.appendChild(orderInfoInput);
              form.appendChild(emailInput);
              orderForm.appendChild(form);
              console.log(form);
              document.getElementById("redirectForm").submit();
              break;
          }
        } else {
          // 내가 취소할 경우
          // rsp.error_msg는 "사용자가 결제를 취소하셨습니다."
          alert("Payment failed");
        }
      }
    );
  } catch (e) {
    console.log(e);
    //여기서 실패했을 때 어떻게 할지를 정하는 건갑다
    //위변조 되서 실패했을 때 여기서 어떻게 처리하지?
    // 콘솔 다른것도 찍어서 진짜 위/변조 실패시 여기가 맞는지 확인
  }
};

const paymentBtnHandlerKr = async (e) => {
  const name = document.getElementById("productName").innerHTML;
  const orderForm = document.forms.orderForm;
  const amount = Number(numberUnCommas(totalPrice.innerHTML.split(" ")[0]));
  const buyer_name = orderForm.ordererName.value;
  const recipient_name = orderForm.recipientName.value;
  const buyer_tel = orderForm.ordererPhoneNumber.value;
  const recipient_tel = orderForm.recipientPhoneNumber.value;
  const buyer_email = orderForm.ordererEmail.value;
  const recipientCountry = orderForm.recipientCountry.value;
  const buyer_addr = `(${recipientCountry}) ${orderForm.ordererAddress1.value} ${orderForm.ordererAddress2.value}`;
  const recipient_addr = `(${orderForm.ordererCountry.value}) ${orderForm.recipientAddress1.value} ${orderForm.recipientAddress2.value}`;
  const buyer_postcode = orderForm.ordererPostalCode.value;
  const recipient_postcode = orderForm.recipientPostalCode.value;
  const shipMessage = orderForm.shipMessage.value;
  let pinkCnt, greenCnt;
  // 제품의 개수까지 보내야함
  for (let i = 0; i < productCnt.length; i++) {
    const product = productCnt[i].innerHTML.split(" ");
    if (product[0] === "Green") {
      greenCnt = product[1];
    } else {
      pinkCnt = product[1];
    }
  }
  if (
    [
      name,
      amount,
      buyer_name,
      recipient_name,
      buyer_tel,
      recipient_tel,
      buyer_email,
      buyer_addr,
      recipient_addr,
      buyer_postcode,
      recipient_postcode,
      recipientCountry,
    ].includes("")
  )
    return;
  try {
    const {
      data: { productList },
    } = await axios({
      url: "/store/payment",
      method: "POST",
      data: {
        name,
        buyer_name,
        recipient_name,
        buyer_tel,
        recipient_tel,
        buyer_email,
        recipientCountry,
        recipient_addr,
        recipient_postcode,
        pinkCnt,
        greenCnt,
        shipMessage,
      },
    });
    IMP.request_pay(
      {
        pg: "inicis",
        m_redirect_url: "https://www.faves.co.kr/store/payment/complete/mobile",
        pay_method: "card",
        merchant_uid: productList.purchaseInfo,
        name: productList.productName,
        amount, // 이거 넣어야함
        buyer_email: productList.ordererEmail,
        buyer_name: productList.ordererName,
        buyer_tel: productList.ordererPhoneNum,
        //이건 위에서 갖고오자
        buyer_addr: buyer_postcode, // 이것도
      },
      async function (rsp) {
        if (rsp.success) {
          const { data } = await axios({
            url: "/store/payment/complete",
            method: "post",
            headers: { "Content-Type": "application/json" },
            data: {
              imp_uid: rsp.imp_uid,
              merchant_uid: rsp.merchant_uid,
            },
          });
          console.log(data);
          // 성공하면 data 잘뜨네
          // 성공했으니 리다이렉트 시켜줘야함

          switch (data.status) {
            case "success":
              // 성공시 로직인데 물건 산 곳을 확인할 수 있는 곳으로 리다이렉트 되어야함
              // 여기에 폼을 만들고 값을 넣어서 보내버린다
              // 회원이랑 회원이 아닌 사람을 구분해야함?
              // 왜냐면 폼을 만들면 postOrdersCheck로 보내야 하니까?
              let lang = window.location.pathname.split("/"); // /payment, /payment/kr, /payment/jp
              lang = lang[lang.length - 1];
              console.log(lang);
              let form = document.createElement("form");
              if (lang === "kr") {
                form.action = "/store/orders/check/kr";
              } else if (lang === "jp") {
                form.action = "/store/orders/check/jp";
              } else {
                form.action = "/store/orders/check";
              }
              form.method = "POST";
              form.id = "redirectForm";
              let orderInfoInput = document.createElement("input");
              orderInfoInput.type = "hidden";
              orderInfoInput.name = "orderInfo";
              orderInfoInput.value = rsp.merchant_uid;
              let emailInput = document.createElement("input");
              emailInput.type = "hidden";
              emailInput.name = "email";
              emailInput.value = rsp.buyer_email;
              form.appendChild(orderInfoInput);
              form.appendChild(emailInput);
              orderForm.appendChild(form);
              console.log(form);
              document.getElementById("redirectForm").submit();
              break;
          }
        } else {
          // 내가 취소할 경우
          // rsp.error_msg는 "사용자가 결제를 취소하셨습니다."
          alert("결제에 실패하였습니다.");
        }
      }
    );
  } catch (e) {
    console.log(e);
    //여기서 실패했을 때 어떻게 할지를 정하는 건갑다
    //위변조 되서 실패했을 때 여기서 어떻게 처리하지?
    // 콘솔 다른것도 찍어서 진짜 위/변조 실패시 여기가 맞는지 확인
  }
};

const paymentBtnHandlerJp = async (e) => {
  const name = document.getElementById("productName").innerHTML;
  const orderForm = document.forms.orderForm;
  const amount = Number(numberUnCommas(totalPrice.innerHTML.split(" ")[0]));
  const buyer_name = orderForm.ordererName.value;
  const recipient_name = orderForm.recipientName.value;
  const buyer_tel = orderForm.ordererPhoneNumber.value;
  const recipient_tel = orderForm.recipientPhoneNumber.value;
  const buyer_email = orderForm.ordererEmail.value;
  const recipientCountry = orderForm.recipientCountry.value;
  const buyer_addr = `(${recipientCountry}) ${orderForm.ordererAddress1.value} ${orderForm.ordererAddress2.value}`;
  const recipient_addr = `(${orderForm.ordererCountry.value}) ${orderForm.recipientAddress1.value} ${orderForm.recipientAddress2.value}`;
  const buyer_postcode = orderForm.ordererPostalCode.value;
  const recipient_postcode = orderForm.recipientPostalCode.value;
  const shipMessage = orderForm.shipMessage.value;
  let pinkCnt, greenCnt;
  // 제품의 개수까지 보내야함
  for (let i = 0; i < productCnt.length; i++) {
    const product = productCnt[i].innerHTML.split(" ");
    if (product[0] === "Green") {
      greenCnt = product[1];
    } else {
      pinkCnt = product[1];
    }
  }
  if (
    [
      name,
      amount,
      buyer_name,
      recipient_name,
      buyer_tel,
      recipient_tel,
      buyer_email,
      buyer_addr,
      recipient_addr,
      buyer_postcode,
      recipient_postcode,
      recipientCountry,
    ].includes("")
  )
    return;
  try {
    const {
      data: { productList },
    } = await axios({
      url: "/store/payment",
      method: "POST",
      data: {
        name,
        buyer_name,
        recipient_name,
        buyer_tel,
        recipient_tel,
        buyer_email,
        recipientCountry,
        recipient_addr,
        recipient_postcode,
        pinkCnt,
        greenCnt,
        shipMessage,
      },
    });
    IMP.request_pay(
      {
        pg: "paypal",
        currency: "JPY",
        tax_free: amount,
        m_redirect_url:
          "https://www.faves.co.kr/store/payment/complete/paypal/jp",
        pay_method: "card",
        merchant_uid: productList.purchaseInfo,
        name: productList.productName,
        amount, // 이거 넣어야함
        buyer_email: productList.ordererEmail,
        buyer_name: productList.ordererName,
        buyer_tel: productList.ordererPhoneNum,
        //이건 위에서 갖고오자
        buyer_addr: buyer_postcode, // 이것도
      },
      async function (rsp) {
        if (rsp.success) {
          const { data } = await axios({
            url: "/store/payment/complete",
            method: "post",
            headers: { "Content-Type": "application/json" },
            data: {
              imp_uid: rsp.imp_uid,
              merchant_uid: rsp.merchant_uid,
            },
          });
          console.log(data);
          // 성공하면 data 잘뜨네
          // 성공했으니 리다이렉트 시켜줘야함

          switch (data.status) {
            case "success":
              // 성공시 로직인데 물건 산 곳을 확인할 수 있는 곳으로 리다이렉트 되어야함
              // 여기에 폼을 만들고 값을 넣어서 보내버린다
              // 회원이랑 회원이 아닌 사람을 구분해야함?
              // 왜냐면 폼을 만들면 postOrdersCheck로 보내야 하니까?
              let lang = window.location.pathname.split("/"); // /payment, /payment/kr, /payment/jp
              lang = lang[lang.length - 1];
              console.log(lang);
              let form = document.createElement("form");
              if (lang === "kr") {
                form.action = "/store/orders/check/kr";
              } else if (lang === "jp") {
                form.action = "/store/orders/check/jp";
              } else {
                form.action = "/store/orders/check";
              }
              form.method = "POST";
              form.id = "redirectForm";
              let orderInfoInput = document.createElement("input");
              orderInfoInput.type = "hidden";
              orderInfoInput.name = "orderInfo";
              orderInfoInput.value = rsp.merchant_uid;
              let emailInput = document.createElement("input");
              emailInput.type = "hidden";
              emailInput.name = "email";
              emailInput.value = rsp.buyer_email;
              form.appendChild(orderInfoInput);
              form.appendChild(emailInput);
              orderForm.appendChild(form);
              console.log(form);
              document.getElementById("redirectForm").submit();
              break;
          }
        } else {
          // 내가 취소할 경우
          // rsp.error_msg는 "사용자가 결제를 취소하셨습니다."
          alert("決済に失敗しました.");
        }
      }
    );
  } catch (e) {
    console.log(e);
    //여기서 실패했을 때 어떻게 할지를 정하는 건갑다
    //위변조 되서 실패했을 때 여기서 어떻게 처리하지?
    // 콘솔 다른것도 찍어서 진짜 위/변조 실패시 여기가 맞는지 확인
  }
};

if (paymentBtn) {
  paymentBtn.addEventListener("click", paymentBtnHandler);
}

if (paymentBtnKr) {
  paymentBtnKr.addEventListener("click", paymentBtnHandlerKr);
}

if (paymentBtnJp) {
  paymentBtnJp.addEventListener("click", paymentBtnHandlerJp);
}

if (countrySelected.length) {
  for (let i = 0; i < countrySelected.length; i++) {
    countrySelected[i].addEventListener("click", function () {
      const carret = this.children[1].children[0].children[0];
      if (carret.classList.contains("fa-caret-down")) {
        carret.classList.remove("fa-caret-down");
        carret.classList.add("fa-caret-up");
      } else {
        carret.classList.remove("fa-caret-up");
        carret.classList.add("fa-caret-down");
      }
      this.nextSibling.classList.toggle("select--hide");
      console.log("clicked");
    });
  }
}

if (ordererCountries.length) {
  for (let i = 0; i < ordererCountries.length; i++) {
    ordererCountries[i].addEventListener("click", function () {
      countrySelected[0].children[0].innerHTML = this.innerHTML;
      const ordererInput = document.getElementById("ordererCountry");
      ordererInput.value = this.innerHTML;
      console.dir(ordererInput.value);
      countrySelected[0].click();
    });
  }
}

if (recipientCountries) {
  for (let i = 0; i < recipientCountries.length; i++) {
    recipientCountries[i].addEventListener("click", function () {
      const country = this.innerHTML;
      countrySelected[1].children[0].innerHTML = country;
      const recipientInput = document.getElementById("recipientCountry");
      recipientInput.value = country;
      let pinkCnt, greenCnt;
      // 여기서 나라에 따라 배송비와 계산비가 달라지는게 처리되어야함
      for (let i = 0; i < productCnt.length; i++) {
        const product = productCnt[i].innerHTML.split(" ");
        if (product[0] === "Green") {
          greenCnt = product[1];
        } else {
          pinkCnt = product[1];
        }
      }
      const pPrice = Number(
        numberUnCommas(productPrice.innerHTML.split(" ")[0])
      );
      // 배가격하고 해당 pPrice를 합쳐서 전체 가격을 변환시킨다.
      const sPrice = shipPay(country, pinkCnt, greenCnt);
      // 배가격 값을 바꿔야함
      shipPrice.innerHTML = `${numberWithComma(sPrice)} USD`;
      totalPrice.innerHTML = `${numberWithComma(pPrice + sPrice)} USD`;
      countrySelected[1].click();
    });
  }
}

function extractPathname(pathname) {
  let checkLang;
  const lang = pathname.split("/store/")[1];
  if (lang === "payment/kr") {
    checkLang = "kr";
  } else if (lang === "payment/jp") {
    checkLang = "jp";
  } else {
    checkLang = "en";
  }
  return checkLang;
}

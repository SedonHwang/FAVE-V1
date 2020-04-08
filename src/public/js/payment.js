import axios from "axios";
import numberUnCommas from "../../lib/numberUnCommas";

const IMP = window.IMP;
IMP.init("imp99764133");

const ordererPhone = document.getElementById("ordererPhoneNumber");
const recipientPhone = document.getElementById("recipientPhoneNumber");
const sameRecipientCheck = document.getElementById("sameRecipient");
const paymentBtn = document.getElementById("paymentBtn");

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
      orderForm.recipientCountry.value = orderForm.ordererCountry.value;
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
  const totalPrice = document.getElementById("totalPrice");
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
  const productCnt = document.getElementsByClassName("productCnt");
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
    ].includes("")
  )
    return;
  //기존코드
  // let merchant_uid;
  // try {
  //   ({
  //     data: { result: merchant_uid }
  //   } = await axios.get("/store/payment/info"));
  // } catch (e) {
  //   console.log(e);
  // }
  // IMP.request_pay(
  //   {
  //     pg: "inicis",
  //     pay_method: "card",
  //     merchant_uid,
  //     name,
  //     amount,
  //     buyer_email,
  //     buyer_name,
  //     buyer_tel,
  //     buyer_addr,
  //     buyer_postcode
  //   },
  //   function(rsp) {
  //     if (rsp.success) {
  //       console.log("결제성공");
  //     } else {
  //       console.log("결제실패");
  //     }
  //   }
  // );

  //새로운 코드
  // 위에껄 일단 보내서 저장한다!
  // 데이터를 받아온다. 받아와서 imp에 넣는다
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
        pay_method: "card",
        merchant_uid: productList.purchaseInfo,
        name: productList.productName,
        amount,
        buyer_email: productList.ordererEmail,
        buyer_name: productList.ordererName,
        buyer_tel: productList.ordererPhoneNum,
        buyer_addr: buyer_postcode,
        m_redirect_url: "/store/payment/complete/mobile",
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
              emailInput.value = buyer_email;
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

if (paymentBtn) {
  paymentBtn.addEventListener("click", paymentBtnHandler);
}

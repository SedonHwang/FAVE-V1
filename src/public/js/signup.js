import axios from "axios";
import { DH_CHECK_P_NOT_SAFE_PRIME } from "constants";

const email = document.getElementById("email");
const password1 = document.getElementById("password1");
const pwLengthCheck = document.getElementById("js-pwLengthCheck");
const signupForm = document.getElementById("js-signupForm");
const password2 = document.getElementById("password2");
const pwVerified = document.getElementById("js-pwVerified");
const name = document.getElementById("name");
const nickVerified = document.getElementById("js-nickVerified");
const birthDate = document.getElementById("birthDate");
const checkMan = document.getElementById("man");
const checkWoman = document.getElementById("woman");
const country = document.getElementById("country");
const address1 = document.getElementById("address1");
const address2 = document.getElementById("address2");
const postalCode = document.getElementById("postalCode");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const job = document.getElementById("job");

const useTerm = document.getElementById("use");
const privacy = document.getElementById("privacy");

// const addUser = async (
//   email,
//   password1,
//   password2,
//   name,
//   birthDate,
//   sex,
//   country,
//   address1,
//   address2,
//   postalCode,
//   height,
//   weight,
//   job
// ) => {
//   const response = await axios({
//     url: "/signup",
//     method: "POST",
//     data: {
//       email,
//       password1,
//       password2,
//       name,
//       birthDate,
//       sex,
//       country,
//       address1,
//       address2,
//       postalCode,
//       height,
//       weight,
//       job
//     }
//   });
//   //아이디 값을 미리 확인하면 모든게 다 ok니까 항상 홈으로 리다이렉트 가능함
//   //주소를 보고 한글가입 -> 한글홈 처럼 맞출 수 있게 코드 작성
//   console.log(response);
// };

// const lengthCheck = () => {
//   const len = password1.value.length;
//   if (len < 8) {
//     pwLengthCheck.innerText = "8자 이상 입력해주세요.";
//     return false;
//   } else {
//     pwLengthCheck.innerText = "";
//     return true;
//   }
// };

// const verifyPw = () => {
//   const verification = password1.value === password2.value;
//   if (verification === false) {
//     pwVerified.innerText = "비밀번호가 다릅니다.";
//     return false;
//   } else {
//     pwVerified.innerText = "";
//     return true;
//   }
// };

// const nickLength = () => {
//   const nickLength = name.value.length;
//   if (nickLength < 1) {
//     nickVerified.innerText = "닉네임을 입력해주세요.";
//     return false;
//   } else {
//     nickVerified.innerText = "";
//     return true;
//   }
// };

// const checkTerms = () => {
//   const useTermCheck = useTerm.checked;
//   const privacyCheck = privacy.checked;
//   if (useTermCheck === false || privacyCheck === false) {
//     if (useTermCheck === false) {
//       alert("서비스 이용약관에 동의해주세요.");
//     } else {
//       alert("개인정보 수집 및 이용에 동의해주세요.");
//     }
//   }
//   return useTermCheck && privacyCheck;
// };

// const checkForm = () => {
//   const pwLengthCheck = lengthCheck();
//   const pwVerifyCheck = verifyPw();
//   const nickLengthCheck = nickLength();
//   const checkTermsValue = checkTerms();
//   //아이디 확인하는게 필요함 그래야 홈으로 리다이렉트 되더라도 가입이 100%된 것을 알 수 있음
//   console.log(pwLengthCheck, pwVerifyCheck, nickLengthCheck, checkTermsValue);
//   return pwLengthCheck && pwVerifyCheck && nickLengthCheck && checkTermsValue;
// };

// const handleSubmit = e => {
//   e.preventDefault();
//   if (!checkForm()) {
//     return;
//   }
//   let sex = "N";
//   if (checkWoman.checked || checkMan.checked) {
//     if (checkWoman.checked) {
//       sex = "F";
//     } else {
//       sex = "M";
//     }
//   }
//   addUser(
//     email.value,
//     password1.value,
//     password2.value,
//     name.value,
//     birthDate.value,
//     sex,
//     country.value,
//     address1.value,
//     address2.value,
//     postalCode.value,
//     height.value,
//     weight.value,
//     job.value
//   );
// };

// const handlePassword = e => {
//   const {
//     target: { value }
//   } = e;
//   if (value.length < 8) {
//     pwLengthCheck.innerText = "8자 이상 입력해주세요.";
//   } else {
//     pwLengthCheck.innerText = "";
//   }
// };

// const handleVerification = e => {
//   const {
//     target: { value }
//   } = e;
//   if (password1.value === value) {
//     pwVerified.innerText = "";
//   } else {
//     pwVerified.innerText = "비밀번호가 다릅니다.";
//   }
// };

// const handleNickname = e => {
//   const {
//     target: { value }
//   } = e;
//   if (value.length < 1) {
//     nickVerified.innerText = "닉네임을 입력해주세요.";
//   } else {
//     nickVerified.innerText = "";
//   }
// };

// if (password1) {
//   password1.addEventListener("change", handlePassword);
// }

// if (password2) {
//   password2.addEventListener("change", handleVerification);
// }

// if (name) {
//   name.addEventListener("change", handleNickname);
// }

// if (signupForm) {
//   signupForm.addEventListener("submit", handleSubmit);
// }

// 맨 처음 로딩이 되면 체크폼을 하고 && 약관 동의 확인한다음(당연히 안되어 있음) preventDefault 함
//preventDefault를 풀 수 있는 함수가 있고, 각 값을 입력하거나 이용약관에 체크할 때마다 검사를 해서 값이 다 입력되어 있으면 preventDefault 푼다.

const checkTerms = () => {
  if (useTerm.checked === true && privacy.checked === true) {
    return true;
  }
  return false;
};

const preventSubmit = e => {
  e.preventDefault();
  alert("막혀있습니다.");
};

function handleTerm() {
  const checkValue = checkTerms();
  console.log(checkValue);
  if (checkValue === true) {
    signupForm.removeEventListener("submit", preventSubmit);
  } else {
    signupForm.addEventListener("submit", preventSubmit);
  }
  //체크텀을 한다.
  //모두가 체크되어 있으면(true) remove이벤트를 통해 preventSubmit을 없앤다
  //하나라도 체크가 되어있지 않으면 preventSubmit을 달아버린다.
  //동일 이벤트에 이벤트 핸들러가 같으면 중복되서 적용되지 않는다.
  //값을 보낸뒤 flash 이미지로 받아서는 애니메이션이 적용되서 잠깐되다가 사라지도록 만든다.
}

if (useTerm) {
  useTerm.addEventListener("change", handleTerm);
}

if (privacy) {
  privacy.addEventListener("change", handleTerm);
}

if (signupForm) {
  signupForm.addEventListener("submit", preventSubmit);
}

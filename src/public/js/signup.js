import axios from "axios";

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

const addUser = async (
  email,
  password1,
  password2,
  name,
  birthDate,
  sex,
  country,
  address1,
  address2,
  postalCode,
  height,
  weight,
  job
) => {
  const response = await axios({
    url: "/signup",
    method: "POST",
    data: {
      email,
      password1,
      password2,
      name,
      birthDate,
      sex,
      country,
      address1,
      address2,
      postalCode,
      height,
      weight,
      job
    }
  });
  //아이디 값을 미리 확인하면 모든게 다 ok니까 항상 홈으로 리다이렉트 가능함
  //주소를 보고 한글가입 -> 한글홈 처럼 맞출 수 있게 코드 작성
  console.log(response);
};

const lengthCheck = () => {
  const len = password1.value.length;
  if (len < 8) {
    pwLengthCheck.innerText = "8자 이상 입력해주세요.";
    return false;
  } else {
    pwLengthCheck.innerText = "";
    return true;
  }
};

const verifyPw = () => {
  const verification = password1.value === password2.value;
  if (verification === false) {
    pwVerified.innerText = "비밀번호가 다릅니다.";
    return false;
  } else {
    pwVerified.innerText = "";
    return true;
  }
};

const nickLength = () => {
  const nickLength = name.value.length;
  if (nickLength < 1) {
    nickVerified.innerText = "닉네임을 입력해주세요.";
    return false;
  } else {
    nickVerified.innerText = "";
    return true;
  }
};

const checkTerms = () => {
  const useTermCheck = useTerm.checked;
  const privacyCheck = privacy.checked;
  if (useTermCheck === false || privacyCheck === false) {
    if (useTermCheck === false) {
      alert("서비스 이용약관에 동의해주세요.");
    } else {
      alert("개인정보 수집 및 이용에 동의해주세요.");
    }
  }
  return useTermCheck && privacyCheck;
};

const checkForm = () => {
  const pwLengthCheck = lengthCheck();
  const pwVerifyCheck = verifyPw();
  const nickLengthCheck = nickLength();
  const checkTermsValue = checkTerms();
  //아이디 확인하는게 필요함 그래야 홈으로 리다이렉트 되더라도 가입이 100%된 것을 알 수 있음
  console.log(pwLengthCheck, pwVerifyCheck, nickLengthCheck, checkTermsValue);
  return pwLengthCheck && pwVerifyCheck && nickLengthCheck && checkTermsValue;
};

const handleSubmit = e => {
  e.preventDefault();
  if (!checkForm()) {
    return;
  }
  let sex = "N";
  if (checkWoman.checked || checkMan.checked) {
    if (checkWoman.checked) {
      sex = "F";
    } else {
      sex = "M";
    }
  }
  addUser(
    email.value,
    password1.value,
    password2.value,
    name.value,
    birthDate.value,
    sex,
    country.value,
    address1.value,
    address2.value,
    postalCode.value,
    height.value,
    weight.value,
    job.value
  );
};

const handlePassword = e => {
  const {
    target: { value }
  } = e;
  if (value.length < 8) {
    pwLengthCheck.innerText = "8자 이상 입력해주세요.";
  } else {
    pwLengthCheck.innerText = "";
  }
};

const handleVerification = e => {
  const {
    target: { value }
  } = e;
  if (password1.value === value) {
    pwVerified.innerText = "";
  } else {
    pwVerified.innerText = "비밀번호가 다릅니다.";
  }
};

const handleNickname = e => {
  const {
    target: { value }
  } = e;
  if (value.length < 1) {
    nickVerified.innerText = "닉네임을 입력해주세요.";
  } else {
    nickVerified.innerText = "";
  }
};

if (password1) {
  password1.addEventListener("change", handlePassword);
}

if (password2) {
  password2.addEventListener("change", handleVerification);
}

if (name) {
  name.addEventListener("change", handleNickname);
}

if (signupForm) {
  signupForm.addEventListener("submit", handleSubmit);
}

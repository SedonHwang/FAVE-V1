const password1 = document.getElementById("password1");
const pwLengthCheck = document.getElementById("js-pwLengthCheck");
const signupForm = document.getElementById("js-signupForm");
const password2 = document.getElementById("password2");
const pwVerified = document.getElementById("js-pwVerified");

const preventSubmit = e => {
  e.preventDefault();
};

// signupForm.addEventListener("submit", handleSubmit);

// signupForm.removeEventListener("submit", handleSubmit);

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

const verifiedPassword = e => {
  const {
    target: { value }
  } = e;
  if (password1.value === value) {
    pwVerified.innerText = "";
  } else {
    pwVerified.innerText = "비밀번호가 다릅니다.";
  }
};
password1.addEventListener("change", handlePassword);
password2.addEventListener("change", verifiedPassword);

const signupForm = document.getElementById("js-signupForm");

const useTerm = document.getElementById("use");
const privacy = document.getElementById("privacy");

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

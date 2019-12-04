const modal = document.getElementById("js-modal");
const overlay = document.getElementById("js-overlay");
const closeBtn = document.getElementById("js-closBtn");
const notShowing = document.getElementById("ns-check");

const setCookie = (cName, cValue, exdays) => {
  let d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cName}=${cValue};${expires};path=/`;
};

const getCookie = cName => {
  let name = cName + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let splitedCookie = decodedCookie.split(";");
  for (let i = 0; i < splitedCookie.length; i++) {
    let cookie = splitedCookie[i];
    while (cookie.charAt(0) == " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return "";
};

const openModal = () => {
  modal.classList.remove("hide-modal");
};

const closeModal = () => {
  if (notShowing.checked) {
    setCookie("faveModal", "notToday", 1);
  }
  modal.classList.add("hide-modal");
};

const checkCookie = () => {
  const faveModal = getCookie("faveModal");
  if (faveModal != "") {
    return;
  } else {
    openModal();
  }
};
if (modal) {
  checkCookie();
}

if (overlay) {
  overlay.addEventListener("click", closeModal);
}
if (closeBtn) {
  closeBtn.addEventListener("click", closeModal);
}

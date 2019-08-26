const openSide = document.getElementById("js--openSide");
const closeSide = document.getElementById("js--closeSide");
const logoResponsive = document.getElementById("js--logoResponsive");
const sideNavi = document.getElementById("js--sideNavi");

openSide.addEventListener("click", function() {
  logoResponsive.classList.add("hide");
  sideNavi.classList.add("visible");
});

closeSide.addEventListener("click", function() {
  logoResponsive.classList.remove("hide");
  sideNavi.classList.remove("visible");
});

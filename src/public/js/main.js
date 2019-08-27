const openSide = document.getElementById("js--openSide");
const closeSide = document.getElementById("js--closeSide");
const logoResponsive = document.getElementById("js--logoResponsive");
const sideNavi = document.getElementById("js--sideNavi");
const collasible = document.getElementsByClassName("js--collapsible");

openSide.addEventListener("click", function() {
  logoResponsive.classList.add("hide");
  sideNavi.classList.add("visible");
});

closeSide.addEventListener("click", function() {
  logoResponsive.classList.remove("hide");
  sideNavi.classList.remove("visible");
});

for (let i = 0; i < collasible.length; i++) {
  collasible[i].addEventListener("click", function() {
    const ftCaret = this.children[1].children[0].children[0];
    const naviContent = this.nextElementSibling;

    if (!naviContent.classList.contains("visible")) {
      this.classList.add("active");
      naviContent.classList.add("visible");
      ftCaret.classList.remove("fa-caret-down");
      ftCaret.classList.add("fa-caret-up");
    } else {
      this.classList.remove("active");
      naviContent.classList.remove("visible");
      ftCaret.classList.remove("fa-caret-up");
      ftCaret.classList.add("fa-caret-down");
    }
  });
}

const openSide = document.getElementById("js--openSide");
const closeSide = document.getElementById("js--closeSide");
const logoResponsive = document.getElementById("js--logoResponsive");
const sideNavi = document.getElementById("js--sideNavi");
const collasible = document.getElementsByClassName("js--collapsible");

if (openSide) {
  openSide.addEventListener("click", function() {
    logoResponsive.classList.add("hide");
    sideNavi.classList.add("visible");
    document.body.style.position = "fixed";
    document.body.style.top = `-${window.scrollY}px`;
  });
}

if (closeSide) {
  closeSide.addEventListener("click", function() {
    logoResponsive.classList.remove("hide");
    sideNavi.classList.remove("visible");
    const scrollY = document.body.style.top;
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
  });
}

if (collasible) {
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
}

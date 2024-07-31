document.getElementById("menuButton").addEventListener("click", function () {
  var menuContent = document.getElementById("menuContent");
  var downIcon = document.getElementById("downIcon");
  var upIcon = document.getElementById("upIcon");

  if (menuContent.style.display === "block") {
    menuContent.style.display = "none";
    downIcon.style.display = "inline";
    upIcon.style.display = "none";
  } else {
    menuContent.style.display = "block";
    downIcon.style.display = "none";
    upIcon.style.display = "inline";
  }
});

window.onclick = function (event) {
  if (
    !event.target.matches(".menu-button") &&
    !event.target.closest(".menu-content")
  ) {
    var menuContent = document.getElementById("menuContent");
    var downIcon = document.getElementById("downIcon");
    var upIcon = document.getElementById("upIcon");

    if (menuContent.style.display === "block") {
      menuContent.style.display = "none";
      downIcon.style.display = "inline";
      upIcon.style.display = "none";
    }
  }
};
let sortUp = document.getElementById("ou_orderAsc");
let sortDown = document.getElementById("ou_orderDesc");

sortUp.src = "https://webassets.kctcs.edu/_resources/images/newsSortUp.gif";
sortDown.src = "https://webassets.kctcs.edu/_resources/images/newsSortDown.gif";

sortUp.addEventListener("onload", function() {
    sortUp.src = "https://webassets.kctcs.edu/_resources/images/newsSortUp.gif";
});

sortDown.addEventListener("onload", function() {
    sortDown.src = "https://webassets.kctcs.edu/_resources/images/newsSortDown.gif";
});
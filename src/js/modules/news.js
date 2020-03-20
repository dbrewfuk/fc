let sortUp = document.getElementById("ou_orderAsc");
let sortDown = document.getElementById("ou_orderDesc");

sortUp.src = "https://webassets.kctcs.edu/_resources/images/newsSortUp.gif";
sortDown.src = "https://webassets.kctcs.edu/_resources/images/newsSortDown.gif";

document.getElementById("ou_feed").addEventListener("onclick", function(){
    sortUp.src = "https://webassets.kctcs.edu/_resources/images/newsSortUp.gif";
    sortDown.src = "https://webassets.kctcs.edu/_resources/images/newsSortDown.gif";
})
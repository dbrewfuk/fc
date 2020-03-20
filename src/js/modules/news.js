let sortUp = document.getElementById("ou_orderAsc");
let sortDown = document.getElementById("ou_orderDesc");

if (sortUp != null) {
    sortUp.src = "https://webassets.kctcs.edu/_resources/images/newsSortUp.gif";
    sortDown.src = "https://webassets.kctcs.edu/_resources/images/newsSortDown.gif";
    
    while (true) {
        if (sortUp.src != "https://webassets.kctcs.edu/_resources/images/newsSortUp.gif") {
            sortUp.src = "https://webassets.kctcs.edu/_resources/images/newsSortUp.gif";
            sortDown.src = "https://webassets.kctcs.edu/_resources/images/newsSortDown.gif";
        }
    }
}
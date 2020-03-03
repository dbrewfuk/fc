// Transfer Programs Search
const programs = document.getElementsByClassName("accordion__toggle");
const prgrmSearchBar = document.getElementById("transferPrgrmSearchInput");
prgrmSearchBar.addEventListener("keyup", function() {programSearch(prgrmSearchBar.value)});

function programSearch(term) {
    term = term.toLowerCase();
    for (var i = 0; i < programs.length; i++) {
        var program = programs[i].innerText.toLowerCase();
        // Not possible match
        if (program.search(term) == -1) {
            programs[i].style.display = "none";
        }
        // Match found
        else {
            programs[i].style.display = "inline";
            }
        }
}

// Institution Search
const schools = document.getElementsByClassName("card__content");
const schoolsCards = document.getElementsByClassName("card");
const schoolSearchBar = document.getElementById("schoolSearchInput");
schoolSearchBar.addEventListener("keyup", function() {schoolSearch(schoolSearchBar.value)});

function schoolSearch(term) {
    term = term.toLowerCase();
    for (var i = 0; i < schools.length; i++) {
        var school = schools[i].innerText;
        var acronym = school.match(/[A-Z]/g).join('');
        school = school.toLowerCase();
        acronym = acronym.toLowerCase();
        // Acronym match
        if (term == acronym) {
            schoolsCards[i].style.display = "block";
        }
        // Not possible match
        else if (school.search(term) == -1) {
            schoolsCards[i].style.display = "none";
        }
        // Match found
        else {
            schoolsCards[i].style.display = "block";
        }
    }
}
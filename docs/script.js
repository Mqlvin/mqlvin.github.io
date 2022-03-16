function getCssVar(style) {
    var element = document.getElementsByTagName('body')[0];
    if(!element || !getComputedStyle(element).getPropertyValue(style)) {
        return false;
    }
    return getComputedStyle(element).getPropertyValue(style);
}

function addEventListeners() {
    var pagesList = document.getElementsByClassName("page-list-item");
    var element;
    for(element = 0; element < pagesList.length; element++) {
        pagesList[element].addEventListener("click", function(event) {
            var iter;
            for(iter = 0; iter < pagesList.length; iter++) {
                pagesList[iter].classList.remove("active-item");
            }
            event.target.classList.add("active-item");
        });
    }


    var list = document.getElementsByClassName("chapter-expander");
    var element;
    for(element = 0; element < list.length; element++) {
        list[element].addEventListener("click", function(event) {
            event.target.closest(".chapter-parent").getElementsByClassName("chapter-title")[0].getElementsByClassName("chapter-expander")[0].classList.toggle("chapter-expander-active");
            event.target.closest(".chapter-parent").getElementsByClassName("chapter-title")[0].getElementsByClassName("chapter-text")[0].classList.toggle("chapter-text-active");
            var content = (event.target.closest(".chapter-parent").getElementsByClassName("expandable-list"))[0];
            if(content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }

    var textList = document.getElementsByClassName("chapter-text");
    var element;
    for(element = 0; element < textList.length; element++) {
        textList[element].addEventListener("click", function(event) {
            event.target.closest(".chapter-parent").getElementsByClassName("chapter-title")[0].getElementsByClassName("chapter-expander")[0].classList.toggle("chapter-expander-active");
            event.target.closest(".chapter-parent").getElementsByClassName("chapter-title")[0].getElementsByClassName("chapter-text")[0].classList.toggle("chapter-text-active");
            var content = (event.target.closest(".chapter-parent").getElementsByClassName("expandable-list"))[0];
            if(content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }
}

function hoverBGC(color, element) {
    element.closest(".chapter-parent").style.backgroundColor = getCssVar(color).replace(" ", "");
}

function toggleTheme() {
    var bodyElement = document.body;

    if(bodyElement.classList.contains("light")) {
        bodyElement.classList.replace("light", "dark");
    } else {
        bodyElement.classList.replace("dark", "light");
    }
}



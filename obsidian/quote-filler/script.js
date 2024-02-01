function appendQuote(parent, text) {
    let quoteWords = text.split(" ");
    let shownIndexes = [];
    for(let i = 0; i < quoteWords.length; i++) { quoteWords[i] = quoteWords[i].replace(",", "").replace("/", "") }
    for(let i = 0; i < 1; i++) { shownIndexes.push(Math.floor(Math.random() * quoteWords.length)); }

    let container = document.createElement("div");
    container.classList.add("quote-container");

    for(let i = 0; i < quoteWords.length; i++) {
        if(shownIndexes.includes(i)) {
            let element = document.createElement("span");
            element.classList.add("filled");
            element.textContent = quoteWords[i] + "\u00A0";
            container.appendChild(element);
        } else {
            let element = document.createElement("input");
            element.setAttribute("type", "text");
            element.classList.add("unfilled");
            element.style.width = quoteWords[i].length + "ch";
            element.style.marginRight = "0.5ch";
            element.classList.add(quoteWords[i].toLowerCase());

            element.addEventListener('input', e => { onTextChange(e, quoteWords); });

            container.appendChild(element);
        }
    }

    parent.appendChild(container);
}

function onTextChange(event, quoteWords) {
    let element = event.target;
    // the input box

    if(element.classList.contains(element.value.toLowerCase()) && element.value != "unfilled") { // if its an input box and the word is correct
        element.style.borderBottom = "2px solid rgb(100, 202, 113)"; // style it
        element.setAttribute("readonly", "readonly"); // make it read only
        
        let index = [...element.parentNode.children].indexOf(element); // get the index of the element in the div
        element.value = quoteWords[index];
        
        if(element.parentNode.childNodes.length - 1 == index) {
            // quote finished
            finished(element.parentNode);

        } else {
            while(element.parentNode.childNodes[index + 1] != undefined && element.parentNode.childNodes[index + 1].nodeName == "SPAN") {
                index++;    
            }
            
            if(element.parentNode.childNodes[index + 1] == undefined) {
                // quote finished
                finished(element.parentNode);

            } else {
                element.parentNode.childNodes[index + 1].focus();
            }   
        }
    }
}


function finished(target) {
    let allElements = target.childNodes;

    for(let i = 0; i < allElements.length; i++) {
        allElements[i].style.color = "rgb(129, 221, 141)";
        allElements[i].style.fontWeight = "500";
    }
}




function createPoemDiv(parent, name) {
    let div = document.createElement("div");
    div.classList.add("poem-div");

    let text = document.createElement("h1");
    text.classList.add("poem-title")
    text.textContent = name;
    div.appendChild(text);

    parent.appendChild(div);

    return div;
}





let ozymandias = createPoemDiv(document.body, "Ozymandias");
appendQuote(ozymandias, "I met a traveller from an antique land");
appendQuote(ozymandias, "Two vast, trunkless legs of stone");
appendQuote(ozymandias, "wrinkled lip, and sneer of cold command");
appendQuote(ozymandias, "king of kings");
appendQuote(ozymandias, "Look on my works, ye Mighty, and despair");
appendQuote(ozymandias, "Nothing besides remains");


let london = createPoemDiv(document.body, "London");
appendQuote(london, "I wander through each chartered street");
appendQuote(london, "chartered Thames");
appendQuote(london, "Marks of weakness, marks of woe");
appendQuote(london, "mind-forged manacles");

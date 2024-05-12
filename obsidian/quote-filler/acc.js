const WORDS_SHOWN = 5; // max words shown
const REQUIRE_MINIMUM = 4; // require at least this many words

function appendQuote(parent, text) {
    let quoteWords = text.split(" ");
    let shownIndexes = [];
    for(let i = 0; i < quoteWords.length; i++) { quoteWords[i] = quoteWords[i]; }
    for(let i = 0; i < Math.min(WORDS_SHOWN, quoteWords.length - REQUIRE_MINIMUM); i++) { 
        let tryIndex = Math.floor(Math.random() * quoteWords.length);
        while(shownIndexes.includes(tryIndex)) {
            tryIndex = Math.floor(Math.random() * quoteWords.length)
        }
        shownIndexes.push(tryIndex);
    }

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


    // here loop through classlist and determine whether each string WITHTOUT `'` equals element.value.toLowe...
    let formattedValue = element.value.replaceAll(" ", "");

    if(element.classList[1]
        .replaceAll(",", "")
        .replaceAll(".", "")
        .replaceAll("!", "") == formattedValue.toLowerCase() && element.value != "unfilled") { // if its an input box and the word is correct
        element.style.borderBottom = "2px solid rgb(100, 202, 113)"; // style it
        element.setAttribute("readonly", "readonly"); // make it read only
        
        let index = [...element.parentNode.children].indexOf(element); // get the index of the element in the div
        element.value = quoteWords[index];
        
        if(element.parentNode.childNodes.length - 1 == index) {
            // quote finished
            finished(element.parentNode);

        } else {
            while(element.parentNode.childNodes[index + 1] != undefined && element.parentNode.childNodes[index + 1].nodeName == "SPAN") { // while there is another element, and its called SPAN - we need the first input
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


    
    let singleContainer = target; // container of a single set of inputs/spans
    let quoteContainer = singleContainer.parentNode; // container of all the singleContainers
    
    if([...quoteContainer.children].indexOf(singleContainer) + 1 == quoteContainer.children.length) { // if this is the last quote in the container
        // This is the end of a container - can make it move on to the next one here if needed
    } else {
        let nextSingleContainer = quoteContainer.children[[...quoteContainer.children].indexOf(singleContainer) + 1];
        let firstInputIndex = 0;

        while(nextSingleContainer.children[firstInputIndex].nodeName == "SPAN") {
            firstInputIndex++;
        }

        nextSingleContainer.childNodes[firstInputIndex].focus();
    }
}




function createPoemDiv(parent, name) {
    let div = document.createElement("div");
    div.classList.add("poem-div");

    let text = document.createElement("h1");
    text.classList.add("poem-title")
    text.textContent = name;
    div.appendChild(text);

    parent.push(div);

    return div;
}


let quoteContainers = [];

let scrooge = createPoemDiv(quoteContainers, "Scrooge");
appendQuote(scrooge, "covetous old sinner!");
appendQuote(scrooge, "As solitary as an oyster");
appendQuote(scrooge, "I can't afford to make idle people merry");
appendQuote(scrooge, "Darkness is cheap and Scrooge liked it");
appendQuote(scrooge, "I should like to be able to say a word or two to my clerk just now");
appendQuote(scrooge, "The Spirits of all Three shall strive within me");
appendQuote(scrooge, "I am as light as a feather, I am as happy as an angel, I am as merry as a schoolboy");
appendQuote(scrooge, "Not the little prize Turkey, the big one?");
appendQuote(scrooge, "If they would rather die they had better do it and decrease the surplus population");
appendQuote(scrooge, "Oh, a great many back payments are included in that amount, I assure you.");

let theCharityMen = createPoemDiv(quoteContainers, "Charity Men");
appendQuote(theCharityMen, "many thousands are in want of common necessities");

let marleysGhost = createPoemDiv(quoteContainers, "Marley's Ghost");
appendQuote(marleysGhost, "Mankind was my business");
appendQuote(marleysGhost, "I wear the chain I forged in life");

let belle = createPoemDiv(quoteContainers, "Belle");
appendQuote(belle, "Another idol has displaced me... a golden one");
appendQuote(belle, "May you be happy in the life you have chosen");

let misc = createPoemDiv(quoteContainers, "Fred / Bob / Bob / Fezziwig");
appendQuote(misc, "I mean to give him the same chance every year whether he likes it or not");
appendQuote(misc, "My little, little child!");
appendQuote(misc, "I'll give you Mr. Scrooge, the founder of the feast.");
appendQuote(misc, "No more work tonight, Christmas Eve");

let gocPast = createPoemDiv(quoteContainers, "Ghost of Christmas Past");
appendQuote(gocPast, "like a child, yet like an old man");
appendQuote(gocPast, "strong hand / gentle");
appendQuote(gocPast, "Would you so soon put out the light I give?");
appendQuote(gocPast, "She had a good heart");

let gocPresent = createPoemDiv(quoteContainers, "Ghost of Christmas Present");
appendQuote(gocPresent, "a jolly Giant / genial / sparkling / cheery");
appendQuote(gocPresent, "I see a vacant seat. The child will die.");

let gocYetToCome = createPoemDiv(quoteContainers, "Ghost of Christmas Yet to Come (+ Scrooge last)");
appendQuote(gocYetToCome, "silent / ghostly / spectral");
appendQuote(gocYetToCome, "The Spirit, stronger yet, repulsed him");
appendQuote(gocYetToCome, "Unwatched, unwept, uncared for");



function disperseContainers(parent, quoteContainers) {
    for(let i = 0; i < quoteContainers.length; i++) {
        parent.appendChild(quoteContainers[i]);
    }
}

disperseContainers(document.body, quoteContainers);

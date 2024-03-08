const WORDS_SHOWN = 4; // max words shown
const REQUIRE_MINIMUM = 6; // require at least this many words

function appendQuote(parent, text) {
    let quoteWords = text.split(" ");
    let shownIndexes = [];
    for(let i = 0; i < quoteWords.length; i++) { quoteWords[i] = quoteWords[i].replace(",", ""); }
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

    if(element.classList.contains(element.value.toLowerCase()) && element.value != "unfilled") { // if its an input box and the word is correct
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


let witches = createPoemDiv(quoteContainers, "Witches");
appendQuote(witches, "Fair is foul, and foul is fair");
appendQuote(witches, "Beware Macduff / Beware the thane of Fife");

let ross = createPoemDiv(quoteContainers, "Ross");
appendQuote(ross, "Brave Macbeth - well he deserves that name");
appendQuote(ross, "But cruel are the times when we are traitors and do not know ourselves");

let macbeth = createPoemDiv(quoteContainers, "Macbeth");
appendQuote(macbeth, "We will proceed no further in this business");
appendQuote(macbeth, "Macbeth doth murdered sleep");
appendQuote(macbeth, "O, full of scorpions is my mind, dear wife!");
appendQuote(macbeth, "Out, out, brief candle! Life's but a walking shadow");
appendQuote(macbeth, "I bear a charmed life");

let ladyMacbeth = createPoemDiv(quoteContainers, "Lady Macbeth");
appendQuote(ladyMacbeth, "Look like the innocent flower but be the serpent under't");
appendQuote(ladyMacbeth, "Yet I do fear thy nature. It is too full o'th'milk of human kindness");
appendQuote(ladyMacbeth, "Unsex me here, and fill me, from the crown to the toe, top-full of direst cruelty");
appendQuote(ladyMacbeth, "When thou durst do it, then you were a man");
appendQuote(ladyMacbeth, "A little water clears us of this deed");
appendQuote(ladyMacbeth, "All the perfumes of Arabia will not sweeten this little hand");
appendQuote(ladyMacbeth, "Who would have thought the old man to have so much blood in him?");
appendQuote(ladyMacbeth, "The Thane of Fife had a wife - where is she now?");

let macduff = createPoemDiv(quoteContainers, "Macduff");
appendQuote(macduff, "Most sacrilegious murder hath broke up the Lord's anointed temple");
appendQuote(macduff, "Tyrant, show thy face");
appendQuote(macduff, "Tell thee, Macduff was from his mothers womb");

let banquo = createPoemDiv(quoteContainers, "Banquo");
appendQuote(banquo, "My noble partner");
appendQuote(banquo, "I fear thou played'st most foully for it");
appendQuote(banquo, "have we eaten on the insane root?");
appendQuote(banquo, "The instruments of darkness tell us truthes");

let malcolm = createPoemDiv(quoteContainers, "Malcolm");
appendQuote(malcolm, "The dead butcher and his fiend-like queen");
appendQuote(malcolm, "This tyrant was once thought honest");


function disperseContainers(parent, quoteContainers) {
    for(let i = 0; i < quoteContainers.length; i++) {
        parent.appendChild(quoteContainers[i]);
    }

    //while(quoteContainers.length != 0) {
    //    let randIndex = Math.floor(Math.random() * (quoteContainers.length));
    //    parent.appendChild(quoteContainers[randIndex]);
    //    quoteContainers.splice(randIndex, 1);
    //}
}

disperseContainers(document.body, quoteContainers);

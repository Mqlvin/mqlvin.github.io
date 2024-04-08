const WORDS_SHOWN = 0; // max words shown
const REQUIRE_MINIMUM = 3; // require at least this many words

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


let ozymandias = createPoemDiv(quoteContainers, "Ozymandias");
appendQuote(ozymandias, "I met a traveller from an antique land");
appendQuote(ozymandias, "Two vast, trunkless legs of stone");
appendQuote(ozymandias, "wrinkled lip, and sneer of cold command");
appendQuote(ozymandias, "king of kings");
appendQuote(ozymandias, "Look on my works, ye Mighty, and despair");
appendQuote(ozymandias, "Nothing besides remains");

let london = createPoemDiv(quoteContainers, "London");
appendQuote(london, "I wander through each chartered street");
appendQuote(london, "chartered Thames");
appendQuote(london, "Marks of weakness, marks of woe");
appendQuote(london, "mind-forged manacles");

let prelude = createPoemDiv(quoteContainers, "The Prelude");
appendQuote(prelude, "a huge peak, black and huge");
appendQuote(prelude, "lustily I dipped my oars into the silent lake");
appendQuote(prelude, "there hung a darkness, call it solitude or blank desertion");

let mld = createPoemDiv(quoteContainers, "My Last Dutchess");
appendQuote(mld, "half flush that dies along her throat");
appendQuote(mld, "she liked whatever she looked on, and her looks went everywhere");
appendQuote(mld, "as if she ranked my gift of a nine-hundred-years-old name with anybodys gift");

let cotlb = createPoemDiv(quoteContainers, "The Charge Of The Light Brigade");
appendQuote(cotlb, "cannon to the right of them / cannon to the left of them / cannon behind them");
appendQuote(cotlb, "into the jaws of death rode the 500");
appendQuote(cotlb, "valley of death");

let exposure = createPoemDiv(quoteContainers, "Exposure");
appendQuote(exposure, "our brains ache, in the merciless iced east winds that knife us");
appendQuote(exposure, "but nothing happens");
appendQuote(exposure, "sudden successive flights of bullets streak the silence");

let soti = createPoemDiv(quoteContainers, "Storm on the Island");
appendQuote(soti, "spits like a tame cat / turned savage");
appendQuote(soti, "wind dives / and strafes invisibly");
appendQuote(soti, "strange, it is a huge nothing that we fear");

let bayonetCharge = createPoemDiv(quoteContainers, "Bayonet Charge");
appendQuote(bayonetCharge, "suddenly he awoke and was running");
appendQuote(bayonetCharge, "what cold clockwork of the stars and the nations / was he the hand pointing that second");
appendQuote(bayonetCharge, "threw up a yellow hare that rolled like a flame");

let remains = createPoemDiv(quoteContainers, "Remains");
appendQuote(remains, "the drink and the drugs wont flush him out");
appendQuote(remains, "his bloody life in my bloody hands");
appendQuote(remains, "probably armed, possibly not");
appendQuote(remains, "his blood-shadow stays on the street");

let poppies = createPoemDiv(quoteContainers, "Poppies");
appendQuote(poppies, "the world overflowing / like a treasure chest");
appendQuote(poppies, "released a song bird from its cage");
appendQuote(poppies, "sellotape bandaged around my hand");

let wph = createPoemDiv(quoteContainers, "War Photographer");
appendQuote(wph, "spools of suffering set out in ordered rows");
appendQuote(wph, "a priest preparing to intone a Mass");
appendQuote(wph, "the readers eyeballs prick / with tears between the bath and pre lunch beers");

let tissue = createPoemDiv(quoteContainers, "Tissue");
appendQuote(tissue, "might fly our lives like paper kites");
appendQuote(tissue, "daylight / light shine through / thinned by age");
appendQuote(tissue, "turned into your skin");

let emigree = createPoemDiv(quoteContainers, "The Emgiree");
appendQuote(emigree, "my shadow falls as evidence of sunlight");
appendQuote(emigree, "my memory of it is sunlight clear");
appendQuote(emigree, "they accuse me of being dark in their free city");
// appendQuote(emigree, "my original view, the bright, filled paperweight");

let kamikaze = createPoemDiv(quoteContainers, "Kamikaze");
appendQuote(kamikaze, "a shaven head / full of powerful incantations");
appendQuote(kamikaze, "little fishing boats / strung out like bunting");
appendQuote(kamikaze, "as though he no longer existed");
appendQuote(kamikaze, "he must have wondered / which was the better way to die");

let comh = createPoemDiv(quoteContainers, "Checking Out Me History");
appendQuote(comh, "bandage up me eye / blind me to me own identity");
appendQuote(comh, "beacons / a star / a sunrise");
appendQuote(comh, "I carving out me identity");



function disperseContainers(parent, quoteContainers) {
    //for(let i = 0; i < quoteContainers.length; i++) {
    //    parent.appendChild(quoteContainers[i]);
    //}

    while(quoteContainers.length != 0) {
        let randIndex = Math.floor(Math.random() * (quoteContainers.length));
        parent.appendChild(quoteContainers[randIndex]);
        quoteContainers.splice(randIndex, 1);
    }
}

disperseContainers(document.body, quoteContainers);

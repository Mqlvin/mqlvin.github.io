const WORDS_SHOWN = 1; // max words shown
const REQUIRE_MINIMUM = 7; // require at least this many words

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


    // here loop through classlist and determine whether each string WITHTOUT `'` equals element.value.toLowe...
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


let inspector = createPoemDiv(quoteContainers, "The Inspector");
appendQuote(inspector, "it's better to ask for the Earth than to take it");
appendQuote(inspector, "he must wait his turn");
appendQuote(inspector, "Public men, Mr Birling, have responsibilities as well as privilages");
appendQuote(inspector, "You think young women ought to be protected against unpleasant and disturbing things");
appendQuote(inspector, "Each of you helped to kill her. Remember that. Never forget it. But then I don't think you ever will.");

let sheila = createPoemDiv(quoteContainers, "Sheila");
appendQuote(sheila, "But these girls aren't cheap labour - they're people");
appendQuote(sheila, "Look mummy - isn't it a beauty");
appendQuote(sheila, "I'm not a child don't forget. I've a right to know");
appendQuote(sheila, "It's you two who are being childish - trying not to face the facts");

let mrsB = createPoemDiv(quoteContainers, "Mrs Birling");
appendQuote(mrsB, "I'm sorry she should have come to such a horrible end. But I accept no blame for it at all.");
appendQuote(mrsB, "Girls of that class");
appendQuote(mrsB, "It was simply a piece of gross impertinence - quite deliberate - and naturally that was one of the things that prejudiced me against her case.");
appendQuote(mrsB, "In the morning they'll be as amused as we are");

let mrB = createPoemDiv(quoteContainers, "Mr Birling");
appendQuote(mrB, "If we were all responsible for everything that happened to everybody we'd had anything to do with, it would be very awkward wouldn't it");
appendQuote(mrB, "She'd had a lot to say - far too much - so she had to go");
appendQuote(mrB, "If you don't come down sharply on some of these people, they'd soon be asking for the Earth");
appendQuote(mrB, "Inspector, I've told you this before. I don't like the tone nor the way you're handling this inquiry");
appendQuote(mrB, "There's every excuse for what both your mother and I did");
appendQuote(mrB, "The famous younger generation who know it all. And they can't even take a joke");

let gerald = createPoemDiv(quoteContainers, "Gerald");
appendQuote(gerald, "Hear hear! And I think my father would agree to that");
appendQuote(gerald, "It's a favourite haunt of women of the town");
appendQuote(gerald, "Well, you were right. There isn't any such inspector. We've been had");
appendQuote(gerald, "Everything's all right now, Sheila. What about this ring?");


function disperseContainers(parent, quoteContainers) {
    for(let i = 0; i < quoteContainers.length; i++) {
        parent.appendChild(quoteContainers[i]);
    }
}

disperseContainers(document.body, quoteContainers);

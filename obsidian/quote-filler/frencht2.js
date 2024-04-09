const WORDS_SHOWN = 12; // max words shown
const REQUIRE_MINIMUM = 0; // require at least this many words

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
        .replaceAll("é", "e")
        .replaceAll("ç", "c")
        .replaceAll("Ç", "C")
        .replaceAll("è", "e")
        .replaceAll("à", "a")
        .replaceAll("ê", "e")
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


let one = createPoemDiv(quoteContainers, "Quelles activités aimes-tu faire en vacances?");
appendQuote(one, "Ah oui, oui! Quelle bonne question! En général en vacances, j'aime joue sur mon portable, ce qui est assez amusant, selon moi. Aussi, j'adore visite la plage quand il fait chaud, car ça me passionne.");

let two = createPoemDiv(quoteContainers, "Tu préfères les vacances en Angleterre ou les vacances à l'étranger?");
appendQuote(two, "Hmm... Ça va sans dire que, je préfère les vacances en Angleterre, étant donne que le climat est meilleur, d'après moi. Quelquefois, il fait froid, mais je préfère quand il fait chaud, donc l'Angleterre est bien.");

let three = createPoemDiv(quoteContainers, "Où vas-tu passer les vacances l'année prochaine?");
appendQuote(three, "Ah! Je pense que l'année prochaine, j'ai l'intention de visiter Berlin en Allemange, parce que j'adore la nourriture à Berlin, d'après moi. Même s'il j'adore les repas en l'Angleterre, en plus.");

let four = createPoemDiv(quoteContainers, "Qu'est-ce que tu vas faire le weekend prochain dans ta ville ou ton village?");
appendQuote(four, "Oui! Sans doute, le weekend prochain, je vais aller au parc pour m'amuser, ce qui j'adore. Aussi, je vais aller au cinéma pour regarder Mission Impossible car c'est vrainment passionant, quant à moi.");

let five = createPoemDiv(quoteContainers, "Où es-tu allé en vacances l'année dernière?");
appendQuote(five, "Quelle bonne question! Franchement, l'été dernier, j'ai visité Paris, et j'ai raté le ferry, et j'ai déteste ça vu que c'était agaçant. Cependant, j'ai mangé des croissants, et ils étaient assez délicieux, à mon avis.");

let six = createPoemDiv(quoteContainers, "Qu'est-ce que tu as fait récemment, pour protéger l'environnement?");
appendQuote(six, "Hmm... Récemment, pour protéger l'envionnment, j'ai utilisé les transports en commun. Je pense que c'est important quant à moi, pour sauver la terre. De plus, je me douche au lieu d'prendre un bain, pour aider l'environnment.");

let seven = createPoemDiv(quoteContainers, "Qu'est-ce qu'il y a dans la région pour les touristes?");
appendQuote(seven, "Bien question! Dans ma région, il y a le château de Hagley, et des monuments historiques. J'aime le château de Hagley parce que c'est non seulment incroyable, mais aussi assez interessant. Aussi, pour les touristes, il y a beaucoup de cafés.");

let eight = createPoemDiv(quoteContainers, "Qu'est-ce que tu voudrais changer dans ta ville, ou ton village?");
appendQuote(eight, "Ah oui! Quant à moi, dans ma région, les transports en commun est vrainment nul parce que les jeunes, ils sont destructeurs, quelquefois, donc je veux des règles! Les jeunes m'ont énervé.");

let nine = createPoemDiv(quoteContainers, "Comment vas-tu au collège?");
appendQuote(nine, "Oui, oui! Bref, en ce moment, je vais au collége à pied avec mes amis, et c'est plutôt amusant, parce que j'adore ça à mon avis. Quelquefois, pour aller je vais au college en taxi, ce qui est rapide.");

let ten = createPoemDiv(quoteContainers, "Qu'est-ce que tu vas faire lel weekend prochain dans la région?");
appendQuote(ten, "Depuis deux ans chaque weekend, je suis allé au cinéma, mais le weekend prochain j'irai au parc avec mes copains, et ça me passionne assez, selon moi.");



function disperseContainers(parent, quoteContainers) {
    for(let i = 0; i < quoteContainers.length; i++) {
        parent.appendChild(quoteContainers[i]);
    }
}

disperseContainers(document.body, quoteContainers);

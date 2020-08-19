//Patrón módulo
const myModule= (() =>{ //función autoinvocada
    'use strict';

    let deck = [],
        suits= ['C', 'D', 'H', 'S'],
        specials= ['A', 'J', 'Q', 'K'],
        playersPoints= [];

    // HTML References
    const bTake = document.querySelector('#bTake'),
          bStop = document.querySelector('#bStop'),
          bNew  = document.querySelector('#bNew');

    const puntosHTML = document.querySelectorAll('small'),
          divCards   = document.querySelectorAll('.divCartas');

    const beginGame = (numPlayers=2) => {
        createDeck();
        for(let i = 0; i < numPlayers; i++){
            playersPoints.push(0);
        }
        console.log({playersPoints});
    } 

    const createDeck = () => //creates deck
    {
        deck=[];
        for(let i=2;i<11;i++){
            for(let suit of suits){
                deck.push(i + suit);
            }
        } 

        for(let suit of suits){
            for(let special of specials){
                deck.push(special + suit);
            }
        }

        deck=_.shuffle(deck);
    }

    const ask4Card = () => {

        if(deck.length<1){
            throw 'Error no cards bro';
        }
        return deck.pop();
    }

    const getValue = (card) => {
        const val= card.substring(0, card.length-1);

        return (isNaN(val)) ? 
            (val == 'A') ? '11' : 10
            : val *1;
    }

    const setPoints = (card, turn) => {
        playersPoints[turn]+= (getValue(card)*1);
        puntosHTML[turn].innerText= playersPoints[turn];
        // puntosHTML.forEach( elem => elem.innerText = 0);
        return playersPoints[turn];
    }

    const createCard = (card, turn) => {
        const imgCard= document.createElement('img');
        imgCard.src= `cartas/${card}.png`;
        imgCard.classList.add("carta");
        divCards[turn].append(imgCard);
    }

    // CPU's Turn
    const cpuTurn = (minPoints) => {
        let pointsC= 0;
        do{
            let card= ask4Card();
            pointsC = setPoints(card, playersPoints.length-1);
            createCard(card, playersPoints.length-1);
        }while(  (pointsC < minPoints)  && (minPoints <= 21 ) );

        setTimeout(()=> {
            result();
        }, 15);

    }

    const result = () => {

        const [pointsP, pointsC] = playersPoints;

        (pointsP>21) ? alert('CPU won bro') :
            (pointsC>21) ? alert('U won bro') :
                (pointsP==pointsC) ? alert('we tied bro') :
                    (pointsP>pointsC) ? alert('U won bro') :
                        alert('CPU won bro');
        bNew.disabled= false;
        bStop.disabled= true;
    }

    // Events

    bTake.addEventListener('click', () => {

        let card= ask4Card();
        
        const pointsP= setPoints(card,0);
        
        createCard(card, 0);

        if(pointsP > 21)
        {
            bTake.disabled= true;
            bStop.disabled= true;
            cpuTurn(pointsP);
        } else if(pointsP ===21){
            bTake.disabled= true;
            bStop.disabled= true;
            cpuTurn(pointsP);
        }
    });

    bStop.addEventListener('click', () => {
        bTake.disabled= true;
        bNew.disabled= true;
        cpuTurn(playersPoints[0]); // abstract

    });

    bNew.addEventListener('click', () => {
        window.location.reload(); // recarga la página
    });

    beginGame(2);

    return {
        //los objetos regresados aquí son públicos
    };

})();






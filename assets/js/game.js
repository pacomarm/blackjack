//Patrón módulo
(() =>{ //función autoinvocada
    'use strict';

    let deck = [];
    let suits= ['C', 'D', 'H', 'S']; 
    let specials= ['A', 'J', 'Q', 'K'];
    let pointsP= 0;
    let pointsC= 0;

    // HTML References
    const bTake = document.querySelector('#bTake');
    const bStop = document.querySelector('#bStop');
    const bNew = document.querySelector('#bNew');

    const puntosHTML = document.querySelectorAll('small');
    const divCardsP= document.querySelector('#jugador-cartas');
    const divCardsC= document.querySelector('#cpu-cartas');

    const createDeck = () => //creates deck
    {
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

        deck= _.shuffle(deck);
        return deck;
    }

    const ask4Card = () => {
        if(deck.length<1)
        {
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

    // CPU's Turn
    const cpuTurn = (minPoints) => {
        do{
            let card= ask4Card();
            pointsC+= (getValue(card)*1);
            puntosHTML[1].innerText= pointsC;
            const imgCard= document.createElement('img');
            imgCard.src= `cartas/${card}.png`;
            imgCard.classList.add("carta");
            divCardsC.append(imgCard);
        }while(  (pointsC < minPoints)  && (minPoints <= 21 ) );

        setTimeout(()=> {
            result();
        }, 15);

    }

    const result = () => {
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
        pointsP+= (getValue(card)*1);
        puntosHTML[0].innerText= pointsP;
        
        const imgCard= document.createElement('img');
        imgCard.src= `cartas/${card}.png`;
        imgCard.classList.add("carta");
        divCardsP.append(imgCard);

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
        cpuTurn(pointsP);

    });

    bNew.addEventListener('click', () => {
        window.location.reload(); // recarga la página
    });

    createDeck();


})();






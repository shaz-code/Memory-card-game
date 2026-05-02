

import { useState, useEffect } from "react";
export const useGameLogic = (cardValues) => {
  const [cards , setCards] = useState([])
  const [flippedcards, setFlippedCards]=useState([])
  const [matchedCards, setMatchedCards]=useState([])
  const [score ,setScore]= useState(0);
  const [moves, setMoves] = useState(0);
  const [isLocked,setIsLocked] = useState(false);

  const shuffleArray =(array) =>{
    const shuffled = [...array];
    for(let i = shuffled.length -1 ;i>0;i--){
      const j = Math.floor(Math.random ()*(i+1));
      [shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]]
    }
    return shuffled
  }

  const initializeGame =()=>{
    //here we gonna shuffle
    // console.log(cardValues)
    const shuffled = shuffleArray(cardValues)
    const finalCards =  shuffled.map((value,index)=>({
    
      id: index, value,
      isFlipped:false,
      isMatched:false,

    }))
    // console.log(finalCards)
    setCards(finalCards);
    setIsLocked(false)
    setMoves(0)
    setScore(0)
    setMatchedCards([])
    setFlippedCards([])
  }

  useEffect(()=>{
   initializeGame()
  },[])

const handleClick=(card)=>{
  //here dont allow clicking if card is already flipped ,matched
  if(card.isFlipped||card.isMatched || isLocked || flippedcards.length===2){
    return;

  }
  //update card flipped state
  const newCards =cards.map((c)=>{
    if(c.id=== card.id){
      return{...c,isFlipped:true};
    }else{
      return c;
    }
  })

  setCards(newCards)

  const newFlippedCards=[...flippedcards,card.id]
  setFlippedCards(newFlippedCards);

  //check for match if two cards are flipped

  if(flippedcards.length===1){
   setIsLocked(true); 
    const firstCard = cards[flippedcards[0]];

    if(firstCard.value===card.value){
      setTimeout(()=>{
      setMatchedCards((prev)=>[...prev,firstCard.id,card.id])
      setScore((prev)=>prev+1)
      // setCards((prev))
  //     const newMatchedCards =cards.map((c)=>{
  //   if(c.id=== card.id||c.id==firstCard.id){
  //     return{...c,isMatched:true};
  //   }else{
  //     return c;
  //   }
  // })
    setCards((prev)=>prev.map((c)=>{
    if(c.id=== card.id||c.id==firstCard.id){
      return{...c,isMatched:true};
    }else{
      return c;
    }
  }))
    // setCards(flippedBackCard)
    setIsLocked(false)
    setFlippedCards([])
},500);



    //  alert("matched") 
    }else{
      //flip back card1 and flip back card2

      setTimeout(()=>{
          const flippedBackCard =newCards.map((c)=>{
      if (newFlippedCards.includes(c.id) || c.id===card.id) {
        return {...c,isFlipped:false};
      }else{
        return c;
      }
      })
      setCards(flippedBackCard)

      setFlippedCards([])
      setIsLocked(false)

      },1000)
     
    }

    setMoves((prev)=> prev+1)
  }
}

 const isGameComplete = matchedCards.length===cardValues.length

    return{ cards,score,moves,isGameComplete,handleClick,initializeGame}
}
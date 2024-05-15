import React, { useState } from 'react'
import '../index.css'

const Infographs = ({infoData}) => {
    const [typingSpeed, setTypingSpeed] = useState(0);
    const [typingAccuracy, setTypingAccuracy] = useState(0);

    function getTypingData(){
        findTypingSpeed();
        findTypingAccuracy();
    
      }
      function findTypingSpeed(){
        const validWord = infoData.currentPara.slice(0, infoData.validIndex).split(" ").filter((word)=> word.length ===0 ? false: true);
        console.log(validWord);
        setTypingSpeed(validWord.length);
      }
    
      function findTypingAccuracy(){
        let accuracy = infoData.validIndex/infoData.inputDataLength*100
        setTypingAccuracy(accuracy>0? accuracy.toFixed(0): 0)
      }

  return (
    <div className="h-full absolute z-[3000] flex justify-center items-center gap-[7vw] infographics top-0 left-0 bg-white w-full">
            <div className="">
              <h2 className="text-center leading-none h-[18.5vw] w-[18.5vw] flex flex-col items-center justify-center border-[1vw] rounded-full border-[#138376]"><span className="text-[#2a9d8f] font-medium text-[5vw]">{typingSpeed}</span> <span className="font-bold text-[#10423c] text-[2vw]">WPM</span></h2>
            </div>
              <h2 className="text-center leading-none h-[18.5vw] w-[18.5vw] flex flex-col items-center justify-center border-[1vw] rounded-full border-[#178b7e]"><span className="text-[#2a9d8f] font-medium text-[5vw]">{typingAccuracy !== null ? typingAccuracy: 0}%</span> <span className="font-bold text-[#10423c] text-[2vw]">Accuracy</span></h2>
          </div>
  )
}

export default Infographs
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

const Home = ({ sendData }) => {
  gsap.registerPlugin(useGSAP, ScrollToPlugin);

  const [text, setText] = useState([
    {
      content: "In the heart",
    },
    {
      content:
        "High above the city skyline, the moon casts its gentle glow upon the bustling streets below. Stars twinkle in the velvet sky, like diamonds scattered across a vast canvas. The night air is crisp and cool, carrying with it the scent of distant flowers and freshly fallen rain.",
    },
    {
      content:
        "Deep within the enchanted forest, ancient trees stand sentinel, their gnarled roots intertwining like old friends. Moss blankets the forest floor, softening each step with its cushiony embrace. Sunlight filters through the dense canopy above, casting dappled patterns of light and shadow. Birds flit from branch to branch, their cheerful songs echoing through the woods. A gentle stream meanders its way through the heart of the forest, babbling softly as it goes. Wildflowers bloom in vibrant hues, painting the landscape with their beauty. Here, time moves at its own pace, in harmony with the rhythm of nature.",
    },
    {
      content:
        "On the windswept moors, where the sky meets the earth in an endless expanse of blue, lies a solitary cottage. Its thatched roof slopes gently downward, weathered by years of wind and rain. Smoke curls lazily from the chimney, carrying with it the comforting scent of burning wood. Inside, a fire crackles cheerfully in the hearth, casting a warm glow upon the rustic furnishings. The air is filled with the sound of laughter and conversation, as friends gather round to share stories and good cheer. Outside, the moors stretch away into the distance, wild and untamed, a reminder of the beauty and power of the natural world.",
    },
    {
      content:
        "In the heart of the desert, where the sun beats down relentlessly upon the arid landscape, lies an oasis of green. Palm trees sway gently in the breeze, their fronds rustling softly as if whispering secrets to the wind. Crystal clear water gushes forth from a natural spring, forming a shimmering pool that reflects the cloudless sky above. Birds flock to the oasis, their vibrant plumage a stark contrast to the muted tones of the desert. In the shade of the palms, travelers find respite from the scorching heat, pausing to rest and replenish their strength before continuing on their journey.",
    },
  ]);

  let textDetail = useRef([]);

  const [random, setRandom] = useState(null);
  const [validIndex, setValidIndex] = useState(0);
  const [invalidCharPos, setInvalidCharPos] = useState(null);
  const [count, setCount] = useState(10);
  const [isFocus, setIsFocus] = useState(false);
  const textBoxDetail = useRef(null);
  const inputDetail = useRef(null);
  const [intervalId, setIntervalId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [blinkCursor, setBlinkCursor] = useState(true);
  const [typingSpeed, setTypingSpeed] = useState(0);
  const [typingAccuracy, setTypingAccuracy] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  function getTypingData() {
    inputDetail.current.blur();
    findTypingSpeed();
    findTypingAccuracy();
    setShowInfo(true);
  }

  function findTypingSpeed() {
    const validWord = text[random].content
      .slice(0, validIndex)
      .split(" ")
      .filter((word) => (word.length === 0 ? false : true));
    setTypingSpeed(validWord.length);
  }

  function findTypingAccuracy() {
    let accuracy = (validIndex / inputValue.length) * 100;
    
    if(accuracy>100){
      setTypingAccuracy(100);
    }
    else if(accuracy < 0){
      setTypingAccuracy(0);
    }
    else{
      setTypingAccuracy(accuracy > 0 ? accuracy.toFixed(0) : 0);
    }
  }

  const startInterval = () => {
    const timeCount = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 0) {
          return 0;
        } else {
          // console.log(inputDetail.current.blur)
          return prevCount - 1;
        }
      });
    }, 1000);

    setIntervalId(timeCount);
  };

  const stopInterval = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  function handleInput(e, textLength) {
    !intervalId && startInterval();
    
    if(count===0){
      setIsFocus(false);
    }

    if (
      e.target.value[textLength - 1] ===
      textDetail.current[validIndex].textContent
    ) {
      validIndex < textDetail.current.length &&
        setValidIndex((previous) => previous + 1);
      textDetail.current[validIndex].classList.add(
        validIndex === invalidCharPos ? "text-[#000]" : "text-[#2a9d8f]"
      );
      textDetail.current[validIndex].classList.remove("bg-[#e63946]");

      gsap.to(".cursor", {
        top:
          validIndex !== textDetail.current.length - 1
            ? textDetail.current[validIndex + 1].offsetTop
            : textDetail.current[validIndex].offsetTop,
        left:
          validIndex !== textDetail.current.length - 1
            ? textDetail.current[validIndex + 1].offsetLeft
            : textDetail.current[validIndex].offsetLeft +
              textDetail.current[validIndex].offsetWidth,
        duration: 0.2,
      })
      
      if(validIndex === textDetail.current.length-1){
        stopInterval();
        setIsFocus(false);
        inputDetail.current.value = '';
        setValidIndex(0);
        getTypingData();
      }
      ;
    } else {
      gsap.to(".errorCursor", {
        opacity: 1,
        top: textDetail.current[validIndex].offsetTop,
        left: textDetail.current[validIndex].offsetLeft,
        height: textDetail.current[validIndex].offsetHeight,
        width: textDetail.current[validIndex].offsetWidth,
        duration: 0.2,
      });

      setInvalidCharPos(() => validIndex);
      textDetail.current[validIndex].classList.add("text-black");
    }
  }

  function handleScroll() {
    const currentIndex = validIndex;
    const nextIndex = validIndex + 1;

    if (currentIndex < textDetail.current.length - 1) {
      const currentOffsetTop = textDetail.current[currentIndex].offsetTop;
      const nextOffsetTop = textDetail.current[nextIndex].offsetTop;

      gsap.fromTo(
        ".animeTextBox",
        {
          scrollTo: currentOffsetTop,
        },
        {
          scrollTo: nextOffsetTop,
          duration: 0.2,
          ease: "cubic-bezier(0.65, 0, 0.35, 1)",
        }
      );
    }
  }

  function handleInputFocus() {

    inputDetail.current.focus();
    setIsFocus(true);

    if (count <= 0) {
      setIsFocus(false);
      inputDetail.current.blur();
    }
  }


  useEffect(() => {
    random === null && setRandom(Math.floor(Math.random() * text.length));

    const timeoutId = setTimeout(() => {
      if (!isTyping && inputValue !== "") {
        setBlinkCursor(true);
        gsap.to(".cursor", {
          width: "0.1rem",
          duration: 0.1,
          ease: "cubic-bezier(0.65, 0, 0.35, 1)",
        });
      }
    }, 800);

    // count === 0 && getTypingData();

    return () => {
      clearTimeout(timeoutId);
      setIsTyping(false);
      gsap.to(".cursor", {
        width: "0.14rem",
        duration: 0.1,
        ease: "cubic-bezier(0.65, 0, 0.35, 1)",
      });
      count === 0 && getTypingData();
    };
  }, [count, textDetail.current, inputValue, isTyping, random]);
  return (
    <div className="">
      <div className="w-full flex items-center justify-center flex-col gap-3">
        <h1 className="font-bold text-5xl text-[#0a335c]">Typr</h1>
        <h3 className="text-xl text-[#0a335cac]">
          Give yourself{" "}
          <span className="text-[#0a335ce4] font-medium underline underline-offset-4">
            1 min
          </span>{" "}
          to test and clarify your typing speed with{" "}
          <span className="text-[#0a335ce4] font-medium underline underline-offset-4">
            English layout
          </span>
        </h3>
      </div>
      <div className="relative max-w-[1000px] bg-white w-full mt-7 py-7 px-4 flex flex-col justify-center items-center rounded-md">
        <div className="absolute top-0 left-0 h-[50vh] my-7 px-4 w-full ">
          
          <div className={`h-full ${showInfo ? 'flex': 'hidden'} flex-col md:flex-row absolute z-[3000] justify-center items-center gap-[2vh] md:gap-[7vw] infographics top-0 left-0 bg-white w-full`}>
            <div className="">
              <h2 className="text-center leading-none h-[25.5vw] w-[25.5vw] md:h-[18.5vw] md:w-[18.5vw] lg:h-[13.5rem] lg:w-[13.5rem] flex flex-col items-center justify-center border-[0.35rem] md:border-[0.5rem] rounded-full border-[#138376]">
                <span className="text-[#2a9d8f] font-medium text-[7vw] md:text-[5vw] lg:text-[3.6rem]">
                  {typingSpeed}
                </span>{" "}
                <span className="font-bold text-[#10423c] text-[2.5vw] md:text-[2vw] lg:text-[1.8rem]">WPM</span>
              </h2>
            </div>
            <h2 className="text-center leading-none h-[25.5vw] w-[25.5vw] md:h-[18.5vw] md:w-[18.5vw] lg:h-[13.5rem] lg:w-[13.5rem] flex flex-col items-center justify-center border-[0.35rem] md:border-[0.5rem] rounded-full border-[#178b7e]">
              <span className="text-[#2a9d8f] text-[7vw] font-medium md:text-[5vw] lg:text-[3.6rem]">
                {typingAccuracy !== null ? typingAccuracy : 0}%
              </span>
              <span className="font-bold text-[#10423c] text-[2.5vw] md:text-[2vw] lg:text-[1.8rem]">
                Accuracy
              </span>
            </h2>
          </div>

          <div
            className={`${
              isFocus === true ? "scale-0" : "scale-100"
            }  flex items-center justify-center w-full h-full backdrop-blur z-[100] absolute top-0 left-0`}
          >
            <button
              onClick={handleInputFocus}
              className="flex items-center justify-center gap-2 border-[1px] rounded-lg px-3 py-2 border-[#1d6d64]"
            >
              <span className="bg-[#2a9d8f] rounded-full h-[6vw] w-[6vw] p-5 md:p-4 md:h-[0.5vw] md:w-[0.5vw] flex justify-center items-center">
                <i className="ri-history-line text-white text-2xl md:text-xl"></i>
              </span>
              <p className="text-[#0a335cac] font-semibold text-xl md:text-lg">Start</p>
            </button>
          </div>
        </div>
        <div
          ref={textBoxDetail}
          className="animeTextBox relative overflow-hidden h-[50vh] w-full"
        >
          <div className="errorCursor absolute z-10 top-0 left-0 opacity-0 h-5 w-5 rounded-full bg-[#e63946]"></div>

          <div
            style={{
              top: `${
                textDetail.current.length>0 && textDetail.current[0].offsetTop
              }px`,
            }}
            className={`${
              isFocus ? "opacity-100" : "opacity-0"
            } absolute  cursor ${blinkCursor ? "blink" : ""} ${
              inputValue.length === 0 && "ml-4"
            } h-[35px] md:h-[35px] w-[0.14rem] z-30 bg-black`}
          ></div>

          <p className="tracking-[0.15rem] text-zinc-800 leading-9 px-4">
            {random !== null &&
              text[random].content.split("").map((element, index) => {
                return (
                  <span
                    className="relative font-medium text-3xl z-30"
                    ref={(el) =>
                      textDetail.current.length < text[random].content.length &&
                      textDetail.current.push(el)
                    }
                    key={index}
                  >
                    {element}
                  </span>
                );
              })}
          </p>

          <input
            className="opacity-[0] absolute top-0 left-0"
            onChange={(e) => {
              e.preventDefault();
              textDetail.current !== null && validIndex < textDetail.current.length && 
               handleInput(e, e.target.value.length);
              validIndex <= textDetail.current.length && handleScroll(e);
              setInputValue(e.target.value);
              setIsTyping(true);
              setBlinkCursor(false);
            }}
            ref={inputDetail}
            autoFocus={true}
            onFocus={() => {
              setIsFocus(true);
            }}
            onBlur={() => {
              setIsFocus(false);
              count >= 0 && stopInterval();
            }}
            type="text"
            name="userInput"
            id="userInput"
            autoCapitalize="false"
            autoComplete="off"
            autoCorrect="false"
          />
        </div>

        <div className="flex gap-9">
          <button
            onClick={() => {
              window.location.reload();
            }}
            className="flex gap-2 items-center justify-center rounded-lg px-3 py-2"
          >
            <span className="bg-[#e63946] rounded-full p-5 md:p-4 h-[1.7rem] w-[1.7rem] flex justify-center items-center">
              <i className="ri-history-line text-white text-2xl md:text-xl"></i>
            </span>
            <p className="text-[#0a335cac] font-semibold text-xl md:text-lg">
              {count === 60 ? 1 : 0}:
              {count === 60 ? "00" : `${count < 10 ? "0" : ""}${count}`}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

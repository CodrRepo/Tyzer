import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import CustomEase from "gsap/CustomEase";

const Home = ({ sendData }) => {
  gsap.registerPlugin(useGSAP, ScrollToPlugin, CustomEase);

  const [text, setText] = useState([
    {
      content:
        "The quick brown Fox jumps over the lazy Dog near the riverbank. As sunlight filters through the trees, the serene landscape becomes a picturesque scene. Birds chirp melodiously, adding to the tranquility of the morning. Meanwhile, in a nearby Cottage, the aroma of freshly brewed Coffee fills the air. A writer sits by the window, penning stories inspired by the beauty of Nature. Outside, a gentle Breeze rustles the leaves, creating a soothing symphony. Every detail of this peaceful moment reminds us to appreciate the simple pleasures in life. Enjoy & cherish each day, 365 days a year, 24/7! Remember: Love, Laugh, & Live!",
    },
    {
      content:
        'A sleek black Cat prowls silently along the fence, its eyes glinting in the moonlight. The sound of distant Thunder rumbles through the night, promising rain. Thunderstorms are most common in tropical regions. Inside a cozy Library, the clock strikes midnight, and a Reader turns the pages of an ancient book. The oldest known book is the "Epic of Gilgamesh," dating back to 2100 BC. The scent of old paper mingles with the fragrance of blooming Jasmine outside. Embrace the mysteries of life, where every second counts. Explore, Dream, & Discover! Life is full of adventures waiting to unfold, 24 hours a day.',
    },
    {
      content:
        'In a quiet Mountain cabin, a family gathers around a roaring Fireplace. Snow falls gently outside, blanketing the world in white. Snowflakes are unique, with no two being exactly alike. The scent of pine mingles with the aroma of hot Chocolate, which was first introduced to Europe by the Spanish in the 16th century. Children play board games while the adults share stories and laughter. The first board game, "Senet," originated in ancient Egypt. The warmth of the fire and the joy of togetherness make this moment special. Love & be loved, always. Enjoy every precious second, winter or summer, rain or shine.',
    },
    {
      content:
        "The International Space Station (ISS) orbits Earth approximately 16 times a day, providing a unique vantage point of our planet. Astronauts aboard the ISS conduct various scientific experiments in microgravity. The ISS travels at a speed of about 28,000 kilometers per hour (17,500 miles per hour). Communication with Earth is maintained through a network of satellites. Life in space requires careful management of resources like water and air. Enjoy & cherish each achievement in space exploration, as they pave the way for future discoveries. The sky is not the limit; it's just the beginning. Remember: Innovate, Inspire, & Explore!",
    },
    {
      content:
        "The Great Wall of China, stretching over 13,000 miles, is one of the most iconic structures built by human hands. Construction of the wall began as early as the 7th century BC, primarily to protect against invasions. It consists of walls, watchtowers, and fortresses made from a variety of materials, including stone, brick, and tamped earth. The Great Wall is a UNESCO World Heritage site and attracts millions of visitors each year. It stands as a testament to human ingenuity and perseverance. Visit & respect historical monuments, as they tell the stories of our past. Protect & preserve for future generations.",
    },
    {
      content:
        "The Amazon Rainforest, often referred to as the \"lungs of the Earth,\" produces around 20% of the world's oxygen. Spanning over 5.5 million square kilometers (2.1 million square miles), it is the largest tropical rainforest on the planet. The Amazon is home to an estimated 390 billion individual trees, comprising around 16,000 different species. It plays a crucial role in regulating the Earth's climate. However, deforestation poses a significant threat to this vital ecosystem. Appreciate & protect the natural wonders of our world, as they are irreplaceable. Conserve, educate, & act to ensure a sustainable future for all.",
    },
    {
      content:
        "The Mariana Trench, located in the western Pacific Ocean, is the deepest part of the world's oceans. The trench's maximum known depth is approximately 36,070 feet (10,994 meters) at the Challenger Deep. This remote underwater canyon is home to unique and often bizarre life forms that have adapted to extreme pressures and darkness. In 1960, the bathyscaphe Trieste reached the bottom of the trench, piloted by Jacques Piccard and Don Walsh. The exploration of such depths helps us understand more about our planet's geology and marine biology. Dive into the unknown & seek knowledge, for the ocean holds many secrets.",
    },
  ]);

  let textDetail = useRef([]);
  const timeOptionsDetail = useRef([])

  const [random, setRandom] = useState(null);
  const [validIndex, setValidIndex] = useState(0);
  const [invalidCharPos, setInvalidCharPos] = useState(null);
  const [count, setCount] = useState(null);
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
  const [isReload, setIsReload] = useState(true);
  const [timeIndex, setTimeIndex] = useState(1);

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
    setTypingSpeed((validWord.length)/(timeOptionsDetail.current[timeIndex].textContent.split(" ")[0]/60));
  }

  function findTypingAccuracy() {
    let accuracy = (validIndex / inputValue.length) * 100;

    if (accuracy > 100) {
      setTypingAccuracy(100);
    } else if (accuracy < 0) {
      setTypingAccuracy(0);
    } else {
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

  const setCursorPosition = () => {
    gsap.to(".cursor", {
      top:
        validIndex !== textDetail.current.length - 1
          ? `${textDetail.current[validIndex].offsetTop}px`
          : textDetail.current[validIndex].offsetTop,
      left:
        validIndex !== textDetail.current.length - 1
          ? textDetail.current[validIndex].offsetLeft
          : textDetail.current[validIndex].offsetLeft +
            textDetail.current[validIndex].offsetWidth,
      duration: 0.2,
    });
  };

  function handleInput(e, textLength) {
    !intervalId && startInterval();
    if (count === 0) {
      setIsFocus(false);
    }

    if (
      e.target.value[textLength - 1] ===
      textDetail.current[validIndex].textContent
    ) {
      validIndex < textDetail.current.length &&
        setValidIndex((previous) => previous + 1);

      gsap.to(textDetail.current[validIndex], {
        onStart: () => {
          gsap.to(textDetail.current[validIndex], {
            backgroundColor: "",
          });
        },
        color: "#70e000",
        duration: 0.01,
      });

      setCursorPosition();

      if (validIndex === textDetail.current.length - 1) {
        stopInterval();
        setIsFocus(false);
        setValidIndex(0);
        getTypingData();
      }
    } else {
      setInvalidCharPos(() => validIndex);
      gsap.to(textDetail.current[validIndex], {
        backgroundColor: "#ff3c38",
        duration: 0.01,

        onComplete: () => {
          gsap.to(textDetail.current[validIndex], {
            backgroundColor: "",
            delay: 0.4,
            duration: 0.1,
          });
        },
      });
      textDetail.current[validIndex].classList.add("rounded-lg");
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
          duration: 0.25,
          ease: CustomEase.create("scrollSlide", "0.65, 0, 0.35, 1"),
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

  function moveFollwer(leftValue, itemWidth) {
    gsap.to(".follower", {
      x: leftValue,
      duration: 0.5,
      width: itemWidth,
      ease: CustomEase.create("sliding", "0.16, 1, 0.3, 1"),
    });
  }

  const reset = () => {
    setRandom(Math.floor(Math.random() * text.length));
    setValidIndex(0);
    setInvalidCharPos(null);
    setCount(JSON.parse(localStorage.getItem("tyzerTimeValue")));
    setIsFocus(false);
    setIsTyping(false);
    setInputValue("");
    setTypingSpeed(0);
    setTypingAccuracy(0);
    setShowInfo(false);
    stopInterval();
    textBoxDetail.current.scrollTo(0, 0);
    inputDetail.current.value = "";
    inputDetail.current.focus();
    textDetail.current.map((element) => (element.style.color = "black"));
  };

  function sendDataLocalStorage(e, index){
    localStorage.setItem(
      "tyzerTimeValue",
      JSON.stringify(e.target.textContent.split(" ")[0]),
    );

    localStorage.setItem(
      "tyzerTimeIndexValue",
      JSON.stringify(index),
    );
  }

  useEffect(() => {
    random === null && setRandom(Math.floor(Math.random() * text.length));
    textDetail.current.length > 0 && setCursorPosition();
    let timeValue = JSON.parse(localStorage.getItem("tyzerTimeValue"));
    let timeIndexValue = JSON.parse(localStorage.getItem("tyzerTimeIndexValue"));
    // console.log(timeValue);
    // console.log(timeOptionsDetail.current[1].offsetLeft);
    count === null && (timeValue === null ? setCount(60): setCount(timeValue));
    count === null && (timeValue === null ? setTimeIndex(1): setTimeIndex(timeIndexValue));
    
    timeOptionsDetail.current.length>0 && moveFollwer(timeOptionsDetail.current[timeIndexValue].offsetLeft, timeOptionsDetail.current[timeIndexValue].offsetWidth);

    const timeoutId = setTimeout(() => {
      if (!isTyping && inputValue !== "") {
        setBlinkCursor(true);
      }
    }, 800);
    setIsTyping(false);

    count === 0 && getTypingData();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [count,timeIndex, textDetail.current,timeOptionsDetail, inputValue, isTyping, random]);

  return (
    <div className="">
      <div className="w-full flex items-center justify-center flex-col gap-3">
        <h1 className="font-bold text-5xl text-[#0a335c]">Tyzer</h1>
        <h3 className="text-xl text-[#0a335cac]">
          Give yourself {" "}
          <span className="text-[#0a335ce4] font-medium underline underline-offset-4">
            1 min
          </span>
          {" "} to test and clarify your typing speed with {" "}
          <span className="text-[#0a335ce4] font-medium underline underline-offset-4">
            English layout
          </span>
        </h3>
      </div>
      <div className="relative max-w-[1000px] bg-white w-full mt-7 py-7 px-4 flex flex-col justify-center items-center rounded-md">
        <div className="absolute top-0 left-0 h-[50vh] my-7 px-4 w-full ">
          <div
            className={`h-full ${
              showInfo ? "flex" : "hidden"
            } flex-col md:flex-row absolute z-[3000] justify-center items-center gap-[2vh] md:gap-[7vw] infographics top-0 left-0 bg-white w-full`}
          >
            <div className="">
              <h2 className="text-center leading-none h-[25.5vw] w-[25.5vw] md:h-[18.5vw] md:w-[18.5vw] lg:h-[13.5rem] lg:w-[13.5rem] flex flex-col items-center justify-center border-[0.35rem] md:border-[0.5rem] rounded-full border-[#138376]">
                <span className="text-[#2a9d8f] font-medium text-[7vw] md:text-[5vw] lg:text-[3.6rem]">
                  {typingSpeed}
                </span>{" "}
                <span className="font-bold text-[#10423c] text-[2.5vw] md:text-[2vw] lg:text-[1.8rem]">
                  WPM
                </span>
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
              <p className="text-[#0a335cac] font-semibold text-xl md:text-lg">
                Start
              </p>
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
                textDetail.current.length > 0 && textDetail.current[0].offsetTop
              }px`,
            }}
            className={`${
              isFocus ? "opacity-100" : "opacity-0"
            } absolute z-[50] cursor ${blinkCursor ? "blink" : ""} h-[40px] ${
              blinkCursor ? "w-[0.1rem]" : "w-[0.14rem]"
            } z-30 bg-black`}
          ></div>

          <p className="testPara tracking-[0.15rem] text-black leading-9 px-4">
            {random !== null &&
              text[random].content.split("").map((element, index) => {
                return (
                  <span
                    className="relative font-medium text-4xl z-30"
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
              textDetail.current !== null &&
                validIndex < textDetail.current.length &&
                handleInput(e, e.target.value.length);
              validIndex <= textDetail.current.length && handleScroll(e);
              setInputValue(e.target.value);
              setIsTyping(true);
              setBlinkCursor(false);
            }}
            ref={inputDetail}
            onKeyDown={(e) => {
              setIsTyping(true);
              if (e.key === "Backspace" || e.code === 8) {
                e.preventDefault();
              }
            }}
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

        <div className="flex items-center gap-9 mt-3">
          <button
            onClick={() => {
              reset();
            }}
            className="flex gap-2 items-center justify-center rounded-lg px-3 py-2"
          >
            <span className="bg-[#e63946] rounded-full p-5 md:p-4 h-[1.7rem] w-[1.7rem] flex justify-center items-center">
              <i className="ri-history-line text-white text-2xl md:text-xl"></i>
            </span>
            <p className="text-[#0a335cac] font-semibold text-xl md:text-lg">
              {Math.floor(count/60)}:
              {Math.floor((count / 60 - Math.floor(count / 60)) * 60) === 0
                ? "00"
                : `${
                    Math.floor((count / 60 - Math.floor(count / 60)) * 60) < 10
                      ? "0"
                      : ""
                  }${((count / 60 - Math.floor(count / 60)) * 60).toFixed(0)}`}
            </p>
          </button>
          <div className="timeOptions z-40 flex gap-2 relative">
            <div
             className={`follower z-20 bg-[#ffa200] rounded-lg h-full w-[50px] absolute top-0 left-0`}></div>
            <h4 className="font-semibold z-40 text-xl md:text-lg">
              Set{" "}
              <i className="ri-timer-flash-fill text-[#ffa200] font-normal"></i>
              :
            </h4>
            <ul className="flex items-center z-40 font-semibold">
              {["30 sec", "60 sec", "120 sec"].map((element, index) => (
                <li
                  className={`cursor-default px-3 py-1`}
                  ref={(el)=> timeOptionsDetail.current.length<3 && timeOptionsDetail.current.push(el)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCount(e.target.textContent.split(" ")[0]);
                    console.log(e.target.textContent.split(" ")[0]);
                    setTimeIndex(index);
                    // moveFollwer(e.target.offsetLeft, e.target.offsetWidth);
                    sendDataLocalStorage(e, index),
                    reset();
                    inputDetail.current.focus();
                    console.log(timeOptionsDetail)
                  }}
                  key={index}
                >
                  <span className={`${timeIndex === index ? 'text-[black]': 'text-[#0a335cac]'}`}>{element}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

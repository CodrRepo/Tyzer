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
  const timeOptionsDetail = useRef([]);

  const [random, setRandom] = useState(null);
  const [validIndex, setValidIndex] = useState(0);
  const [showStartBtn, setShowStartBtn] = useState(false);
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
    setTypingSpeed(
      validWord.length /
        (timeOptionsDetail.current[timeIndex].textContent.split(" ")[0] / 60)
    );
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
        validIndex < textDetail.current.length &&
        `${textDetail.current[validIndex].offsetTop}px`,
      left:
        validIndex < textDetail.current.length &&
        textDetail.current[validIndex].offsetLeft,
      duration: 0.2,
    });
  };

  function handleInput(e, textLength) {
    !intervalId && startInterval();
    if (count === 0) {
      setIsFocus(false);
    }

    gsap.to('.cursor', {
      width: '0.1rem'
    })

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
      x: `${leftValue}px`,
      duration: 0.5,
      width: `${itemWidth}px`,
      ease: CustomEase.create("sliding", "0.16, 1, 0.3, 1"),
    });
  }

  const reset = () => {
    setRandom(Math.floor(Math.random() * text.length));
    setValidIndex(0);
    setCount(JSON.parse(localStorage.getItem("tyzerTimeValue")));
    setIsFocus(false);
    setIsTyping(false);
    setInputValue("");
    setTypingSpeed(0);
    setTypingAccuracy(0);
    setShowInfo(false);
    stopInterval();
    setShowStartBtn(false);
    textBoxDetail.current.scrollTo(0, 0);
    inputDetail.current.value = "";
    inputDetail.current.focus();
    textDetail.current.map((element) => (element.style.color = "black"));
  };

  function sendDataLocalStorage(e, index) {
    localStorage.setItem(
      "tyzerTimeValue",
      JSON.stringify(e.target.textContent.split(" ")[0])
    );

    localStorage.setItem("tyzerTimeIndexValue", JSON.stringify([e.target.offsetLeft, e.target.offsetWidth]));
  }

  useEffect(() => {
    random === null && setRandom(Math.floor(Math.random() * text.length));
    textDetail.current.length > 0 && setCursorPosition();
    let timeValue = JSON.parse(localStorage.getItem("tyzerTimeValue"));
    let timeIndexValue = JSON.parse(
      localStorage.getItem("tyzerTimeIndexValue")
    );

    count === null && (timeValue === null ? setCount(60) : setCount(timeValue));
    count === null &&
    (timeValue === null ? setTimeIndex(1) : setTimeIndex(timeIndexValue));
    
    count===null && timeOptionsDetail.current.length>0 &&
      (timeIndexValue !== null ? moveFollwer(
        timeIndexValue[0],
        timeIndexValue[1]
      ): moveFollwer(
        timeOptionsDetail.current[timeIndex].offsetLeft+10,
        timeOptionsDetail.current[timeIndex].offsetWidth+8
      )
    )

    
    const timeoutId = setTimeout(() => {
      if (inputValue !== "") {
        setBlinkCursor(true);
        gsap.to('.cursor', {
          width: '0.16rem',
          duration: 0.65,
        })
      }
    }, 650);
    
    count === 0 && getTypingData();
    count === 0
      ? gsap.to(".timer", {
          color: "#00B42A",
          fontWeight: "600",
          duration: 0.3,
        })
      : gsap.to(".timer", {
          color: "#ff3c38",
          fontWeight: "600",
          duration: 0.3,
        });

        document.addEventListener('click', ()=>{setShowStartBtn(true)});

    return () => {
      document.removeEventListener('click', ()=>{setShowStartBtn(true)});
      clearTimeout(timeoutId);
    };
  }, [
    count,
    timeIndex,
    textDetail.current,
    timeOptionsDetail.current,
    inputValue,
    isTyping,
    random,
  ]);

  return (
    <div className="">
      <div className="w-full flex items-center justify-center flex-col gap-3">
        <h1 className="font-bold text-5xl text-[#0a335c]">Tyzer</h1>
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
          <div
            className={`h-full ${
              showInfo ? "flex" : "hidden"
            } flex-col md:flex-row absolute z-[3000] justify-center items-center gap-[2vh] md:gap-[7vw] infographics top-0 left-0 bg-white w-full`}
          >
            <div className="flex justify-between w-[50%]">
              {[
                { typingSpeed: typingSpeed, typingCategory: "WPM", icon: "flashlight", color: "text-[#ffa200]" },
                { typingSpeed: typingAccuracy, typingCategory: "Accuracy", icon: "focus-2", color: "text-[#00B42A]" },
              ].map((element, index) => {
                return (
                  <div key={index} className=" flex items-center">
                    <i className={`ri-${element.icon}-fill text-[19vh] ${element.color}`}></i>
                    <h2 className="text-center leading-none flex flex-col">
                      <span className="text-[#000] font-medium text-[7vw] md:text-[5vw] lg:text-[3.6rem]">
                        {element.typingSpeed}
                      </span>{" "}
                      <span className="font-bold text-[#cfcfcf] text-[2.5vw] md:text-[1.5vw] lg:text-[1.3rem]">
                        {element.typingCategory}
                      </span>
                    </h2>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className={`${
              isFocus === true ? "scale-0" : "scale-100"
            }  flex items-center justify-center w-full h-full backdrop-blur z-[100] absolute top-0 left-0`}
          >
            <button
              onClick={handleInputFocus}
              className={`flex items-center bg-[#ffa200] ${showStartBtn? 'block': 'hidden'} justify-center gap-2 rounded-lg px-3 py-2 `}
            >
              <span className="">
                <i className="ri-history-line font-bold  text-2xl md:text-xl"></i>
              </span>
              <p className="text-[#000000] font-semibold text-xl md:text-lg">
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
              width: '0.1rem'
            }}

            className={`${
              isFocus ? "opacity-100" : "opacity-0"
            } absolute z-[50] cursor ${blinkCursor ? "blink" : ""} h-[40px]  z-30 bg-black`}
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

        <div className="flex items-center gap-9 mt-5">
          <button
            onClick={() => {
              reset();
            }}
            className="flex items-center justify-center rounded-lg"
          >
            <span className="">
              <i className="ri-history-line timer font-semibold text-2xl md:text-2xl"></i>
            </span>
            <p className="text-[#0a335cac] text-left font-semibold text-xl md:text-lg">
              <span className="inline-block w-[1.3rem] text-right">
                {Math.floor(count / 60)}:
              </span>
              <span className="inline-block w-[2rem] pl-[0.1rem]">
                {Math.floor((count / 60 - Math.floor(count / 60)) * 60) === 0
                  ? "00"
                  : `${
                      Math.floor((count / 60 - Math.floor(count / 60)) * 60) <
                      10
                        ? "0"
                        : ""
                    }${((count / 60 - Math.floor(count / 60)) * 60).toFixed(
                      0
                    )}`}
              </span>
            </p>
          </button>
          <div className="timeOptions z-40 flex gap-2 relative">
            <div
              className={`follower z-20 bg-[#ffa200] rounded-lg h-full absolute top-0 left-0`}
            ></div>
            <h4 className="font-semibold z-40 text-xl md:text-lg">
              Set{" "}
              <i className="ri-timer-flash-fill text-[#ffa200] font-normal"></i>
              :
            </h4>
            <ul className="flex items-center z-40 font-semibold">
              {["30 sec", "60 sec", "120 sec"].map((element, index) => (
                <li
                  className={`cursor-default`}
                  ref={(el) =>
                    timeOptionsDetail.current.length < 3 &&
                    timeOptionsDetail.current.push(el)
                  }
                  onClick={(e) => {
                    setCount(e.target.textContent.split(" ")[0]);
                    setTimeIndex(index);
                    sendDataLocalStorage(e);
                    reset();
                    moveFollwer(e.target.offsetLeft, e.target.offsetWidth);
                    inputDetail.current.focus();
                    setShowStartBtn(false);
                  }}
                  key={index}
                >
                  <span
                    className={`${
                      timeIndex === index ? "text-[black]" : "text-[#0a335cac]"
                    } px-2 py-1`}
                  >
                    {element}
                  </span>
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

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
        "Honey is a natural marvel that never spoils. Archaeologists have found honey in ancient Egyptian tombs over 3,000 years old, and it's still perfectly edible. This durability comes from honey\'s low moisture content and acidic pH, which prevent bacteria and microorganisms from thriving. Bananas, surprisingly, are classified as berries, while strawberries are not. Botanically, a berry is a fruit that develops from the ovary of a single flower and contains seeds embedded in its flesh. Another fascinating fact is that the Eiffel Tower can grow by about 15 cm during the summer due to thermal expansion. The iron structure expands when heated, making the tower taller in hot weather. Octopuses are incredible creatures with three hearts: two pump blood to the gills, and one pumps it to the rest of the body. Their blood is blue because it contains hemocyanin, a copper-based molecule that helps transport oxygen. Cats, commonly known for causing allergies in humans, can also suffer from allergies to humans. Some cats are allergic to human dander, pollen, or perfumes. These diverse and intriguing facts highlight the wonders of the natural and man-made world, showcasing how much there is to learn about even the most familiar things.",
    },
    {
      content:
        'The sun is a big star at the center of our solar system. It gives us light and heat, which are essential for life on Earth. The sun is made up of hot gases and is very bright. Every day, it rises in the east and sets in the west. This daily movement helps us have day and night. The sun is very far from Earth, about 93 million miles away. Even though it is so far, its light reaches us in just eight minutes. Plants need sunlight to grow, and they use it to make food through a process called photosynthesis. The sun also helps to keep the weather warm and makes it possible for us to have seasons. Without the sun, Earth would be dark and cold. People have always looked up at the sun and wondered about it. We should never look directly at the sun because it can hurt our eyes. Instead, we can learn about it using safe tools like telescopes with special filters. The sun is a vital part of our lives, providing energy and making Earth a perfect place to live.',
    },
    {
      content:
        'In recent news, climate change continues to be a major issue worldwide. Many countries are experiencing extreme weather events, such as intense heatwaves, wildfires, and heavy storms. Scientists say that these events are becoming more common because of global warming. Governments and organizations are working hard to find solutions to this problem. One way to help is by using renewable energy sources like wind and solar power. These sources do not produce harmful emissions and can help reduce our carbon footprint. Another important step is protecting forests, which absorb carbon dioxide from the air. Many people are also making changes in their daily lives, like using less plastic, recycling more, and conserving water. In another recent event, a new technology was developed to help people with diabetes. This device can monitor blood sugar levels and deliver insulin automatically. It makes managing diabetes easier and improves the quality of life for many people. These news stories highlight the importance of taking care of our planet and using technology to solve problems and improve lives.',
    },
    {
      content:
        "In the realm of human anatomy, did you know that your stomach gets a new lining every few days? The harsh acidic environment in the stomach, which is essential for digesting food, also means that the stomach lining is continuously being eroded and thus needs to regenerate frequently. Moving on to technology, the first computer virus was created in 1983 and was called the \"Elk Cloner.\" It spread via floppy disks and displayed a short poem on infected Apple II computers. Another remarkable technological feat is the Voyager 1 spacecraft, which has been traveling through space since its launch in 1977. It is now over 14 billion miles from Earth, making it the most distant human-made object in space. Voyager 1 carries the Golden Record, a time capsule with sounds and images intended to portray the diversity of life and culture on Earth. Back on Earth, the world\'s oldest known living tree is a bristlecone pine in California\'s White Mountains, estimated to be over 5,000 years old. Named Methuselah, this tree has survived millennia of changing climates and environments. These facts highlight the astonishing advancements in technology and the resilience of nature.",
    },
    {
      content:
        "The animal kingdom never ceases to amaze, particularly with creatures like the immortal jellyfish (Turritopsis dohrnii). This jellyfish can revert to its juvenile form after reaching maturity, effectively bypassing death and theoretically living forever under the right conditions. Another fascinating fact is that sloths are so slow-moving that algae can grow on their fur. This symbiotic relationship provides camouflage, which helps sloths blend into their environment and avoid predators. Birds, too, have their quirks-penguins, for instance, propose to their mates with a pebble. Male penguins search for the smoothest pebble to present to their potential mate, and if the female accepts, she places it in her nest. Additionally, elephants are the only animals that can\'t jump. Despite their strength and size, their limb structure doesn\'t allow them to perform this action. On a smaller scale, the fingerprints of koalas are so similar to human fingerprints that they can sometimes be confused at crime scenes. Each of these unique traits and behaviors highlights the incredible adaptability and diversity of life on Earth.",
    },
    {
      content:
        "The human body is a fascinating machine with many interesting facts. Did you know that the human heart beats about 100,000 times a day? This powerful muscle pumps blood all around the body, delivering oxygen and nutrients to cells. The brain is another amazing organ. It has about 86 billion nerve cells called neurons, which help us think, feel, and move. The average adult brain weighs about three pounds. Our bones are also incredible. Humans have 206 bones in their bodies, and the smallest bone is in the ear, called the stapes. Skin is the body's largest organ and it protects us from germs and helps regulate body temperature. The digestive system is responsible for breaking down food so our bodies can use the nutrients. The stomach produces strong acid that helps with this process. Did you know that fingernails grow faster than toenails? This is because they are closer to the heart and get more blood flow. Human hair grows about half an inch per month, and it's made of a protein called keratin. Another fun fact is that people have unique fingerprints, which means no two people have the same pattern. Learning about the human body helps us understand how it works and how to take better care of ourselves.",
    },
    {
      content:
        "Space is full of mysteries and wonders that amaze us. Recently, scientists found water on the Moon. This is exciting news because water is important for future space travel. If astronauts can use water on the Moon, they can stay there longer and explore more. Another interesting fact is about black holes. A black hole is a place in space where gravity is so strong that nothing can escape, not even light. Scientists are learning more about black holes by studying them with telescopes. In 2019, we saw the first picture of a black hole. It was a big moment in science. Space also has amazing events like meteor showers. Meteors are bits of rock that burn up when they enter Earth's atmosphere, creating bright streaks in the sky. People can watch these meteor showers at certain times of the year. Another interesting fact is that our solar system has eight planets. The biggest planet is Jupiter, and the smallest is Mercury. Each planet is unique and interesting. For example, Mars is red because of its iron-rich soil. Venus is very hot and has thick clouds. Space exploration helps us understand more about our universe. It inspires us to learn and discover new things every day. With new technology, we hope to find more exciting discoveries in the future, like signs of life on other planets. Space is truly a fascinating frontier.",
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
  const [showDefault, setShowDefault] = useState(false);

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

      if (validIndex === text[random].content.length - 1) {
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

    localStorage.setItem("tyzerTimeIndexValue", JSON.stringify(index));
    localStorage.setItem("tyzerTimeDimension", JSON.stringify([e.target.offsetLeft, e.target.offsetWidth]));
  }

  useEffect(() => {
    random === null && setRandom(Math.floor(Math.random() * text.length));
    textDetail.current.length > 0 && setCursorPosition();
    let timeValue = JSON.parse(localStorage.getItem("tyzerTimeValue"));
    let timeDimension = JSON.parse(localStorage.getItem("tyzerTimeDimension"));
    let timeIndexValue = JSON.parse(localStorage.getItem("tyzerTimeIndexValue"));

    count === null && (timeValue === null ? setCount(60) : setCount(timeValue));
    count === null &&
    (timeIndexValue === null ? setTimeIndex(1) : setTimeIndex(timeIndexValue));
    
    timeOptionsDetail.current.length>0 &&
      (timeDimension !== null ? moveFollwer(
        timeDimension[0],
        timeDimension[1]): 
        
        setShowDefault(true));

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
        document.addEventListener('contextmenu', ()=>{setShowStartBtn(true)});

    return () => {
      document.removeEventListener('click', ()=>{setShowStartBtn(true)});
      document.removeEventListener('contextmenu', ()=>{setShowStartBtn(true)});
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
        <h3 className="text-xl text-[#0a335cac] text-center">
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
            <div className="flex flex-col md:flex-row  items-center md:gap-20 justify-center w-full">
              {[
                { typingSpeed: typingSpeed, typingCategory: "WPM", icon: "flashlight", color: "text-[#ffa200]" },
                { typingSpeed: typingAccuracy, typingCategory: "Accuracy", icon: "focus-2", color: "text-[#00B42A]" },
              ].map((element, index) => {
                return (
                  <div key={index} className=" flex items-center">
                    <i className={`ri-${element.icon}-fill text-[15vh] md:text-[19vh] ${element.color}`}></i>
                    <h2 className="text-center leading-none flex flex-col">
                      <span className="text-[#000] font-medium text-[15vw] md:text-[5vw] lg:text-[3.6rem]">
                        {element.typingSpeed}
                      </span>{" "}
                      <span className="font-bold text-[#cfcfcf] text-[5vw] md:text-[1.5vw] lg:text-[1.3rem]">
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

        <div className="flex flex-col md:flex-row items-center gap-5 md:gap-9 mt-5">
          <button
            onClick={() => {
              reset();
            }}
            className="flex  items-center justify-center rounded-lg"
          >
            <span className="">
              <i className="ri-history-line text-[#ff3c38] timer font-semibold text-2xl md:text-2xl"></i>
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
          <div className="timeOptions  z-40 flex items-center  justify-center gap-2 relative">
            <div
              className={`follower z-20 bg-[#ffa200] rounded-lg h-full absolute top-0 left-[0%]`}
            ></div>
            <h4 className="font-semibold z-40 text-xl md:text-lg">
              Set{" "}
              <i className="ri-timer-flash-fill text-[#ffa200] font-normal"></i>
              :
            </h4>
            <ul className="flex items-center z-40 gap-1 font-semibold">
              {["30 sec", "60 sec", "120 sec"].map((element, index) => (
                <li
                  className={`cursor-default py-3 md:py-1`}
                  ref={(el) =>
                    {timeOptionsDetail.current.length < 3 &&
                    timeOptionsDetail.current.push(el)}
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    setCount(e.target.textContent.split(" ")[0]);
                    setTimeIndex(index);
                    sendDataLocalStorage(e, index);
                    reset();
                    moveFollwer(e.target.offsetLeft, e.target.offsetWidth);
                    inputDetail.current.focus();
                    setShowStartBtn(false);
                    setShowDefault(false);
                  }}
                  key={index}
                >
                  <div className="w-[100%]">
                  <span
                    className={`${
                      timeIndex === index ? "text-[black]" : "text-[#0a335cac] pointer-events-none"
                    } px-2 py-1 ${(showDefault && index==1)? 'bg-[#ffa200] rounded-lg h-full py-3 md:py-1 w-full': ''}`}
                  >
                    {element}
                  </span>
                  </div>
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

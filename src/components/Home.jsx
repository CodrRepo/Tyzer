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
        'The shortest war in history, the Anglo-Zanzibar War, lasted only 38 minutes. Fought on August 27, 1896, between the United Kingdom and the Sultanate of Zanzibar, it ended quickly with Zanzibar\'s surrender. This brief conflict contrasts sharply with the long-lasting geological activity of the Moon. The Moon experiences moonquakes, seismic events caused by tidal stresses from the Earth\'s gravitational pull. These quakes are less intense than earthquakes and occur less frequently, but they reveal that our seemingly inert Moon is still geologically active. Venus, our neighboring planet, has a day that is longer than its year. Venus takes about 243 Earth days to complete one rotation on its axis but only about 225 Earth days to orbit the Sun. This slow rotation means that a single day on Venus lasts longer than a Venusian year. Despite common myths, the Great Wall of China is not visible from space without aid. Astronauts have confirmed that the wall cannot be seen with the naked eye from low Earth orbit. On Earth, giraffes and humans share an interesting anatomical similarity: both have seven neck vertebrae. However, giraffe neck vertebrae are much longer, allowing for their towering necks. These mixed facts illustrate the vast range of surprising truths found both on our planet and in our solar system.',
    },
    {
      content:
        'The world of nature is full of surprises, such as the fact that a group of flamingos is called a "flamboyance." These striking birds get their pink color from their diet, which is rich in carotenoids found in algae and crustaceans. Another intriguing fact is that lobsters have an unusual way of aging—they essentially don\'t. Lobsters produce an enzyme called telomerase, which repairs DNA sequences known as telomeres, thus preventing the aging process in a way that scientists are still striving to fully understand. Speaking of the sea, the blue whale is the largest animal on Earth, with a heart the size of a small car and a tongue that weighs as much as an elephant. Remarkably, despite their massive size, blue whales feed almost exclusively on tiny shrimp-like animals called krill. In the insect world, bees communicate with each other through dance. They perform a series of movements known as the "waggle dance" to inform other bees about the location and distance of food sources. These diverse and captivating facts demonstrate the incredible variety of life on our planet and the unique adaptations that different species have developed to thrive in their environments.',
    },
    {
      content:
        "In the realm of human anatomy, did you know that your stomach gets a new lining every few days? The harsh acidic environment in the stomach, which is essential for digesting food, also means that the stomach lining is continuously being eroded and thus needs to regenerate frequently. Moving on to technology, the first computer virus was created in 1983 and was called the \"Elk Cloner.\" It spread via floppy disks and displayed a short poem on infected Apple II computers. Another remarkable technological feat is the Voyager 1 spacecraft, which has been traveling through space since its launch in 1977. It is now over 14 billion miles from Earth, making it the most distant human-made object in space. Voyager 1 carries the Golden Record, a time capsule with sounds and images intended to portray the diversity of life and culture on Earth. Back on Earth, the world\'s oldest known living tree is a bristlecone pine in California\'s White Mountains, estimated to be over 5,000 years old. Named Methuselah, this tree has survived millennia of changing climates and environments. These facts highlight the astonishing advancements in technology and the resilience of nature.",
    },
    {
      content:
        "The animal kingdom never ceases to amaze, particularly with creatures like the immortal jellyfish (Turritopsis dohrnii). This jellyfish can revert to its juvenile form after reaching maturity, effectively bypassing death and theoretically living forever under the right conditions. Another fascinating fact is that sloths are so slow-moving that algae can grow on their fur. This symbiotic relationship provides camouflage, which helps sloths blend into their environment and avoid predators. Birds, too, have their quirks—penguins, for instance, propose to their mates with a pebble. Male penguins search for the smoothest pebble to present to their potential mate, and if the female accepts, she places it in her nest. Additionally, elephants are the only animals that can\'t jump. Despite their strength and size, their limb structure doesn\'t allow them to perform this action. On a smaller scale, the fingerprints of koalas are so similar to human fingerprints that they can sometimes be confused at crime scenes. Each of these unique traits and behaviors highlights the incredible adaptability and diversity of life on Earth.",
    },
    {
      content:
        "The natural world is full of chemical marvels, like the fact that a single bolt of lightning contains enough energy to toast 100,000 slices of bread. Lightning heats the air it passes through to about 30,000 Kelvin, which is five times hotter than the surface of the Sun. Another fascinating aspect of nature is bioluminescence. Fireflies are famous for this phenomenon, using it to attract mates and deter predators. Certain types of fungi, fish, and even squid also produce light through chemical reactions. Moving to the culinary world, chocolate has a rich history and unique properties. Eating chocolate releases endorphins in the brain, which makes us feel happy, and it contains a small amount of caffeine, providing a mild energy boost. Another food-related fact is that apples float in water because they are 25% air. This makes bobbing for apples possible at Halloween parties. Additionally, the Guinness World Record for the longest hiccuping spree is held by Charles Osborne, who hiccuped continuously for 68 years, starting in 1922. These diverse facts showcase the extraordinary and sometimes surprising aspects of the physical and natural worlds.",
    },
    {
      content:
        "Exploring human history and culture reveals fascinating facts, such as the origin of the marathon. This long-distance race commemorates the run of the Greek soldier Pheidippides, who, according to legend, ran approximately 26 miles from the battlefield of Marathon to Athens to announce the Greek victory over Persia in 490 BC. Speaking of remarkable journeys, consider the story of the Great Emu War in Australia. In 1932, the Australian military was called in to control a population of emus that was wreaking havoc on crops. Despite their efforts, the emus proved difficult to manage, and the \"war\" ended with the emus largely victorious. Another quirky historical fact is that Cleopatra, the last active ruler of the Ptolemaic Kingdom of Egypt, lived closer in time to the moon landing than to the construction of the Great Pyramid of Giza. This perspective highlights the vast spans of history. On a lighter note, the first ever webcam was used to monitor a coffee pot at the University of Cambridge, allowing researchers to check if the coffee was ready without leaving their desks. These historical and cultural anecdotes illustrate the rich tapestry of human experience and ingenuity across the ages.",
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

import React, { useEffect, useRef, useState } from "react";
import { animateScroll as scroll, Element } from "react-scroll";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollToPlugin } from "gsap/ScrollToPlugin";

const App = () => {
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
  const textDetail = useRef([]);

  const [random, setRandom] = useState(null);
  const { textBoxDetail } = useRef(null);
  const [curPos, setCurPos] = useState({});
  const [validIndex, setValidIndex] = useState(0);

  function handleInput(e, textLength) {
    console.log(textDetail.current[validIndex].textContent);
    if (
      e.target.value[textLength - 1] ===
      textDetail.current[validIndex].textContent
    ) {
      console.log(validIndex)
      validIndex < textDetail.current.length && setValidIndex(previous => previous+1)
      textDetail.current[validIndex].classList.add("text-[#2cd640]");
      textDetail.current[validIndex].classList.remove("bg-[#faaaaa]");
      
      gsap.to(".cursor",{
        top:
          validIndex !== textDetail.current.length-1
            ? textDetail.current[validIndex+1].offsetTop
            : textDetail.current[validIndex].offsetTop,
        left:
          validIndex !== textDetail.current.length-1
            ? textDetail.current[validIndex+1].offsetLeft
            : textDetail.current[validIndex].offsetLeft +
              textDetail.current[validIndex].offsetWidth,
        duration: 0.2,
      });
    } else {
      console.log(validIndex)
      textDetail.current[validIndex].classList.add("bg-[#faaaaa]");
      textDetail.current[validIndex].classList.add("text-black");
      textDetail.current[validIndex].classList.add("rounded-full");
    }
  }

  function handleScroll(e) {
    gsap.fromTo(
      ".animeTextBox",
      {
        scrollTo: textDetail.current[validIndex].offsetTop
      },
      {
        scrollTo:
          validIndex < textDetail.current.length-1
            ? textDetail.current[validIndex+1].offsetTop
            : textDetail.current[validIndex].offsetTop,
      }
    );
  }

  useEffect(() => {
    random === null && setRandom(Math.floor(Math.random() * text.length));
    textDetail.current.length > 0 &&
      curPos.length == 0 &&
      setCurPos({
        top: textDetail.current[0].offsetTop,
        left: textDetail.current[0].offsetLeft,
      });
  }, [textDetail.current, textBoxDetail, random]); // This will run after the initial render when textDetail.current is updated

  return (
    <div className="bg-zinc-100 h-screen flex justify-center items-center p-5">
      <div className="bg-white w-full py-7 px-4 flex justify-center items-center rounded-md">
        <div
          ref={textBoxDetail}
          className="animeTextBox relative overflow-hidden h-[50vh] w-full bg-white"
        >
          <div
            onClick={() => console.log(textDetail.current[0].offsetWidth)}
            className={`absolute cursor h-[7.5vh] w-[0.15rem] bg-black`}
          ></div>
          <p className="tracking-[0.15rem] text-zinc-800 leading-[10vh] ">
            {random !== null &&
              text[random].content.split("").map((element, index) => {
                return (
                  <span
                    className="font-medium text-3xl"
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
              validIndex<textDetail.current.length && handleInput(e, e.target.value.length)
              validIndex<textDetail.current.length && handleScroll(e)
            }}
            autoFocus={true}
            type="text"
            name="userInput"
            id="userInput"
            autoCapitalize="false"
            autoComplete="off"
            autoCorrect="false"
          />
        </div>
      </div>
    </div>
  );
};

export default App;

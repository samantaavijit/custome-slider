"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const images = [
    {
      title: "Image 1",
      src: "/eagel1.jpg",
      alt: "Eagle 1",
    },
    {
      title: "Image 2",
      src: "/owl1.jpg",
      alt: "Owl 1",
    },
    {
      title: "Image 3",
      src: "/crow.jpg",
      alt: "Crow",
    },
    {
      title: "Image 4",
      src: "/butterfly1.jpeg",
      alt: "Butterfly 1",
    },
    {
      title: "Image 5",
      src: "/owl2.jpg",
      alt: "Owl 2",
    },
    {
      title: "Image 6",
      src: "/eagel3.jpg",
      alt: "Eagle 3",
    },
  ];

  const [carouselClass, setCarouselClass] = useState("");
  const listRef = useRef(null);
  const runningTimeRef = useRef(null);
  const timeRunning = 3000;
  const timeAutoNext = 7000;

  useEffect(() => {
    let runTimeOut;
    let runNextAuto;

    const showSlider = (type) => {
      if (listRef.current) {
        const sliderItemsDom = Array.from(listRef.current.children);

        if (type === "next") {
          listRef.current.appendChild(sliderItemsDom[0]);
          setCarouselClass("next");
        } else {
          listRef.current.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
          setCarouselClass("prev");
        }

        clearTimeout(runTimeOut);

        runTimeOut = setTimeout(() => {
          setCarouselClass("");
        }, timeRunning);

        clearTimeout(runNextAuto);
        runNextAuto = setTimeout(() => {
          showSlider("next");
        }, timeAutoNext);

        resetTimeAnimation();
      }
    };

    const resetTimeAnimation = () => {
      if (runningTimeRef.current) {
        runningTimeRef.current.style.animation = "none";
        runningTimeRef.current.offsetHeight; // Trigger reflow
        runningTimeRef.current.style.animation =
          "runningTime 7s linear 1 forwards";
      }
    };

    const nextClick = () => {
      showSlider("next");
    };

    const prevClick = () => {
      showSlider("prev");
    };

    runNextAuto = setTimeout(() => {
      showSlider("next");
    }, timeAutoNext);

    resetTimeAnimation();

    return () => {
      clearTimeout(runTimeOut);
      clearTimeout(runNextAuto);
    };
  }, []);

  return (
    <div className="myCarousel">
      <div className={`myList ${carouselClass}`} ref={listRef}>
        {images.map((item, key) => {
          return (
            <div
              className="myItem"
              key={key}
              style={{ backgroundImage: `url(${item.src})` }}
            >
              <div class="content">
                <div class="title">{item.title}</div>
                <div class="name">{item.alt}</div>
                <div class="des">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Officiis culpa similique consequuntur, reprehenderit dicta
                  repudiandae.
                </div>
                <div class="btn">
                  <button>See More</button>
                  <button>Subscribe</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="myArrows">
        <button
          className="prev"
          onClick={() => {
            if (listRef.current) {
              const sliderItemsDom = Array.from(listRef.current.children);
              if (sliderItemsDom.length > 0) {
                listRef.current.prepend(
                  sliderItemsDom[sliderItemsDom.length - 1]
                );
                setCarouselClass("prev");
                setTimeout(() => setCarouselClass(""), timeRunning);
              }
            }
          }}
        >
          pre
        </button>
        <button
          className="next"
          onClick={() => {
            if (listRef.current) {
              const sliderItemsDom = Array.from(listRef.current.children);
              if (sliderItemsDom.length > 0) {
                listRef.current.appendChild(sliderItemsDom[0]);
                setCarouselClass("next");
                setTimeout(() => setCarouselClass(""), timeRunning);
              }
            }
          }}
        >
          next
        </button>
      </div>

      <div className="myTimeRunning" ref={runningTimeRef}></div>
    </div>
  );
}

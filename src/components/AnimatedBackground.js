import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import styles from "../CSS/AnimatedBackground.module.css";
import Navbar from "./Navbar";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Globe from "./Globe";
gsap.registerPlugin(ScrollTrigger);


export default function AnimatedBackground() {
  const mainHeadRef = useRef(null);
  const paraRef = useRef(null);
  const buttonsRef = useRef(null);
  const navbarRef = useRef(null)
  const logoRef = useRef(null)
  const page2LabelRef = useRef(null); 
  const page3LabelRef = useRef(null);  // What We Do
const page2HeadRef = useRef(null);    // h1
const page2ParaRef = useRef(null);    // subhead
const page2Ref = useRef(null); 
const cardsRef = useRef([]);
const page3Ref = useRef(null);
const page3LinesRef = useRef([]);



useGSAP(() => {
  const tl = gsap.timeline({delay:2.2});

  tl.from(navbarRef.current, {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out",
  })
    .from(mainHeadRef.current.children, {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
    })
    .from(
      paraRef.current.children,
      {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.25,
        ease: "power3.out",
      },
      "-=0.4"
    )
    .from(
      buttonsRef.current.children,
      {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.25,
        ease: "power3.out",
      },
      "-=0.3"
    );
}, []);

useGSAP(() => {
  const slider = logoRef.current;
  const totalWidth = slider.scrollWidth / 2;

  const marqueeTween = gsap.to(slider, {
    x: -totalWidth,
    duration: 25,
    ease: "linear",
    repeat: -1,
  });

  // Hover = slow down
  slider.addEventListener("mouseenter", () => {
    gsap.to(marqueeTween, {
      timeScale: 2, // slow speed
      duration: 3,
      ease: "power2.out",
    });
  });

  // Leave = normal speed
  slider.addEventListener("mouseleave", () => {
    gsap.to(marqueeTween, {
      timeScale: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  });

}, []);

useGSAP(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: page2Ref.current,
      start: "top 30%",
      end: "bottom 90%",
      // markers:true,
      scrub: 1,
    },
  });

  // Label
  tl.from(page2LabelRef.current, {
    opacity: 0,
    y: 30,
    duration: 0.6,
    ease: "power2.out",
  })

  // Heading
  .from(page2HeadRef.current, {
    opacity: 0,
    y: 60,
    duration: 0.8,
    ease: "power3.out",
  }, "+=0.1")

  // Subhead
  .from(page2ParaRef.current.children, {
    opacity: 0,
    y: 40,
    duration: 0.6,
    stagger: 0.25,
    ease: "power3.out",
  }, "+=0.1")

  // LEFT CARD → from left
  .from(cardsRef.current[0], {
    opacity: 0,
    x: -120,
    duration: 0.9,
    ease: "power3.out",
  }, "+=0.2")

  // CENTER CARD → from bottom
  .from(cardsRef.current[1], {
    opacity: 0,
    y: 100,
    duration: 0.9,
    ease: "power3.out",
  }, "-=0.6")

  // RIGHT CARD → from right
  .from(cardsRef.current[2], {
    opacity: 0,
    x: 120,
    duration: 0.9,
    ease: "power3.out",
  }, "-=0.6");

}, []);

useGSAP(() => {
  const words = page3LinesRef.current;

  // initial grey
  gsap.set(words, {
    color: "#424040",
  });

  gsap.to(words, {
    color: "#ffffff",
    stagger: 0.08,     // word by word
    ease: "none",
    scrollTrigger: {
      trigger: page3Ref.current,
      start: "top 80%",   // page3 thoda screen me aaye
      end: "bottom 20%",  // page3 nikalte nikalte
      scrub: true,        // 🔥 scroll speed = animation speed
      pin: false,         // ❌ NO PIN
    },
  });
}, []);














  const logo = [
    { src: "/Masdar.png" },
    { src: "/Amazon.png" },
    { src: "/Byjus.png" },
    { src: "/Bajaj.png" },
    { src: "/Terranova.png" },
    { src: "/Qasper Agro.png" },
  ];

  const page3TextLines = [
  "Every system we build is shaped",
  "by clear decisions, real ownership,",
  "and standards that hold up as",
  "products grow."
];

  return (
    <>
    <div className={styles.container}>
      {/* Background */}
      <video
  className={styles.videoBg}
  autoPlay
  loop
  muted
  playsInline
>
  <source src="/bg1.mp4" type="video/mp4" />
</video>

      {/* Content */}
      <div className={styles.content}>
        <Navbar  ref={navbarRef}/>

        {/* 1️⃣ Heading */}
        <h1 ref={mainHeadRef} className={styles.mainhead}>
  <span>We build usable software for</span>
  <span>people who care about</span>
  <span>execution.</span>
</h1>


        {/* 2️⃣ Paragraph */}
        <p ref={paraRef}>
  <span>NoCapCode helps founders and teams turn ideas into <b>stable, working systems</b></span>
  
  <span>without overengineering, buzzwords, or handoffs that break later.</span>
</p>


        {/* 3️⃣ Buttons */}
        <div ref={buttonsRef} className={styles.buttons}>
          <button className={styles.firstbutt}>Stay with clarity</button>
          <button className={styles.secondbutt}>See how it works</button>
        </div>

        {/* Marquee */}
       <div className={styles.marquee}> 
  <span className={styles.marqueehead}>
    Experience shaped by real-world teams
  </span>

  <div className={styles.rowsliderWrapper}>
    <div className={styles.rowslider} ref={logoRef}>
      {[...logo, ...logo].map((i, index) => (
        <div className={styles.logo} key={index}>
          <img src={i.src} alt="logo" height="100%" width="100%" />
        </div>
      ))}
    </div>
  </div>
</div>

      </div>
    </div>

     <div className={styles.page3} ref={page3Ref}>
      <div style={{ width: "600px", height: "600px" }}>
  <Globe />
</div>
     <div className={styles.page3text}>
       <span className={styles.first} ref={page2LabelRef}>Standards We Build By</span>
      <h4 className={styles.mainhead2}>
  {page3TextLines.map((line, lineIndex) => (
    <React.Fragment key={lineIndex}>
      {line.split(" ").map((word, wordIndex) => {
        const index =
          page3TextLines
            .slice(0, lineIndex)
            .join(" ")
            .split(" ").length + wordIndex;

        return (
          <span
            key={index}
            ref={(el) => (page3LinesRef.current[index] = el)}
            style={{ display: "inline-block", marginRight: "6px" }}
          >
            {word}
          </span>
        );
      })}
      <br />
    </React.Fragment>
  ))}
</h4>


     </div>
    </div>
    <div className={styles.page2} ref={page2Ref}>
      <span className={styles.first} ref={page2LabelRef}>What We Do</span>
      <h1 ref={page2HeadRef} className={styles.mainhead1}>We build what makes products last.</h1>
      <p ref={page2ParaRef} className={styles.subhead1}>
  <span>We focus on the work that turns ideas into usable, sustainable systems </span>
  
  <span>without losing clarity in the process.</span>
  <div className={styles.cards1}>
    <div
  className={styles.firstcard}
  ref={(el) => (cardsRef.current[0] = el)}
>
      <div className={styles.cardimage}>
         <img src="/img2.png" alt="logo" height="100%" width="100%" />
      </div>
      <div className={styles.cardtext}>
        <h4>Build</h4>
        <span>We turn ideas into usable products
designed to evolve, not to be replaced.</span>
      </div>
    </div>
     <div
  className={styles.firstcard}
  ref={(el) => (cardsRef.current[1] = el)}
>
      <div className={styles.cardimage}>
         <img src="/img3.png" alt="logo" height="100%" width="100%" />
      </div>
      <div className={styles.cardtext}>
        <h4>Stabilize</h4>
        <span>We replace manual work and scattered tools with systems that run quietly and reliably.</span>
      </div>
    </div>
     <div
  className={styles.firstcard}
  ref={(el) => (cardsRef.current[2] = el)}
>
      <div className={styles.cardimage}>
         <img src="/img1.png" alt="logo" height="100%" width="100%" />
      </div>
      <div className={styles.cardtext}>
        <h4>Decide</h4>
        <span>We help you make the right calls early, before code turns decisions into debt.</span>
      </div>
    </div>
  </div>
</p>
 </div>
   
    </>
  );
}

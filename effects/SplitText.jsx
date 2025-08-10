"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(GSAPSplitText);

const SplitText = ({
   texts = [],
  duration = 0.6,
  delay = 3000,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  className = "",
  textAlign = "center",
}) => {
  const textRef = useRef(null);
  const [index, setIndex] = useState(0);
  const timelineRef = useRef(null);
  const splitterRef = useRef(null);

  useEffect(() => {
    if (!texts.length || !textRef.current) return;

    const el = textRef.current;
    const text = texts[index];

    el.innerHTML = text;

    if (splitterRef.current) splitterRef.current.revert();
    splitterRef.current = new GSAPSplitText(el, {
      type: splitType,
      linesClass: "split-line",
    });

    const targets =
      splitType === "lines"
        ? splitterRef.current.lines
        : splitType === "words"
        ? splitterRef.current.words
        : splitterRef.current.chars;

    if (timelineRef.current) timelineRef.current.kill();

    timelineRef.current = gsap.timeline({
      onComplete: () => {
        setTimeout(() => {
          setIndex((prev) => (prev + 1) % texts.length);
        }, delay);
      },
    });

    timelineRef.current.set(targets, from);
    timelineRef.current.to(targets, {
      ...to,
      duration,
      ease,
      stagger: 0.05,
    });

    return () => {
      if (timelineRef.current) timelineRef.current.kill();
      if (splitterRef.current) splitterRef.current.revert();
    };
  }, [index, texts, duration, delay, ease, splitType, from, to]);

  return (
    <p
      ref={textRef}
      className={`split-parent ${className}`}
      style={{
        textAlign,
        overflow: "hidden",
        display: "inline-block",
        whiteSpace: "normal",
        wordWrap: "break-word",
      }}
    />
  );
};
export default SplitText;

"use client";

import {
  ElementType,
  useEffect,
  useRef,
  useState,
  createElement,
  useMemo,
  useCallback,
  forwardRef,
  Ref,
} from "react";
import { gsap } from "gsap";

interface TextTypeProps {
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string | React.ReactNode;
  cursorBlinkDuration?: number;
  cursorClassName?: string;
  text: string | string[];
  as?: ElementType;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  textColors?: string[];
  variableSpeed?: { min: number; max: number };
  onSentenceComplete?: (sentence: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
}

const TextType = forwardRef<
  HTMLElement,
  TextTypeProps & React.HTMLAttributes<HTMLElement>
>(
  (
    {
      text,
      as: Component = "div",
      typingSpeed = 50,
      initialDelay = 0,
      pauseDuration = 2000,
      deletingSpeed = 30,
      loop = true,
      className = "",
      showCursor = true,
      hideCursorWhileTyping = false,
      cursorCharacter = "|",
      cursorClassName = "",
      cursorBlinkDuration = 0.5,
      textColors = [],
      variableSpeed,
      onSentenceComplete,
      startOnVisible = false,
      reverseMode = false,
      ...props
    },
    forwardedRef: Ref<HTMLElement>
  ) => {
    const [displayedText, setDisplayedText] = useState("");
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(!startOnVisible);
    const cursorRef = useRef<HTMLSpanElement>(null);
    const containerRef = useRef<HTMLElement>(null); // Internal ref

    const textArray = useMemo(
      () => (Array.isArray(text) ? text : [text]),
      [text]
    );

    const getRandomSpeed = useCallback(() => {
      if (!variableSpeed) return typingSpeed;
      const { min, max } = variableSpeed;
      return Math.random() * (max - min) + min;
    }, [variableSpeed, typingSpeed]);

    const getCurrentTextColor = () => {
      if (textColors.length === 0) return;
      return textColors[currentTextIndex % textColors.length];
    };

    // IntersectionObserver effect
    useEffect(() => {
      if (!startOnVisible || !containerRef.current) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }, [startOnVisible]);

    // GSAP cursor blink effect
    useEffect(() => {
      if (showCursor && cursorRef.current) {
        gsap.set(cursorRef.current, { opacity: 1 });
        gsap.to(cursorRef.current, {
          opacity: 0,
          duration: cursorBlinkDuration,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        });
      }
    }, [showCursor, cursorBlinkDuration]);

    // Main typing logic effect
    useEffect(() => {
      if (!isVisible) return;

      let timeout: NodeJS.Timeout;

      const currentText = textArray[currentTextIndex];
      const processedText = reverseMode
        ? currentText.split("").reverse().join("")
        : currentText;

      const executeTypingAnimation = () => {
        if (isDeleting) {
          // Deleting logic
          if (displayedText === "") {
            setIsDeleting(false);
            if (currentTextIndex === textArray.length - 1 && !loop) {
              return; // Stop if not looping
            }

            if (onSentenceComplete) {
              onSentenceComplete(textArray[currentTextIndex], currentTextIndex);
            }

            setCurrentTextIndex((prev) => (prev + 1) % textArray.length);
            setCurrentCharIndex(0);
            timeout = setTimeout(() => {}, pauseDuration); // Pause before next
          } else {
            timeout = setTimeout(() => {
              setDisplayedText((prev) => prev.slice(0, -1));
            }, deletingSpeed);
          }
        } else {
          // Typing logic
          if (currentCharIndex < processedText.length) {
            timeout = setTimeout(
              () => {
                setDisplayedText(
                  (prev) => prev + processedText[currentCharIndex]
                );
                setCurrentCharIndex((prev) => prev + 1);
              },
              variableSpeed ? getRandomSpeed() : typingSpeed
            );
          } else if (textArray.length > 1) {
            timeout = setTimeout(() => {
              setIsDeleting(true); // Start deleting
            }, pauseDuration);
          }
        }
      };

      // Initial delay logic
      if (currentCharIndex === 0 && !isDeleting && displayedText === "") {
        timeout = setTimeout(executeTypingAnimation, initialDelay);
      } else {
        executeTypingAnimation();
      }

      return () => clearTimeout(timeout);
    }, [
      currentCharIndex,
      displayedText,
      isDeleting,
      typingSpeed,
      deletingSpeed,
      pauseDuration,
      textArray,
      currentTextIndex,
      loop,
      initialDelay,
      isVisible,
      reverseMode,
      variableSpeed,
      onSentenceComplete,
      getRandomSpeed,
    ]);

    const shouldHideCursor =
      hideCursorWhileTyping &&
      (currentCharIndex < textArray[currentTextIndex].length || isDeleting);

    return createElement(
      Component,
      // eslint-disable-next-line react-hooks/refs
      {
        ...props, // Spread remaining props (safe now)
        ref: (node: HTMLElement) => {
          // Set the internal ref for IntersectionObserver
          (containerRef as React.MutableRefObject<HTMLElement | null>).current =
            node;

          // Set the forwarded ref for the parent
          if (typeof forwardedRef === "function") {
            forwardedRef(node);
          } else if (forwardedRef) {
            (
              forwardedRef as React.MutableRefObject<HTMLElement | null>
            ).current = node;
          }
        },
        className: `inline-block whitespace-pre-wrap tracking-tight ${className}`,
      },
      // Children
      <span
        className="inline"
        style={{ color: getCurrentTextColor() || "inherit" }}
      >
        {displayedText}
      </span>,
      showCursor && (
        <span
          ref={cursorRef}
          className={`ml-1 inline-block opacity-100 ${
            shouldHideCursor ? "hidden" : ""
          } ${cursorClassName}`}
        >
          {cursorCharacter}
        </span>
      )
    );
  }
);

TextType.displayName = "TextType";

export default TextType;

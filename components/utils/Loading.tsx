"use client";

import React from "react";

import { MotionDiv, MotionSpan } from "@/constants/motionProps";

const SubmitButton = () => {
  const variants = {
    initial: (i: number) => ({
      height: [i === 1 ? 15 : 10 + i * 0.5],
      // opacity: 0,
    }),
    animate: (i: number) => ({
      height: [i === 1 ? 15 : 10 + i * 0.5, i === 1 ? 30 : 15 + i * 0.5],
      // opacity: [0, 1],
      transition: {
        // type: 'tween',
        duration: 1.5,
        delay: i * 0.1,
        type: "spring",
        bounce: 0.75,
        repeat: Infinity,
        // repeaDelay: 1,
      },
    }),
  };

  return (
    <div className={`pointer-events-none flex-v-center max-w-fit`}>
      <MotionDiv
        initial="initial"
        animate="animate"
        className="overflow-hidden text-[--white] flex-center !gap-2"
      >
        <div className="flex-center !w-auto !gap-[6px] h-[40px]">
          <MotionSpan variants={variants} custom={0} className="loading-line" />
          <MotionSpan variants={variants} custom={1} className="loading-line" />
          <MotionSpan variants={variants} custom={2} className="loading-line" />
        </div>
      </MotionDiv>
    </div>
  );
};

export default SubmitButton;

import React from "react";
import {motion} from "framer-motion";
import ResumeCard from "./ResumeCard";

const Experience = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      className="py-8 sm:py-12 font-titleFont flex flex-col lg:flex-row lg:gap-20 gap-10"
    >
      <div className="w-full lg:w-[50%]">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-designColor tracking-[4px]">2022 - present</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Job Experience</h2>
        </div>
        <div className="mt-10 sm:mt-14 w-full h-auto lg:h-[1000px] border-l-[4px] sm:border-l-[6px] border-l-black border-opacity-30 flex flex-col gap-6 sm:gap-10">
          <ResumeCard
            title="Lab Assistance"
            subTitle="(Jan 2024 - Mar 2024)"
            result="Success"
            des="Support in lab settings, handling tasks related to experiments, research, and equipment management. Key responsibilities include assisting with experiments, data collection, and maintaining laboratory equipment."
          />
          <ResumeCard
            title="Logo Designer Freelancer"
            subTitle="-- Present"
            result="Success"
            des="Self-employed professional creating visually appealing logos for businesses, organizations, and individuals. Responsible for client communication, design creation, and brand representation."
          />
          <ResumeCard
            title="Infographics"
            subTitle="-- Present"
            result="Success"
            des="Visual representation of data, combining graphics and text for engaging, easy-to-understand information. Used in marketing, education, and research. Tools like Canva and Piktochart assist in creating them."
          />
        </div>
      </div>
      <div className="w-full lg:w-[50%]">
        {/* You can add more content or another column here for larger screens */}
      </div>
    </motion.div>
  );
};

export default Experience;


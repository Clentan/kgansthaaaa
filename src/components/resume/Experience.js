import React from "react";
import {motion} from "framer-motion"
import ResumeCard from "./ResumeCard";

const Experience = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      className="py-12 font-titleFont flex gap-20"
    >
      <div>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-designColor tracking-[4px]">2022 - present</p>
          <h2 className="text-4xl font-bold">Job Experience</h2>
        </div>
        <div className="mt-14 w-full h-[1000px] border-l-[6px] border-l-black border-opacity-30 flex flex-col gap-10">
          <ResumeCard
            title="Lab Assistance"
            subTitle="(jan 2024 - Mar 2024)"
            result="success"
            des="refers to the support provided in laboratory settings, typically involving tasks related to experiments, research, and equipment management. Here are key aspects of lab assistance."
          />
          <ResumeCard
            title="Logo Designer Freelancer"
            subTitle="--present"
            result="success"
            des="is a self-employed professional specializing in creating unique and visually appealing logos for businesses, organizations, and individuals. Here are some key aspects of being a freelance logo designer:."
          />
          <ResumeCard
            title="infographics"
            subTitle="-- present"
            result="success"
            des="are visual representations of data and information that communicate complex ideas quickly and clearly. They combine graphics and text, making information engaging and easy to understand, and are commonly used in marketing and education. Tools like Canva and Piktochart help in their creation.."
          />
        </div>
      </div>
      <div>
       
    
      </div>
    </motion.div>
  );
};

export default Experience;

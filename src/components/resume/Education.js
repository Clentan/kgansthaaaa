import React from 'react';
import { motion } from 'framer-motion';
import ResumeCard from './ResumeCard';

const Education = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      className="w-full flex flex-col lgl:flex-row gap-10 lgl:gap-20"
    >
      {/* part one */}
      <div>
        <div className="py-6 lgl:py-12 font-titleFont flex flex-col gap-4">
          <p className="text-sm text-designColor tracking-[4px]">2015 - present</p>
          <h2 className="text-3xl md:text-4xl font-bold">Education Background</h2>
        </div>
        <div className="mt-6 lgl:mt-14 w-full h-[1000px] border-l-[6px] border-l-black border-opacity-30 flex flex-col gap-10">
          <ResumeCard
            title="FET"
            subTitle="Stanford Lake College (Jan 2015)"
            result="Excellent"
            des="Higher education is tertiary education leading to the award of an academic degree. Higher education, also called post-secondary education."
            handleDelete={null} // Pass null or undefined to avoid showing the button
          />
          <ResumeCard
            title="Science Stream"
            subTitle="Merensky High School (Jan 2016 - Nov 2019)"
            result="Excellent"
            des="The aim of high school is to provide students with a well-rounded education that prepares them for further education, careers, and life."
            handleDelete={null} // Pass null or undefined to avoid showing the button
          />
          <ResumeCard
            title="BSc - (Mathematical Science)"
            subTitle="University of Limpopo (2024 - present)"
            result="Excellent"
            des="Higher education is tertiary education leading to the award of an academic degree. Higher education, also called post-secondary education."
            handleDelete={null} // Pass null or undefined to avoid showing the button
          />
        </div>
      </div>
      {/* part Two */}
      <div>
        {/* Additional content can go here */}
      </div>
    </motion.div>
  );
}

export default Education;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getDatabase, ref, push, remove, onValue, update } from '../firebaseConfig';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: '', proficiency: 0 });
  const [editingSkill, setEditingSkill] = useState(null); // State for editing

  // Fetch skills from Firebase on component mount
  useEffect(() => {
    const db = getDatabase();
    const skillsRef = ref(db, 'skills');

    // Set up a listener for changes in the skills node
    const unsubscribe = onValue(skillsRef, (snapshot) => {
      const data = snapshot.val();
      const skillsArray = data
        ? Object.entries(data).map(([key, value]) => ({
            ...value,
            id: key, // Store the ID for later use
          }))
        : [];
      setSkills(skillsArray);
    });

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name === 'proficiency' ? Number(value) : value; // Convert proficiency to a number
    setNewSkill({ ...newSkill, [name]: updatedValue });
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.name && newSkill.proficiency >= 0 && newSkill.proficiency <= 100) {
      const skillExists = skills.some(
        (skill) => skill.name.toLowerCase() === newSkill.name.toLowerCase()
      );
      if (!skillExists) {
        const db = getDatabase();
        const skillsRef = ref(db, 'skills');

        // Push the new skill to the database with name and proficiency
        push(skillsRef, {
          name: newSkill.name, // Ensure name is included here
          proficiency: newSkill.proficiency,
        })
          .then(() => {
            console.log('Skill added to Firebase!');
            setNewSkill({ name: '', proficiency: 0 }); // Reset the input fields
          })
          .catch((error) => {
            console.error('Error adding skill to Firebase: ', error);
          });
      } else {
        alert('Skill already exists!');
      }
    }
  };

  const handleDeleteSkill = (id) => {
    const db = getDatabase();
    const skillToDeleteRef = ref(db, `skills/${id}`); // Use the ID to reference the skill

    remove(skillToDeleteRef)
      .then(() => {
        console.log('Skill deleted from Firebase!');
      })
      .catch((error) => {
        console.error('Error deleting skill from Firebase: ', error);
      });
  };

  const handleEditSkill = (skill) => {
    setEditingSkill(skill); // Set the skill to be edited
    setNewSkill({ name: skill.name, proficiency: skill.proficiency }); // Populate input fields for editing
  };

  const handleUpdateSkill = (e) => {
    e.preventDefault();
    if (editingSkill) {
      const db = getDatabase();
      const skillToUpdateRef = ref(db, `skills/${editingSkill.id}`);

      // Update the skill in the database
      update(skillToUpdateRef, {
        name: newSkill.name,
        proficiency: newSkill.proficiency,
      })
        .then(() => {
          console.log('Skill updated in Firebase!');
          setEditingSkill(null); // Reset editing state
          setNewSkill({ name: '', proficiency: 0 }); // Reset the input fields
        })
        .catch((error) => {
          console.error('Error updating skill in Firebase: ', error);
        });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      className="w-full flex flex-col lgl:flex-row gap-10 lgl:gap-20"
    >
      {/* Skills Display */}
      <div className="w-full lgl:w-1/2">
        <div className="py-12 font-titleFont flex flex-col gap-4">
          <p className="text-sm text-designColor tracking-[4px] uppercase">Features</p>
          <h2 className="text-3xl md:text-4xl font-bold">Design Skill</h2>
        </div>
        <div className="mt-14 w-full flex flex-col gap-6">
          {skills.slice(0, 5).map((skill) => (
            <div key={skill.id} className="overflow-x-hidden flex justify-between items-center">
              <div>
                <p className="text-sm uppercase font-medium py-">{skill.name}</p>
                <span className="w-full h-2 bgOpacity rounded-md inline-flex mt-2">
                  <motion.span
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    style={{ width: `${skill.proficiency}%` }}
                    className="h-full bg-gradient-to-r from-blue-600 via-pink-500 to-red-500 rounded-md relative "
                  >
                    <span className="absolute -top-7 right-0">{skill.proficiency}%</span>
                  </motion.span>
                </span>
              </div>
              <div>
                <button className="text-blue-500 ml-4" onClick={() => handleEditSkill(skill)}>
                  Edit
                </button>
                <button className="text-red-500 ml-4" onClick={() => handleDeleteSkill(skill.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full lgl:w-1/2">
        <div className="py-12 font-titleFont flex flex-col gap-4">
          <p className="text-sm text-designColor tracking-[4px] uppercase">Features</p>
          <h2 className="text-3xl md:text-4xl font-bold">Development Skill</h2>
        </div>
        <div className="flex flex-col gap-6">
          {skills.slice(5).map((skill) => (
            <div key={skill.id} className="overflow-x-hidden flex justify-between items-center">
              <div>
                <p className="text-sm uppercase font-medium">{skill.name}</p>
                <span className="w-full h-2 bgOpacity rounded-md inline-flex mt-2">
                  <motion.span
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    style={{ width: `${skill.proficiency}%` }}
                    className="h-full bg-gradient-to-r from-blue-600 via-pink-500 to-red-500 rounded-md relative"
                  >
                    <span className="absolute -top-7 right-0">{skill.proficiency}%</span>
                  </motion.span>
                </span>
              </div>
              <div>
                <button className="text-blue-500 ml-4" onClick={() => handleEditSkill(skill)}>
                  Edit
                </button>
                <button className="text-red-500 ml-4" onClick={() => handleDeleteSkill(skill.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form to add or update a skill */}
      <motion.form
        onSubmit={editingSkill ? handleUpdateSkill : handleAddSkill} // Update or add based on editing state
        className="w-full flex flex-col gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <input
          type="text"
          name="name"
          placeholder="Skill Name"
          value={newSkill.name}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          name="proficiency"
          placeholder="Proficiency (0-100)"
          value={newSkill.proficiency}
          onChange={handleChange}
          className="p-2 border rounded"
          min="0"
          max="100"
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          {editingSkill ? 'Update Skill' : 'Add Skill'} {/* Change button text based on action */}
        </button>
      </motion.form>
    </motion.div>
  );
};

export default Skills;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ResumeCard from "./ResumeCard";
import { getDatabase, ref, push, remove, update, onValue } from '../firebaseConfig';

const Achievement = () => {
  const [achievements, setAchievements] = useState([]);
  const [newAchievement, setNewAchievement] = useState({
    title: "",
    result: "",
    des: ""
  });
  const [editingId, setEditingId] = useState(null);

  // Function to fetch achievements from Firebase
  const fetchAchievements = () => {
    const db = getDatabase();
    const achievementsRef = ref(db, 'achievements');

    onValue(achievementsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedAchievements = Object.entries(data).map(([id, achievement]) => ({
          id,
          ...achievement
        }));
        setAchievements(loadedAchievements);
      } else {
        setAchievements([]); // Clear achievements if no data found
      }
    });
  };

  useEffect(() => {
    fetchAchievements(); // Fetch achievements on component mount
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAchievement({ ...newAchievement, [name]: value });
  };

  const handleAddAchievement = () => {
    if (newAchievement.title && newAchievement.result && newAchievement.des) {
      const db = getDatabase();
      const achievementsRef = ref(db, 'achievements');

      push(achievementsRef, newAchievement);
      setNewAchievement({ title: "", result: "", des: "" });
    }
  };

  const handleDeleteAchievement = (id) => {
    const db = getDatabase();
    const achievementRef = ref(db, `achievements/${id}`);

    remove(achievementRef)
      .then(() => {
        console.log("Achievement deleted successfully.");
      })
      .catch((error) => {
        console.error("Error deleting achievement: ", error);
      });
  };

  const handleEditAchievement = (id) => {
    const achievementToEdit = achievements.find(achievement => achievement.id === id);
    if (achievementToEdit) {
      setNewAchievement(achievementToEdit);
      setEditingId(id);
    }
  };

  const handleUpdateAchievement = () => {
    if (newAchievement.title && newAchievement.result && newAchievement.des && editingId) {
      const db = getDatabase();
      const achievementRef = ref(db, `achievements/${editingId}`);

      update(achievementRef, newAchievement)
        .then(() => {
          setNewAchievement({ title: "", result: "", des: "" });
          setEditingId(null); // Reset editing state
        })
        .catch((error) => {
          console.error("Error updating achievement: ", error);
        });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-12 font-titleFont flex flex-col md:flex-row gap-20"
    >
      <div className="w-full md:w-1/2">
        <div className="py-12 font-titleFont flex flex-col gap-4">
          <p className="text-sm text-designColor tracking-[4px]">2020 - 2023</p>
          <h2 className="text-4xl font-bold">Awards & Achievements</h2>
        </div>
        <div className="mt-14 w-full h-auto border-l-[6px] border-l-black border-opacity-30 flex flex-col gap-10">
          {achievements.map((achievement) => (
            <ResumeCard
              key={achievement.id}
              title={achievement.title}
              result={achievement.result}
              des={achievement.des}
              handleDelete={() => handleDeleteAchievement(achievement.id)}
              handleEdit={() => handleEditAchievement(achievement.id)} // Pass edit handler
            />
          ))}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full md:w-1/2"
      >
        <h3 className="text-2xl font-bold mb-4">{editingId ? "Edit Achievement" : "Add New Achievement"}</h3>
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            name="title"
            value={newAchievement.title}
            onChange={handleInputChange}
            placeholder="Title"
            className="border p-2 mb-2 w-full"
          />
          <input
            type="text"
            name="result"
            value={newAchievement.result}
            onChange={handleInputChange}
            placeholder="Result"
            className="border p-2 mb-2 w-full"
          />
          <textarea
            name="des"
            value={newAchievement.des}
            onChange={handleInputChange}
            placeholder="Description"
            className="border p-2 mb-4 w-full"
            rows="4"
          />
          <button
            onClick={editingId ? handleUpdateAchievement : handleAddAchievement}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 active:bg-blue-800 transition duration-200"
          >
            {editingId ? "Update Achievement" : "Add Achievement"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Achievement;

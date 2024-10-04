import React, { useEffect, useState } from 'react';
import Title from '../layouts/Title';
import ProjectsCard from './ProjectsCard';
import { getDatabase, ref, push, remove, onValue, update } from 'firebase/database';

const Projects = () => {
  // State for existing projects and form inputs
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [des, setDes] = useState('');
  const [src, setSrc] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState(null);

  const db = getDatabase();

  // Fetch existing projects from Firebase
  useEffect(() => {
    const projectsRef = ref(db, 'projects/');
    const unsubscribe = onValue(projectsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const fetchedProjects = Object.entries(data).map(([id, project]) => ({
          id,
          ...project,
        }));
        setProjects(fetchedProjects);
      } else {
        setProjects([]);
      }
    });

    return () => unsubscribe(); // Clean up the listener
  }, [db]);

  // Handle form submission for adding/editing a project
  const handleAddProject = (e) => {
    e.preventDefault();

    // Validation
    if (!title || !des || !src) {
      setErrorMessage("All fields are required.");
      return;
    }

    const newProject = { title, des, src };

    // If editing an existing project
    if (editMode) {
      const projectRef = ref(db, 'projects/' + currentProjectId);
      update(projectRef, newProject)
        .then(() => {
          clearForm();
          setEditMode(false);
          setCurrentProjectId(null);
          setErrorMessage('');
        })
        .catch((error) => {
          setErrorMessage("Error updating project: " + error.message);
        });
    } else {
      const projectsRef = ref(db, 'projects/');
      push(projectsRef, newProject)
        .then(() => {
          clearForm();
        })
        .catch((error) => {
          setErrorMessage("Error adding project: " + error.message);
        });
    }
  };

  // Clear form inputs and error messages
  const clearForm = () => {
    setTitle('');
    setDes('');
    setSrc('');
    setErrorMessage('');
  };

  // Handle project deletion
  const handleDeleteProject = (id) => {
    const projectRef = ref(db, 'projects/' + id);
    remove(projectRef)
      .catch((error) => {
        setErrorMessage("Error deleting project: " + error.message);
      });
  };

  // Handle project editing
  const handleEditProject = (project) => {
    setTitle(project.title);
    setDes(project.des);
    setSrc(project.src);
    setCurrentProjectId(project.id);
    setEditMode(true);
    setErrorMessage(''); // Clear error message when entering edit mode
  };

  return (
    <section id="projects" className="w-full py-20 border-b-[1px] border-b-black">
      <div className="flex justify-center items-center text-center">
        <Title des="My Projects" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-14">
        {projects.map((project) => (
          <div key={project.id}>
            <ProjectsCard
              title={project.title}
              des={project.des}
              src={project.src}
            />
            <div className="flex justify-between mt-2">
              <button
                onClick={() => handleEditProject(project)}
                className="text-blue-500 hover:bg-blue-100 p-2 rounded transition duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteProject(project.id)}
                className="text-red-500 hover:bg-red-100 p-2 rounded transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form to add a new project */}
      <div className="mt-10">
        <h2 className="text-center text-xl font-bold">{editMode ? "Edit Your Project" : "Add Your Project"}</h2>
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        <form onSubmit={handleAddProject} className="flex flex-col items-center space-y-4">
          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full max-w-md p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            placeholder="Project Description"
            value={des}
            onChange={(e) => setDes(e.target.value)}
            className="w-full max-w-md p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={src}
            onChange={(e) => setSrc(e.target.value)}
            className="w-full max-w-md p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full max-w-md bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
          >
            {editMode ? "Update Project" : "Add Project"}
          </button>
          
        </form>
      </div>
    </section>
  );
};

export default Projects;

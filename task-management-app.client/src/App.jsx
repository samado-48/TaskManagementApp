import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Base URL for the API. Adjust if your backend runs on a different port/host.
  const API_BASE_URL = 'https://localhost:7106/api/tasks'; // Default for ASP.NET Core HTTPS development

  // Fetch tasks from the API
  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      setError('Failed to load tasks. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Effect hook to fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle adding a new task or updating an existing one
  const handleSaveTask = async (task) => {
    setIsLoading(true);
    setError(null);
    try {
      const method = task.id ? 'PUT' : 'POST';
      const url = task.id ? `${API_BASE_URL}/${task.id}` : API_BASE_URL;

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      if (method === 'POST' && !response.ok) {
        throw new Error(`Failed to create task! Status: ${response.status}`);
      } else if (method === 'PUT' && !response.ok && response.status !== 204) { // PUT often returns 204 No Content
         throw new Error(`Failed to update task! Status: ${response.status}`);
      }

      // Re-fetch tasks to update the list
      await fetchTasks();
      setEditingTask(null); // Clear editing state after save
    } catch (error) {
      console.error('Failed to save task:', error);
      setError(`Failed to save task: ${error.message}.`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle deleting a task
  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
        return; // User cancelled
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Failed to delete task! Status: ${response.status}`);
      }
      // Filter out the deleted task from the local state
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
      setError('Failed to delete task. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle toggling task completion status
  const handleToggleComplete = async (task) => {
    // Create a new task object with toggled completion status
    const updatedTask = { ...task, isCompleted: !task.isCompleted };
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/${updatedTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok && response.status !== 204) {
        throw new Error(`Failed to toggle task completion! Status: ${response.status}`);
      }
      // Update the task in the local state
      setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    } catch (error) {
      console.error('Failed to toggle task completion:', error);
      setError('Failed to update task status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="container mx-auto p-4 max-w-2xl bg-white shadow-lg rounded-xl my-4">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        My Task Manager
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center items-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <span className="ml-3 text-gray-700">Loading...</span>
        </div>
      )}

      <TaskForm
        taskToEdit={editingTask}
        onSave={handleSaveTask}
        onCancel={() => setEditingTask(null)}
      />

      <TaskList
        tasks={tasks}
        onEdit={setEditingTask}
        onDelete={handleDeleteTask}
        onToggleComplete={handleToggleComplete}
      />
    </div>
  );
}

export default App;
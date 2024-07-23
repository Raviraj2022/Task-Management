import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      //   const token = localStorage.getItem("authToken");
      //   console.log(token);
      if (!token) {
        alert("No authentication token found. Please log in.");
        navigate("/signin");
        return;
      }
      try {
        const response = await fetch("http://localhost:5000/crud/tasks", {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }); // Adjust URL as necessary
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleDelete = async () => {
    if (!token) {
      alert("No authentication token found. Please log in.");
      navigate("/signin");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5000/crud/tasks/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to delete the task");
        }

        alert("Task deleted successfully");
        // Optionally, refresh the list of tasks or navigate to another page
        navigate("/"); // Navigate to the homepage or refresh the task list
      } catch (error) {
        alert(error.message || "An error occurred");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mt-5">
      <button className="btn btn-primary btn-sm mx-1">
        <Link to="addtask" className="text-decoration-none text-light">
          Add New Task
        </Link>
      </button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">S.no</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Author</th>
            <th scope="col">Completed</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((task, index) => (
            <tr key={task._id}>
              <th scope="row">{index + 1}</th>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.author}</td>
              <td>{task.completed ? "Yes" : "No"}</td>
              <td>
                {/* Add action buttons here (e.g., Edit, Delete) */}
                <button className="btn btn-warning btn-sm mx-1">
                  <Link
                    to={`/task/${task._id}`}
                    className="text-decoration-none text-light"
                  >
                    Edit
                  </Link>
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;

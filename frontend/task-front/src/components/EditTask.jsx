import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditTask = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    author: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); // Gets the task ID from the URL
  const token = localStorage.getItem("authToken");
  useEffect(() => {
    if (!token) {
      alert("No authentication token found. Please log in.");
      navigate("/signin");
      return;
    }

    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:5000/crud/tasks/${id}`, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const task = await response.json();
        setInput({
          title: task.title,
          description: task.description,
          author: task.author,
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const token = localStorage.getItem("authToken");
    // if (!token) {
    //   alert("No authentication token found. Please log in.");
    //   navigate("/signin");
    //   return;
    // }
    if (!token) {
      alert("No authentication token found. Please log in.");
      navigate("/signin");
      return;
    }

    const response = await fetch(`http://localhost:5000/crud/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
    });
    const json = await response.json();
    if (response.ok) {
      alert("Task updated successfully");
      navigate("/"); // Redirect after successful update
    } else {
      alert(json.error || "An error occurred");
    }
  };

  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="container ">
        <form
          className="w-50 m-auto mt-5 border bg-dark border-success rounded"
          onSubmit={handleSubmit}
        >
          <h2 className="text-center text-light py-3 fw-bold fs-4">
            Edit Task
          </h2>
          <div className="m-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={input.title}
              onChange={handleChange}
              placeholder="Title"
            />
          </div>
          <div className="m-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={input.description}
              onChange={handleChange}
              placeholder="Description"
            />
          </div>
          <div className="m-3">
            <label htmlFor="author" className="form-label">
              Author
            </label>
            <input
              type="text"
              className="form-control"
              name="author"
              value={input.author}
              onChange={handleChange}
              placeholder="Author"
            />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;

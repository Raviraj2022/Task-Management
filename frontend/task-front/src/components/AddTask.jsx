import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const AddTask = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    author: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(input);
    const token = localStorage.getItem("authToken");
    // console.log(token);
    if (!token) {
      alert("No authentication token found. Please log in.");
      navigate("/signin");
      return;
    }
    const response = await fetch("http://localhost:5000/crud/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: input.title,
        description: input.description,
        author: input.author,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (response.ok) {
      alert("Task added successfully");
      navigate("/"); // or wherever you want to navigate after success
    } else {
      alert(json.error || "An error occurred");
    }
  };
  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };
  return (
    <div
    //   style={{
    //     backgroundImage:
    //       'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
    //     backgroundSize: "cover",
    //     height: "100vh",
    //   }}
    >
      <div className="container ">
        <form
          className="w-50 m-auto mt-5 border bg-dark border-success rounded"
          onSubmit={handleSubmit}
        >
          <h2 className="text-center text-light py-3 fw-bold fs>4">Add Task</h2>
          <div className="m-3">
            <label htmlFor="name" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={input.title}
              onChange={handleChange}
              placeholder="title"
            />
          </div>
          <div className="m-3">
            <label htmlFor="email" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={input.description}
              onChange={handleChange}
              aria-describedby="emailHelp"
              placeholder="Description here"
            />
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              author
            </label>
            <input
              type="text"
              className="form-control"
              value={input.author}
              onChange={handleChange}
              name="author"
              placeholder="author"
            />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Add task
          </button>
          {/* <Link to="/login" className="m-3 mx-1 btn btn-danger">
            Already a user
          </Link> */}
        </form>
      </div>
    </div>
  );
};

export default AddTask;

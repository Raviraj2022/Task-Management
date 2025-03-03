import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log( JSON.stringify({
    //   name: input.name,
    //   email: input.email,
    //   password: input.password,
    //   location: input.location,
    // }));
    console.log(input);
    const response = await fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: input.username,
        email: input.email,
        password: input.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      alert("Enter valid credential");
    } else {
      navigate("/signin");
    }
  };
  const handleChange = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };
  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <div className="container ">
        <form
          className="w-50 m-auto mt-5 border bg-dark border-success rounded"
          onSubmit={handleSubmit}
        >
          <h2 className="text-center text-light py-3 fw-bold fs>4">Sign Up</h2>
          <div className="m-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="username"
              value={input.username}
              onChange={handleChange}
              placeholder="Pls Name Here"
            />
          </div>
          <div className="m-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={input.email}
              onChange={handleChange}
              aria-describedby="emailHelp"
              placeholder="Email Address"
            />
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={input.password}
              onChange={handleChange}
              name="password"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/login" className="m-3 mx-1 btn btn-danger">
            Already a user
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

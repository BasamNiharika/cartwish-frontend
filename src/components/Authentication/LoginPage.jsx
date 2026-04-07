import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import "./LoginPage.css";
import { getUser, login } from "../../services/userService";
import { Navigate, useLocation } from "react-router-dom";

const schema = z.object({
  email: z.string().email({ message: "Please enter your name" }).min(3),
  password: z.string().min(8),
});

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  // console.log(errors);

  const [formError, setFormError] = useState("");
  const location = useLocation();

  const onSubmit = async (formData) => {
    try {
      await login(formData);

      const {state} = location;
      window.location = state ? state.from : "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setFormError(error.response.data.message);
        console.log(error);
      }
    }
    console.log(formData);
  };

  if(getUser()){
    return <Navigate to="/" />
  }

  return (
    <section className=" align_center login_page">
      <form action="" className="login_form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login Form</h2>
        <div>
          <div className="form_inputs">
            <label htmlFor="email" className="form_label">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="form_text_input"
              placeholder="Enter your email"
              {...register("email", { required: true, minLength: 3 })}
            />
            {errors.email && (
              <em className="error_message">{errors.email.message}</em>
            )}
          </div>
          <div className="form_inputs">
            <label htmlFor="password" className="form_label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form_text_input"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <em className="error_message">{errors.password.message}</em>
            )}
          </div>
          {formError && <em className="form_error">{formError}</em>}
        </div>

        <button type="submit" className="search_button form_submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default LoginPage;

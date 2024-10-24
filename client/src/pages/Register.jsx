import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.scss";

const Register = () => {
  const [formData, setFormData] = useState({
    profileImage: null,
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword ||
        formData.confirmPassword === ""
    );
  }, [formData.password, formData.confirmPassword]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      profileImage: "",
    };

    if (!formData.username) errors.username = "Username is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    if (!formData.confirmPassword)
      errors.confirmPassword = "Please confirm your password";
    if (!formData.profileImage)
      errors.profileImage = "Profile image is required";
    if (!passwordMatch) errors.confirmPassword = "Passwords do not match";

    setError(errors);

    if (Object.values(errors).every((err) => err === "")) {
      try {
        const register_form = new FormData();
        for (let key in formData) {
          register_form.append(key, formData[key]);
        }

        const response = await fetch("https://momentstay.onrender.com/auth/register", {
          method: "POST",
          body: register_form,
        });
        if (response.ok) {
          setSuccess("Registered successfully");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          const result = await response.json();
          setError({
            ...errors,
            general: result.message || " Registration Failed!!",
          });
        }
      } catch (err) {
        setError({
          ...errors,
          general: " Registration Failed!! " + err.message,
        });
      }
    }
  };

  return (
    <div className="register">
      <div className="register_content">
        <h1>Sign up</h1>
        <div className="profile-image-wrapper">
          <input
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleChange}
            required
          />
          <label htmlFor="image">
            {formData.profileImage ? (
              <img
                src={URL.createObjectURL(formData.profileImage)}
                alt="Profile"
              />
            ) : (
              <>
                <img src="/assets/person.png" alt="Default Profile" />
                <p>Upload Profile Picture</p>
              </>
            )}
            {error.profileImage && (
              <p style={{ color: "red" }}>{error.profileImage}</p>
            )}
          </label>
        </div>
        <form className="register_content_form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {error.username && <p style={{ color: "red" }}>{error.username}</p>}
          </div>
          <div className="form-group">
            <input
              placeholder="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            {error.email && <p style={{ color: "red" }}>{error.email}</p>}
          </div>
          <div className="form-group">
            <input
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
            />
            {error.password && <p style={{ color: "red" }}>{error.password}</p>}
          </div>
          <div className="form-group">
            <input
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              type="password"
            />
            {error.confirmPassword && (
              <p style={{ color: "red" }}>{error.confirmPassword}</p>
            )}
          </div>
          <button type="submit">REGISTER</button>
        </form>
        <span style={{ textAlign: "center", marginTop: "8%" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "blue" }}>
            Login
          </a>{" "}
          here
        </span>
        {success && (
          <p style={{ color: "green", textAlign: "center", marginTop: "2%" }}>
            {success}
          </p>
        )}
        {error.general && (
          <p style={{ color: "red", textAlign: "center", marginTop: "2%" }}>
            {error.general}
          </p>
        )}
      </div>
    </div>
  );
};

export default Register;

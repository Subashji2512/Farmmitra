import { useState } from "react";
import translations from "./translations";

function BasicSignup({ language, onNext, onBack }) {
  const text = translations[language] || translations.en;

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    // Username validation
    if (!username.trim()) {
      setError(text.requiredUsername);
      return;
    }

    // Phone validation
    if (!phone.trim()) {
      setError(text.requiredPhone);
      return;
    }

    // Indian phone number validation
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError(text.invalidPhone);
      return;
    }

    // Email validation
    if (!email.trim()) {
      setError(text.requiredEmail);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(text.invalidEmail);
      return;
    }

    // Password validation
    if (!password) {
      setError(text.requiredPassword);
      return;
    }

    if (password.length < 6) {
      setError(text.passwordMin);
      return;
    }

    // Confirm password
    if (!confirmPassword) {
      setError(text.requiredConfirm);
      return;
    }

    if (password !== confirmPassword) {
      setError(text.passwordMismatch);
      return;
    }

    // Send signup data to App.jsx
    onNext({
      username,
      phone,
      email,
      password,
    });
  };

  return (
    <div className="signup-container">
      <div className="signup-card">

        <h1>{text.createAccount}</h1>

        <p className="signup-subtitle">
          {text.subtitle}
        </p>

        <form onSubmit={handleSubmit}>

          {/* USERNAME */}
          <div className="input-group">
            <label>{text.username}</label>

            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              placeholder={text.enterUsername}
            />
          </div>


          {/* PHONE */}
          <div className="input-group">
            <label>{text.phone}</label>

            <div className="phone-input-wrapper">
              <span className="country-code">
                +91
              </span>

              <input
                type="tel"
                value={phone}
                maxLength={10}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setPhone(value);
                  setError("");
                }}
                placeholder={text.enterPhone}
              />
            </div>
          </div>


          {/* EMAIL */}
          <div className="input-group">
            <label>{text.email}</label>

            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder={text.enterEmail}
            />
          </div>


          {/* PASSWORD */}
          <div className="input-group">
            <label>{text.password}</label>

            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder={text.createPassword}
            />
          </div>


          {/* CONFIRM PASSWORD */}
          <div className="input-group">
            <label>{text.confirmPassword}</label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
              placeholder={text.confirmYourPassword}
            />
          </div>


          {/* ERROR */}
          {error && (
            <p className="form-error">
              {error}
            </p>
          )}


          {/* NEXT */}
          <button
            type="submit"
            className="signup-next"
          >
            {text.next}
          </button>

        </form>


        {/* BACK */}
        <button
          type="button"
          className="signup-back"
          onClick={onBack}
        >
          {text.backToLanguage}
        </button>

      </div>
    </div>
  );
}

export default BasicSignup;
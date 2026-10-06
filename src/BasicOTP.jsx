import { useState } from "react";
import translations from "./translations";

function BasicOTP({
  email,
  language,
  onVerify,
  onBack,
}) {
  const text = translations[language] || translations.en;

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleVerify = (e) => {
    e.preventDefault();

    setError("");

    if (!/^\d{6}$/.test(otp)) {
      setError(text.invalidOtp);
      return;
    }

    // Temporary verification
    // Real backend OTP verification will be connected later.
    onVerify(otp);
  };

  return (
    <div className="signup-container">
      <div className="signup-card">

        <h1>{text.verifyOtp}</h1>

        <p className="signup-subtitle">
          {text.enterOtpSentTo}
        </p>

        <p className="otp-email">
          <strong>{email}</strong>
        </p>


        <form onSubmit={handleVerify}>

          {/* OTP */}
          <div className="input-group">
            <label>{text.otp}</label>

            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");

                setOtp(value);
                setError("");
              }}
              placeholder={text.enter6DigitOtp}
            />
          </div>


          {/* ERROR */}
          {error && (
            <p className="form-error">
              {error}
            </p>
          )}


          {/* VERIFY */}
          <button
            type="submit"
            className="signup-next"
          >
            {text.verify}
          </button>

        </form>


        {/* BACK */}
        <button
          type="button"
          className="signup-back"
          onClick={onBack}
        >
          {text.backToSignup}
        </button>

      </div>
    </div>
  );
}

export default BasicOTP;
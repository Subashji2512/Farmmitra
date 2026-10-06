import { useState } from "react";

function PreferredLanguage({ onNext, onBack }) {
  const [language, setLanguage] = useState("en");

  const languages = [
    {
      code: "en",
      name: "English",
      nativeName: "English",
    },
    {
      code: "ta",
      name: "Tamil",
      nativeName: "தமிழ்",
    },
    {
      code: "kn",
      name: "Kannada",
      nativeName: "ಕನ್ನಡ",
    },
    {
      code: "te",
      name: "Telugu",
      nativeName: "తెలుగు",
    },
    {
      code: "hi",
      name: "Hindi",
      nativeName: "हिन्दी",
    },
    {
      code: "ml",
      name: "Malayalam",
      nativeName: "മലയാളം",
    },
  ];

  const handleNext = () => {
    onNext(language);
  };

  return (
    <div className="language-form">

      <div className="language-header">

        <h1>Welcome to FarmMitra</h1>

        <p>
          Choose your preferred language
        </p>

      </div>


      <div className="language-list">

        {languages.map((item) => (

          <button
            key={item.code}
            type="button"
            className={`language-option ${
              language === item.code
                ? "selected"
                : ""
            }`}
            onClick={() =>
              setLanguage(item.code)
            }
          >

            <span className="language-radio">

              {language === item.code && (
                <span className="radio-dot"></span>
              )}

            </span>

            <span className="language-name">
              {item.nativeName}
            </span>

            <span className="language-english">
              {item.name}
            </span>

          </button>

        ))}

      </div>


      <button
        type="button"
        className="language-next"
        onClick={handleNext}
      >
        Next →
      </button>


      <button
        type="button"
        className="language-back"
        onClick={onBack}
      >
        ← Back to Login
      </button>

    </div>
  );
}

export default PreferredLanguage;
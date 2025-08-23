import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

export default function Welcome() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const text = "BegumSaab";

  return (
    <div className="welcome-container">
      {/* Animated Characters */}
      <h1 className="app-title">
        {text.split("").map((char, index) => (
          <span key={index} style={{ animationDelay: `${index * 0.2}s` }}>
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
}

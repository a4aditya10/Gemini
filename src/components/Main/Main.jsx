import React, { useContext, useState, useMemo } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input
  } = useContext(Context);

  // Array of prompt suggestions grouped by category
  const allPromptSuggestions = [
    {
      text: "Suggest beautiful places to see on an upcoming road trip",
      icon: assets.compass_icon
    },
    {
      text: "Briefly summarize this concept: urban planning",
      icon: assets.bulb_icon
    },
    {
      text: "Brainstorm team bonding activities for our work retreat",
      icon: assets.message_icon
    },
    {
      text: "Improve the readability of the following code",
      icon: assets.code_icon
    },
    {
      text: "Write a professional email declining a meeting invitation",
      icon: assets.message_icon
    },
    {
      text: "Create a weekly meal plan for a vegetarian diet",
      icon: assets.bulb_icon
    },
    {
      text: "Explain quantum computing in simple terms",
      icon: assets.bulb_icon
    },
    {
      text: "Generate creative names for a new coffee shop",
      icon: assets.message_icon
    },
    {
      text: "Design a 30-minute workout routine for beginners",
      icon: assets.compass_icon
    },
    {
      text: "Debug this JavaScript promise chain",
      icon: assets.code_icon
    },
    {
      text: "Suggest indoor activities for a rainy day",
      icon: assets.compass_icon
    },
    {
      text: "Write a product description for a smart water bottle",
      icon: assets.message_icon
    },
    {
      text: "Explain the basics of investment diversification",
      icon: assets.bulb_icon
    },
    {
      text: "Create a study schedule for final exams",
      icon: assets.compass_icon
    },
    {
      text: "Optimize this SQL query for better performance",
      icon: assets.code_icon
    },
    {
      text: "Suggest eco-friendly alternatives to common household items",
      icon: assets.bulb_icon
    },
    {
      text: "Write a congratulatory message for a job promotion",
      icon: assets.message_icon
    },
    {
      text: "Plan a birthday party for a 10-year-old",
      icon: assets.compass_icon
    },
    {
      text: "Debug this React useEffect hook",
      icon: assets.code_icon
    },
    {
      text: "Create a morning routine for better productivity",
      icon: assets.bulb_icon
    }
  ];

  // Function to shuffle array using Fisher-Yates algorithm
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Get 4 random prompts using useMemo to prevent re-shuffling on every render
  const randomPrompts = useMemo(() => {
    return shuffleArray(allPromptSuggestions).slice(0, 4);
  }, []); // Empty dependency array means this will only run once when component mounts

  // Function to handle card click
  const handleCardClick = (promptText) => {
    setInput(promptText);
    // Optionally, you can also trigger the send action immediately:
    // setTimeout(() => onSent(), 100);
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {showResult ? (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr className="animated-bg" />
                  <hr className="animated-bg" />
                  <hr className="animated-bg" />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="greet">
              <p><span>Hey,</span></p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              {randomPrompts.map((prompt, index) => (
                <div
                  key={index}
                  className="card"
                  onClick={() => handleCardClick(prompt.text)}
                  role="button"
                  tabIndex={0}
                >
                  <p>{prompt.text}</p>
                  <img src={prompt.icon} alt="" />
                </div>
              ))}
            </div>
          </>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} width={30} alt="" />
              <img src={assets.mic_icon} width={30} alt="" />
              {input ? (
                <img
                  onClick={() => onSent()}
                  src={assets.send_icon}
                  width={30}
                  alt=""
                />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
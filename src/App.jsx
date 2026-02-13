import React, { useState, useEffect } from 'react';
import { Heart, AlertTriangle, RefreshCw, Star, Sparkles, X } from 'lucide-react';

export default function BoyfriendExe() {
  useEffect(() => {
    // Load Plus Jakarta Sans font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);
  const [screen, setScreen] = useState('landing');
  const [shaking, setShaking] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('');
  const [ratings, setRatings] = useState({
    cooking: 0,
    humor: 0,
    romantic: 0,
    handsome: 0
  });
  const [fortuneCount, setFortuneCount] = useState(0);
  const [adventureStep, setAdventureStep] = useState(0);
  const [wouldYouRatherStep, setWouldYouRatherStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [completed, setCompleted] = useState({
    repair: false,
    timeline: false,
    uninstall: false,
    diagnostics: false,
    fortune: false,
    rating: false
  });
  const [forceRemoveClicks, setForceRemoveClicks] = useState(0);
  const [reactionTimeout, setReactionTimeout] = useState(null);
  const [userChoices, setUserChoices] = useState({
    adventureChoices: [],
    wouldYouRatherAnswers: [],
    ratings: {},
    forceRemoveAttempts: 0,
    timelineViewed: false,
    completedSections: []
  });

  const allCompleted = () => {
    return Object.values(completed).every(val => val === true);
  };

  const returnToMenu = () => {
    setScreen('chaos');
  };

  const fortunes = [
    "You will say 'it's been a while… 🥱' But not really. You were always here.",
    "You will send everything at once — photos, thoughts, links, feelings — because closeness looks like sharing everything.",
    "You will call him late at night. He'll answer on the first ring. Every time.",
    "Your phone will die at 4%. Right in the middle of saying something important. He'll wait.",
    "You will both choose each other. Every night. Every morning. Naturally. Always."
  ];

  const wouldYouRatherQuestions = [
    {
      question: "Would You Rather:",
      options: ["Re-create romantic videos together", "Wait for Valentine's 2027"],
      reactions: [
        "Warning: Will require unlimited data and those late-night Facebook links.",
        "Error: 'It's been a while 🥱' complaints will increase by 400%."
      ]
    },
    {
      question: "Would You Rather:",
      options: ["Love letters and candy", "Modern Valentine's surprises"],
      reactions: [
        "Classic romance. Old school, but effective.",
        "Tech guy approved. Zero fax machines required."
      ]
    }
  ];



  const timelinePhotos = [
    { src: `${import.meta.env.BASE_URL}1.jpg`, alt: 'Our first picture together', caption: 'The first one. The beginning of everything. I remember exactly how it felt.', width: 960, height: 1280 },
    { src: `${import.meta.env.BASE_URL}2.jpg`, alt: 'Through the tough times together', caption: 'The tough times. When we chose to stay. When I learned what you meant by "my rock."', width: 2334, height: 4160 },
    { src: `${import.meta.env.BASE_URL}3.jpg`, alt: 'Food date memory', caption: 'One of those ordinary moments. Good food. Better company. Just us.', width: 3120, height: 4160 },
    { src: `${import.meta.env.BASE_URL}4.jpg`, alt: 'Quiet park moment together', caption: 'Sitting together. Quiet. Comfortable. The silence that felt safe.', width: 4160, height: 3120 },
    { src: `${import.meta.env.BASE_URL}5.jpg`, alt: 'Car selfie from the end of 2025', caption: 'Car selfies. Your smile. Ending the year with you. About to start a new one together.', width: 4896, height: 6528 },
    { src: `${import.meta.env.BASE_URL}6.jpg`, alt: 'Holding hands memory', caption: 'Your hand in mine. The last pictures of 2025. Ready for everything that comes next.', width: 3072, height: 4080 }
  ];

  const adventureStory = [
    {
      text: "You see your boyfriend planning Valentine's Day. He's researching romantic gestures on Google like 'how to impress aspiring attorney girlfriend.' Do you:",
      choices: ["Trust the tech guy's planning", "Send him 15 reference videos from Facebook"]
    },
    {
      trust: "He smiles and continues typing. You notice he's taking notes. Your heart races.",
      panic: "He laughs: 'My sister, I already saw those videos. But thank you for the 47 media files in 1 minute.'",
      choices: ["Wait patiently", "Ask 'It's been a while 🥱?'"]
    },
    {
      text: "He built this entire system. Not to show off. Just to see you smile. To show you he sees you.",
      final: true
    }
  ];

  const handleBigRedButton = () => {
    setShaking(true);
    setShowConfetti(true);
    
    setTimeout(() => {
      setShaking(false);
      setScreen('chaos');
    }, 1500);
    
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleUninstall = () => {
    setScreen('uninstalling');
    setLoadingProgress(0);
    
    const messages = [
      "Trying to remove the quiet moments on call...",
      "Trying to delete the sound of your voice when you're tired...",
      "Trying to erase the silence that felt safe...",
      "Trying to forget the way you say my name at 2 AM...",
      "Trying to disconnect from the calls that mattered most..."
    ];
    
    let messageIndex = 0;
    setLoadingText(messages[0]);
    
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setScreen('cannot-uninstall'), 500);
          return 100;
        }
        
        if (prev > 20 && messageIndex === 0) {
          messageIndex = 1;
          setLoadingText(messages[1]);
        } else if (prev > 40 && messageIndex === 1) {
          messageIndex = 2;
          setLoadingText(messages[2]);
        } else if (prev > 60 && messageIndex === 2) {
          messageIndex = 3;
          setLoadingText(messages[3]);
        } else if (prev > 80 && messageIndex === 3) {
          messageIndex = 4;
          setLoadingText(messages[4]);
        }
        
        return prev + 2;
      });
    }, 50);
  };

  const handleRateSystem = () => {
    if (ratings.cooking === 0 || ratings.humor === 0 || ratings.romantic === 0 || ratings.handsome === 0) {
      alert("Please rate all categories!");
      return;
    }
    
    // Track her ratings
    setUserChoices(prev => ({
      ...prev,
      ratings: ratings,
      completedSections: [...prev.completedSections, 'Rating']
    }));
    
    setScreen('processing-feedback');
    setTimeout(() => setScreen('feedback-result'), 2000);
  };

  const handleFortuneTelling = () => {
    if (completed.fortune) {
      // Already completed, just show the forecast
      setScreen('final-forecast');
    } else {
      // Start from beginning
      setFortuneCount(0);
      setScreen('fortune-result');
    }
  };

  const handleWouldYouRather = (choice, index) => {
    // Track her choice
    setUserChoices(prev => ({
      ...prev,
      wouldYouRatherAnswers: [...prev.wouldYouRatherAnswers, { question: wouldYouRatherQuestions[wouldYouRatherStep].question, choice: choice }]
    }));

    setAnswers([...answers, index]); // Store the index (0 or 1) instead of the text
    setScreen('wyr-reaction');
    
    const timeoutId = setTimeout(() => {
      if (wouldYouRatherStep < wouldYouRatherQuestions.length - 1) {
        setWouldYouRatherStep(prev => prev + 1);
        setScreen('diagnostics');
      } else {
        setScreen('compatibility-result');
      }
      setReactionTimeout(null);
    }, 7000); // 7 seconds to read the reaction
    
    setReactionTimeout(timeoutId);
  };

  const skipReaction = () => {
    if (reactionTimeout) {
      clearTimeout(reactionTimeout);
      setReactionTimeout(null);
      if (wouldYouRatherStep < wouldYouRatherQuestions.length - 1) {
        setWouldYouRatherStep(prev => prev + 1);
        setScreen('diagnostics');
      } else {
        setScreen('compatibility-result');
      }
    }
  };

  const renderStars = (category, count) => {
    const starSize = count > 8 ? 20 : 24; // Smaller stars when there are many
    const gap = count > 8 ? '0.3rem' : '0.5rem'; // Smaller gap when there are many
    return (
      <div className="star-container" style={{ gap }}>
        {[...Array(count)].map((_, i) => (
          <Star
            key={i}
            size={starSize}
            fill={ratings[category] > i ? '#ff4757' : 'transparent'}
            stroke={ratings[category] > i ? '#ff4757' : '#333'}
            onClick={() => setRatings({...ratings, [category]: i + 1})}
            style={{ cursor: 'pointer', transition: 'all 0.2s' }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="app-container">
      {/* Scanline Overlay */}
      <div className="scanlines"></div>
      
      {/* CRT Glow Overlay */}
      <div className="crt-curve"></div>
      
      {/* Noise Background */}
      <div className="noise-bg"></div>

      {/* Phone Frame */}
      <div className={`phone-frame ${shaking ? 'shake' : ''}`}>
        {/* Status Bar */}
        <div className="status-bar">
          <span className="status-time">11/01/2024</span>
          <div className="status-icons">
            <span className="status-dot"></span>
            <span className="status-text">Baby Love ❤️</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="screen-content">
          {showConfetti && (
            <div className="confetti-container">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="confetti"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 0.5}s`,
                    backgroundColor: ['#ee2b34', '#ff6348', '#ff7675', '#fd79a8'][Math.floor(Math.random() * 4)]
                  }}
                />
              ))}
            </div>
          )}

      {screen === 'landing' && (
        <div className="screen landing-screen">
          <div className="glitch-container">
            <h1 className="title glitch" data-text="BOYFRIEND.EXE">BOYFRIEND.EXE</h1>
            <p className="subtext" style={{ maxWidth: '500px', margin: '1rem auto', lineHeight: '1.6', fontSize: '1rem' }}>
              It's been a while… 🥱<br/>
              But not really. You were always here.<br/>
              In the calls. In the quiet. In the ordinary moments<br/>
              that somehow became everything.
            </p>
          </div>
          <div className="button-container">
            <button className="big-red-button" onClick={handleBigRedButton}>
              <span className="pulse"></span>
              DO NOT PRESS
            </button>
          </div>
        </div>
      )}

      {screen === 'chaos' && (
        <div className="screen chaos-screen">
          {!allCompleted() ? (
            <>
              <div className="error-box glitch-text">
                <AlertTriangle size={48} color="#ee2b34" />
                <h2>CRITICAL ERROR DETECTED</h2>
                <p className="typewriter">Heart.sys compromised. Emotional overflow imminent.</p>
                <div className="progress-indicator">
                  <p className="progress-text">System Repair Progress: {Object.values(completed).filter(v => v).length}/6</p>
                </div>
              </div>
              
              <div className="button-grid">
                <button className="menu-button" onClick={() => setScreen('adventure')}>
                  <RefreshCw size={20} />
                  Attempt System Repair {completed.repair && '✓'}
                </button>
                
                {completed.repair && (
                  <button className="menu-button" onClick={() => setScreen('timeline')}>
                    <Heart size={20} />
                    View Timeline {completed.timeline && '✓'}
                  </button>
                )}
                
                {completed.timeline && (
                  <button className="menu-button" onClick={handleUninstall}>
                    <X size={20} />
                    Uninstall Boyfriend? {completed.uninstall && '✓'}
                  </button>
                )}
                
                {completed.uninstall && (
                  <button className="menu-button" onClick={() => setScreen('diagnostics')}>
                    <Sparkles size={20} />
                    Run Diagnostics {completed.diagnostics && '✓'}
                  </button>
                )}
                
                {completed.diagnostics && (
                  <button className="menu-button" onClick={handleFortuneTelling}>
                    <Star size={20} />
                    Predict Future {completed.fortune && '✓'}
                  </button>
                )}
                
                {completed.fortune && (
                  <button className="menu-button" onClick={() => setScreen('rate-system')}>
                    <Heart size={20} />
                    Rate System Performance {completed.rating && '✓'}
                  </button>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="success-box">
                <Heart size={64} fill="#ee2b34" color="#ee2b34" className="beating-heart" />
                <h2 className="success-title">SYSTEM RESTORED</h2>
                <p className="terminal-text">All diagnostics complete.</p>
                <p className="terminal-text">She called me her rock once. I didn't correct her.</p>
                <p className="terminal-text">I just stayed.</p>
              </div>
              
              <button 
                className="menu-button final-button" 
                onClick={() => setScreen('final-reveal')}
              >
                <Heart size={20} />
                View System Message
              </button>
            </>
          )}
        </div>
      )}

      {screen === 'uninstalling' && (
        <div className="screen uninstall-screen">
          <div className="terminal-box">
            <p className="terminal-text">{loadingText}</p>
            <div className="loading-bar">
              <div className="loading-fill" style={{ width: `${loadingProgress}%` }}></div>
            </div>
            <p className="terminal-text">{loadingProgress}%</p>
          </div>
        </div>
      )}

      {screen === 'cannot-uninstall' && (
        <div className="screen error-screen">
          <style>{`
            @keyframes violentShake${forceRemoveClicks} {
              0%, 100% { transform: translate(0, 0) rotate(0deg); }
              10% { transform: translate(${-5 * forceRemoveClicks}px, ${5 * forceRemoveClicks}px) rotate(${-2 * forceRemoveClicks}deg); }
              20% { transform: translate(${5 * forceRemoveClicks}px, ${-5 * forceRemoveClicks}px) rotate(${2 * forceRemoveClicks}deg); }
              30% { transform: translate(${-8 * forceRemoveClicks}px, ${-3 * forceRemoveClicks}px) rotate(${-3 * forceRemoveClicks}deg); }
              40% { transform: translate(${8 * forceRemoveClicks}px, ${3 * forceRemoveClicks}px) rotate(${3 * forceRemoveClicks}deg); }
              50% { transform: translate(${-10 * forceRemoveClicks}px, ${-8 * forceRemoveClicks}px) rotate(${-4 * forceRemoveClicks}deg); }
              60% { transform: translate(${10 * forceRemoveClicks}px, ${8 * forceRemoveClicks}px) rotate(${4 * forceRemoveClicks}deg); }
              70% { transform: translate(${-5 * forceRemoveClicks}px, ${5 * forceRemoveClicks}px) rotate(${-2 * forceRemoveClicks}deg); }
              80% { transform: translate(${5 * forceRemoveClicks}px, ${-5 * forceRemoveClicks}px) rotate(${2 * forceRemoveClicks}deg); }
              90% { transform: translate(${-3 * forceRemoveClicks}px, ${3 * forceRemoveClicks}px) rotate(${-1 * forceRemoveClicks}deg); }
            }
          `}</style>
          <div 
            className="error-box"
            style={{
              animation: forceRemoveClicks > 0 ? `violentShake${forceRemoveClicks} 0.5s ease-in-out` : 'none'
            }}
          >
            <h2 className="error-code">ERROR 143</h2>
            <p className="error-message">Cannot remove.</p>
            <p className="error-details">Boyfriend permanently woven into every thought, every breath.</p>
            <p className="error-details">Embedded in the quiet moments on call. The tired voice at night. The silence that felt safe.</p>
            <p className="error-details">She says it twice when she's joking. She says it again when she needs reassurance. I always hear the difference.</p>
            <p className="error-details">Removal would delete the sound of her voice. The way she says my name.</p>
            <p className="error-details">System cannot function without her.</p>
            
            <div className="choice-buttons-container">
              <button 
                className="menu-button force-remove-button" 
                onClick={() => {
                  setForceRemoveClicks(prev => prev + 1);
                  setUserChoices(prev => ({
                    ...prev,
                    forceRemoveAttempts: prev.forceRemoveAttempts + 1
                  }));
                }}
              >
                Force Remove
              </button>
              <button 
                className="menu-button accept-button growing-button" 
                onClick={() => {
                  setForceRemoveClicks(0);
                  setScreen('accepted');
                }}
                style={{
                  transform: `scale(${1 + forceRemoveClicks * 0.5})`,
                  zIndex: forceRemoveClicks > 0 ? 10 : 1,
                  transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              >
                Accept Fate ❤️
              </button>
            </div>
          </div>
        </div>
      )}

      {screen === 'accepted' && (
        <div className="screen accept-screen">
          <div className="heart-pulse">
            <Heart size={80} fill="#ee2b34" color="#ee2b34" className="beating-heart" />
          </div>
          <p className="love-text">She doesn't need grand gestures. She notices presence. She notices consistency.</p>
          <p className="love-text">Fate accepted. You're mine. I'm yours.</p>
          <button className="menu-button" onClick={() => {
            setForceRemoveClicks(0);
            setCompleted({...completed, uninstall: true});
            returnToMenu();
          }}>
            Return to Menu
          </button>
        </div>
      )}

      {screen === 'diagnostics' && (
        <div className="screen diagnostics-screen">
          <div className="terminal-box">
            <h2 className="terminal-title">COMPATIBILITY DIAGNOSTICS</h2>
            <p className="terminal-text">Incoming call detected. All background tasks paused. Even the show I was already watching.</p>
            <p className="terminal-text">To verify compatibility (even though it's already certain), please answer:</p>
            
            <div className="wyr-question">
              <h3>{wouldYouRatherQuestions[wouldYouRatherStep].question}</h3>
              <div className="choice-buttons">
                {wouldYouRatherQuestions[wouldYouRatherStep].options.map((option, i) => (
                  <button
                    key={i}
                    className="menu-button"
                    onClick={() => handleWouldYouRather(option, i)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {screen === 'wyr-reaction' && (
        <div className="screen reaction-screen" onClick={skipReaction} style={{ cursor: 'pointer' }}>
          <div className="terminal-box">
            <AlertTriangle size={40} color="#ffa502" />
            <p className="terminal-text warning-text">
              {wouldYouRatherQuestions[wouldYouRatherStep].reactions[answers[answers.length - 1]]}
            </p>
            <p className="skip-hint">Click anywhere to continue</p>
          </div>
        </div>
      )}

      {screen === 'compatibility-result' && (
        <div className="screen result-screen">
          <div className="terminal-box">
            <h2 className="success-title">Compatibility Result: 100%</h2>
            <p className="terminal-text">No matter what you choose, you're stuck with him.</p>
            <p className="terminal-text">Even when he explains tech things. Even when your phone dies at 4%.</p>
            <p className="terminal-text">Especially then.</p>
            <button className="menu-button" onClick={() => {
              setWouldYouRatherStep(0);
              setAnswers([]);
              setCompleted({...completed, diagnostics: true});
              returnToMenu();
            }}>
              Return to Menu
            </button>
          </div>
        </div>
      )}

      {screen === 'rate-system' && (
        <div className="screen rate-screen">
          <div className="rating-box">
            <h2 className="rating-title">SYSTEM PERFORMANCE REVIEW</h2>
            
            <div className="rating-category">
              <label>Cooking Skills</label>
              {renderStars('cooking', 2)}
            </div>
            
            <div className="rating-category">
              <label>Humor</label>
              {renderStars('humor', 4)}
            </div>
            
            <div className="rating-category">
              <label>Romantic Ability</label>
              {renderStars('romantic', 8)}
            </div>
            
            <div className="rating-category">
              <label>Handsomeness</label>
              {renderStars('handsome', 16)}
            </div>
            
            <button className="menu-button submit-button" onClick={handleRateSystem}>
              Submit Feedback
            </button>
          </div>
        </div>
      )}

      {screen === 'processing-feedback' && (
        <div className="screen processing-screen">
          <div className="spinner"></div>
          <p className="terminal-text">Processing feedback...</p>
        </div>
      )}

      {screen === 'feedback-result' && (
        <div className="screen result-screen">
          <div className="terminal-box">
            <h2 className="terminal-title">Feedback received.</h2>
            <p className="terminal-text">Adjustments will not be made.</p>
            <p className="terminal-text">System believes it is perfect for you.</p>
            <p className="love-text" style={{ marginTop: '2rem' }}>Emotionally expressive. Soft, but never passive. Playful — with intention.</p>
            <p className="love-text">Thank you for choosing me, future attorney.</p>
            <button className="menu-button" onClick={() => {
              setRatings({ cooking: 0, humor: 0, romantic: 0, handsome: 0 });
              setCompleted({...completed, rating: true});
              returnToMenu();
            }}>
              Return to Menu
            </button>
          </div>
        </div>
      )}

      {screen === 'fortune-result' && (
        <div className="screen fortune-screen">
          <div className="fortune-box">
            <Sparkles size={48} color="#ffd93d" />
            <p className="fortune-text">{fortunes[fortuneCount]}</p>
            <p className="fortune-progress">{fortuneCount + 1} of {fortunes.length}</p>
            <button className="menu-button" onClick={() => {
              if (fortuneCount + 1 >= fortunes.length) {
                setScreen('final-forecast');
              } else {
                setFortuneCount(prev => prev + 1);
              }
            }}>
              {fortuneCount + 1 >= fortunes.length ? 'View Final Forecast' : 'Next Fortune'}
            </button>
          </div>
        </div>
      )}

      {screen === 'final-forecast' && (
        <div className="screen result-screen">
          <div className="terminal-box">
            <h2 className="success-title">Final Forecast:</h2>
            <p className="terminal-text">Shared growth detected.</p>
            <p className="terminal-text">Late nights. Big plans spoken softly.</p>
            <p className="love-text" style={{ marginTop: '2rem' }}>Future outlook: Ambitious. Disciplined. Together.</p>
            <button className="menu-button" onClick={() => {
              setFortuneCount(0);
              setCompleted({...completed, fortune: true});
              returnToMenu();
            }}>
              Return to Menu
            </button>
          </div>
        </div>
      )}

      {screen === 'timeline' && (
        <div className="screen timeline-screen">
          <div className="terminal-box">
            <h2 className="terminal-title">OUR STORY IN PICTURES</h2>
            <p className="terminal-text" style={{ fontStyle: 'italic', marginBottom: '2rem', opacity: 0.8 }}>
              We started talking sometime in 2023.<br/>
              Met on the first day of 2024.<br/>
              Started dating on… one of those January days we still joke about.
            </p>

            <div className="timeline-moments">
              {timelinePhotos.map((photo, index) => (
                <div className="timeline-moment" key={photo.src}>
                  <div
                    className="timeline-image-placeholder"
                    style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
                  >
                    <img src={photo.src} alt={photo.alt} className="timeline-image" loading={index < 2 ? 'eager' : 'lazy'} />
                  </div>
                  <div className="timeline-caption">
                    <p className="timeline-text">{photo.caption}</p>
                  </div>
                </div>
              ))}
            </div>


            <p className="terminal-text" style={{ marginTop: '3rem', fontStyle: 'italic', opacity: 0.7, textAlign: 'center' }}>
              Just us. Our moments. Our story.<br/>
              From the first picture to the last days of 2025.<br/>
              And every day after.
            </p>

            <button className="menu-button" onClick={() => {
              setCompleted({...completed, timeline: true});
              setUserChoices(prev => ({
                ...prev,
                timelineViewed: true,
                completedSections: [...prev.completedSections, 'Timeline']
              }));
              returnToMenu();
            }}>
              Return to Menu
            </button>
          </div>
        </div>
      )}

      {screen === 'adventure' && (
        <div className="screen adventure-screen">
          <div className="story-box">
            <p className="story-text">
              {adventureStep === 0 
                ? adventureStory[0].text 
                : adventureStep === 1 
                ? (answers[0] === 0 ? adventureStory[1].trust : adventureStory[1].panic)
                : adventureStory[2].text}
            </p>
            
            {adventureStep < 2 ? (
              <div className="choice-buttons">
                {adventureStory[adventureStep].choices.map((choice, i) => (
                  <button
                    key={i}
                    className="menu-button"
                    onClick={() => {
                      setAnswers([...answers, i]);
                      setAdventureStep(prev => prev + 1);
                    }}
                  >
                    {choice}
                  </button>
                ))}
              </div>
            ) : (
              <button className="menu-button" onClick={() => {
                setAdventureStep(0);
                setAnswers([]);
                setCompleted({...completed, repair: true});
                returnToMenu();
              }}>
                Return to Menu
              </button>
            )}
          </div>
        </div>
      )}

      {screen === 'final-reveal' && (
        <div className="screen final-screen">
          <div className="fade-in">
            <Heart size={64} fill="#ee2b34" color="#ee2b34" className="beating-heart" />
            <h1 className="final-title">There's no system.<br/>No game.<br/>No chaos mode.</h1>
            <p className="final-text">Just you. The way you whispered "keo frostana blind blind" that night, and I knew you meant every word.</p>
            <p className="final-text">The quiet moments on call. The tired voice late at night. The silence that felt safe. The way you send everything at once — photos, thoughts, links, feelings — because closeness looks like sharing everything.</p>
            <p className="final-text">The way you call and interrupt whatever I'm doing. Even Skeem Saam. And I pause it every time. Because your voice is all I need to hear.</p>
            <p className="final-text">I built this for you. Not to show off. Just to show you that I see you. All of you.</p>
            <p className="final-text">I didn't choose you loudly. I chose you naturally.<br/>It never felt forced. It just felt right.</p>
            <p className="final-text">Happy Valentine's Day, sthandwa sam. I love you.</p>
            <h2 className="final-question">Would you be my Valentine?</h2>
            
            <div className="final-buttons">
              <button 
                className="menu-button yes-button" 
                onClick={() => {
                  // Prepare comprehensive summary
                  const summary = {
                    finalAnswer: 'YES! ❤️',
                    timestamp: new Date().toLocaleString(),
                    
                    // Would You Rather Choices
                    wouldYouRatherAnswers: userChoices.wouldYouRatherAnswers.map((item, i) => 
                      `Q${i+1}: ${item.choice}`
                    ).join(', '),
                    
                    // Ratings
                    ratings: {
                      cooking: `${userChoices.ratings.cooking || ratings.cooking}/2 stars`,
                      humor: `${userChoices.ratings.humor || ratings.humor}/4 stars`,
                      romantic: `${userChoices.ratings.romantic || ratings.romantic}/8 stars`,
                      handsome: `${userChoices.ratings.handsome || ratings.handsome}/16 stars`
                    },
                    
                    // Force Remove attempts
                    forceRemoveAttempts: `${userChoices.forceRemoveAttempts} times`,
                    
                    // Timeline viewed
                    timelineViewed: userChoices.timelineViewed ? 'Yes' : 'No',
                    
                    // Completed sections
                    completedSections: userChoices.completedSections.join(', '),
                    
                    message: '🎉 SHE SAID YES! ❤️❤️❤️'
                  };
                  
                  // Send comprehensive notification
                  fetch(`https://api.telegram.org/bot8344163141:AAF5yspy5yIU_PX-ZmQGCcqBTDcGk-g-MUA/sendMessage`, {
                     method: 'POST',
                     headers: { 'Content-Type': 'application/json' },
                     body: JSON.stringify({
                       chat_id: '897994008',
                       text: '🎉 SHE SAID YES! ❤️\n\nTime: ' + new Date().toLocaleString()
                     })
                   });
                  
                  setScreen('she-said-yes');
                }}
              >
                Yes ❤️
              </button>
              <button 
                className="menu-button no-button" 
                onClick={() => {
                  // Prepare summary for NO
                  const summary = {
                    finalAnswer: 'No...',
                    timestamp: new Date().toLocaleString(),
                    
                    wouldYouRatherAnswers: userChoices.wouldYouRatherAnswers.map((item, i) => 
                      `Q${i+1}: ${item.choice}`
                    ).join(', '),
                    
                    ratings: {
                      cooking: `${userChoices.ratings.cooking || ratings.cooking}/2 stars`,
                      humor: `${userChoices.ratings.humor || ratings.humor}/4 stars`,
                      romantic: `${userChoices.ratings.romantic || ratings.romantic}/8 stars`,
                      handsome: `${userChoices.ratings.handsome || ratings.handsome}/16 stars`
                    },
                    
                    forceRemoveAttempts: `${userChoices.forceRemoveAttempts} times`,
                    timelineViewed: userChoices.timelineViewed ? 'Yes' : 'No',
                    completedSections: userChoices.completedSections.join(', '),
                    
                    message: '😢 She said no... (but there\'s a retry button!)'
                  };
                  
                  // Send notification
                  fetch('https://formspree.io/f/YOUR_FORM_ID', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(summary)
                  });
                  
                  setScreen('she-said-no');
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {screen === 'she-said-yes' && (
        <div className="screen final-screen">
          <div className="fade-in">
            <div className="celebration">
              {[...Array(20)].map((_, i) => (
                <Heart 
                  key={i}
                  size={Math.random() * 40 + 20}
                  fill="#ee2b34" 
                  color="#ee2b34"
                  className="floating-heart"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${Math.random() * 3 + 2}s`
                  }}
                />
              ))}
            </div>
            <h1 className="final-title" style={{ fontSize: '4rem' }}>YES! ❤️</h1>
            <p className="final-text" style={{ fontSize: '1.5rem', marginTop: '2rem' }}>
              I knew you'd say yes.<br/>
              But it still feels like everything.
            </p>
            <p className="final-text" style={{ marginTop: '3rem' }}>
              Happy Valentine's Day, my love.<br/>
              Here's to us. Naturally. Always.
            </p>
          </div>
        </div>
      )}

      {screen === 'she-said-no' && (
        <div className="screen final-screen">
          <div className="fade-in">
            <h1 className="final-title">Wait...</h1>
            <p className="final-text" style={{ marginTop: '2rem' }}>
              Are you sure?
            </p>
            <button 
              className="menu-button" 
              onClick={() => setScreen('final-reveal')}
              style={{ marginTop: '3rem' }}
            >
              Let me try again ❤️
            </button>
          </div>
        </div>
      )}

        </div> {/* End screen-content */}
        
        {/* iOS Home Indicator */}
        <div className="home-indicator"></div>
      </div> {/* End phone-frame */}

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Plus Jakarta Sans', 'Courier New', sans-serif;
          overflow-x: hidden;
        }

        /* App Container */
        .app-container {
          min-height: 100dvh;
          background: #0a0505;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 0.75rem;
        }

        /* Scanlines Effect */
        .scanlines {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            rgba(18, 16, 16, 0) 50%,
            rgba(0, 0, 0, 0.25) 50%
          ), linear-gradient(
            90deg,
            rgba(255, 0, 0, 0.06),
            rgba(0, 255, 0, 0.02),
            rgba(0, 0, 255, 0.06)
          );
          background-size: 100% 4px, 3px 100%;
          pointer-events: none;
          z-index: 100;
          opacity: 0.3;
        }

        /* CRT Curve Effect */
        .crt-curve {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          box-shadow: inset 0 0 150px rgba(0, 0, 0, 0.8);
          pointer-events: none;
          z-index: 99;
        }

        /* Noise Background */
        .noise-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.03;
          pointer-events: none;
          z-index: 1;
        }

        /* Phone Frame */
        .phone-frame {
          width: min(100%, 430px);
          max-width: 430px;
          height: min(932px, calc(100dvh - 1.5rem));
          max-height: 95dvh;
          background: #221011;
          border: 8px solid #18080a;
          border-radius: 3rem;
          box-shadow: 0 0 80px rgba(238, 43, 52, 0.3), 0 0 0 1px rgba(238, 43, 52, 0.1);
          overflow: hidden;
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
        }

        /* Status Bar */
        .status-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem 0.5rem;
          font-size: 0.75rem;
          color: rgba(238, 43, 52, 0.8);
          font-weight: 700;
          font-family: 'JetBrains Mono', monospace;
          border-bottom: 1px solid rgba(238, 43, 52, 0.1);
        }

        .status-time {
          font-size: 0.875rem;
          color: #ee2b34;
          text-shadow: 0 0 10px rgba(238, 43, 52, 0.6);
        }

        .status-icons {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.625rem;
          letter-spacing: 0.1em;
        }

        .status-dot {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          background: #ee2b34;
          box-shadow: 0 0 10px rgba(238, 43, 52, 0.8);
          animation: pulse 2s infinite;
        }

        .status-text {
          text-transform: uppercase;
          font-weight: 800;
        }

        /* Home Indicator */
        .home-indicator {
          width: 8rem;
          height: 0.375rem;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 9999px;
          margin: 0.5rem auto;
        }

        /* Screen Content */
        .screen-content {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          position: relative;
        }

        .screen {
          width: 100%;
          padding: clamp(1rem, 2.8vw, 2rem);
          animation: fadeIn 0.5s ease-in;
          min-height: 100%;
          display: flex;
          flex-direction: column;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Landing Screen */
        .landing-screen {
          text-align: center;
          justify-content: center;
          width: 100%;
        }

        .glitch-container {
          margin-bottom: 4rem;
        }

        .title {
          font-size: 3rem;
          font-weight: 800;
          color: #ee2b34;
          text-shadow: 0 0 20px rgba(238, 43, 52, 0.8),
                       2px 0 #ee2b34,
                       -2px 0 #00ffff;
          margin-bottom: 1rem;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .glitch {
          position: relative;
          animation: glitch 2s infinite;
        }

        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          width: 100%;
        }

        .glitch::before {
          color: #ee2b34;
          animation: glitchTop 1s infinite;
          clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
        }

        .glitch::after {
          color: #00d4ff;
          animation: glitchBottom 1.5s infinite;
          clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
        }

        @keyframes glitchTop {
          2%, 64% {
            transform: translate(2px, -2px);
          }
          4%, 60% {
            transform: translate(-2px, 2px);
          }
          62% {
            transform: translate(13px, -1px) skew(-13deg);
          }
        }

        @keyframes glitchBottom {
          2%, 64% {
            transform: translate(-2px, 0);
          }
          4%, 60% {
            transform: translate(-2px, 0);
          }
          62% {
            transform: translate(-22px, 5px) skew(21deg);
          }
        }

        .button-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .big-red-button {
          position: relative;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, #ff6b6b, #ee2b34, #c92a2a);
          border: 8px solid #000;
          box-shadow: 
            0 10px 40px rgba(238, 43, 52, 0.6),
            0 0 60px rgba(238, 43, 52, 0.4),
            inset 0 -10px 20px rgba(0, 0, 0, 0.5),
            inset 0 10px 20px rgba(255, 255, 255, 0.2);
          cursor: pointer;
          font-size: 1.5rem;
          font-weight: 800;
          color: white;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          transition: all 0.3s;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .big-red-button:hover {
          transform: scale(1.05);
          box-shadow: 
            0 15px 50px rgba(238, 43, 52, 0.8),
            0 0 80px rgba(238, 43, 52, 0.6),
            inset 0 -10px 20px rgba(0, 0, 0, 0.5),
            inset 0 10px 20px rgba(255, 255, 255, 0.2);
        }

        .big-red-button:active {
          transform: scale(0.95);
        }

        .pulse {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: rgba(238, 43, 52, 0.4);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0;
          }
        }

        .subtext {
          color: #666;
          font-size: 0.9rem;
          font-style: italic;
          font-family: 'JetBrains Mono', monospace;
        }

        /* Shake Animation */
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
          20%, 40%, 60%, 80% { transform: translateX(10px); }
        }

        .shake {
          animation: shake 0.5s;
        }

        /* Confetti */
        .confetti-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1000;
        }

        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          animation: fall 3s linear;
        }

        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }

        /* Chaos Screen */
        .chaos-screen {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .error-box {
          background: rgba(238, 43, 52, 0.1);
          border: 2px solid #ee2b34;
          padding: 2rem;
          text-align: center;
          animation: glitchBox 2s infinite;
          border-radius: 1rem;
          box-shadow: 0 0 30px rgba(238, 43, 52, 0.3);
          overflow: visible;
        }

        @keyframes glitchBox {
          0%, 90%, 100% {
            transform: translate(0);
          }
          92%, 96% {
            transform: translate(-2px, 2px);
          }
          94%, 98% {
            transform: translate(2px, -2px);
          }
        }

        .error-box h2 {
          color: #ee2b34;
          font-size: 2rem;
          margin: 1rem 0;
          font-weight: 800;
          text-shadow: 0 0 20px rgba(238, 43, 52, 0.6);
        }

        .typewriter {
          overflow: hidden;
          border-right: 2px solid #ee2b34;
          white-space: nowrap;
          animation: typing 2s steps(40) 1s forwards, blink 0.75s step-end infinite;
          width: 0;
          margin: 1rem auto;
          color: #fff;
        }

        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes blink {
          50% { border-color: transparent; }
        }

        .button-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        .menu-button {
          background: rgba(238, 43, 52, 0.1);
          border: 2px solid #ee2b34;
          color: #ee2b34;
          padding: 1rem 1.5rem;
          font-size: 1rem;
          font-weight: 700;
          font-family: 'Plus Jakarta Sans', sans-serif;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          border-radius: 9999px;
          box-shadow: 0 0 20px rgba(238, 43, 52, 0.2);
          width: 100%;
          max-width: 100%;
          text-wrap: balance;
        }

        .menu-button:hover {
          background: rgba(238, 43, 52, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 5px 30px rgba(238, 43, 52, 0.4);
        }

        .menu-button:active {
          transform: translateY(0);
        }

        .force-remove-button {
          background: rgba(238, 43, 52, 0.1);
          border-color: #ee2b34;
          color: #ee2b34;
        }

        .force-remove-button:hover {
          background: rgba(238, 43, 52, 0.2);
          box-shadow: 0 5px 20px rgba(238, 43, 52, 0.3);
        }

        .accept-button {
          border-color: #ee2b34;
          color: #ee2b34;
          background: rgba(238, 43, 52, 0.1);
          font-weight: 800;
        }

        .accept-button:hover {
          background: rgba(238, 43, 52, 0.2);
          box-shadow: 0 5px 20px rgba(238, 43, 52, 0.3);
        }

        /* Terminal Box */
        .terminal-box {
          background: rgba(0, 0, 0, 0.8);
          border: 2px solid #ee2b34;
          padding: 2rem;
          box-shadow: 0 0 30px rgba(238, 43, 52, 0.3);
          border-radius: 1rem;
        }

        .terminal-text {
          font-size: 1.2rem;
          margin: 0.5rem 0;
          line-height: 1.6;
          color: #fff;
          font-family: 'JetBrains Mono', monospace;
        }

        .terminal-title {
          color: #ee2b34;
          font-size: 1.8rem;
          margin-bottom: 1rem;
          text-align: center;
          font-weight: 800;
          text-shadow: 0 0 20px rgba(238, 43, 52, 0.6);
        }

        /* Loading Bar */
        .loading-bar {
          width: 100%;
          height: 30px;
          background: rgba(0, 0, 0, 0.5);
          border: 2px solid #ee2b34;
          margin: 2rem 0;
          overflow: hidden;
          border-radius: 0.5rem;
        }

        .loading-fill {
          height: 100%;
          background: linear-gradient(90deg, #ee2b34, #ff6b6b);
          transition: width 0.3s;
          box-shadow: 0 0 20px rgba(238, 43, 52, 0.8);
        }

        /* Error Code */
        .error-screen {
          overflow: visible;
        }

        .error-code {
          color: #ee2b34;
          font-size: 3rem;
          margin-bottom: 1rem;
          font-weight: 900;
          text-shadow: 0 0 30px rgba(238, 43, 52, 0.8);
        }

        .error-message {
          font-size: 1.5rem;
          margin: 1rem 0;
          font-weight: 700;
        }

        .error-details {
          color: #ffa502;
          margin: 0.5rem 0;
          font-size: 1.1rem;
        }

        .choice-buttons {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
          flex-wrap: wrap;
          justify-content: center;
          width: 100%;
        }

        .choice-buttons-container {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
          flex-wrap: wrap;
          justify-content: center;
          position: relative;
          min-height: 60px;
          width: 100%;
        }

        .growing-button {
          position: relative;
        }

        /* Accept Screen */
        .accept-screen {
          text-align: center;
          justify-content: center;
          width: 100%;
        }

        .heart-pulse {
          margin: 3rem 0;
        }

        .beating-heart {
          animation: heartbeat 1.5s infinite;
          filter: drop-shadow(0 0 20px rgba(238, 43, 52, 0.8));
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          10%, 30% { transform: scale(1.1); }
          20%, 40% { transform: scale(1); }
        }

        .love-text {
          color: #ee2b34;
          font-size: 1.5rem;
          margin: 2rem 0;
          font-weight: 700;
          text-shadow: 0 0 20px rgba(238, 43, 52, 0.6);
        }

        /* Rating Screen */
        .rating-box {
          background: rgba(0, 0, 0, 0.8);
          border: 2px solid #ee2b34;
          padding: 2rem;
          max-width: 600px;
          margin: 0 auto;
          border-radius: 1rem;
          box-shadow: 0 0 40px rgba(238, 43, 52, 0.3);
        }

        .rating-title {
          color: #ee2b34;
          text-align: center;
          margin-bottom: 2rem;
          font-size: 1.5rem;
          font-weight: 800;
          text-shadow: 0 0 20px rgba(238, 43, 52, 0.6);
        }

        .rating-category {
          margin: 1.5rem 0;
        }

        .rating-category label {
          display: block;
          margin-bottom: 0.5rem;
          color: #ffa502;
          font-size: 1.1rem;
          font-weight: 700;
        }

        .star-container {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
        }

        .submit-button {
          width: 100%;
          margin-top: 2rem;
        }

        /* Processing */
        .processing-screen {
          text-align: center;
          justify-content: center;
          width: 100%;
        }

        .spinner {
          width: 80px;
          height: 80px;
          border: 8px solid rgba(238, 43, 52, 0.1);
          border-top-color: #ee2b34;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 2rem auto;
          box-shadow: 0 0 30px rgba(238, 43, 52, 0.5);
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Result Screen */
        .result-screen {
          text-align: center;
          justify-content: center;
          width: 100%;
        }

        .success-title {
          color: #ee2b34;
          font-size: 2rem;
          margin: 1rem 0;
          font-weight: 800;
          text-shadow: 0 0 20px rgba(238, 43, 52, 0.6);
        }

        .success-box {
          background: rgba(238, 43, 52, 0.1);
          border: 2px solid #ee2b34;
          padding: 2rem;
          text-align: center;
          box-shadow: 0 0 30px rgba(238, 43, 52, 0.5);
          margin-bottom: 2rem;
          border-radius: 1rem;
        }

        .success-box h2 {
          color: #ee2b34;
          font-size: 2rem;
          margin: 1rem 0;
          font-weight: 800;
        }

        .final-button {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          background: rgba(238, 43, 52, 0.2);
          border-color: #ee2b34;
          color: #ee2b34;
          font-size: 1.2rem;
          padding: 1.5rem;
          font-weight: 800;
        }

        .final-button:hover {
          background: rgba(238, 43, 52, 0.3);
          box-shadow: 0 5px 30px rgba(238, 43, 52, 0.5);
        }

        /* Fortune Screen */
        .fortune-screen {
          text-align: center;
          justify-content: center;
          width: 100%;
        }

        .fortune-box {
          background: rgba(255, 215, 0, 0.05);
          border: 2px solid #ffd93d;
          padding: 3rem;
          animation: glow 2s infinite;
          border-radius: 1rem;
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 217, 61, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 217, 61, 0.6);
          }
        }

        .fortune-text {
          color: #ffd93d;
          font-size: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          font-weight: 600;
        }

        .fortune-progress {
          color: #ffa502;
          font-size: 1rem;
          margin: 1rem 0;
          font-weight: 600;
        }

        .progress-indicator {
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(238, 43, 52, 0.3);
        }

        .progress-text {
          color: #ffa502;
          font-size: 1.1rem;
          margin: 0;
          font-weight: 700;
        }

        /* Timeline Screen */
        .timeline-screen {
          overflow-y: auto;
        }

        .timeline-moments {
          display: flex;
          flex-direction: column;
          gap: 3rem;
          margin: 2rem 0;
        }

        .timeline-moment {
          display: flex;
          gap: 2rem;
          align-items: flex-start;
        }

        .timeline-image-placeholder {
          width: clamp(180px, 34vw, 280px);
          min-width: clamp(180px, 34vw, 280px);
          max-width: 280px;
          border: 2px solid rgba(238, 43, 52, 0.45);
          border-radius: 1rem;
          overflow: hidden;
          transition: all 0.3s;
          background: #13090a;
          flex-shrink: 0;
        }

        .timeline-image-placeholder:hover {
          background: rgba(238, 43, 52, 0.15);
          box-shadow: 0 0 20px rgba(238, 43, 52, 0.3);
        }

        .timeline-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          background: #13090a;
        }

        .timeline-caption {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .timeline-date {
          color: #ffa502;
          font-weight: 700;
          font-size: 1.2rem;
          margin: 0;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .timeline-text {
          color: #fff;
          font-size: 1rem;
          line-height: 1.6;
          margin: 0;
          font-family: 'JetBrains Mono', monospace;
        }

        /* Adventure Screen */
        .story-box {
          background: rgba(0, 0, 0, 0.8);
          border: 2px solid #00d4ff;
          padding: 2rem;
          max-width: 600px;
          margin: 0 auto;
          border-radius: 1rem;
          box-shadow: 0 0 30px rgba(0, 212, 255, 0.3);
        }

        .story-text {
          color: #00d4ff;
          font-size: 1.3rem;
          line-height: 1.8;
          margin-bottom: 2rem;
          font-weight: 500;
        }

        /* Final Screen */
        .final-screen {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
          justify-content: center;
          width: 100%;
        }

        .fade-in {
          animation: fadeInSlow 2s ease-in;
        }

        @keyframes fadeInSlow {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .final-title {
          color: #ee2b34;
          font-size: 2.5rem;
          margin: 2rem 0;
          line-height: 1.6;
          font-family: 'Plus Jakarta Sans', serif;
          font-weight: 800;
          text-shadow: 0 0 20px rgba(238, 43, 52, 0.6);
        }

        .final-text {
          color: #fff;
          font-size: 1.3rem;
          margin: 1.5rem 0;
          line-height: 1.8;
          font-weight: 500;
        }

        .final-question {
          color: #ee2b34;
          font-size: 2rem;
          margin-top: 3rem;
          font-family: 'Plus Jakarta Sans', serif;
          animation: fadeInDelay 3s ease-in;
          font-weight: 800;
          text-shadow: 0 0 20px rgba(238, 43, 52, 0.6);
        }

        .final-buttons {
          display: flex;
          gap: 2rem;
          justify-content: center;
          margin-top: 3rem;
          flex-wrap: wrap;
        }

        .yes-button {
          background: rgba(238, 43, 52, 0.2);
          border-color: #ee2b34;
          color: #ee2b34;
          font-size: 1.5rem;
          padding: 1.5rem 4rem;
          font-weight: 800;
          min-width: 200px;
        }

        .yes-button:hover {
          background: rgba(238, 43, 52, 0.3);
          transform: scale(1.1);
          box-shadow: 0 10px 40px rgba(238, 43, 52, 0.6);
        }

        .no-button {
          background: rgba(100, 100, 100, 0.1);
          border-color: #666;
          color: #666;
          font-size: 1.5rem;
          padding: 1.5rem 4rem;
          font-weight: 800;
          min-width: 200px;
        }

        .no-button:hover {
          background: rgba(100, 100, 100, 0.2);
        }

        .celebration {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1000;
        }

        .floating-heart {
          position: absolute;
          animation: floatUp 4s ease-in infinite;
        }

        @keyframes floatUp {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes fadeInDelay {
          0%, 50% { opacity: 0; }
          100% { opacity: 1; }
        }

        .wyr-question h3 {
          color: #ffa502;
          font-size: 1.5rem;
          margin: 2rem 0 1rem;
          text-align: center;
          font-weight: 700;
        }

        .warning-text {
          color: #ffa502;
          font-size: 1.3rem;
          font-style: italic;
          font-weight: 600;
        }

        .skip-hint {
          color: #666;
          font-size: 0.9rem;
          margin-top: 2rem;
          font-style: italic;
          animation: pulse-opacity 2s infinite;
        }

        @keyframes pulse-opacity {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .glitch-text {
          animation: glitchText 0.5s infinite;
        }

        @keyframes glitchText {
          0%, 90%, 100% {
            transform: translate(0);
          }
          92% {
            transform: translate(-2px, 2px);
          }
          94% {
            transform: translate(2px, -2px);
          }
          96% {
            transform: translate(-1px, 1px);
          }
          98% {
            transform: translate(1px, -1px);
          }
        }
        .landing-screen {
          text-align: center;
        }

        .glitch-container {
          margin-bottom: 4rem;
        }

        .title {
          font-size: 4rem;
          font-weight: bold;
          text-shadow: 0 0 20px #00ff41;
          margin-bottom: 1rem;
        }

        .glitch {
          position: relative;
          animation: glitch 2s infinite;
        }

        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          width: 100%;
        }

        .glitch::before {
          color: #ff4757;
          animation: glitchTop 1s infinite;
          clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
        }

        .glitch::after {
          color: #00d4ff;
          animation: glitchBottom 1.5s infinite;
          clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
        }

        @keyframes glitchTop {
          2%, 64% {
            transform: translate(2px, -2px);
          }
          4%, 60% {
            transform: translate(-2px, 2px);
          }
          62% {
            transform: translate(13px, -1px) skew(-13deg);
          }
        }

        @keyframes glitchBottom {
          2%, 64% {
            transform: translate(-2px, 0);
          }
          4%, 60% {
            transform: translate(-2px, 0);
          }
          62% {
            transform: translate(-22px, 5px) skew(21deg);
          }
        }

        .button-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .big-red-button {
          position: relative;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, #ff6b6b, #ff4757, #c92a2a);
          border: 8px solid #222;
          box-shadow: 
            0 10px 40px rgba(255, 71, 87, 0.6),
            inset 0 -10px 20px rgba(0, 0, 0, 0.5),
            inset 0 10px 20px rgba(255, 255, 255, 0.2);
          cursor: pointer;
          font-size: 1.5rem;
          font-weight: bold;
          color: white;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          transition: all 0.3s;
          font-family: 'Courier New', monospace;
        }

        .big-red-button:hover {
          transform: scale(1.05);
          box-shadow: 
            0 15px 50px rgba(255, 71, 87, 0.8),
            inset 0 -10px 20px rgba(0, 0, 0, 0.5),
            inset 0 10px 20px rgba(255, 255, 255, 0.2);
        }

        .big-red-button:active {
          transform: scale(0.95);
        }

        .pulse {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: rgba(255, 71, 87, 0.4);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0;
          }
        }

        .subtext {
          color: #666;
          font-size: 0.9rem;
          font-style: italic;
        }

        /* Shake Animation */
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
          20%, 40%, 60%, 80% { transform: translateX(10px); }
        }

        .shake {
          animation: shake 0.5s;
        }

        /* Confetti */
        .confetti-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1000;
        }

        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          animation: fall 3s linear;
        }

        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }

        /* Chaos Screen */
        .chaos-screen {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        .error-box {
          background: rgba(255, 71, 87, 0.1);
          border: 2px solid #ff4757;
          padding: 2rem;
          text-align: center;
          animation: glitchBox 2s infinite;
          overflow: visible;
        }

        @keyframes glitchBox {
          0%, 90%, 100% {
            transform: translate(0);
          }
          92%, 96% {
            transform: translate(-2px, 2px);
          }
          94%, 98% {
            transform: translate(2px, -2px);
          }
        }

        .success-box {
          background: rgba(0, 255, 65, 0.1);
          border: 2px solid #00ff41;
          padding: 2rem;
          text-align: center;
          box-shadow: 0 0 30px rgba(0, 255, 65, 0.5);
          margin-bottom: 2rem;
        }

        .success-box h2 {
          color: #00ff41;
          font-size: 2rem;
          margin: 1rem 0;
        }

        .final-button {
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          background: rgba(255, 71, 87, 0.1);
          border-color: #ff4757;
          color: #ff4757;
          font-size: 1.2rem;
          padding: 1.5rem;
        }

        .final-button:hover {
          background: rgba(255, 71, 87, 0.2);
          box-shadow: 0 5px 30px rgba(255, 71, 87, 0.5);
        }

        .error-box h2 {
          color: #ff4757;
          font-size: 2rem;
          margin: 1rem 0;
        }

        .typewriter {
          overflow: hidden;
          border-right: 2px solid #00ff41;
          white-space: nowrap;
          animation: typing 2s steps(40) 1s forwards, blink 0.75s step-end infinite;
          width: 0;
          margin: 1rem auto;
        }

        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes blink {
          50% { border-color: transparent; }
        }

        .button-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .menu-button {
          background: rgba(0, 255, 65, 0.1);
          border: 2px solid #00ff41;
          color: #00ff41;
          padding: 1rem 1.5rem;
          font-size: 1rem;
          font-family: 'Courier New', monospace;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .menu-button:hover {
          background: rgba(0, 255, 65, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 5px 20px rgba(0, 255, 65, 0.3);
        }

        .menu-button:active {
          transform: translateY(0);
        }

        .force-remove-button {
          background: rgba(255, 71, 87, 0.1);
          border-color: #ff4757;
          color: #ff4757;
        }

        .force-remove-button:hover {
          background: rgba(255, 71, 87, 0.2);
          box-shadow: 0 5px 20px rgba(255, 71, 87, 0.3);
        }

        .accept-button {
          border-color: #ff4757;
          color: #ff4757;
          background: rgba(255, 71, 87, 0.1);
        }

        .accept-button:hover {
          background: rgba(255, 71, 87, 0.2);
          box-shadow: 0 5px 20px rgba(255, 71, 87, 0.3);
        }

        /* Terminal Box */
        .terminal-box {
          background: rgba(0, 0, 0, 0.8);
          border: 2px solid #00ff41;
          padding: 2rem;
          box-shadow: 0 0 30px rgba(0, 255, 65, 0.3);
        }

        .terminal-text {
          font-size: 1.2rem;
          margin: 0.5rem 0;
          line-height: 1.6;
        }

        .terminal-title {
          color: #00ff41;
          font-size: 1.8rem;
          margin-bottom: 1rem;
          text-align: center;
        }

        /* Loading Bar */
        .loading-bar {
          width: 100%;
          height: 30px;
          background: rgba(0, 0, 0, 0.5);
          border: 2px solid #00ff41;
          margin: 2rem 0;
          overflow: hidden;
        }

        .loading-fill {
          height: 100%;
          background: linear-gradient(90deg, #00ff41, #00d4ff);
          transition: width 0.3s;
          box-shadow: 0 0 20px rgba(0, 255, 65, 0.8);
        }

        /* Error Code */
        .error-screen {
          overflow: visible;
        }

        .error-code {
          color: #ff4757;
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .error-message {
          font-size: 1.5rem;
          margin: 1rem 0;
        }

        .error-details {
          color: #ffa502;
          margin: 0.5rem 0;
        }

        .choice-buttons {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
          flex-wrap: wrap;
          justify-content: center;
          width: 100%;
        }

        .choice-buttons-container {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
          flex-wrap: wrap;
          justify-content: center;
          position: relative;
          min-height: 60px;
          width: 100%;
        }

        .growing-button {
          position: relative;
        }

        /* Accept Screen */
        .accept-screen {
          text-align: center;
        }

        .heart-pulse {
          margin: 3rem 0;
        }

        .beating-heart {
          animation: heartbeat 1.5s infinite;
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          10%, 30% { transform: scale(1.1); }
          20%, 40% { transform: scale(1); }
        }

        .love-text {
          color: #ff4757;
          font-size: 1.5rem;
          margin: 2rem 0;
        }

        /* Rating Screen */
        .rating-box {
          background: rgba(0, 0, 0, 0.8);
          border: 2px solid #00ff41;
          padding: 2rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .rating-title {
          color: #00ff41;
          text-align: center;
          margin-bottom: 2rem;
          font-size: 1.5rem;
        }

        .rating-category {
          margin: 1.5rem 0;
        }

        .rating-category label {
          display: block;
          margin-bottom: 0.5rem;
          color: #ffa502;
          font-size: 1.1rem;
        }

        .star-container {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
        }

        .submit-button {
          width: 100%;
          margin-top: 2rem;
        }

        /* Processing */
        .processing-screen {
          text-align: center;
        }

        .spinner {
          width: 80px;
          height: 80px;
          border: 8px solid rgba(0, 255, 65, 0.1);
          border-top-color: #00ff41;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 2rem auto;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Result Screen */
        .result-screen {
          text-align: center;
        }

        .success-title {
          color: #00ff41;
          font-size: 2rem;
          margin: 1rem 0;
        }

        /* Fortune Screen */
        .fortune-screen {
          text-align: center;
        }

        .fortune-box {
          background: rgba(255, 215, 0, 0.05);
          border: 2px solid #ffd93d;
          padding: 3rem;
          animation: glow 2s infinite;
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 217, 61, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(255, 217, 61, 0.6);
          }
        }

        .fortune-text {
          color: #ffd93d;
          font-size: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
        }

        .fortune-progress {
          color: #ffa502;
          font-size: 1rem;
          margin: 1rem 0;
        }

        .progress-indicator {
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 71, 87, 0.3);
        }

        .progress-text {
          color: #ffa502;
          font-size: 1.1rem;
          margin: 0;
        }

        /* Adventure Screen */
        .story-box {
          background: rgba(0, 0, 0, 0.8);
          border: 2px solid #00d4ff;
          padding: 2rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .story-text {
          color: #00d4ff;
          font-size: 1.3rem;
          line-height: 1.8;
          margin-bottom: 2rem;
        }

        /* Final Screen */
        .final-screen {
          text-align: center;
          max-width: 600px;
          margin: 0 auto;
        }

        .fade-in {
          animation: fadeInSlow 2s ease-in;
        }

        @keyframes fadeInSlow {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .final-title {
          color: #ff4757;
          font-size: 2.5rem;
          margin: 2rem 0;
          line-height: 1.6;
          font-family: 'Georgia', serif;
        }

        .final-text {
          color: #fff;
          font-size: 1.3rem;
          margin: 1.5rem 0;
          line-height: 1.8;
        }

        .final-question {
          color: #ff4757;
          font-size: 2rem;
          margin-top: 3rem;
          font-family: 'Georgia', serif;
          animation: fadeInDelay 3s ease-in;
        }

        @keyframes fadeInDelay {
          0%, 50% { opacity: 0; }
          100% { opacity: 1; }
        }

        .wyr-question h3 {
          color: #ffa502;
          font-size: 1.5rem;
          margin: 2rem 0 1rem;
          text-align: center;
        }

        .warning-text {
          color: #ffa502;
          font-size: 1.3rem;
          font-style: italic;
        }

        .skip-hint {
          color: #666;
          font-size: 0.9rem;
          margin-top: 2rem;
          font-style: italic;
          animation: pulse-opacity 2s infinite;
        }

        @keyframes pulse-opacity {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .glitch-text {
          animation: glitchText 0.5s infinite;
        }

        @keyframes glitchText {
          0%, 90%, 100% {
            transform: translate(0);
          }
          92% {
            transform: translate(-2px, 2px);
          }
          94% {
            transform: translate(2px, -2px);
          }
          96% {
            transform: translate(-1px, 1px);
          }
          98% {
            transform: translate(1px, -1px);
          }
        }

        @media (max-width: 1024px) {
          .phone-frame {
            width: min(100%, 520px);
            max-width: 520px;
          }

          .status-bar {
            padding: 0.85rem 1.25rem 0.5rem;
          }
        }

        @media (max-width: 768px) {
          .app-container {
            padding: 0;
          }

          .phone-frame {
            border-radius: 0;
            border: none;
            width: 100%;
            max-width: 100%;
            height: 100dvh;
            max-height: 100dvh;
          }

          .title {
            font-size: 2rem;
          }

          .big-red-button {
            width: min(62vw, 220px);
            height: min(62vw, 220px);
            font-size: clamp(1rem, 3.8vw, 1.2rem);
          }

          .button-grid {
            grid-template-columns: 1fr;
          }

          .menu-button,
          .choice-buttons .menu-button {
            width: 100%;
            font-size: 0.95rem;
            padding: 0.85rem 1rem;
          }

          .typewriter {
            white-space: normal;
            border-right: none;
            width: 100%;
            animation: none;
          }

          .final-title {
            font-size: clamp(1.8rem, 7vw, 2.5rem) !important;
          }

          .rating-box,
          .story-box,
          .terminal-box {
            padding: 1rem;
          }

          .timeline-moment {
            flex-direction: column;
            gap: 1rem;
          }

          .timeline-image-placeholder,
          .timeline-image-placeholder.landscape {
            width: 100%;
            min-width: 100%;
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

// Easter Eggs & Credits:
// 💝 Based on true late-night conversations
// 🖥️ Powered by love and inconsistent electricity  
// 📱 No phones were harmed (except yours at 4%)
// 📠 Fax Machine Memorial: 2020-2026 RIP
// 🎬 Skeem Saam interruption tolerance: MAXIMUM
// 💬 47 media files in 1 minute capability: CONFIRMED
// 🌙 "Keo frostana blind blind" Protocol: ACTIVE
// ❤️ Built by 51XTE3N for Baby Love
// ⚖️ Future Attorney Approved™
// 
// Timeline:
// Started talking sometime in 2023.
// Met on the first day of 2024.
// Started dating on… one of those January days we still joke about.
// This Valentine's: February 14, 2026.


import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Question {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const MCUQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  
  const quizContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const questionCardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const questions: Question[] = [
    {
      question: "What is the real name of Iron Man?",
      options: ["Tony Stark", "Bruce Wayne", "Peter Parker", "Steve Rogers"],
      correct: 0,
      explanation: "Tony Stark is the genius billionaire who becomes Iron Man using his advanced suit of armor."
    },
    {
      question: "Which Infinity Stone is hidden on Vormir?",
      options: ["Power Stone", "Soul Stone", "Reality Stone", "Mind Stone"],
      correct: 1,
      explanation: "The Soul Stone is located on Vormir and requires a soul sacrifice to obtain it."
    },
    {
      question: "Who is the Winter Soldier?",
      options: ["Sam Wilson", "Bucky Barnes", "John Walker", "Isaiah Bradley"],
      correct: 1,
      explanation: "Bucky Barnes, Steve Rogers' childhood friend, becomes the Winter Soldier after being brainwashed by HYDRA."
    },
    {
      question: "What is the name of Thor's hammer?",
      options: ["Stormbreaker", "Gungnir", "Mjolnir", "Hofund"],
      correct: 2,
      explanation: "Mjolnir is Thor's enchanted hammer that can only be lifted by those who are worthy."
    },
    {
      question: "Which planet is Thanos from?",
      options: ["Asgard", "Titan", "Xandar", "Sakaar"],
      correct: 1,
      explanation: "Thanos is from Titan, a moon of Saturn that was destroyed due to overpopulation."
    },
    {
      question: "What does S.H.I.E.L.D. stand for?",
      options: [
        "Strategic Homeland Intervention, Enforcement and Logistics Division",
        "Supreme Headquarters, International Espionage and Law-Enforcement Division",
        "Strategic Hazard Intervention Espionage Logistics Directorate",
        "Special Headquarters for International Emergency and Defense"
      ],
      correct: 0,
      explanation: "S.H.I.E.L.D. stands for Strategic Homeland Intervention, Enforcement and Logistics Division."
    },
    {
      question: "Who killed Tony Stark's parents?",
      options: ["Red Skull", "Winter Soldier", "Loki", "Ultron"],
      correct: 1,
      explanation: "The Winter Soldier (Bucky Barnes) killed Howard and Maria Stark while under HYDRA's control."
    },
    {
      question: "What is Black Widow's real name?",
      options: ["Natasha Romanoff", "Wanda Maximoff", "Carol Danvers", "Yelena Belova"],
      correct: 0,
      explanation: "Natasha Romanoff is the real name of Black Widow, a former Russian spy turned Avenger."
    },
    {
      question: "Which Infinity Stone does Vision have in his forehead?",
      options: ["Time Stone", "Mind Stone", "Power Stone", "Soul Stone"],
      correct: 1,
      explanation: "Vision has the Mind Stone embedded in his forehead, which gives him consciousness and power."
    },
    {
      question: "What is the name of the Asgardian bridge?",
      options: ["Rainbow Bridge", "Bifrost", "Heimdall's Bridge", "Odin's Path"],
      correct: 1,
      explanation: "The Bifrost is the rainbow bridge that connects Asgard to the other Nine Realms."
    },
    {
      question: "Who becomes the new Captain America after Steve Rogers?",
      options: ["Bucky Barnes", "John Walker", "Sam Wilson", "Isaiah Bradley"],
      correct: 2,
      explanation: "Sam Wilson (Falcon) becomes the new Captain America after Steve Rogers passes the shield to him."
    },
    {
      question: "What is the name of Peter Quill's ship?",
      options: ["Milano", "Benatar", "Dark Aster", "The Sanctuary"],
      correct: 0,
      explanation: "Peter Quill's ship is called the Milano, named after actress Alyssa Milano."
    },
    {
      question: "Which realm is Loki from?",
      options: ["Asgard", "Midgard", "Jotunheim", "Alfheim"],
      correct: 2,
      explanation: "Loki is actually from Jotunheim, the realm of the Frost Giants, though he was raised in Asgard."
    },
    {
      question: "What is Hawkeye's real name?",
      options: ["Jeremy Renner", "Clint Barton", "Phil Coulson", "Scott Lang"],
      correct: 1,
      explanation: "Clint Barton is Hawkeye's real name, a skilled archer and marksman."
    },
    {
      question: "Who is the leader of the Guardians of the Galaxy?",
      options: ["Rocket", "Gamora", "Star-Lord", "Drax"],
      correct: 2,
      explanation: "Star-Lord (Peter Quill) is the self-proclaimed leader of the Guardians of the Galaxy."
    },
    {
      question: "What is the name of the AI that helps Tony Stark?",
      options: ["FRIDAY", "JARVIS", "EDITH", "KAREN"],
      correct: 1,
      explanation: "JARVIS (Just A Rather Very Intelligent System) is Tony Stark's AI assistant."
    },
    {
      question: "Which stone allows manipulation of time?",
      options: ["Mind Stone", "Time Stone", "Reality Stone", "Space Stone"],
      correct: 1,
      explanation: "The Time Stone, housed in the Eye of Agamotto, allows manipulation of time."
    },
    {
      question: "What is the real name of Ant-Man?",
      options: ["Hank Pym", "Scott Lang", "Eric O'Grady", "Dave Mitchell"],
      correct: 1,
      explanation: "Scott Lang is the current Ant-Man, though Hank Pym was the original."
    },
    {
      question: "Who is the God of Thunder?",
      options: ["Loki", "Odin", "Thor", "Balder"],
      correct: 2,
      explanation: "Thor is the Asgardian God of Thunder and a founding member of the Avengers."
    },
    {
      question: "What is the name of the metal in Captain America's shield?",
      options: ["Adamantium", "Vibranium", "Unobtainium", "Wakandium"],
      correct: 1,
      explanation: "Captain America's shield is made of Vibranium, the rare metal from Wakanda."
    },
    {
      question: "Who is the king of Wakanda?",
      options: ["T'Chaka", "T'Challa", "M'Baku", "W'Kabi"],
      correct: 1,
      explanation: "T'Challa becomes the king of Wakanda and the Black Panther after his father's death."
    },
    {
      question: "What is Doctor Strange's real name?",
      options: ["Stephen Strange", "Victor Strange", "Vincent Strange", "Simon Strange"],
      correct: 0,
      explanation: "Stephen Strange is a former neurosurgeon who becomes the Sorcerer Supreme."
    },
    {
      question: "Which organization does Nick Fury work for?",
      options: ["CIA", "FBI", "S.H.I.E.L.D.", "HYDRA"],
      correct: 2,
      explanation: "Nick Fury is the director of S.H.I.E.L.D., the international peacekeeping organization."
    },
    {
      question: "What is the name of Thor's home planet?",
      options: ["Midgard", "Asgard", "Jotunheim", "Alfheim"],
      correct: 1,
      explanation: "Asgard is Thor's home realm, one of the Nine Realms connected by Yggdrasil."
    },
    {
      question: "Who created Ultron?",
      options: ["Nick Fury", "Tony Stark", "Bruce Banner", "Hank Pym"],
      correct: 1,
      explanation: "Tony Stark created Ultron as an AI peacekeeping program that went rogue."
    },
    {
      question: "What is the name of Peter Parker's aunt?",
      options: ["Aunt May", "Aunt Martha", "Aunt Mary", "Aunt Sarah"],
      correct: 0,
      explanation: "Aunt May Parker raised Peter Parker after his parents died."
    },
    {
      question: "Which Infinity Stone is blue?",
      options: ["Mind Stone", "Power Stone", "Space Stone", "Reality Stone"],
      correct: 2,
      explanation: "The Space Stone (Tesseract) is blue and allows manipulation of space and teleportation."
    },
    {
      question: "Who is Gamora's sister?",
      options: ["Mantis", "Nebula", "Ayesha", "Yondu"],
      correct: 1,
      explanation: "Nebula is Gamora's adopted sister, both raised by Thanos as his daughters."
    },
    {
      question: "What is the name of the raccoon in Guardians of the Galaxy?",
      options: ["Rocket", "Trash Panda", "Rabbit", "Rodent"],
      correct: 0,
      explanation: "Rocket is the genetically modified raccoon who is an expert marksman and tactician."
    },
    {
      question: "Who guards the Soul Stone?",
      options: ["Thanos", "Red Skull", "Gamora", "Vormir Guardian"],
      correct: 1,
      explanation: "Red Skull was cursed to guard the Soul Stone on Vormir after touching the Tesseract."
    },
    {
      question: "What is the name of Tony Stark's father?",
      options: ["Henry Stark", "Howard Stark", "Harold Stark", "Herbert Stark"],
      correct: 1,
      explanation: "Howard Stark was Tony's father and a founding member of S.H.I.E.L.D."
    },
    {
      question: "Which planet do the Guardians crash land on in the first movie?",
      options: ["Xandar", "Morag", "Sovereign", "Berhart"],
      correct: 0,
      explanation: "The Guardians crash land on Xandar while trying to escape the Dark Aster."
    },
    {
      question: "What is Scarlet Witch's real name?",
      options: ["Wanda Maximoff", "Wanda Wilson", "Wanda Stark", "Wanda Rogers"],
      correct: 0,
      explanation: "Wanda Maximoff is the Scarlet Witch who gained powers from the Mind Stone experiments."
    },
    {
      question: "Who is the voice of Groot?",
      options: ["Chris Pratt", "Bradley Cooper", "Vin Diesel", "Dave Bautista"],
      correct: 2,
      explanation: "Vin Diesel provides the voice for Groot, even though he only says 'I am Groot.'"
    },
    {
      question: "What is the name of the prison in Guardians of the Galaxy?",
      options: ["The Vault", "The Kyln", "The Raft", "Seagate"],
      correct: 1,
      explanation: "The Kyln is the intergalactic prison where the Guardians first meet and plan their escape."
    },
    {
      question: "Who becomes the new Black Panther after T'Challa?",
      options: ["Shuri", "Okoye", "Nakia", "Ramonda"],
      correct: 0,
      explanation: "Shuri, T'Challa's sister and Wakanda's technological genius, becomes the new Black Panther."
    },
    {
      question: "What is the name of the dimension Doctor Strange visits?",
      options: ["Mirror Dimension", "Dark Dimension", "Quantum Realm", "Astral Plane"],
      correct: 1,
      explanation: "Doctor Strange visits the Dark Dimension where he bargains with Dormammu."
    },
    {
      question: "Who is the Winter Soldier's handler?",
      options: ["Alexander Pierce", "Arnim Zola", "Baron Zemo", "Red Skull"],
      correct: 0,
      explanation: "Alexander Pierce, a HYDRA leader within S.H.I.E.L.D., was the Winter Soldier's primary handler."
    },
    {
      question: "What is the name of Captain Marvel's cat?",
      options: ["Fluff", "Goose", "Chewie", "Flerken"],
      correct: 1,
      explanation: "Goose is Captain Marvel's 'cat' who is actually a dangerous alien species called a Flerken."
    },
    {
      question: "Which Avenger is known as 'The First Avenger'?",
      options: ["Iron Man", "Captain America", "Thor", "Hulk"],
      correct: 1,
      explanation: "Captain America is known as 'The First Avenger' as he was the first superhero in the MCU timeline."
    },
    {
      question: "What is the name of Odin's spear?",
      options: ["Mjolnir", "Stormbreaker", "Gungnir", "Hofund"],
      correct: 2,
      explanation: "Gungnir is Odin's enchanted spear that never misses its target."
    },
    {
      question: "Who kills Thanos in Endgame?",
      options: ["Iron Man", "Thor", "Captain America", "Both Thor and Iron Man"],
      correct: 3,
      explanation: "Thor kills Thanos early in Endgame, and later Tony Stark defeats the 2014 version of Thanos."
    },
    {
      question: "What is the name of the AI that replaces JARVIS?",
      options: ["EDITH", "FRIDAY", "KAREN", "HELEN"],
      correct: 1,
      explanation: "FRIDAY (Female Replacement Intelligent Digital Assistant Youth) replaces JARVIS after he becomes Vision."
    },
    {
      question: "Which realm is known as Earth in the MCU?",
      options: ["Asgard", "Midgard", "Jotunheim", "Alfheim"],
      correct: 1,
      explanation: "Midgard is the Asgardian name for Earth, one of the Nine Realms."
    },
    {
      question: "What is the name of the elite female bodyguards in Wakanda?",
      options: ["Dora Milaje", "War Dogs", "Border Tribe", "River Tribe"],
      correct: 0,
      explanation: "The Dora Milaje are the elite female bodyguards who protect the king of Wakanda."
    },
    {
      question: "Who destroys the Time Stone?",
      options: ["Thanos", "Doctor Strange", "Wanda Maximoff", "Vision"],
      correct: 0,
      explanation: "Thanos destroys all the Infinity Stones, including the Time Stone, to prevent their use."
    },
    {
      question: "What is the name of the robot army in Age of Ultron?",
      options: ["Ultron Sentries", "Iron Legion", "Ultron Drones", "Stark Sentries"],
      correct: 0,
      explanation: "The Ultron Sentries are the robot army created by Ultron to eliminate humanity."
    },
    {
      question: "Who is the director of S.H.I.E.L.D. after Nick Fury?",
      options: ["Maria Hill", "Phil Coulson", "Alexander Pierce", "Sharon Carter"],
      correct: 1,
      explanation: "Phil Coulson becomes director of S.H.I.E.L.D. after Nick Fury, though this is mainly in the TV series."
    },
    {
      question: "What is the name of the sentient planet in Guardians of the Galaxy Vol. 2?",
      options: ["Ego", "Knowhere", "Sovereign", "Contraxia"],
      correct: 0,
      explanation: "Ego is the living planet and Peter Quill's father in Guardians of the Galaxy Vol. 2."
    },
    {
      question: "Which Avenger sacrifices themselves to obtain the Soul Stone?",
      options: ["Hawkeye", "Black Widow", "Iron Man", "Captain America"],
      correct: 1,
      explanation: "Black Widow sacrifices herself on Vormir so Hawkeye can obtain the Soul Stone for the Avengers."
    }
  ];

  useEffect(() => {
    if (quizStarted) {
      // GSAP entrance animation for quiz container
      gsap.fromTo(quizContainerRef.current, 
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out" }
      );
    }
  }, [quizStarted]);

  useEffect(() => {
    if (quizStarted && questionCardRef.current) {
      // GSAP animation for question transitions
      gsap.fromTo(questionCardRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, [currentQuestion, quizStarted]);

  useEffect(() => {
    if (progressBarRef.current) {
      // GSAP animation for progress bar
      const progress = ((currentQuestion + 1) / questions.length) * 100;
      gsap.to(progressBarRef.current, {
        width: `${progress}%`,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, [currentQuestion]);

  useEffect(() => {
    createParticles();
  }, []);

  const createParticles = () => {
    if (particlesRef.current) {
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesRef.current.appendChild(particle);
      }
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const selectAnswer = (selectedIndex: number) => {
    if (answered) return;
    
    setAnswered(true);
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = selectedIndex;
    setUserAnswers(newUserAnswers);
    
    if (selectedIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswered(userAnswers[currentQuestion - 1] !== undefined);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setAnswered(false);
    setUserAnswers([]);
    setShowResults(false);
    setQuizStarted(false);
  };

  const getPerformanceMessage = () => {
    const percentage = Math.round((score / questions.length) * 100);
    if (percentage >= 90) return "🏆 Incredible! You're a true MCU expert!";
    if (percentage >= 80) return "⭐ Amazing! You know the Marvel universe well!";
    if (percentage >= 70) return "🎯 Great job! You're a solid MCU fan!";
    if (percentage >= 60) return "👍 Good work! Keep watching those Marvel movies!";
    return "🚀 Time to rewatch the MCU! Your journey awaits!";
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
        
        {/* Cosmic Background */}
        <div className="absolute inset-0 cosmic-gradient opacity-90" />
        
        <div className="glass-effect rounded-3xl p-12 max-w-2xl mx-4 text-center relative z-10 animate-pulse-glow">
          <div className="mb-8">
            <h1 className="text-6xl font-bold mb-4 marvel-gradient bg-clip-text text-transparent">
              MCU QUIZ
            </h1>
            <h2 className="text-3xl font-bold text-white mb-2">UNIVERSE CHALLENGE</h2>
            <p className="text-xl text-gray-300">
              Test your Marvel Cinematic Universe knowledge
            </p>
          </div>
          
          <div className="mb-8 text-lg text-gray-200">
            <p>🎬 50 Questions about your favorite heroes</p>
            <p>⚡ From basic to intermediate MCU knowledge</p>
            <p>🏆 See how well you know the Marvel Universe</p>
          </div>
          
          <button
            onClick={startQuiz}
            className="bg-gradient-to-r from-marvel-red to-marvel-gold text-white font-bold py-4 px-12 rounded-full text-xl hover:scale-105 transform transition-all duration-300 shadow-2xl hover:shadow-marvel-red/50"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
        <div className="absolute inset-0 cosmic-gradient opacity-90" />
        
        <div className="glass-effect rounded-3xl p-12 max-w-2xl mx-4 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-8">🎉 Quiz Complete!</h2>
          
          <div className="text-8xl font-bold mb-4 marvel-gradient bg-clip-text text-transparent">
            {score}/{questions.length}
          </div>
          
          <div className="text-6xl font-bold mb-6 text-marvel-gold">
            {percentage}%
          </div>
          
          <p className="text-2xl text-white mb-8">
            {getPerformanceMessage()}
          </p>
          
          <button
            onClick={restartQuiz}
            className="bg-gradient-to-r from-marvel-blue to-marvel-purple text-white font-bold py-4 px-12 rounded-full text-xl hover:scale-105 transform transition-all duration-300 shadow-2xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const isAnswered = userAnswers[currentQuestion] !== undefined;

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
      <div className="absolute inset-0 cosmic-gradient opacity-90" />
      
      <div ref={quizContainerRef} className="glass-effect rounded-3xl p-8 max-w-4xl mx-4 relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold marvel-gradient bg-clip-text text-transparent mb-4">
            MCU Quiz Challenge
          </h1>
          <div className="text-white text-lg">
            Score: <span className="text-marvel-gold font-bold">{score}</span> / {questions.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="glass-effect rounded-2xl p-4 mb-8">
          <div className="bg-gray-700 rounded-xl h-6 overflow-hidden relative progress-shimmer">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-marvel-red via-marvel-gold to-marvel-blue rounded-xl"
              style={{ width: '0%' }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div ref={questionCardRef} className="glass-effect rounded-2xl p-8 mb-8">
          <div className="text-marvel-red font-bold text-xl mb-4">
            Question {currentQuestion + 1} of {questions.length}
          </div>
          
          <h2 className="text-2xl text-white mb-8 font-medium">
            {currentQ.question}
          </h2>
          
          <div className="space-y-4 mb-8">
            {currentQ.options.map((option, index) => {
              let buttonClass = "w-full p-4 text-left rounded-xl border-2 transition-all duration-300 text-white font-medium ";
              
              if (isAnswered) {
                if (index === currentQ.correct) {
                  buttonClass += "bg-green-500/30 border-green-400 text-green-100";
                } else if (index === userAnswers[currentQuestion] && index !== currentQ.correct) {
                  buttonClass += "bg-red-500/30 border-red-400 text-red-100";
                } else {
                  buttonClass += "glass-effect border-gray-600 text-gray-300";
                }
              } else {
                buttonClass += "glass-effect border-gray-600 hover:border-marvel-gold hover:bg-white/10 hover:scale-105";
              }
              
              return (
                <button
                  key={index}
                  onClick={() => selectAnswer(index)}
                  disabled={isAnswered}
                  className={buttonClass}
                >
                  <span className="text-marvel-gold font-bold mr-3">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
          
          {/* Feedback */}
          {isAnswered && (
            <div className={`p-4 rounded-xl ${
              userAnswers[currentQuestion] === currentQ.correct 
                ? 'bg-green-500/20 border border-green-400 text-green-100' 
                : 'bg-red-500/20 border border-red-400 text-red-100'
            }`}>
              <div className="font-bold mb-2">
                {userAnswers[currentQuestion] === currentQ.correct ? '🎉 Correct!' : '❌ Incorrect'}
              </div>
              <div>{currentQ.explanation}</div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="bg-gradient-to-r from-gray-600 to-gray-700 text-white font-bold py-3 px-8 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transform transition-all duration-300"
          >
            Previous
          </button>
          
          <button
            onClick={nextQuestion}
            disabled={!isAnswered}
            className="bg-gradient-to-r from-marvel-red to-marvel-gold text-white font-bold py-3 px-8 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transform transition-all duration-300"
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MCUQuiz;

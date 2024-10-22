const questions = [
    {
      question: "What is the capital of Pakistan?",
      options: ["Lahore", "Karachi", "Islamabad", "Peshawar"],
      answer: 2
    },
    {
      question: "When did Pakistan gain independence?",
      options: ["1945", "1947", "1950", "1960"],
      answer: 1
    },
    {
      question: "Who is the founder of Pakistan?",
      options: ["Allama Iqbal", "Liaquat Ali Khan", "Benazir Bhutto", "Muhammad Ali Jinnah"],
      answer: 3
    },
    {
      question: "Which is the national language of Pakistan?",
      options: ["English", "Punjabi", "Urdu", "Sindhi"],
      answer: 2
    },
    {
      question: "What is the national sport of Pakistan?",
      options: ["Cricket", "Hockey", "Squash", "Football"],
      answer: 1
    },
    {
      question: "Which river is known as the lifeline of Pakistan?",
      options: ["Indus", "Jhelum", "Ravi", "Chenab"],
      answer: 0
    },
    {
      question: "What is the name of Pakistan's highest mountain?",
      options: ["Nanga Parbat", "K2", "Mount Everest", "Rakaposhi"],
      answer: 1
    },
    {
      question: "Who was the first Prime Minister of Pakistan?",
      options: ["Liaquat Ali Khan", "Zulfikar Ali Bhutto", "Ayub Khan", "Benazir Bhutto"],
      answer: 0
    },
    {
      question: "Which city is known as the 'City of Lights' in Pakistan?",
      options: ["Karachi", "Lahore", "Islamabad", "Peshawar"],
      answer: 0
    },
    {
      question: "What is the currency of Pakistan?",
      options: ["Rupee", "Dollar", "Yen", "Dinar"],
      answer: 0
    },
    {
      question: "Who is considered the national poet of Pakistan?",
      options: ["Faiz Ahmed Faiz", "Allama Iqbal", "Saadat Hasan Manto", "Mirza Ghalib"],
      answer: 1
    },
    {
      question: "Which is the largest province of Pakistan by area?",
      options: ["Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan"],
      answer: 3
    },
    {
      question: "Which is the largest city of Pakistan by population?",
      options: ["Karachi", "Lahore", "Islamabad", "Faisalabad"],
      answer: 0
    },
    {
      question: "What is the national flower of Pakistan?",
      options: ["Jasmine", "Rose", "Lily", "Tulip"],
      answer: 0
    },
    {
      question: "Which country shares the longest border with Pakistan?",
      options: ["India", "China", "Iran", "Afghanistan"],
      answer: 0
    },
    {
      question: "What is the official religion of Pakistan?",
      options: ["Hinduism", "Islam", "Christianity", "Buddhism"],
      answer: 1
    },
    {
      question: "Who was the first female Prime Minister of Pakistan?",
      options: ["Fatima Jinnah", "Benazir Bhutto", "Hina Rabbani Khar", "Malala Yousafzai"],
      answer: 1
    },
    {
      question: "Which is the largest desert in Pakistan?",
      options: ["Thar", "Cholistan", "Kharan", "Thal"],
      answer: 0
    },
    {
      question: "Which city is famous for the Badshahi Mosque?",
      options: ["Lahore", "Karachi", "Islamabad", "Multan"],
      answer: 0
    },
    {
      question: "Which sea borders Pakistan?",
      options: ["Arabian Sea", "Caspian Sea", "Mediterranean Sea", "Red Sea"],
      answer: 0
    }
  ];
  
  let shuffledQuestions = [];
  let currentQuestionIndex = 0;
  let score = 0;
  let timer;
  let timeRemaining = 5 * 60;
  let selectedOption = null;
  
  function startQuiz() {
    document.getElementById("start-btn").classList.add("hidden");
    document.getElementById("quiz-box").classList.remove("hidden");
    shuffleQuestions();
    showQuestion();
    startTimer();
  }
  
  function shuffleQuestions() {
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  }
  
  function showQuestion() {
    document.getElementById("next-btn").disabled = true;
    selectedOption = null;
    const question = shuffledQuestions[currentQuestionIndex];
    document.getElementById("question-number").textContent = `Question ${currentQuestionIndex + 1} of 20`;
    document.getElementById("question").textContent = question.question;
    const options = document.querySelectorAll(".option-btn");
    options.forEach((btn, i) => {
      btn.textContent = question.options[i];
      btn.style.backgroundColor = 'rgba(0, 123, 255, 0.8)';
      btn.disabled = false;
    });
  }
  
  function selectOption(selectedIndex) {
    if (selectedOption === null) {
      selectedOption = selectedIndex;
      const options = document.querySelectorAll(".option-btn");
      options.forEach((btn, i) => {
        btn.disabled = true;
        if (i === selectedIndex) {
          btn.style.backgroundColor = 'orange';
        }
      });
      document.getElementById("next-btn").disabled = false;
    }
  }
  
  function nextQuestion() {
    if (selectedOption !== null) {
      checkAnswer(selectedOption);
      if (currentQuestionIndex < 19) {
        currentQuestionIndex++;
        showQuestion();
      } else {
        endQuiz();
      }
    }
  }
  
  function checkAnswer(selectedOptionIndex) {
    const question = shuffledQuestions[currentQuestionIndex];
    const options = document.querySelectorAll(".option-btn");
  
    if (selectedOptionIndex === question.answer) {
      score++;
      options[selectedOptionIndex].style.backgroundColor = 'green';
    } else {
      options[selectedOptionIndex].style.backgroundColor = 'red';
      options[question.answer].style.backgroundColor = 'green';
    }
  }
  
  function endQuiz() {
    clearInterval(timer);
    document.getElementById("quiz-box").classList.add("hidden");
    document.getElementById("result-box").classList.remove("hidden");
  
    const percentage = (score / 20) * 100;
    let resultText = percentage >= 60 ? "Pass" : "Fail";
  
    document.getElementById("result-text").textContent = `You ${resultText}`;
    document.getElementById("final-score").textContent = `Score: ${score} / 20 (${percentage}%)`;
  }
  
  function startTimer() {
    timeRemaining = 5 * 60;
    timer = setInterval(() => {
      timeRemaining--;
      const minutes = Math.floor(timeRemaining / 60);
      const seconds = timeRemaining % 60;
      document.getElementById("time").textContent = `${minutes}:${seconds < 5 ? '0' : ''}${seconds}`;
  
      if (timeRemaining <= 0) {
        endQuiz();
      }
    }, 1000);
  }
  
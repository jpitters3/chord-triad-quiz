const notes = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B'];

    const questions = [
      { question: "What are the 3 notes that make up the C Major triad?", answer: "C E G" },
      { question: "What are the 3 notes that make up the C Minor triad?", answer: "C Eb G" },
      { question: "What are the 3 notes that make up the C# Major triad?", answer: "C# F G#" },
      { question: "What are the 3 notes that make up the C# Minor triad?", answer: "C# E G#" },
      { question: "What are the 3 notes that make up the D Major triad?", answer: "D F# A" },
      { question: "What are the 3 notes that make up the D Minor triad?", answer: "D F A" },
      { question: "What are the 3 notes that make up the D# Major triad?", answer: "D# G A#" },
      { question: "What are the 3 notes that make up the D# Minor triad?", answer: "D# F# A#" },
      { question: "What are the 3 notes that make up the E Major triad?", answer: "E G# B" },
      { question: "What are the 3 notes that make up the E Minor triad?", answer: "E G B" },
      { question: "What are the 3 notes that make up the F Major triad?", answer: "F A C" },
      { question: "What are the 3 notes that make up the F Minor triad?", answer: "F Ab C" },
      { question: "What are the 3 notes that make up the F# Major triad?", answer: "F# A# C#" },
      { question: "What are the 3 notes that make up the F# Minor triad?", answer: "F# A C#" },
      { question: "What are the 3 notes that make up the G Major triad?", answer: "G B D" },
      { question: "What are the 3 notes that make up the G Minor triad?", answer: "G Bb D" },
      { question: "What are the 3 notes that make up the G# Major triad?", answer: "G# C D#" },
      { question: "What are the 3 notes that make up the G# Minor triad?", answer: "G# B D#" },
      { question: "What are the 3 notes that make up the A Major triad?", answer: "A C# E" },
      { question: "What are the 3 notes that make up the A Minor triad?", answer: "A C E" },
      { question: "What are the 3 notes that make up the A# Major triad?", answer: "A# D F" },
      { question: "What are the 3 notes that make up the A# Minor triad?", answer: "A# C# F" },
      { question: "What are the 3 notes that make up the B Major triad?", answer: "B D# F#" },
      { question: "What are the 3 notes that make up the B Minor triad?", answer: "B D F#" }
    ];

    let score = 0;
    let totalQuestions = questions.length;
    let remainingQuestions = [...questions]; // Create a copy of the questions to track which have been used
    let userAnswer = [];
    let activeNoteIndex = null; // Keep track of the active note being updated

    function loadRandomQuestion() {
      if (remainingQuestions.length === 0) {
        document.getElementById('question').textContent = 'Quiz complete!';
        document.getElementById('note-buttons').style.display = 'none';
        document.getElementById('feedback').textContent = `Final score: ${score}/${totalQuestions}`;
        return;
      }

      // Get a random index from the remaining questions
      const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
      const currentQuestion = remainingQuestions[randomIndex];

      document.getElementById('question').textContent = currentQuestion.question;
      document.getElementById('user-answer').textContent = 'Your answer: ';
      document.getElementById('feedback').textContent = '';
      userAnswer = [];
      activeNoteIndex = null; // Reset active note index

      // Clear any previously added note entries
      document.getElementById('user-answer').innerHTML = '';

      // Store the current question's correct answer
      window.currentAnswer = currentQuestion.answer;
      remainingQuestions.splice(randomIndex, 1); // Remove the selected question from the list
    }

    function checkAnswer() {
      const userAnswerStr = userAnswer.join(' ');
      const correctAnswer = window.currentAnswer;

      if (userAnswerStr.toLowerCase() === correctAnswer.toLowerCase()) {
        document.getElementById('feedback').textContent = 'Correct!';
        document.getElementById('feedback').className = 'feedback correct';
        score++;
      } else {
        document.getElementById('feedback').textContent = `Incorrect! The correct answer is: ${correctAnswer}`;
        document.getElementById('feedback').className = 'feedback incorrect';
      }

      document.getElementById('score').textContent = `Score: ${score}/${totalQuestions - remainingQuestions.length}`;

      setTimeout(loadRandomQuestion, 1500); // Load the next question after a delay
    }

    function selectNote(note) {
      if (activeNoteIndex !== null) {
        userAnswer[activeNoteIndex] = note; // Update the selected note
        renderAnswer(); // Re-render the updated answer
        activeNoteIndex = null; // Reset the active note index
      } else if (userAnswer.length < 3) {
        userAnswer.push(note);
        renderAnswer();
      }
    }

    function renderAnswer() {
      const answerElement = document.getElementById('user-answer');
      answerElement.innerHTML = 'Your answer: ';

      userAnswer.forEach((note, index) => {
        const span = document.createElement('span');
        span.textContent = note;
        span.className = 'note-entry';
        if (index === activeNoteIndex) {
          span.classList.add('active');
        }
        span.addEventListener('click', () => setActiveNoteIndex(index)); // Add click event to make the note editable
        answerElement.appendChild(span);
      });
    }

    function setActiveNoteIndex(index) {
      activeNoteIndex = index;
      renderAnswer(); // Re-render to show the active note
    }

    function renderNoteButtons() {
      const noteButtonsContainer = document.getElementById('note-buttons');
      noteButtonsContainer.innerHTML = '';

      notes.forEach(note => {
        const button = document.createElement('button');
        button.textContent = note;
        button.className = 'note';
        button.addEventListener('click', () => selectNote(note));
        noteButtonsContainer.appendChild(button);
      });
    }

    // Initialize the game
    renderNoteButtons();
    loadRandomQuestion();
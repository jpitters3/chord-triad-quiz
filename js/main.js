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

    let currentQuestion = {};
    let userAnswer = [];
    let score = 0;
    let totalQuestions = 0;
    let activeNoteIndex = null;

    const soundsEnabled = () => document.getElementById('toggle-sound').checked;

    // Preload note sounds
    const noteSounds = {};
    notes.forEach(note => {
      noteSounds[note] = new Audio(`assets/sounds/${note}.mp3`);
    });

    const successSound = new Audio('assets/sounds/success.mp3');
    const failureSound = new Audio('assets/sounds/failure.mp3');

    function loadRandomQuestion() {
      const randomIndex = Math.floor(Math.random() * questions.length);
      currentQuestion = questions[randomIndex];
      document.getElementById('question').textContent = currentQuestion.question;
      userAnswer = [];
      renderAnswer();
      document.getElementById('feedback').textContent = '';
      document.getElementById('next-button').style.display = 'none';
    }

    function playNoteSound(note) {
      if (soundsEnabled() && noteSounds[note]) {
        noteSounds[note].currentTime = 0; // Reset the sound
        noteSounds[note].play();
      }
    }

    function checkAnswer() {
      const userAnswerStr = userAnswer.join(' ');
      totalQuestions++;

      if (userAnswerStr === currentQuestion.answer) {
        document.getElementById('feedback').textContent = 'Correct!';
        document.getElementById('feedback').classList.add('correct');
        document.getElementById('feedback').classList.remove('incorrect');
        score++;
        if (soundsEnabled()) successSound.play();

        // Move to the next question after 1 second
        setTimeout(() => {
          loadRandomQuestion();
        }, 1000);
      } else {
        document.getElementById('feedback').textContent = `Incorrect. The correct answer is ${currentQuestion.answer}.`;
        document.getElementById('feedback').classList.add('incorrect');
        document.getElementById('feedback').classList.remove('correct');
        document.getElementById('next-button').style.display = 'inline'; // Show the next button
        if (soundsEnabled()) failureSound.play();
      }

      document.getElementById('score').textContent = `Score: ${score}/${totalQuestions}`;
    }

    function nextQuestion() {
      loadRandomQuestion();
    }

    function selectNote(note) {
      playNoteSound(note); // Play the note sound

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
    function init() {
      renderNoteButtons();
      loadRandomQuestion();
    }

    window.onload = init;
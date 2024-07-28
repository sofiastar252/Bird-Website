import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FunFactsForm.css'; // Import CSS so question & answer boxes can be styled

const FunFactsForm = ({ onSubmit }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [answer, setAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackColor, setFeedbackColor] = useState('');

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('https://raw.githubusercontent.com/safiaabukasim/BirdQues/main/questions.json');
      const data = response.data;
      setQuestions(data);
      setCurrentQuestionIndex(Math.floor(Math.random() * data.length)); // Set a random question index
      setFeedback(''); // Clear previous feedback
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const generateRandomQuestion = () => {
    setCurrentQuestionIndex(Math.floor(Math.random() * questions.length)); // Set a new random question index
    setFeedback(''); // Clear previous feedback
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userAnswer = answer.toLowerCase().trim(); // Convert user's answer to lowercase and trim whitespace
    const correctAnswer = questions[currentQuestionIndex].answer.toLowerCase().trim(); // Get correct answer for the current question
    let answerStatus = '';

    if (userAnswer === correctAnswer) {
      setFeedback('Correct!');
      setFeedbackColor('green');
      onSubmit(questions[currentQuestionIndex].question, answer, true); // Correct answer
      answerStatus = 'Correct';
    } else {
      setFeedback('Incorrect! Try again.');
      setFeedbackColor('red');
      onSubmit(questions[currentQuestionIndex].question, answer, false); // Incorrect answer
      answerStatus = 'Incorrect';
    }

    // Send form data to Formspree endpoint for email submission
    const formData = new FormData();
    formData.append('question', questions[currentQuestionIndex].question);
    formData.append('user_answer', answer);
    formData.append('answer_status', answerStatus); // Include answer status in form data

    try {
      const response = await fetch('https://formspree.io/f/xoqgyeaw', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data); // Log the response from Formspree
    } catch (error) {
      console.error('Error sending form data:', error);
    }
  };

  return (
    <div className="fun-facts-form">
      <h2>See If You Know This Fun Fact!</h2>
      <form onSubmit={handleSubmit}>
        <button type="button" onClick={generateRandomQuestion}>
          Generate Random Question
        </button>
        {currentQuestionIndex !== null && (
          <>
            <label>
              Question:
              <input type="text" value={questions[currentQuestionIndex].question} readOnly />
            </label>
            <label>
              Answer:
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </label>
            <button type="submit">Submit Answer</button>
          </>
        )}
      </form>
      {feedback && <p className="feedback" style={{ color: feedbackColor }}>{feedback}</p>}
    </div>
  );
};

export default FunFactsForm;

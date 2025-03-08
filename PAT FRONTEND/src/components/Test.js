import React, { useState, useEffect } from "react";
import "./Test.css"; // Import the CSS file

const Test = () => {
    const [topic, setTopic] = useState("");
    const [topics, setTopics] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const savedTopics = JSON.parse(localStorage.getItem("chatTopics")) || [];
        setTopics(savedTopics);
    }, []);

    const fetchAIQuestions = async () => {
        if (!topic) return alert("Please select a topic first!");

        setLoading(true);
        setQuestions([]);
        setAnswers({});
        setSubmitted(false);
        setScore(0);

        try {
            const response = await fetch("http://localhost:5000/generate-questions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topics: [topic] }),
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            if (data.topics?.length > 0 && Array.isArray(data.topics[0].questions)) {
                setQuestions(data.topics[0].questions);
            } else {
                alert("No questions generated. Try another topic.");
            }
        } catch (error) {
            console.error("Error fetching AI questions:", error);
            alert("Failed to fetch questions. Please check the console for details.");
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerSelect = (questionIndex, selectedOption) => {
        setAnswers((prev) => ({ ...prev, [questionIndex]: selectedOption }));
    };

    const handleSubmit = () => {
        let newScore = 0;
        questions.forEach((q, index) => {
            if (answers[index] === q.correct) newScore++;
        });
        setScore(newScore);
        setSubmitted(true);
    };

    return (
        <div className="test-container">
            <h2>📝 AI-Generated Quiz</h2>

            {!submitted && (
                <>
                    {/* Topic Selection */}
                    <div className="previous-topics">
                        <select value={topic} onChange={(e) => setTopic(e.target.value)} className="topic-btn">
                            <option value="">Select a Topic</option>
                            {topics.length > 0 ? (
                                topics.map((t, index) => (
                                    <option key={index} value={t}>{t}</option>
                                ))
                            ) : (
                                <option disabled>No topics found</option>
                            )}
                        </select>

                        <button onClick={fetchAIQuestions} disabled={loading || !topic} className="topic-btn">
                            {loading ? "Generating..." : "Generate Questions"}
                        </button>
                    </div>

                    {/* Display Questions */}
                    {questions.length > 0 && (
                        <div className="questions-scrollable">
                            <h3>🧐 Questions</h3>
                            {questions.map((q, index) => (
                                <div key={index} className="question">
                                    <strong>{index + 1}. {q.question}</strong>
                                    <div>
                                        {Object.entries(q.options).map(([key, option]) => (
                                            <label key={key} className="option-btn">
                                                <input
                                                    type="radio"
                                                    name={`question-${index}`}
                                                    value={key}
                                                    checked={answers[index] === key}
                                                    onChange={() => handleAnswerSelect(index, key)}
                                                    disabled={submitted}
                                                />
                                                {option}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Submit Button */}
                    {questions.length > 0 && !submitted && (
                        <button onClick={handleSubmit} className="submit-btn" disabled={Object.keys(answers).length !== questions.length}>
                            Submit Answers
                        </button>
                    )}
                </>
            )}

            {/* Score Section (Shown Only After Submission) */}
            {submitted && (
                <div className="score-section">
                    <h3>🎯 Scorecard</h3>
                    <p><strong>Your Score: {score} / {questions.length}</strong></p>
                </div>
            )}
        </div>
    );
};

export default Test;

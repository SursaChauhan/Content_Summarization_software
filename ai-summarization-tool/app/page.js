'use client';

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    try {
      const response = await axios.post('/api/analyze', { text });
      setResult(response.data);
    } catch (error) {
      console.error('Error uploading text:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>AI-Powered Content Summarization and Analysis Tool</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="10"
        cols="50"
        placeholder="Enter text here..."
        style={{color:"black"}}
      ></textarea>
      <br />
      <button onClick={handleUpload}>Analyze</button>
      {result && (
        <div style={{ marginTop: '20px' }}>
          <h2>Summary:</h2>
          <p>{result.summary}</p>
          <h2>Insights:</h2>
          <p>Overall Score: {result.insights.overallScore}</p>
          <p>Magnitude: {result.insights.magnitude}</p>
          <h3>Sentence Analysis:</h3>
          <ul>
            {result.insights.sentences.map((sentence, index) => (
              <li key={index}>
                <strong>Sentence:</strong> {sentence.content} <br />
                <strong>Score:</strong> {sentence.score}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

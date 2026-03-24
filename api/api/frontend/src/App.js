import React, { useState } from 'react';

function App() {
  const [age, setAge] = useState('');
  const [ageVerified, setAgeVerified] = useState(false);
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  // Replace with your deployed backend URL if used
  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const verifyAge = async () => {
    const res = await fetch(`${API_BASE}/api/verify-age`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ age }),
    });
    const data = await res.json();
    setAgeVerified(data.allowed);
  };

  const generateImage = async () => {
    const res = await fetch(`${API_BASE}/api/generate-image`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: imagePrompt }),
    });
    const data = await res.json();
    setImageUrl(data.imageUrl);
  };

  const sendChat = async () => {
    setChatHistory([...chatHistory, { sender: 'You', message: chatInput }]);
    const res = await fetch(`${API_BASE}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: chatInput }),
    });
    const data = await res.json();
    setChatHistory(chs => [...chs, { sender: 'Model', message: data.reply }]);
    setChatInput('');
  };

  if (!ageVerified) {
    return (
      <div style={{padding: '3rem', fontFamily: 'sans-serif'}}>
        <h2>18+ Age Verification</h2>
        <input
          type="number"
          placeholder="Enter age"
          value={age}
          onChange={e => setAge(e.target.value)}
          min={0}
        />
        <button onClick={verifyAge} style={{marginLeft: 10}}>Verify</button>
      </div>
    );
  }

  return (
    <div style={{maxWidth: 600, margin: '3rem auto', fontFamily: 'sans-serif'}}>
      <h1>AI Free Image Generator & Model Chat (18+)</h1>
      <section style={{margin: '2rem 0'}}>
        <h3>Generate AI Image</h3>
        <input
          style={{width: '70%'}}
          type="text"
          placeholder="Describe your fantasy..."
          value={imagePrompt}
          onChange={e => setImagePrompt(e.target.value)}
        />
        <button onClick={generateImage} style={{marginLeft: 10}}>Generate</button>
        {imageUrl && <div><img src={imageUrl} alt="AI Result" style={{maxWidth: '100%', marginTop: 10}}/></div>}
      </section>
      <section>
        <h3>Chat with the Sexy Model</h3>
        <div style={{
          border: '1px solid #ccc', padding: 12, minHeight: 140,
          maxHeight: 240, overflowY: 'auto', marginBottom: 12
        }}>
        {chatHistory.map((c, i) => (
          <div key={i}><strong>{c.sender}:</strong> {c.message}</div>
        ))}
        </div>
        <input
          type="text"
          placeholder="Say something..."
          value={chatInput}
          style={{width: '70%'}}
          onChange={e => setChatInput(e.target.value)}
        />
        <button onClick={sendChat} style={{marginLeft: 10}}>Send</button>
      </section>
    </div>
  );
}

export default App;

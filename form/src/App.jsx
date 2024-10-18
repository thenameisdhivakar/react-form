import './App.css';
import { useState } from 'react';
function App() {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [feedback, setFeedback] = useState('');

  function handleForm(e) {
    e.preventDefault();
    const data = { name, mail, feedback };

    fetch('http://localhost:5000/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(() => {
        alert('form saved!') 
        setName('')
        setMail('')
        setFeedback('')
      })
      .catch(() => alert('error'))
  }
  return (
    <div className="text-center p-36 bg-red-200 min-h-screen w-screen">
      <form className='bg-red-300 rounded pb-5 pt-5 ' onSubmit={handleForm}>
        <h1 className='text-3xl text-red-800 font-extrabold text-center pb-4'>Student Feedback Form</h1>
        <label className='text-2xl  font-extrabold p-2 m-3'>Name</label>
        <input className="font-extrabold text-center border-2 border-red-800 rounded" type='text' placeholder='Enter your name' value={name} required onChange={(e) => setName(e.target.value)} /><br />

        <label className='text-2xl  font-extrabold p-2 m-3'>Email</label>
        <input className="font-extrabold text-center border-2 border-red-800 rounded" type='text' placeholder='Enter your email' value={mail} required onChange={(e) => setMail(e.target.value)} /><br />

        <textarea className=' rounded border-2 border-red-800 text-center m-3 font-extrabold pt-5' required value={feedback} placeholder='Drop your feedback' onChange={(e) => setFeedback(e.target.value)} /><br />

        <button className='font-extrabold bg-red-700 w-16 rounded text-white hover:bg-red-500' type='submit'>Add</button>
      </form>
    </div>
  );
}

export default App;
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  // console.log(process.env.REACT_APP_API_URL)
  // eslint-disable-next-line no-undef
  // const API_URL = process.env.API_URL;
  const API_URL = import.meta.env.VITE_API_URL;
  console.log(API_URL)
  function fetchstudents() {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }

  useEffect(() => {
    fetchstudents();
  }, []);

  function handleForm(e) {
    e.preventDefault();
    const formData = { name, mail, feedback };

    if (editId) {

      fetch(`${API_URL}/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
        .then(() => {
          alert('Form updated!');
          setEditId(null);
          setName('');
          setMail('');
          setFeedback('');
          fetchstudents();
        })
        .catch(() => alert('Error updating form'));
    } else {
      fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
        .then(() => {
          alert('Form saved!');
          setName('');
          setMail('');
          setFeedback('');
          fetchstudents();
        })
        .catch(() => alert('Error saving form'));
    }
  }

  function handleDelete(id) {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        alert('Data deleted!');
        fetchstudents();
      })
      .catch(() => alert('Error deleting data'));
  }

  function handleEdit(item) {
    setName(item.name);
    setMail(item.mail);
    setFeedback(item.feedback);
    setEditId(item._id);
  }

  return (
    <div className="text-center p-16 bg-red-200 min-h-screen w-screen">
      <form className="bg-red-200 rounded pb-5 pt-5" onSubmit={handleForm}>
        <h1 className="text-3xl text-red-700 font-extrabold text-center pb-4">
          {editId ? 'Edit Feedback Form' : 'Student Feedback Form'}
        </h1>
        <label className="text-2xl font-extrabold p-2 m-3">Name</label>
        <input
          className="font-extrabold text-center border-2 border-red-800 rounded"
          type="text"
          placeholder="Enter your name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        /><br />

        <label className="text-2xl font-extrabold p-2 m-3">Email</label>
        <input
          className="font-extrabold text-center border-2 border-red-800 rounded"
          type="text"
          placeholder="Enter your email"
          value={mail}
          required
          onChange={(e) => setMail(e.target.value)}
        /><br />

        <textarea
          className="rounded border-2 border-red-800 text-center m-3 font-extrabold pt-5"
          required
          value={feedback}
          placeholder="Drop your feedback"
          onChange={(e) => setFeedback(e.target.value)}
        /><br />

        <button
          className="bg-red-600 h-10 w-20 m-2 font-extrabold rounded text-white hover:bg-red-500"
          type="submit"
        >
          {editId ? 'Update' : 'Add'}
        </button>
      </form>
      <div className="mt-10">
        <h2 className="text-2xl font-extrabold text-center pb-4 text-red-600">Registered Users</h2>
        <table className="table-auto bg-red-100 border-collapse border border-red-400 mt-5" style={{ margin: '0 auto' }}>

          <thead>
            <tr>
              <th className="border border-red-500 px-4 py-2 text-center">Name</th>
              <th className="border border-red-500 px-4 py-2 text-center">Email</th>
              <th className="border border-red-500 px-4 py-2 text-center">Feedback</th>
              <th className="border border-red-500 px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td className="border border-red-500 px-4 py-2 text-center">{item.name}</td>
                <td className="border border-red-500 px-4 py-2 text-center">{item.mail}</td>
                <td className="border border-red-500 px-4 py-2 text-center">{item.feedback}</td>

                <td className="border border-red-500 px-4 py-2 text-center">
                  <button
                    className="bg-red-600 h-10 w-20 text-white rounded hover:bg-red-400"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 h-10 w-20 m-2 text-white rounded hover:bg-red-400"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

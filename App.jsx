import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeTodo, editTodo, clearAll } from './Todo';

const App = () => {
  const [val, setVal] = useState("");
  const [editId, setEditId] = useState(null);   // ID of todo being edited
  const [editText, setEditText] = useState(""); // temporary edit text

  const selector = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (val.trim() === "") return;
    dispatch(addTodo(val));
    setVal("");
  };

  const handleEditSave = (id) => {
    if (!editText.trim()) return;
    dispatch(editTodo({ id, newText: editText }));
    setEditId(null);
    setEditText("");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>TODO LIST</h1>

      <input
        type="text"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
      <button onClick={() => dispatch(clearAll())}>Clear All</button>

      <ul
        style={{
          padding: 0,
          maxWidth: "220px",
          margin: "20px auto",
          textAlign: "left",
        }}
      >
        {selector.map((a) => (
          <li
            key={a.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#f5f5f5",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              padding: "5px",
              marginBottom: "5px",
            }}
          >
            {/* If this todo is being edited, show input + save/cancel buttons */}
            {editId === a.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button onClick={() => handleEditSave(a.id)}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{a.text}</span>
                <div>
                  <button
                    onClick={() => {
                      setEditId(a.id);
                      setEditText(a.text);
                    }}
                    style={{ marginRight: "5px" }}
                  >
                    Edit
                  </button>
                  <button onClick={() => dispatch(removeTodo(a.id))}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import "./BucketListApp.css";

export default function BucketListApp() {
  const [items, setItems] = useState(localStorage.getItem("bucketList")?JSON.parse(localStorage.getItem("bucketList")) : []);
  const [newItem, setNewItem] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  /*useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("bucketList"));
    if (storedItems) setItems(storedItems);
  }, []);*/

  useEffect(() => {
    localStorage.setItem("bucketList", JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (!newItem.trim()) return;
    const newEntry = {
      id: Date.now(),
      text: newItem,
      completed: false,
    };
    setItems([...items, newEntry]);
    setNewItem("");
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const toggleComplete = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const startEditing = (id, currentText) => {
    setEditId(id);
    setEditText(currentText);
  };

  const saveEdit = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, text: editText } : item
      )
    );
    setEditId(null);
    setEditText("");
  };

  return (
    <div className="bucket-container">
      <h1>🎯List It..Live It..Love It..❤️‍🩹</h1>
      <div className="input-group">
        <input
          type="text"
          placeholder="Manifest your next move..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addItem()}
        />
        <button onClick={addItem}>Bucket it!</button>
      </div>
      <ul className="bucket-list">
        {items.map((item) => (
          <li key={item.id} className="bucket-item">
            {editId === item.id ? (
              <>
                <input
                  className="edit-input"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveEdit(item.id)}
                />
                <button onClick={() => saveEdit(item.id)} className="save-btn">✔️</button>
              </>
            ) : (
              <>
                <span
                  onClick={() => toggleComplete(item.id)}
                  className={item.completed ? "completed" : ""}
                >
                  {item.text}
                </span>
                <div className="btn-group">
                  <button onClick={() => startEditing(item.id, item.text)} className="edit-btn">
                    ✏️
                  </button>
                  <button onClick={() => deleteItem(item.id)} className="delete-btn">
                    ❌
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
//✖

import React, { useState, useEffect } from 'react';

const App = () => {
  
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({ id: null, name: '' });
  

  useEffect(() => {
    fetchItems();
  }, []);
  
 
  const fetchItems = async () => {
    try {
      const response = await fetch('/api/items');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };
  
 
  const createItem = async (item) => {
    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (response.ok) {
        const newItem = await response.json();
        setItems([...items, newItem]);
      }
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };
  

  const updateItem = async (item) => {
    try {
      const response = await fetch(`/api/items/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (response.ok) {
        const updatedItem = await response.json();
        const updatedItems = items.map(i => (i.id === updatedItem.id ? updatedItem : i));
        setItems(updatedItems);
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };
  
 
  const deleteItem = async (id) => {
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setItems(items.filter(i => i.id !== id));
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentItem.id) {
      // Update existing item
      updateItem(currentItem);
    } else {
      // Create new item
      createItem(currentItem);
    }
    setCurrentItem({ id: null, name: '' });
  };
  
  // Event handler for input change
  const handleInputChange = (e) => {
    setCurrentItem({ ...currentItem, name: e.target.value });
  };
  
  return (
    <div>
      <h1>CRUD Operations</h1>
      
     
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={currentItem.name}
          onChange={handleInputChange}
          placeholder="Item name"
        />
        <button type="submit">{currentItem.id ? 'Update' : 'Create'}</button>
      </form>
      
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => setCurrentItem(item)}>Edit</button>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

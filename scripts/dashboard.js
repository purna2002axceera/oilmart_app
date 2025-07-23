async function addItem() {
  const token = localStorage.getItem('jwtToken');

  const itemData = {
    materialCode: document.getElementById('materialCode').value,
    wholesaleAmount: document.getElementById('wholesaleAmount').value,
    retailAmount: document.getElementById('retailAmount').value,
    description: document.getElementById('description').value
  };

  try {
    const response = await fetch('http://localhost:8080/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(itemData)
    });

    if (response.ok) {
      alert('Item added successfully.');
    } else {
      alert('Failed to add item.');
    }
  } catch (err) {
    alert('API error.');
  }
}

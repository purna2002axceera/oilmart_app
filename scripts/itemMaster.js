async function addItem() {
  const brand = document.getElementById('brand').value;
  const materialCode = document.getElementById('materialCode').value;
  const wholesaleAmount = document.getElementById('wholesaleAmount').value;
  const retailAmount = document.getElementById('retailAmount').value;
  const description = document.getElementById('description').value;
  const specification = document.getElementById('specification').value; // Changed from 'productSpecification' to 'specification'

  if (!materialCode || !wholesaleAmount || !retailAmount) {
    alert('Please fill in all required fields!');
    return;
  }

  try {
    const response = await fetch('http://localhost:8080/items/add', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')
      },
      body: JSON.stringify({ 
        item_brand: brand,
        material_code: materialCode,
        wholesale_price: parseFloat(wholesaleAmount), 
        retail_price: parseFloat(retailAmount), 
        material_description: description,
        product_specification: specification,
      })
    });

    if (response.ok) {
      alert('Item added successfully!');
      // Clear form
      resetForm();
      
    } else {
      alert('Failed to add item!', response.statusText);
    }
  } catch (err) {
    alert('Error connecting to server: ' + err);
    console.error('Error:', err);
  }
}

function resetForm() {
  document.getElementById('brand').value = '';
  document.getElementById('specification').value = ''; // Changed from 'productSpecification' to 'specification'
  document.getElementById('materialCode').value = '';
  document.getElementById('wholesaleAmount').value = '';
  document.getElementById('retailAmount').value = '';
  document.getElementById('description').value = '';
}
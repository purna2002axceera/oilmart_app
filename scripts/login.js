async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      alert('Login successful', response.statusText);
      window.location.href = 'dashboard.html';
    } else {
      alert('Invalid credentials!', response.statusText);
      console.error('Login failed:', response.statusText);
    }
  } catch (err) {
    alert('Error connecting to server.');
  }
}
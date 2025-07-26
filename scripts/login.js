 document.getElementById('loginForm').addEventListener('submit', async function(e) {
      e.preventDefault();
      await login();
    });

    async function login() {
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value;
      const loginBtn = document.getElementById('loginBtn');
      const buttonText = document.getElementById('buttonText');
      const loadingSpinner = document.getElementById('loadingSpinner');
      const errorMessage = document.getElementById('errorMessage');

      // Validation
      if (!username || !password) {
        showError('Please enter both username and password');
        return;
      }

      // Show loading state
      loginBtn.disabled = true;
      buttonText.textContent = 'Logging in...';
      loadingSpinner.style.display = 'inline-block';
      errorMessage.style.display = 'none';

      try {
        const response = await fetch('http://localhost:8080/api/users/login', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ 
            userName: username, 
            password: password 
          })
        });

        const data = await response.json();

        if (response.ok) {
          // Success - show success message briefly then redirect
          buttonText.textContent = 'Success!';
          loadingSpinner.style.display = 'none';
          
          // Optional: Store user data or token if provided
          if (data.token) {
            localStorage.setItem('authToken', data.token);
          }
          if (data.user) {
            localStorage.setItem('userData', JSON.stringify(data.user));
          }
          
          // Redirect after a brief delay
          setTimeout(() => {
            window.location.href = 'dashboard.html';
          }, 500);
          
        } else {
          // Handle different error scenarios
          let errorMsg = 'Login failed. Please try again.';
          if (response.status === 401) {
            errorMsg = 'Invalid username or password';
          } else if (response.status === 404) {
            errorMsg = 'User not found';
          } else if (data.message) {
            errorMsg = data.message;
          }
          showError(errorMsg);
        }
      } catch (err) {
        console.error('Login error:', err);
        showError('Unable to connect to server. Please check your connection and try again.');
      } finally {
        // Reset button state
        loginBtn.disabled = false;
        buttonText.textContent = 'Login';
        loadingSpinner.style.display = 'none';
      }
    }

    function showError(message) {
      const errorMessage = document.getElementById('errorMessage');
      errorMessage.textContent = message;
      errorMessage.style.display = 'block';
      
      // Add shake animation
      errorMessage.style.animation = 'none';
      setTimeout(() => {
        errorMessage.style.animation = 'shake 0.5s ease-in-out';
      }, 10);
    }

    // Add shake animation for errors
    const style = document.createElement('style');
    style.textContent = `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }
    `;
    document.head.appendChild(style);

    // Clear error message when user starts typing
    document.getElementById('username').addEventListener('input', clearError);
    document.getElementById('password').addEventListener('input', clearError);

    function clearError() {
      document.getElementById('errorMessage').style.display = 'none';
    }

    // Allow Enter key to submit form
    document.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        login();
      }
    });
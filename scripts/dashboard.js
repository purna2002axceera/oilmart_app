  window.addEventListener('load', function() {
      const userData = localStorage.getItem('userData');
      if (userData) {
        try {
          const user = JSON.parse(userData);
          document.getElementById('userName').textContent = user.name || user.userName || 'User';
        } catch (e) {
          console.log('Error parsing user data');
        }
      }
    });

    function loadPage(page) {
      const contentDiv = document.getElementById('main-content');
      
      // Update active menu item
      document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));
      event.target.classList.add('active');
      
      let pageFile = '';

      switch(page) {
        case 'dashboard':
          contentDiv.innerHTML = `
            <div class="welcome-card">
              <h2>Welcome to Oil Mart Dashboard</h2>
            </div>
          `;
          return;
        case 'ItemMaster':
          pageFile = './ItemMaster.html';
          break;
        case 'grn':
          pageFile = './grn.html';
          break;
        case 'profile':
          pageFile = './profile.html';
          break;
        default:
          contentDiv.innerHTML = `
            <h1>Welcome to Oil Mart Dashboard</h1>
            <p>Select an option from the sidebar to get started!</p>
          `;
          return;
      }

      fetch(pageFile)
        .then(response => response.text())
        .then(data => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(data, 'text/html');
          const content = doc.querySelector('.content');
          contentDiv.innerHTML = content ? content.innerHTML : data;
          if (page === 'ItemMaster') {
            loadScript('./../scripts/itemMaster.js');
          }
        })
        .catch(error => {
          console.error('Error loading page:', error);
          contentDiv.innerHTML = `
            <h1>Error Loading Page</h1>
            <p>Unable to load ${page}. Please try again.</p>
          `;
        });
    }

    function loadScript(src) {
      const existingScript = document.querySelector(`script[src="${src}"]`);
      if (existingScript) existingScript.remove();
      const script = document.createElement('script');
      script.src = src;
      document.body.appendChild(script);
    }

    function logout() {
      if (confirm('Are you sure you want to logout?')) {
        // Clear stored data
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        
        // Redirect to login page
        window.location.href = 'login.html';
      }
    }

    // Make functions globally accessible
    window.loadPage = loadPage;
    window.logout = logout;
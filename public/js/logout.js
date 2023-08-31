// Logout function
const logout = async () => {
    // logs user out through POST method
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    // Sends the user back to the login page once they are logged out
    if (response.ok) {
      window.location.replace('/login');
    } else {
      alert(response.statusText);
    }
  };
  // Event listener for the logout button in the navigation bar
  document.querySelector('#logout').addEventListener('click', logout);
  
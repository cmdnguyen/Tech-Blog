console.log('This is my login');

const handleLogin = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#login-username').value;
  const password = document.querySelector('#login-password').value;

  // Validate username and password (for example: email format and password length)
  if (!username || password.length < 8) {
    alert('Invalid username or password');
    return;
  }

  const response = await fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  console.log(response);

if(response.ok){
    document.location.replace("/dashboard")
} else {
  alert('Failed to log in');
}

  const data = await response.json();
  console.log(data);
};

//get login-form id and on submit, handleLogin
document.getElementById("login-form").addEventListener("submit", handleLogin)

const handleSignUp = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#signup-username').value;
  const password = document.querySelector('#signup-password').value;

  if (username && password) {
    console.log("Got my username & password")
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to sign up.');
    }
  }
}
document.getElementById('signup-form').addEventListener('submit', handleSignUp)
console.log('This is my login');

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

const handleLogin = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#login-email').value;
  const password = document.querySelector('#login-password').value;

  // Validate email and password (for example: email format and password length)
  if (!isValidEmail(email) || password.length < 8) {
    alert('Invalid email or password');
    return;
  }

  const response = await fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  console.log(response);
if(response.ok){
    document.location.replace("/dashboard")
}

  const data = await response.json();
  console.log(data);
};

//get login-form id and on submit, handleLogin
document.getElementById("login-form").addEventListener("submit", handleLogin)
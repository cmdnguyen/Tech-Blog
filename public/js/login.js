// Log in function
const handleLogin = async (event) => {
  event.preventDefault();
  // Takes the value of the username and password in the login form
  const username = document.querySelector("#login-username").value;
  const password = document.querySelector("#login-password").value;

  // Validate username and password
  if (!username || password.length < 8) {
    alert("Invalid username or password");
    return;
  }

  // Sends the values to a POST route for api/users/login
  const response = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  // Sends the logged in user to the dashboard if successful. If not, sends an alert
  if (response.ok) {
    location.replace("/dashboard");
  } else {
    alert("Failed to log in");
  }
};

//Event listener for the login button in the login form
document.getElementById("login-form").addEventListener("submit", handleLogin);

// Sign Up function
const handleSignUp = async (event) => {
  event.preventDefault();
  // Takes the value of the username and password in the signup form
  const username = document.querySelector("#signup-username").value;
  const password = document.querySelector("#signup-password").value;
  // If there's a username and password, sends values to POST route to api/users
  if (username && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    // Sends the new user to dashboard since they are now logged in
    if (response.ok) {
      location.replace("/dashboard");
    } else {
      alert("Failed to sign up.");
    }
  }
};
// Event listener for the signup button in the signup form
document.getElementById("signup-form").addEventListener("submit", handleSignUp);

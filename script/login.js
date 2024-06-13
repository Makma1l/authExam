import { checkToken, redirect } from "./utils.js";

const form = document.forms[0];
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

window.addEventListener("DOMContentLoaded", function () {
  const hasToken = checkToken();
  if (hasToken) {
    redirect("/admin.html");
  }
});


const credentials = {
  email: '',
  password: '',
};

emailInput.oninput = function (event) {
  credentials.email = event.target.value;
};

passwordInput.oninput = function (event) {
  credentials.password = event.target.value;
};

form.onsubmit = function (event) {
  event.preventDefault();
  login();
};

// Function to handle login
async function login() {
  const api_url = "https://api.escuelajs.co/api/v1/auth/login";

  try {
    const response = await fetch(api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      const data = await response.json();
      const { access_token, refresh_token } = data;

      sessionStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      const hasToken = checkToken();
      if (hasToken) {
        redirect("/admin.html");
      }
    } else {
      handleLoginError(response);
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
}

function handleLoginError(response) {
  if (response.status === 401) {
    alert("Invalid email or password. Please try again.");
  } else {
    alert("An error occurred. Please try again later.");
  }
}


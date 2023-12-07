const url = "http://localhost:8080/api/v1/users/login"

  function handleLoginForm() {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const formData = new FormData(loginForm);
      const formDataObject = {};

      formData.forEach((value, key) => {
          formDataObject[key] = value;
      });

      fetch(`${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataObject)
    })

    .then((response) => {
        if (!response.ok) {
           console.log( JSON.stringify(formDataObject))
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        location.href = "/";
        return response.json();
    })
    .then((data) => {
      if (data.id) {
        localStorage.setItem("idUser", data.id)
        console.log(localStorage.getItem("idUser"));
      } else {
        console.error("Login response is missing user ID.");
      }
    })
    .catch((error) => {
        console.error("Error getting login:", error);
    });
      
    })

  }

  document.addEventListener("DOMContentLoaded", handleLoginForm);

  document.addEventListener("DOMContentLoaded", handleRegistrationForm);
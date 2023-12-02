const url = "http://localhost:8080/api/v1/users/login"

  function handleLoginForm() {
    const registrationForm = document.getElementById("registration-form");

    registrationForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(registrationForm);
      const formDataObject = {};

      formData.forEach((value, key) => {
        if (key === "age") {
          formDataObject[key] = parseInt(value, 10);
        } else if (key === "cpf" && value === "") {
          formDataObject[key] = null;
        } else {
          formDataObject[key] = value;
        }
      });

      console.log("Registration Request Data:", formDataObject);

      fetch(`${url}/register`, {
        method: "POST",
        body: JSON.stringify(formDataObject),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.id) {
            localStorage.setItem("idUser", data.id)
            console.log(localStorage.getItem("idUser"));
          } else {
            console.error("Registration response is missing user ID.");
          }
        })
        .catch((error) => {
          console.error("Registration error:", error);
        });
    });
  }

  document.addEventListener("DOMContentLoaded", handleRegistrationForm);


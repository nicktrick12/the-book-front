const url = "http://localhost:8080"

  function handleRegistrationForm() {
    const registrationForm = document.getElementById("registration-form");

    registrationForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.querySelector('#name').value;
      const username = document.querySelector('#username').value;
      const password = document.querySelector('#password').value;
      const email = document.querySelector('#email').value;

        if (username === "" || password === "" || email ==="" || name ==="") {
            alert("Preencha todos os campos.");
            return;
        }

      const formData = new FormData(registrationForm);
      const formDataObject = {};

      formData.forEach((value, key) => {
          formDataObject[key] = value;
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
          if (response.status != 200){
            alert ("Algo pode estar errado como o nome de usuario, email ou senha");
            throw new Error(`HTTP error! Status: ${response.status}`);
          }else{
          alert("Preencha todos os campos");
          throw new Error(`HTTP error! Status: ${response.status}`);
          }
        }
        location.href = "/";
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
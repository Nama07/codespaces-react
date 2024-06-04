import React, { useState } from 'react';
import './Login.css'; // Import your CSS file

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');

  async function handleRegister() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!email.includes("@")) {
      alert("Tohle není email (není tam @)");
      return;
    }

    if (password !== confirmPassword) {
      alert("Hesla se neshodují, zkuste to znovu.");
      return;
    }

    alert("Registrace úspěšná");
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    setIsLoggedIn(true);
    setEmail(email);
    closeModal();
  }

  async function handleLogin() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch('http://localhost:5000/api/Team2/Login?username=' + email + '&password=' + password, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log("Přihlášení úspěšné");
        setIsLoggedIn(true);
        setEmail(email);
        closeModal();
      } else {
        console.log("Nesprávný email nebo heslo, zkuste to znovu.");
      }
    } catch (error) {
      console.error('Error during login:', error);
      console.log('Nastala chyba při přihlašování, zkuste to znovu.');
    }
  }

  async function handleLogout() {
    try {
      const response = await fetch('http://localhost:5000/api/Team2/Logout?username=' + email, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log("Odhlášení úspěšné");
        setIsLoggedIn(false);
        setEmail('');
      } else {
        console.log("Chyba odhlašování.");
      }
    } catch (error) {
      console.error('Error during logout:', error);
      console.log('Nastala chyba při odhlašování.');
    }
  }

  function openModal() {
    document.getElementById("authModal").style.display = "block";
  }

  function closeModal() {
    document.getElementById("authModal").style.display = "none";
  }

  function toggleMode() {
    setIsLoginMode(!isLoginMode);
  }

  return (
    <div className="container">
      <div className="row justify-content-end">
        <div className="col-auto">
          {!isLoggedIn ? (
            <button className="btn btn-primary" onClick={openModal}>Přihlásit se</button>
          ) : (
            <button className="btn btn-danger" onClick={handleLogout}>Odhlásit se</button>
          )}
        </div>
      </div>

      <div id="authModal" className="custom-modal modal" style={{ display: 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{isLoginMode ? "Login" : "Register"}</h5>
              <button type="button" className="close" onClick={closeModal}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" className="form-control" id="email" placeholder="Zadejte email" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" className="form-control" id="password" placeholder="Zadejte heslo" />
              </div>
              {!isLoginMode && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">Potvrdit heslo:</label>
                  <input type="password" className="form-control" id="confirmPassword" placeholder="Potvrďte heslo" />
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary switch-button" onClick={toggleMode}>
                {isLoginMode ? "Změnit na Registraci" : "Změnit na Přihlášení"}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={isLoginMode ? handleLogin : handleRegister}
              >
                {isLoginMode ? "Přihlásit se" : "Registrovat"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

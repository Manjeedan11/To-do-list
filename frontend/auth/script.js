document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    loginForm.addEventListener('submit', loginUser);
    signupForm.addEventListener('submit', signupUser);
});

function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('email-login').value;
    const password = document.getElementById('password-login').value;

    fetch('http://localhost:5000/api/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Login failed');
        }
        return response.json();
    })
    .then(data => {
        window.location.href = '/frontend/main/index.html'; 
    })
    .catch(error => {
        alert('Login failed. Please check your credentials.'); 
        console.error('Error:', error);
    });
}

function signupUser(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email-signup').value;
    const password = document.getElementById('password-signup').value;

    fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Signup failed');
        }
        return response.json();
    })
    .then(data => {
        window.location.href = '/index.html'; 
    })
    .catch(error => {
        alert('Signup failed. Please try again.'); 
        console.error('Error:', error);
    });
}



function flip() {

    document.querySelector('.flip-card-inner').style.transform = "rotateY(180deg)";

}

function flipAgain() {

    document.querySelector('.flip-card-inner').style.transform = "rotateY(0deg)";

}


let eye = document.getElementById("eye-login");
let password = document.getElementById("password-login");

eye.onclick = function () {
    if (password.type == "password") {
        password.type = "text";
        eye.className = "fa fa-eye";
        eye.style.color = "cyan";
        // password.style.border =" 1px solid cyan";


    } else {
        password.type = "password"
        eye.className = "fa fa-eye-slash";
        eye.style.color = "white";
        // password.style.border =" 1px solid white";


    }
}


let eye2 = document.getElementById("eye-signup");
let password2 = document.getElementById("password-signup");

eye2.onclick = function () {
    if (password2.type == "password") {
        password2.type = "text";
        eye2.className = "fa fa-eye";
        eye2.style.color = "cyan";
        // password2.style.border =" 1px solid cyan";



    } else {
        password2.type = "password"
        eye2.className = "fa fa-eye-slash";
        eye2.style.color = "white";
        // password2.style.border =" 1px solid white";


    }
}




// Sing in an existing user
const loginFormHandler = async (event) => {
    event.preventDefault();
    
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
        // send a POST request to api
        const response = await fetch('api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }, // what is this?
        });

        if (response.ok) {
            //alert('you are logged in!')
            document.location.replace('/dashboard')
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('#login-button').addEventListener('click', loginFormHandler);

// Sign up a new user
const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    //alert('button clicked!');
    if (username && password) {
        const response = await fetch('api/users', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if(response.ok) {
            //alert('you are logged in!')
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create new account. Your username must be unique, and your password must be at least 8 characters long.')
        }
    }

}

document.querySelector('#signup-button').addEventListener('click', signupFormHandler);
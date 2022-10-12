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
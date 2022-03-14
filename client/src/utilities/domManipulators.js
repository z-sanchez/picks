export function prepForm(loggingIn) {
    const loginHeader = document.getElementById('login__header');
    const buttonOne = document.getElementsByClassName('buttons')[0]
    const buttonTwo = document.getElementsByClassName('buttons')[1];
    const statusNotification = document.getElementById('login__status');

    statusNotification.style.display = 'none';
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";

    if (loggingIn) {
        loginHeader.innerText = 'Login';
        buttonOne.innerText = 'Sign Up';
        buttonTwo.innerText = 'Login';
    }
    else {
        loginHeader.innerText = 'Sign Up';
        buttonOne.innerText = 'Login';
        buttonTwo.innerText = 'Sign Up';
    }
}

export function authStatus(error) {

    const statusNotification = document.getElementById('login__status');

    if (error) {
        statusNotification.style.backgroundColor = '#F33F63';
        statusNotification.innerText = 'Invalid email or password';
        statusNotification.style.display = 'block';
    }
    else {
        statusNotification.style.backgroundColor = '#24C196';
        statusNotification.innerText = 'Successful Sign Up!';
        statusNotification.style.display = 'block';
    }

}
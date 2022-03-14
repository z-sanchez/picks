
export function prepForm(loggingIn) {
    const loginHeader = document.getElementById('login__header');
    const buttonOne = document.getElementsByClassName('buttons')[0]
    const buttonTwo = document.getElementsByClassName('buttons')[1];
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
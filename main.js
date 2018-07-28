var form = document.getElementById("form");

var nickname = document.getElementById("nickname");
var email = document.getElementById("email");
var password1 = document.getElementById("password1");
var password2 = document.getElementById("password2");

function setInvalid(field) {
    field.classList.add("form__input--invalid");
}

function clearInvalid(field) {
    field.classList.remove("form__input--invalid");
}

function validateNickname() {
    nickname.value=nickname.value.replace(/^\s*/,'').replace(/\s*$/,'');

    if (!nickname.value) {
        setInvalid(nickname);
        return false;
    }

    if (!nickname.value.match(/^[a-z0-9_]*$/)) {
        setInvalid(nickname);
        return false;
    }

    clearInvalid(nickname);
    return true;
}

function validateEmail() {
    email.value=email.value.replace(/^\s*/,'').replace(/\s*$/,'');
    email.value=email.value.replace(/^[.]*/,'').replace(/[.]*$/,'');

    while(email.value.match(/[.][.]/)) email.value=email.value.replace(/[.][.]/,'.');

    if (email.value.match(/^[.]/)) {
        setInvalid(email);
        return false;
    }

    if (email.value.match(/[.]$/)) {
        setInvalid(email);
        return false;
    }

    if (!email.value.match(/^[a-z0-9_.]*@[a-z0-9_.]*$/)) {
        setInvalid(email);
        return false;
    }

    clearInvalid(email);
    return true;
}

function validatePasswords() {
    password1.value=password1.value.replace(/^\s*/,'').replace(/\s*$/,'');
    password2.value=password2.value.replace(/^\s*/,'').replace(/\s*$/,'');

    if (!password1.value || !password2.value) {
        setInvalid(password1);
        setInvalid(password2);
        return false;
    }

    if (password1.value !== password2.value) {
        setInvalid(password1);
        setInvalid(password2);
        return false;
    }

    clearInvalid(password1);
    clearInvalid(password2);

    return true;
}

function validateForm() {
    var validated = true;

    if (!validateNickname()) validated = false;
    if (!validateEmail()) validated = false;
    if (!validatePasswords()) validated = false;

    return validated;
}

nickname.onchange = validateNickname;
email.onchange = validateEmail;
password1.onchange = validatePasswords;
password2.onchange = validatePasswords;

form.onsubmit = function(event) {
    event.preventDefault();

    if (!validateForm()) return;

    alert("Форма была отправлена");
    // form.send();
}
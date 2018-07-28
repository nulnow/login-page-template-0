var form = document.getElementById("form");
var nicknameInput = document.getElementById("nickname");
var emailInput = document.getElementById("email");
var password1Input = document.getElementById("password1");
var password2Input = document.getElementById("password2");

function trim(str) {
    // Удаляет все пробелы в начале и в конце строки
    return str.replace(/^\s*/,'').replace(/\s*$/,'');
}

function trimPoints(str) {
    // Удаляет все точки в начале и в конце строки
    return str.replace(/^[.]*/,'').replace(/[.]*$/,'');
}

function setValid(field) {
    field.classList.add("form__input--valid");
}

function setInvalid(field) {
    field.classList.add("form__input--invalid");
}

function clearValidInvalid(field) {
    field.classList.remove("form__input--valid");
    field.classList.remove("form__input--invalid");
}

function checkAllEmpty() {
    if (nicknameInput.value) return false;
    if (emailInput.value) return false;
    if (password1Input.value) return false;
    if (password2Input.value) return false;
    return true;
}

function clearAllInvalid() {
    clearValidInvalid(nicknameInput);
    clearValidInvalid(emailInput);
    clearValidInvalid(password1Input);
    clearValidInvalid(password2Input);
}

function validateNickname() {
    if (checkAllEmpty()) clearAllInvalid();

    nicknameInput.value=trim(nicknameInput.value);
    nicknameInput.value=trimPoints(nicknameInput.value);

    if (!nicknameInput.value) {
        setInvalid(nicknameInput);
        return false;
    }

    if (!nicknameInput.value.match(/^[a-z0-9_]*$/)) {
        setInvalid(nicknameInput);
        return false;
    }

    clearValidInvalid(nicknameInput);
    setValid(nicknameInput);
    return true;
}

function validateEmail() {
    if (checkAllEmpty()) clearAllInvalid();
    
    emailInput.value=trim(emailInput.value);
    emailInput.value=trimPoints(emailInput.value);

    // Заменяет все места, где больше одной точки подряд на одну точку
    while(emailInput.value.match(/[.][.]/)) {
        emailInput.value=emailInput.value.replace(/[.][.]/,'.');
    }

    // Если email начинается с точки
    if (emailInput.value.match(/^[.]/)) {
        setInvalid(emailInput);
        return false;
    }

    // Если email заканчивается точкой
    if (emailInput.value.match(/[.]$/)) {
        setInvalid(emailInput);
        return false;
    }

    if (!emailInput.value.match(/^[\w_.]+@[\w_.]+$/)) {
        setInvalid(emailInput);
        return false;
    }

    clearValidInvalid(emailInput);
    setValid(emailInput);
    return true;
}

function validatePasswords() {
    if (checkAllEmpty()) clearAllInvalid();

    if (!password1Input.value.match(/^[\w!@#$%^&*()-_=+}]*$/)) {
        setInvalid(password1Input);
        setInvalid(password2Input);
        return false;
    }

    if (!password1Input.value || !password2Input.value) {
        setInvalid(password1Input);
        setInvalid(password2Input);
        return false;
    }

    if (password1Input.value !== password2Input.value) {
        setInvalid(password1Input);
        setInvalid(password2Input);
        return false;
    }

    clearValidInvalid(password1Input);
    clearValidInvalid(password2Input);

    setValid(password1Input);
    setValid(password2Input);
    if (checkAllEmpty()) clearAllInvalid();
    return true;
}

function validateForm() {
    var validated = true;

    if (!validateNickname()) validated = false;
    if (!validateEmail()) validated = false;
    if (!validatePasswords()) validated = false;

    return validated;
}

nicknameInput.onchange = validateNickname;
emailInput.onchange = validateEmail;
password1Input.onchange = validatePasswords;
password2Input.onchange = validatePasswords;

[nicknameInput, emailInput, password1Input, password2Input].map(function(input) {
    input.onblur = function() {
        if (checkAllEmpty()) clearAllInvalid();
    }
});

form.onsubmit = function(event) {
    event.preventDefault();

    if (!validateForm()) return;

    alert("Форма была отправлена");
    // form.send();
}
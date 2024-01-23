const validate = (password) => {
    if (password.length < 8) {
        alert("Password must be at least 8 characters long");
        return false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/;
    if (!passwordRegex.test(password)) {
        alert("Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character");
        return false;
    }

    return true;
};

export default validate
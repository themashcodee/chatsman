import EmailValidator from 'email-validator';

export function nameValidation(value, error) {
    if (value.length < 3) return error("Name can't be less than 3 letters");
    if (value.length > 20) return error("Name can't be more than 20 letters");
    if (!value.match(/^[a-zA-Z][a-zA-Z\s]*$/)) return error("Name can only contain letters");
    error(null);
}
export function usernameValidation(value, error) {
    if (!(value.match(/^[a-zA-Z0-9]*$/))) return error("Username can only contain letters and numbers")
    if (value.length < 3) return error("Username can't be less than 3 characters");
    if (value.length > 10) return error("Username can't be more than 10 characters");
    error(null);
}
export function emailValidation(value, error) {
    if (value.length > 35) return error("Email can't be more than 35 characters");
    if (!EmailValidator.validate(value)) return error("It's not a valid email")
    error(null);
}
export function passwordValidation(value, error) {
    if (value.length < 8) return error("Password can't be less than 8 characters");
    if (value.length > 20) return error("Password can't be more than 20 characters");
    if (!value.match(/[a-zA-Z]/)) return error('Password should must have a letter')
    if (!value.match(/[!#$%&?"^*~`@]/)) return error('Password should must have a special character')
    if (!value.match(/[1-9]/)) return error('Password should must have a number')
    error(null);
}
export function secretValidation(value, error) {
    if (!value.match(/^[0-9]*$/)) return error('Code should must only have numbers')
    if (value.length < 6) return error("Code can't be less than 6 characters");
    if (value.length > 6) return error("Code can't be more than 6 characters");
    error(null);
}
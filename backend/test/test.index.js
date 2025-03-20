const {
  isValidEmail,
  isValidPassword,
  validateUserInput,
} = require("../index.js");


const dataValid = { email: "bob@yandex.com", password: "1amAp0k3m0n%" };
const dataInvalidPassword = { email: "bob@yandex.com", password: "123456" };
const dataInvalidEmail = { email: "bob", password: "1amAp0k3m0n%" };
const dataInvalidCredentials = { email: "bob", password: "12345" };

describe("Validación de los datos de usuario", () => {
  test("#isValidEmail debe verificar que el correo electrónico sea válido", () => {
    expect(isValidEmail(dataValid.email)).toBeTruthy();
    expect(isValidEmail(dataInvalidEmail.email)).toBeFalsy();
  });

  test("#isValidPassword debe verificar que la contraseña sea válida", () => {
    expect(isValidPassword(dataValid.password)).toBeTruthy();
    expect(isValidPassword(dataInvalidPassword.password)).toBeFalsy();
  });

  test("#validateUserInput debe devolver `message` si los datos son correctos, sin devolver un error", () => {
    expect(validateUserInput(dataValid).isValidated).toBeTruthy();
    expect(validateUserInput(dataValid).error).toBeNull();
    expect(validateUserInput(dataValid).message).toBe(
      "Usuario creado correctamente"
    );
  });

  test("#validateUserInput debe devolver un error de correo electrónico si el correo electrónico es incorrecto", () => {
    expect(validateUserInput(dataInvalidEmail).isValidated).toBeFalsy();
    expect(validateUserInput(dataInvalidEmail).error).toBe(
      "Correo electrónico incorrecto"
    );
    expect(validateUserInput(dataInvalidEmail).message).toBeNull();
  });

  test("#validateUserInput debe devolver un error de contraseña si la contraseña es incorrecta", () => {
    expect(validateUserInput(dataInvalidPassword).isValidated).toBeFalsy();
    expect(validateUserInput(dataInvalidPassword).error).toBe(
      "Contraseña incorrecta"
    );
    expect(validateUserInput(dataInvalidPassword).message).toBeNull();
  });

  test("#validateUserInput debe devolver un error de datos incorrectos si todos los datos son incorrectos", () => {
    expect(validateUserInput(dataInvalidCredentials).isValidated).toBeFalsy();
    expect(validateUserInput(dataInvalidCredentials).error).toBe(
      "Datos incorrectos"
    );
    expect(validateUserInput(dataInvalidCredentials).message).toBeNull();
  });
});

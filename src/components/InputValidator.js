export default class InputValidator {
  constructor(inputSlector, inputErrorSelector, submitButtonSelector) {
    this._input = document.querySelector(inputSlector);
    this._inputError = document.querySelector(inputErrorSelector);
    this._submit = document.querySelector(submitButtonSelector);
    this._handleDeliteErrorRequirder =
      this._handleDeliteErrorRequirder.bind(this);
    this._handleDeliteErrorInn = this._handleDeliteErrorInn.bind(this);
    this._handleDeliteErrorTypeOfInput =
      this._handleDeliteErrorTypeOfInput.bind(this);
    this._handleDeliteErrorTel = this._handleDeliteErrorTel.bind(this);
    this._telPattern = /^((\+7)+([0-9\-\s]){14})$/;
  }

  _isRequiredValid() {
    return this._input.value !== "";
  }

  _isInnValid() {
    return this._input.value.length === 14 && !Number.isNaN(+this._input.value);
  }

  _isInputTypeValid() {
    return this._input.checkValidity();
  }

  _isTelValid() {
    return this._telPattern.test(this._input.value);
  }

  _handleError(errorMessage) {
    this._inputError.textContent = errorMessage;
    this._input.classList.add("recipient__input_type_error");
  }

  _handleDeliteErrorRequirder() {
    if (this._isRequiredValid()) {
      this._inputError.textContent = "";
      this._input.classList.remove("recipient__input_type_error");
      this._input.removeEventListener(
        "input",
        this._handleDeliteErrorRequirder
      );
    }
  }

  _handleDeliteErrorInn() {
    if (this._isInnValid() || this._input.value === "") {
      this._inputError.textContent = "";
      this._input.classList.remove("recipient__input_type_error");
      this._input.removeEventListener("input", this._handleDeliteErrorInn);
    }
  }

  _handleDeliteErrorTel() {
    if (this._isTelValid() || this._input.value === "") {
      this._inputError.textContent = "";
      this._input.classList.remove("recipient__input_type_error");
      this._input.removeEventListener("input", this._handleDeliteErrorTel);
    }
  }

  _handleDeliteErrorTypeOfInput() {
    if (this._isInputTypeValid() || this._input.value === "") {
      this._inputError.textContent = "";
      this._input.classList.remove("recipient__input_type_error");
      this._input.removeEventListener(
        "input",
        this._handleDeliteErrorTypeOfInput
      );
    }
  }

  formatTel() {
    this._input.addEventListener("click", () => {
      if (this._input.value.length === 0) {
        this._input.value = "+7 ";
      }
    });

    this._input.addEventListener("keydown", (evt) => {
      if (evt.key !== "Backspace") {
        if (this._input.value.length === 6) {
          this._input.value += " ";
        } else if (
          this._input.value.length === 10 ||
          this._input.value.length === 13
        ) {
          this._input.value += "-";
        }
      }
    });
  }

  disableInputNan() {
    this._input.addEventListener("input", () => {
      this._input.value = this._input.value.replace(/[^\d]/g, '');
    });
  }

  disableInputLetter() {
    this._input.addEventListener("input", () => {
      this._input.value = this._input.value.replace(/[A-Za-zА-Яа-яЁё]/g, '');
    });
  }

  validateRequired(errorMessage) {
    this._submit.addEventListener("click", () => {
      if (!this._isRequiredValid()) {
        this._handleError(errorMessage);
        this._input.scrollIntoView();
        this._input.addEventListener("input", this._handleDeliteErrorRequirder);
      }
    });
  }

  validateInn(errorMessage) {
    this._input.addEventListener("blur", () => {
      if (!this._isInnValid() && this._input.value.length > 0) {
        this._handleError(errorMessage);
        this._input.addEventListener("input", this._handleDeliteErrorInn);
      }
    });
  }

  validateInputByType(errorMessage) {
    this._input.addEventListener("blur", () => {
      if (!this._isInputTypeValid()) {
        this._handleError(errorMessage);
        this._input.addEventListener(
          "input",
          this._handleDeliteErrorTypeOfInput
        );
      }
    });
  }

  validateTel(errorMessage) {
    this._input.addEventListener("blur", () => {
      if (!this._isTelValid()) {
        this._handleError(errorMessage);
        this._input.addEventListener("input", this._handleDeliteErrorTel);
      }
    });
  }
}

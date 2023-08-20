export default class FormValidator {
  constructor(inputSlector, inputErrorSelector, submitButtonSelector) {
    this._input = document.querySelector(inputSlector);
    this._inputError = document.querySelector(inputErrorSelector);
    this._submit = document.querySelector(submitButtonSelector);
    this._handleDeliteErrorRequirder =
      this._handleDeliteErrorRequirder.bind(this);
    this._handleDeliteErrorInn = this._handleDeliteErrorInn.bind(this);
    this._handleDeliteErrorTypeOfInput =
      this._handleDeliteErrorTypeOfInput(this);
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
    if (this._isInnValid()) {
      this._inputError.textContent = "";
      this._input.classList.remove("recipient__input_type_error");
      this._input.removeEventListener("input", this._handleDeliteErrorInn);
    }
  }

  _handleDeliteErrorTypeOfInput() {
    if (this._isInputTypeValid()) {
      this._inputError.textContent = "";
      this._input.classList.remove("recipient__input_type_error");
      this._input.removeEventListener(
        "input",
        this._handleDeliteErrorTypeOfInput
      );
    }
  }

  validateRequired(errorMessage) {
    this._submit.addEventListener("click", () => {
      if (!this._isRequiredValid()) {
        this._handleError(errorMessage);
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
}

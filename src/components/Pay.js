export default class Pay {
  constructor(
    { number, date, system },
    systemSelector,
    numberSelector,
    dateSelector,
    editSelector,
    handleEditClick
  ) {
    this._number = number;
    this._date = date;
    this._system = system;

    this._numberElement = document.querySelector(numberSelector);
    this._dateElement = document.querySelector(dateSelector);
    this._systemElement = document.querySelector(systemSelector);
    this._editButton = document.querySelector(editSelector);

    this._handleEditClick = handleEditClick.bind(this);
  }

  _defineCardClass(system) {
    let className;

    switch (system) {
      case "mastercard":
        className = "system system_type_mastercard";
        break;
      case "visa":
        className = "system system_type_visa";
        break;
      case "maestro":
        className = "system system_type_maestro";
        break;
      default:
        className = "system";
    }

    return className;
  }

  setEventListeners() {
    this._editButton.addEventListener("click", this._handleEditClick);
  }

  update({ number, date, system }) {
    this._number = number;
    this._date = date;
    this._system = system;
  }

  render() {
    this._numberElement.textContent = this._number;
    this._dateElement.textContent = this._date;
    this._systemElement.className = this._defineCardClass(this._system);
  }
}

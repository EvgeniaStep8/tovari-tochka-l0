import Popup from "./Popup.js";

export default class PopupWithPayForm extends Popup {
  constructor(
    popupSelector,
    closeButtonSelector,
    templateSelector,
    formSelector,
    containerSelector,
    cards,
    handleFormChange
  ) {
    super(popupSelector, closeButtonSelector);
    this._cards = cards;
    this._template = document.querySelector(templateSelector);
    this._form = document.querySelector(formSelector);
    this._container = this._popup.querySelector(containerSelector);
    this._handleFormChange = handleFormChange;
  }

  _getTemplate() {
    const cardElement = this._template.content
      .querySelector(".radiobutton")
      .cloneNode(true);
    return cardElement;
  }

  _defineCardClass(system) {
    switch (system) {
      case "mastercard":
        this._class = "system system_type_mastercard";
        break;
      case "visa":
        this._class = "system system_type_visa";
        break;
      case "maestro":
        this._class = "system system_type_maestro";
        break;
      default:
        this._class = "system";
    }
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();

    this._checkedCardId = +this._form.elements["pay"].value;
    this._handleFormChange(this._checkedCardId);

    this.close();
  }

  _getCard(card) {
    const cardElement = this._getTemplate();

    this._defineCardClass(card.system);

    cardElement.querySelector(".form__text").textContent = card.number;
    cardElement.querySelector("#radio-system").className = this._class;
    cardElement.querySelector(".radiobutton__input").checked = card.checked;
    cardElement.querySelector(".radiobutton__input").value = card.id;

    return cardElement;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", this._handleFormSubmit.bind(this));
  }

  render() {
    this._cards.forEach((card) => {
      this._container.append(this._getCard(card));
    });
  }
}

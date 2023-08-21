export default class Popup {
  constructor(popupSelector, closeButtonSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(closeButtonSelector);
    this._handleEscUp = this._handleEscUp.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscUp);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscUp);
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", this.close.bind(this));
    this._popup.addEventListener("click", this._handleOverlayClick.bind(this));
  }

  _handleEscUp(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }
}

import Popup from "./Popup.js";

export default class PopupWithDeliveryForm extends Popup {
  constructor(
    popupSelector,
    closeButtonSelector,
    templateSelector,
    formSelector,
    containerSelector,
    titleSelector,
    courierRadioSelector,
    pointRadioSelector,
    { adresses, points, delivery },
    handleFormChange
  ) {
    super(popupSelector, closeButtonSelector);
    this._adresses = adresses;
    this._points = points;
    this._delivery = delivery;
    this._template = document.querySelector(templateSelector);
    this._form = document.querySelector(formSelector);
    this._container = this._popup.querySelector(containerSelector);
    this._title = this._popup.querySelector(titleSelector);
    this._courierRadio = this._popup.querySelector(courierRadioSelector);
    this._pointRadio = this._popup.querySelector(pointRadioSelector);
    this._handleFormChange = handleFormChange;
  }

  _getTemplate() {
    const way = this._template.content
      .querySelector(".form__container")
      .cloneNode(true);
    return way;
  }

  _renderAdress() {
    this._adresses.forEach((adress) => {
      this._way = this._getTemplate();

      this._way.querySelector(".form__text").textContent = adress.name;
      this._way.querySelector(".radiobutton__input").checked = adress.checked;
      this._way.querySelector(".radiobutton__input").value = adress.id;

      this._container.append(this._way);
    });
  }

  _renderPoint() {
    this._points.forEach((point) => {
      this._way = this._getTemplate();

      this._way.querySelector(".form__text").textContent = point.name;
      this._way.querySelector(".radiobutton__input").checked = point.checked;
      this._way.querySelector(".radiobutton__input").value = point.id;

      this._container.append(this._way);
    });
  }

  _updateRadio() {
    this._container.innerHTML = "";
  }

  _updateAdress() {
    this._checkedAdressId = +this._form.elements["delivery"].value;
    this._adresses.forEach((adress) => {
      adress.checked = adress.id === this._checkedAdressId;
    });
  }

  _updatePoint() {
    this._checkedPointId = +this._form.elements["delivery"].value;
    this._points.forEach((point) => {
      point.checked = point.id === this._checkedAdressId;
    });
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();

    this._delivery === "courier" ? this._updateAdress() : this._updatePoint();

    this._handleFormChange(this._adresses, this._points, this._delivery);
  }

  setEventListeners() {
    super.setEventListeners();

    this._courierRadio.addEventListener("click", () => {
      this._delivery = "courier";
      this._updateRadio();
      this._renderAdress();
    });

    this._pointRadio.addEventListener("click", () => {
      this._delivery = "point";
      this._updateRadio();
      this._renderPoint();
    });

    this._form.addEventListener("submit", this._handleFormSubmit.bind(this));
  }

  render() {
    if (this._delivery === "courier") {
      this._title.textContent = "Мои адреса";
      this._courierRadio.checked = true;

      this._renderAdress();
    } else {
      this._title.textContent = "Пункты выдачи";
      this._pointRadio.checked = true;

      this._renderPoint();
    }
  }
}

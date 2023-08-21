export default class Delivery {
  constructor(
    deliverySelector,
    adressSelector,
    raitingSelector,
    timeSelector,
    editButtonSelector,
    userInfo,
    handleEditButtonClick
  ) {
    this._deliveryElement = document.querySelector(deliverySelector);
    this._adressElement = document.querySelector(adressSelector);
    this._raitingElement = document.querySelector(raitingSelector);
    this._timeElement = document.querySelector(timeSelector);
    this._editButton = document.querySelector(editButtonSelector);
    this._userInfo = userInfo;
    this._handleEditButtonClick = handleEditButtonClick.bind(this);
  }

  _renderPoint() {
    this._deliveryElement.textContent = "Пункт выдачи";

    this._point = this._userInfo.points.filter(
      (point) => point.checked === true
    )[0];

    this._adressElement.textContent = this._point.name;
    this._raitingElement.style = "display: flex";
    this._raitingElement.textContent = this._point.raiting;
    this._timeElement.textContent = this._point.time;
  }

  _renderAdress() {
    this._deliveryElement.textContent = "Курьер";

    this._adress = this._userInfo.adresses.filter(
      (adress) => adress.checked === true
    )[0];

    this._adressElement.textContent = this._adress.name;
    this._raitingElement.style = "display: none";
    this._timeElement.textContent =
      "Курьер свяжется с вами заранее для обсуждения времени доставки";
  }

  updateDeliveryInfo(userInfo) {
    this._userInfo = userInfo;
    this.render();
  }

  _setEventListeners() {
    this._editButton.addEventListener("click", this._handleEditButtonClick);
  }

  render() {
    if (this._userInfo.delivery === "point") {
      this._renderPoint();
    } else {
      this._renderAdress();
    }
    this._setEventListeners();
  }
}

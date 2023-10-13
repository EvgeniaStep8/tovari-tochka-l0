export default class SideBar {
  constructor(
    sideBarSelector,
    sumCount,
    sumPrice,
    sumOldPrice,
    delivery,
    adress,
    { number, system },
    handleEditDeliveryClick,
    handleEditPayClick
  ) {
    this._sideBar = document.querySelector(sideBarSelector);
    this._sumPrice = sumPrice;
    this._sumOldPrice = sumOldPrice;
    this._sumCount = sumCount;
    this._delivery = delivery;
    this._adress = adress;
    this._number = number;
    this._system = system;

    this._price = document.querySelector(".side-bar__price");
    this._oldPrice = document.querySelector("#old-price");
    this._count = document.querySelector("#count");
    this._discount = document.querySelector("#discount");
    this._checkbox = document.querySelector("#side-bar-checkbox");
    this._button = document.querySelector(".side-bar__submit-button");

    this._deliveryElement = document.querySelector("#side-bar-delivery");
    this._adressElement = document.querySelector("#side-bar-adress");
    this._editDeliveryButton = document.querySelector(
      "#side-bar-edit-delivery"
    );

    this._cardElement = document.querySelector(".methods-pay__text");
    this._systemElement = document.querySelector("#side-bar-system");
    this._editPayButton = document.querySelector("#side-bar-edit-pay");

    this._handleEditDeliveryClick = handleEditDeliveryClick.bind(this);
    this._handleEditPayClick = handleEditPayClick.bind(this);
  }

  _renderButton() {
    if (this._checkbox.checked) {
      this._button.textContent = `Оплатить ${this._sumPrice.toLocaleString()} сом`;
    } else {
      this._button.textContent = "Заказать";
    }
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
    this._editDeliveryButton.addEventListener(
      "click",
      this._handleEditDeliveryClick
    );

    this._editPayButton.addEventListener("click", this._handleEditPayClick);

    this._checkbox.addEventListener("change", this._renderButton.bind(this));
  }

  update(count, price, oldPrice) {
    this._sideBar.classList.toggle('hide', !count);

    this._sumCount = count;
    this._sumPrice = price;
    this._sumOldPrice = oldPrice;

    this._renderButton();
  }

  updateDelivery(delivery, adress) {
    this._delivery = delivery;
    this._adress = adress;
  }

  updatePay({ number, system }) {
    this._number = number;
    this._system = system;
  }

  render() {
    this._price.textContent = Math.floor(this._sumPrice).toLocaleString();
    this._oldPrice.textContent = `${Math.floor(
      this._sumOldPrice
    ).toLocaleString()} сом`;
    this._count.textContent = `${this._sumCount} товара`;
    this._discount.textContent = `${(
      this._sumPrice - this._sumOldPrice
    ).toLocaleString().replace("-", "−")} сом`;

    this._deliveryElement.textContent =
      this._delivery === "point"
        ? "Доставка в пункт выдачи"
        : "Курьерская доставка";
    this._adressElement.textContent = this._adress;

    this._cardElement.textContent = this._number;
    this._systemElement.className = this._defineCardClass(this._system);
  }
}

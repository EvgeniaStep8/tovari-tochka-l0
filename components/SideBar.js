export default class SideBar {
  constructor(
    sumCount,
    sumPrice,
    sumOldPrice,
    delivery,
    adress,
    handleEditDeliveryClick
  ) {
    this._sumPrice = sumPrice;
    this._sumOldPrice = sumOldPrice;
    this._sumCount = sumCount;
    this._delivery = delivery;
    this._adress = adress;

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

    this._handleEditDeliveryClick = handleEditDeliveryClick.bind(this);
  }

  _renderButton() {
    if (this._checkbox.checked) {
      this._button.textContent = `Оплатить ${this._sumPrice.toLocaleString()} сом`;
    } else {
      this._button.textContent = "Заказать";
    }
  }

  setEventListeners() {
    this._editDeliveryButton.addEventListener(
      "click",
      this._handleEditDeliveryClick
    );

    this._checkbox.addEventListener("change", this._renderButton.bind(this));
  }

  update(count, price, oldPrice) {
    this._sumCount = count;
    this._sumPrice = price;
    this._sumOldPrice = oldPrice;
  }

  updateDelivery(delivery, adress) {
    this._delivery = delivery;
    this._adress = adress;
  }

  render() {
    this._price.textContent = this._sumPrice.toLocaleString();
    this._oldPrice.textContent = `${this._sumOldPrice.toLocaleString()} сом`;
    this._count.textContent = `${this._sumCount} товара`;
    this._discount.textContent = `${(
      this._sumPrice - this._sumOldPrice
    ).toLocaleString()} сом`;

    this._deliveryElement.textContent =
      this._delivery === "point"
        ? "Доставка в пункт выдачи"
        : "Курьерская доставка";
    this._adressElement.textContent = this._adress;
  }
}

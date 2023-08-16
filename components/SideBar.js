export default class SideBar {
  constructor(sumPrice, sumCount, sumOldPrice) {
    this._sumPrice = sumPrice;
    this._sumOldPrice = sumOldPrice;
    this._sumCount = sumCount;

    this._price = document.querySelector(".side-bar__price");
    this._oldPrice = document.querySelector("#old-price");
    this._count = document.querySelector("#count");
    this._discount = document.querySelector("#discount");
    this._checkbox = document.querySelector("#side-bar-checkbox");
    this._button = document.querySelector(".side-bar__submit-button");
  }

  _renderButton() {
    if (this._checkbox.checked) {
      this._button.textContent = `Оплатить ${this._sumPrice} сом`;
    } else {
      this._button.textContent = "Заказать";
    }
  }

  setEventListeners() {
    this._checkbox.addEventListener("change", this._renderButton.bind(this));
  }

  render() {
    this._price.textContent = this._sumPrice;
    this._oldPrice.textContent = `${this._sumOldPrice} сом`;
    this._count.textContent = `${this._sumCount} товара`;
    this._discount.textContent = `${this._sumPrice - this._sumOldPrice} сом`;
  }
}

import ProductsHeader from "./ProdutsHeader.js";

export default class ProdutsHeaderActive extends ProductsHeader {
  constructor(
    productsHeaderSelector,
    buttonSelector,
    containerSelector,
    infoSelector,
    count,
    sum,
    isAllProductsChecked,
    checkboxSelector
  ) {
    super(
      productsHeaderSelector,
      buttonSelector,
      containerSelector,
      infoSelector,
      count
    );
    this._sum = sum * count;
    this._checkbox = this._header.querySelector(checkboxSelector);
    this._checkboxInput = this._checkbox.querySelector(".checkbox__input");
    this._isChecked = isAllProductsChecked;
  }

  _toggleCheckboxVisible() {
    this._checkbox.classList.toggle("checkbox_hidden");
  }

  _togleInfoVisible() {
    this._info.classList.toggle("products__info_hidden");
  }

  updateSum(sum) {
    this._sum = sum;
  }

  updateCheckbox(isChecked) {
    this._isChecked = isChecked();
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener("click", () => {
      this._toggleCheckboxVisible();
      this._togleInfoVisible();
    });
  }

  render() {
    this._info.textContent = `${
      this._count
    } товаров · ${this._sum.toLocaleString()} сом`;
    this._checkboxInput.checked = this._isChecked;
  }
}

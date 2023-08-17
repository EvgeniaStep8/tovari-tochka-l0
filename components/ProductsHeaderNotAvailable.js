import ProductsHeader from "./ProdutsHeader.js";

export default class ProductsHeaderNotAvailable extends ProductsHeader {
  constructor(
    productsHeaderSelector,
    buttonSelector,
    containerSelector,
    infoSelector,
    count
  ) {
    super(
      productsHeaderSelector,
      buttonSelector,
      containerSelector,
      infoSelector,
      count
    );
  }

  _toggleBorderVisible() {
    this._header.classList.toggle("products__header_active");
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener("click", () => {
      this._toggleBorderVisible();
    });
  }

  render() {
    this._info.textContent = `Отсутствуют · ${this._count} товара`;
  }
}

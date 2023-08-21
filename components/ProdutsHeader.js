export default class ProductsHeader {
  constructor(
    productsHeaderSelector,
    buttonSelector,
    containerSelector,
    infoSelector,
    count
  ) {
    this._header = document.querySelector(productsHeaderSelector);
    this._button = this._header.querySelector(buttonSelector);
    this._container = document.querySelector(containerSelector);
    this._info = this._header.querySelector(infoSelector);
    this._count = count;
  }

  _toggleCardsVisible() {
    this._container.classList.toggle("cards_hidden");
  }

  _rotateButton() {
    this._button.classList.toggle("products__button_active");
  }

  _defineDeclinationProducts(count) {
    if (count % 10 === 1) {
      return "товар";
    } else if (count % 10 === 2 || count % 10 === 3 || count % 10 === 4) {
      return "товара";
    } else {
      return "товаров";
    }
  }

  updateCount(count) {
    this._count = count;
  }

  setEventListeners() {
    this._button.addEventListener("click", () => {
      this._toggleCardsVisible();
      this._rotateButton();
    });
  }

  render() {}
}

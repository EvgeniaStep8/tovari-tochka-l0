export default class CardContainer {
  constructor(containerSelector, items, renderCard) {
    this._container = document.querySelector(containerSelector);
    this._items = items;
    this._renderCard = renderCard;
  }

  renderCards() {
    this._items.forEach((item) => this._renderCard(item));
  }

  addCard(card) {
    this._container.append(card);
  }
}

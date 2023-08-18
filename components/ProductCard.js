export default class ProductCard {
  constructor({ name, image, color, size, _id }, templateSelector) {
    this._name = name;
    this._link = image;
    this._color = color;
    this._size = size;
    this._id = _id;
    this._template = document.querySelector(templateSelector);
  }

  _handleLike() {
    this._card.remove();
    this._card = null;
  }

  _handleDelete() {
    this._card.remove();
    this._card = null;
  }

  _handleCardHover() {
    this._card
      .querySelectorAll(".card__icon")
      .forEach((icon) => icon.classList.toggle("card__icon_visible"));
  }

  getId() {
    return this._id;
  }

  _addEventListeners() {
    this._card.addEventListener("mouseover", this._handleCardHover.bind(this));
    this._card.addEventListener("mouseout", this._handleCardHover.bind(this));

    this._card
      .querySelector(".card__button_type_like")
      .addEventListener("click", this._handleLike.bind(this));
    this._card
      .querySelector(".card__button_type_delete")
      .addEventListener("click", this._handleDelete.bind(this));
  }

  _getTemplate() {
    const card = this._template.content.querySelector(".card").cloneNode(true);
    return card;
  }

  _createCard() {
    this._card = this._getTemplate();

    this._card.querySelector(".card__name").textContent = this._name;

    this._image = this._card.querySelector(".card__image");
    this._image.src = this._link;
    this._image.alt = this._name;

    this._card.querySelector(
      ".card__text_type_color"
    ).textContent = `Цвет: ${this._color}`;
    this._card.querySelector(
      ".card__text_type_size"
    ).textContent = `Размер: ${this._size}`;
  }

  getCard() {
    this._createCard();
    this._addEventListeners();
    return this._card;
  }
}

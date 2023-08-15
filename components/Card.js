export default class Card {
  constructor(
    {
      name,
      image,
      color,
      size,
      count,
      countInStock,
      stock,
      provider,
      price,
      oldPrice,
      checked,
    },
    templateSelector
  ) {
    this._name = name;
    this._link = image;
    this._color = color;
    this._size = size;
    this._count = count;
    this._countInStock = countInStock;
    this._stock = stock;
    this._provider = provider;
    this._price = price;
    this._oldPrice = oldPrice;
    this._checked = checked;
    this._templateSelector = templateSelector;
  }

  _handleLike() {
    this._card.remove();
    this._card = null;
  }

  _handleDelete() {
    this._card.remove();
    this._card = null;
  }

  _handleInformerIconMouseOver() {
    this._providerModal.classList.add("info-modal_opened");
  }

  _handleInformerIconMouseOut() {
    this._providerModal.classList.remove("info-modal_opened");
  }

  _addEventListeners() {
    this._card
      .querySelector(".card__button_type_like")
      .addEventListener("click", this._handleLike.bind(this));

    this._card
      .querySelector(".card__button_type_delete")
      .addEventListener("click", this._handleDelete.bind(this));

    this._card
      .querySelector(".card__informer-icon")
      .addEventListener(
        "mouseover",
        this._handleInformerIconMouseOver.bind(this)
      );

    this._card
      .querySelector(".card__informer-icon")
      .addEventListener(
        "mouseout",
        this._handleInformerIconMouseOut.bind(this)
      );
  }

  _getTemplate() {
    const card = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return card;
  }

  createCard() {
    this._card = this._getTemplate();

    this._checkbox = this._card.querySelector(".checkbox__input");
    this._checkbox.checked = this._checked;

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

    this._card.querySelector(".card__stock").textContent = this._stock;
    this._card.querySelector(".card__provider").textContent =
      this._provider.name;

    this._providerModal = this._card.querySelector(
      ".card__provider-info-modal"
    );
    this._card.querySelector(".info-modal__title").textContent =
      this._provider.name;
    this._providerModal.querySelector(
      ".info-modal__ogrn"
    ).textContent = `ОГРН: ${this._provider.ogrn}`;
    this._providerModal.querySelector(".info-modal__adres").textContent =
      this._provider.adres;

    this._card.querySelector(".card__new-price").textContent = this._price;
    this._card.querySelector(
      ".card__old-price"
    ).textContent = `${this._oldPrice} сом`;

    this._addEventListeners();
    return this._card;
  }
}

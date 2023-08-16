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
    templateSelector,
    createCounter
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
    this._createCounter = createCounter;
  }

  _calculateProductsPrice() {
    return this._price * this._count;
  }

  _calculateProductsOldPrice() {
    return this._oldPrice * this._count;
  }

  _renderRemainder() {
    this._remainder = this._countInStock - this._count;
    if (this._remainder < 10 && this._remainder > 0) {
      this._cardRemainder.textContent = `Осталось ${this._remainder} шт.`;
    } else {
      this._cardRemainder.textContent = "";
    }
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

  _handleInformerHover(modal) {
    modal.classList.toggle("info-modal_opened");
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

    this._infoIcon = this._card.querySelector(".card__informer-icon");

    this._infoIcon.addEventListener("mouseover", () => {
      this._handleInformerHover(this._providerModal);
    });
    this._infoIcon.addEventListener("mouseout", () => {
      this._handleInformerHover(this._providerModal);
    });

    this._oldCardPrice.addEventListener("mouseover", () => {
      this._handleInformerHover(this._priceModal);
    });
    this._oldCardPrice.addEventListener("mouseout", () => {
      this._handleInformerHover(this._priceModal);
    });
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

    this._cardRemainder = this._card.querySelector(".card__remainder");
    this._renderRemainder();

    this._newCardPrice = this._card.querySelector(".card__new-price");
    this._oldCardPrice = this._card.querySelector(".card__old-price");
    this._newCardPrice.textContent = this._calculateProductsPrice();
    this._oldCardPrice.textContent = `${this._calculateProductsOldPrice()} сом`;

    this._priceModal = this._card.querySelector(".card__price-info-modal");

    this._priceModal.querySelector(
      ".info-modal__discount-percent"
    ).textContent = "Скидка 55%";
    this._priceModal.querySelector(".info-modal__discount").textContent =
      "−300 сом";
    this._priceModal.querySelector(
      ".info-modal__client-discount-percent"
    ).textContent = "Скидка покупателя 10%";
    this._priceModal.querySelector(".info-modal__client-discount").textContent =
      "−30 сом";

    this._createCounter(this, this._card, this._count, this._countInStock);
    this._addEventListeners();
    return this._card;
  }

  updatePrice(count) {
    this._count = count;
    this._oldCardPrice.textContent = this._calculateProductsOldPrice();
    this._newCardPrice.textContent = this._calculateProductsPrice();
    this._renderRemainder();
  }
}

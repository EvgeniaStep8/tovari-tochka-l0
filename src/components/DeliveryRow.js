export default class DeliveryRow {
  constructor(products) {
    this._products = products;
    this._template = document.querySelector("#delivery-row");
    this._cardTemplate = document.querySelector("#delivery-card");
    this._container = document.querySelector(".delivery__product-container");
    this._delivery = {};
  }

  getDelivery() {
    this._products.forEach((product) => {
      product.delivery.forEach((delivery) => {
        if (product.checked) {
          if (this._delivery[delivery.date]) {
            this._delivery[delivery.date].push(product);
          } else {
            this._delivery[delivery.date] = [];
            this._delivery[delivery.date].push(product);
          }
        }
      });
    });
  }

  update(userProducts) {
    this._products = userProducts;
    this._delivery = {};
    this.getDelivery();
    this.render();
  }

  _getTemplate() {
    const row = this._template.content
      .querySelector(".delivery__row")
      .cloneNode(true);
    return row;
  }

  _getCardTemplate() {
    const card = this._cardTemplate.content
      .querySelector(".delivery__item")
      .cloneNode(true);
    return card;
  }

  _createRow(date) {
    const row = this._getTemplate();

    const dateObj = new Date(date);
    const month = dateObj.toLocaleDateString("ru", { month: "long" });
    const day = dateObj.getDate();
    row.querySelector(".delivery__date").textContent = `${day}—${
      day + 1
    } ${month.slice(0, -1)}я`;

    this._delivery[date].forEach((item) => {
      if (item.checked) {
        this._addCard(
          row.querySelector(".delivery__cards-container"),
          item.image,
          item.name,
          item.delivery.find((el) => el.date === date).count
        );
      }
    });

    return row;
  }

  _createCard(image, name, count) {
    const card = this._getCardTemplate();

    const img = card.querySelector(".delivery__image");
    img.src = image;
    img.alt = name;

    if (count > 1) {
      card.querySelector(".delivery__notify").textContent = count;
    }

    return card;
  }

  _addCard(container, image, name, count) {
    const card = this._createCard(image, name, count);
    container.append(card);
  }

  _addRow(container, date) {
    const row = this._createRow(date);
    container.append(row);
  }

  render() {
    this._container.innerHTML = "";

    Object.keys(this._delivery).forEach((date) => {
      this._addRow(this._container, date);
    });
  }
}

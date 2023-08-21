import { userProducts } from "./utils/userProducts.js";
import { userInfo } from "./utils/userInfo.js";
import CardContainer from "./components/CardContainer.js";
import ProductsHeaderActive from "./components/ProductsHeaderActive.js";
import ProductsHeaderNotAvailable from "./components/ProductsHeaderNotAvailable.js";
import Notify from "./components/Notify.js";
import Delivery from "./components/Delivery.js";
import Pay from "./components/Pay.js";
import PopupWithDeliveryForm from "./components/PopupWithDeliveryForm.js";
import PopupWithPayForm from "./components/PopupWithPayForm.js";
import Counter from "./components/Counter.js";
import ProductCard from "./components/ProductCard.js";
import ProductCardActive from "./components/ProductCardActive.js";
import SideBar from "./components/SideBar.js";
import RecipientForm from "./components/RecipientForm.js";
import InputValidator from "./components/InputValidator.js";

// Пустые массивы для товаров в наличии и неактивных товаров
const products = [];
const notAvailableProducts = [];

// Функции суммирования, которые принимают на вход массив товаров и суммируют их количество, старую и новую цену
const sumUpCountCheckedProducts = (products) => {
  return products.reduce(
    (prev, cur) => (cur.checked ? prev + cur.count : prev + 0),
    0
  );
};

const sumUpPriceCheckedProducts = (products) => {
  return products.reduce(
    (prev, cur) => (cur.checked ? prev + cur.count * cur.price : prev + 0),
    0
  );
};

const sumUpOldPriceCheckedProducts = (products) => {
  return products.reduce(
    (prev, cur) => (cur.checked ? prev + cur.count * cur.oldPrice : prev + 0),
    0
  );
};

// Функция создания счётчика для карточки товара
const createCounter = (card, cardElement, value, maxValue) => {
  const cardCounter = new Counter(
    "#card-counter",
    ".counter__button_type_plus",
    ".counter__button_type_minus",
    ".counter__input",
    cardElement,
    handleCounterChange,
    value,
    maxValue
  );
  cardCounter.renderCounter();
  cardCounter.setEventListeners();
  cardCounter.getInfoAboutCard(card);
};

// Функция обновления расчёта количетсва, новой и старой цены товаров
const updateBill = () => {
  const count = sumUpCountCheckedProducts(products);
  const price = sumUpPriceCheckedProducts(products);
  const oldPrice = sumUpOldPriceCheckedProducts(products);
  return { count, price, oldPrice };
};

// Обработчики удаления карточки товара для активной и неактивной карточки, которые срабавыют при удалении товара или добавлении в избранное
const handleCardDelite = (id) => {
  // Находим индекс карточки с переданным id и удаляем товар с таким же id из массива
  const index = products.find((product) => product._id === id);
  products.splice(index, 1);

  // Пересчитываем цену и обновляем данные на странице
  const { count, price, oldPrice } = updateBill();

  productsHeaderActive.update(count, price);
  productsHeaderActive.render();

  sideBar.update(count, price, oldPrice);
  sideBar.render();

  productsHeaderNotify.updateNotify(products.length);
};

const handleNotAvailableCardDelite = (id) => {
  // Находим индекс карточки с переданным id и удаляем товар с таким же id из массива
  const index = notAvailableProducts.find((product) => product._id === id);
  notAvailableProducts.splice(index, 1);

  // Обновляем данные о кличестве отсутствующих товаров
  productsHeaderNotAvailable.updateCount(notAvailableProducts.length);
  productsHeaderNotAvailable.render();
};

// Обработчик изменения количества товаров
const handleCounterChange = (card, newCount) => {
  card.updatePrice(newCount);
  products.filter((product) => product._id === card.getId())[0].count =
    newCount;
  const { count, price, oldPrice } = updateBill();

  productsHeaderActive.update(count, price);
  productsHeaderActive.render();

  sideBar.update(count, price, oldPrice);
  sideBar.render();
};

// Обработчик измения чекбокса выбора товара
const handleCheckboxChange = (card, isChecked) => {
  products.filter((product) => product._id === card.getId())[0].checked =
    isChecked;
  const { count, price, oldPrice } = updateBill();

  productsHeaderActive.update(count, price);
  productsHeaderActive.updateCheckbox(
    products.every((product) => product.checked)
  );
  productsHeaderActive.render();

  sideBar.update(count, price, oldPrice);
  sideBar.render();
};

// Обработчик изменения чекбокса выбрать всё
const handleCheckboxAllChange = (isChecked) => {
  products.forEach((product) => (product.checked = isChecked));
  const { count, price, oldPrice } = updateBill();

  productsHeaderActive.update(count, price);
  productsHeaderActive.updateCheckbox(isChecked);
  productsHeaderActive.render();

  sideBar.update(count, price, oldPrice);
  sideBar.render();
};

// Функция отрисровки активных и неактивных карточек
const renderCard = (item) => {
  const card = new ProductCardActive(
    item,
    "#card-template",
    handleCardDelite,
    createCounter,
    handleCheckboxChange,
    handleCheckboxAllChange
  );
  cardContainer.addCard(card.getCard());
};

const renderNotAvailableCard = (item) => {
  const card = new ProductCard(
    item,
    "#card-not-available-template",
    handleNotAvailableCardDelite
  );
  cardNotAvailableContainer.addCard(card.getCard());
};

// обоаботчики клика на кнопку edit для попапов
const handleEditDelivery = () => {
  deliveryPopup.open();
};

const handleEditPay = () => {
  payPopup.open();
};

const defineAdress = (userInfo) => {
  const adressName = (
    userInfo.delivery === "point"
      ? userInfo.points.filter((point) => point.checked === true)
      : userInfo.adresses.filter((adress) => adress.checked === true)
  )[0].name;
  return adressName;
};

// Слушатель измений формы доставки
const handleDeliveryFormChange = (adresses, points, del) => {
  userInfo.adresses = adresses;
  userInfo.points = points;
  userInfo.delivery = del;

  delivery.updateDeliveryInfo(userInfo);
  sideBar.updateDelivery(userInfo.delivery, defineAdress(userInfo));
  sideBar.render();
};

const getPayCard = (cards) => {
  return cards.filter((card) => card.checked)[0];
};

// Слушатель измений формы метода оплаты
const handlePayFormChange = (cardId) => {
  userInfo.payCards.forEach((card) => {
    card.checked = card.id === cardId;
  });

  const payCard = getPayCard(userInfo.payCards);

  pay.update(payCard);
  pay.render();

  sideBar.updatePay(payCard);
  sideBar.render();
};

// Фильтруем массив userProducts, активные товары добавляем в products, неактивные в notAvailableProducts
userProducts.forEach((product) => {
  product.countInStock > 0
    ? products.push(product)
    : notAvailableProducts.push(product);
});

// Создаём экземпляры классов шапки для активных и неактивных продуктов, отрисовываем их и навешиваем слушатели событий
const productsHeaderNotAvailable = new ProductsHeaderNotAvailable(
  ".products__header_not-available",
  ".products__button",
  "#not-available-cards",
  ".products__info",
  notAvailableProducts.length
);
const productsHeaderActive = new ProductsHeaderActive(
  ".products__header",
  ".products__button",
  "#cards",
  ".products__info",
  sumUpCountCheckedProducts(products),
  sumUpPriceCheckedProducts(products),
  true,
  ".checkbox"
);

productsHeaderNotAvailable.render();
productsHeaderNotAvailable.setEventListeners();

productsHeaderActive.render();
productsHeaderActive.setEventListeners();

// Создаём информатор о количестве товаров в корзине
const productsHeaderNotify = new Notify("#header-notify", products.length);

productsHeaderNotify.render();

// Создаём экземпляры классов для активных и неактивных продуктов, отрисовываем их с карточками товаров
const cardContainer = new CardContainer("#cards", products, renderCard);
const cardNotAvailableContainer = new CardContainer(
  "#not-available-cards",
  notAvailableProducts,
  renderNotAvailableCard
);

cardContainer.renderCards();
cardNotAvailableContainer.renderCards();

// Создаём экземпляр класса delivery, отрисовываем его и навешиваем слушатели событий
const delivery = new Delivery(
  "#delivery-way-title",
  ".delivery__point-name",
  ".delivery__rating",
  ".delivery__working-hours",
  "#edit-delivery",
  userInfo,
  handleEditDelivery
);

delivery.render();

// Создаём экземпляр класса pay, отрисовываем его и навешиваем слушатели событий
const pay = new Pay(
  getPayCard(userInfo.payCards),
  ".pay__system",
  ".pay__number",
  ".pay__date",
  "#edit-pay",
  handleEditPay
);

pay.render();
pay.setEventListeners();

// Создаём экземпляр класса sideBar, отрисовываем его и навешиваем слушатели событий
const sideBar = new SideBar(
  sumUpCountCheckedProducts(products),
  sumUpPriceCheckedProducts(products),
  sumUpOldPriceCheckedProducts(products),
  userInfo.delivery,
  defineAdress(userInfo),
  getPayCard(userInfo.payCards),
  handleEditDelivery,
  handleEditPay
);
sideBar.render();
sideBar.setEventListeners();

const recipientForm = new RecipientForm(".recipient__input", "");
recipientForm.setEventListeners();

// Создаём экземпляры классов для валидатора инпутов, проверяем инпуты по условиям указанным в тз
const nameInputValidator = new InputValidator(
  "#name",
  "#name-error",
  ".side-bar__submit-button"
);

const lastNameInputValidator = new InputValidator(
  "#lastname",
  "#lastname-error",
  ".side-bar__submit-button"
);

const emailInputValidator = new InputValidator(
  "#email",
  "#email-error",
  ".side-bar__submit-button"
);

const telInputValidator = new InputValidator(
  "#tel",
  "#tel-error",
  ".side-bar__submit-button"
);

const innInputValidator = new InputValidator(
  "#inn",
  "#inn-error",
  ".side-bar__submit-button"
);

nameInputValidator.validateRequired("Укажите имя");
lastNameInputValidator.validateRequired("Введите фамилию");
emailInputValidator.validateRequired("Укажите электронную почту");
emailInputValidator.validateInputByType("Проверьте адрес электронной почты");
telInputValidator.validateRequired("Укажите номер телефона");
telInputValidator.validateInputByType("Формат: +9 999 999 99 99");
innInputValidator.validateRequired("Укажите ИНН");
innInputValidator.validateInn("Проверьте ИНН");

// Создаём экземпляры класса popup для оплаты и доставки, навешиваем на них слушатели событий
const payPopup = new PopupWithPayForm(
  "#pay-popup",
  ".popup__close-button",
  "#pay-radio",
  "#pay-form",
  ".form__inputs",
  userInfo.payCards,
  handlePayFormChange
);
const deliveryPopup = new PopupWithDeliveryForm(
  "#delivery-popup",
  ".popup__close-button",
  "#delivery-radio",
  "#delivery-form",
  ".form__inputs",
  ".form__title",
  "#courier-way",
  "#point-way",
  userInfo,
  handleDeliveryFormChange
);

payPopup.render();
payPopup.setEventListeners();

deliveryPopup.render();
deliveryPopup.setEventListeners();

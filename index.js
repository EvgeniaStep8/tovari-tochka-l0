import {
  editPayButton,
  sideBarEditPayButton,
  editDeliveryButton,
  sideBarEditDeliveryButton,
} from "./utils/constants.js";
import Popup from "./components/Popup.js";
import Counter from "./components/Counter.js";

const payPopup = new Popup("#pay-popup", ".popup__close-button");
const deliveryPopup = new Popup("#delivery-popup", ".popup__close-button");
const cardCounter = new Counter(
  "#card-counter",
  ".counter__button_type_plus",
  ".counter__button_type_minus",
  ".counter__input",
  1,
  100
);

payPopup.setEventListeners();
deliveryPopup.setEventListeners();
cardCounter.renderCounter();
cardCounter.setEventListeners();

editPayButton.addEventListener("click", () => payPopup.open());
sideBarEditPayButton.addEventListener("click", () => payPopup.open());
editDeliveryButton.addEventListener("click", () => deliveryPopup.open());
sideBarEditDeliveryButton.addEventListener("click", () => deliveryPopup.open());

import Popup from "./components/Popup.js";
import {
  editPayButton,
  sideBarEditPayButton,
  editDeliveryButton,
  sideBarEditDeliveryButton,
} from "./utils/constants.js";

const payPopup = new Popup("#pay-popup", ".popup__close-button");
const deliveryPopup = new Popup("#delivery-popup", ".popup__close-button");

payPopup.setEventListeners();
deliveryPopup.setEventListeners();

editPayButton.addEventListener("click", () => payPopup.open());
sideBarEditPayButton.addEventListener("click", () => payPopup.open());
editDeliveryButton.addEventListener("click", () => deliveryPopup.open());
sideBarEditDeliveryButton.addEventListener("click", () => deliveryPopup.open());

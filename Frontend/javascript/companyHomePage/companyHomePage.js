function showOrders() {
  document.getElementsByClassName("trackContainer")[0].style.display = "none";
  document.getElementsByClassName("offersContainer")[0].style.display = "none";
  document.getElementsByClassName("ordersContainer")[0].style.display = "block";
}

function showOffers() {
  document.getElementsByClassName("trackContainer")[0].style.display = "none";
  document.getElementsByClassName("offersContainer")[0].style.display = "block";
  document.getElementsByClassName("ordersContainer")[0].style.display = "none";
}

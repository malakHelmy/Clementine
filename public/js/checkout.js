
const form = document.getElementById('checkoutform');
const fullname = document.getElementById('firstname');
const email = document.getElementById('email');
const address = document.getElementById('address');
const zip = document.getElementById('zipcode');
const card = document.getElementById('card');
const city = document.getElementById('city');
const cardexp = document.getElementById('cardexp');
const cardcvv = document.getElementById('cardcvv');
const state = document.getElementById('statetype');
const expyear = document.getElementById('expyeardate');


form.addEventListener('submit', (e) => {

  e.preventDefault();

  checkinputs();
});



function checkinputs() {
  const fullnamevalue = fullname.value.trim();
  const addressvalue = address.value.trim();
  const cityvalue = city.value.trim();
  const zipvalue = zip.value.trim();
  const cardvalue = card.value.trim();
  const cardexpvalue = cardexp.value.trim();
  const cardcvv_value = cardcvv.value.trim();
  const selectedstate = options[state.selectedIndex].value;
  const selectedexpyear = options[expyear.selectedIndex].value;
  const emailvalue = email.value;

  if (selectedexpyear == "selectyear") {
    alert("Please select an expiry year.");
  }

  if (selectedstate == "selectstate") {
    alert("Please select a state.");
  }

  const l = document.getElementById('firstnamelabel');
  if (fullnamevalue == '') {
    const formc = fullname.parentElement;
    formc.className = 'textfield failed';
    l.innerHTML = 'Please enter your full name';
  }
  else {
    const formc = fullname.parentElement;
    formc.className = 'textfield success';
    l.innerHTML = '';
  }

  if (addressvalue == '') {
    const l = document.getElementById('addlabel');
    const formc = address.parentElement;
    formc.className = 'textfield failed';
    l.innerHTML = 'Please enter your address';

  }
  else {
    const formc = address.parentElement;
    const l = document.getElementById('addlabel');
    formc.className = 'textfield success';
    l.innerHTML = '';
  }

  if (emailvalue == '') {
    const l = document.getElementById('emaillabel');
    const formc = email.parentElement;
    formc.className = 'textfield failed';
    l.innerHTML = 'Please enter your mail';
  }
  else {
    const formc = email.parentElement;
    const l = document.getElementById('emaillabel');
    formc.className = 'textfield success';
    l.innerHTML = '';
  }

  if (cityvalue == '') {
    const l = document.getElementById('citylabel');
    const formc = city.parentElement;
    formc.className = 'textfield failed';
    l.innerHTML = 'Please enter a city name';
  }
  else {
    const l = document.getElementById('citylabel');
    const formc = city.parentElement;
    formc.className = 'textfield success';
    l.innerHTML = '';
  }

  if (zipvalue == '') {
    const l = document.getElementById('ziplabel');
    const formc = zip.parentElement;
    formc.className = 'textfield failed';
    l.innerHTML = 'Please enter a zip code';
  }

  else {
    const l = document.getElementById('ziplabel');
    const formc = zip.parentElement;
    formc.className = 'textfield success';
    l.innerHTML = '';
  }

  if (cardvalue == '') {
    const l = document.getElementById('cardlabel');
    const formc = card.parentElement;
    formc.className = 'textfield failed';
    l.innerHTML = 'Please enter a valid card number';
  }

  else {
    const l = document.getElementById('cardlabel');
    const formc = card.parentElement;
    formc.className = 'textfield success';
    l.innerHTML = '';
  }


  if (cardexpvalue == '') {
    const l = document.getElementById('cardexlabel');
    const formc = cardexp.parentElement;
    formc.className = 'textfield failed';
    l.innerHTML = 'Please enter an expiry month date';
  }

  else {
    const l = document.getElementById('cardexlabel');
    const formc = cardexp.parentElement;
    formc.className = 'textfield success';
    l.innerHTML = '';
  }


  if (cardcvv_value == '') {
    const l = document.getElementById('cardcvvlabel');
    const formc = cardcvv.parentElement;
    formc.className = 'textfield failed';
    l.innerHTML = 'Please enter the CVV number';
  }

  else {
    const l = document.getElementById('cardcvvlabel');
    const formc = cardcvv.parentElement;
    formc.className = 'textfield success';
    l.innerHTML = '';
  }
}

const cardInput = document.getElementById('card');
const cardError = document.getElementById('cardError');

cardInput.addEventListener('input', () => {
  if (cardInput.value.length !== 16) {
    cardError.textContent = 'Credit card number must be 16 digits long';
  } else {
    cardError.textContent = '';
  }
});
//By Roman Blahuta

//------------------------------------------------------------------------------------------------------------------------------------------------------------//

// 1. Submit the form, only if it is valid
//    email is between 5 and 50 chars long
//    email format is correct

//    name has 0 or 2 whitespaces between words
//    name length is 1 or more chars

//    phone length is 12 or more digits
//    phone format is correct. Valid formats: "+38032 000 000 00", "+380(32) 000 000 00", "+380(32)-000-000-00", "0380(32) 000 000 00", + any combitaion

//    message is 10 or more characters.
//    message must not iclude bad language: ugly, dumm, stupid, pig, ignorant


// 2. Validate each input on the fly using onchange event


// 3. Define re-usable validators: length, format

//------------------------------------------------------------------------------------------------------------------------------------------------------------//

// 3. Define re-usable validators: length, format
const MINLEN = 5;
const MAXLEN = 50;
const EMAILFORMAT = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const NAMEMINLEN = 1;
const NAMEFORMAT = /^\w+(\s\s\w+)*$/;

const PHONEMINLEN = 12;
const PHONEFORMAT = /^[+0]380(\(32\)|32)( \d{3} \d{3} \d{2}|-\d{3}-\d{3}-\d{2})$/

const MSGMINLEN = 10;
const MSGFORMAT = /^((?!ugly|dumm|stupid|pig|ignorant).)*$/;



const emailNode = document.getElementById('email');
const nameNode = document.getElementById('name');
const phoneNode = document.getElementById('phone');
const messageNode = document.getElementById('message');

//------------------------------------------------------------------------------------------------------------------------------------------------------------//

function validateEmail(emailNode) {

  //event.preventDefault();
  let valid = true;

  const emailErrorNode = emailNode.parentNode.querySelector('p.help-block')
  emailErrorNode.innerHTML = '';

  let emailErrors = document.createElement('ul');
  emailErrors.setAttribute("role", "alert");


  //    email is between 5 and 50 chars long
  if (emailNode.value.length < MINLEN) {
    let li = document.createElement('li');
    li.innerText = 'Email is too short';
    emailErrors.appendChild(li);
    valid = false;
  }
  else if (emailNode.value.length > MAXLEN) {
    let li = document.createElement('li');
    li.innerText = 'Email is too long';
    emailErrors.appendChild(li);
    valid = false;
  }

  //    email format is correct
  if (!emailNode.value.match(EMAILFORMAT)) {
    let li = document.createElement('li');
    li.innerText = 'Email format is incorrect';
    emailErrors.appendChild(li)
    valid = false;
  }

  if (emailErrors.childElementCount > 0) {
    emailErrorNode.appendChild(emailErrors)
  }

  return valid;
}



function validateName(nameNode) {

  //event.preventDefault();
  let valid = true;

  const nameErrorNode = nameNode.parentNode.querySelector('p.help-block')
  nameErrorNode.innerHTML = '';

  let nameErrors = document.createElement('ul');
  nameErrors.setAttribute("role", "alert");

  //    name length is 1 or more chars
  if (nameNode.value.length < NAMEMINLEN) {
    let li = document.createElement('li');
    li.innerText = 'Name is too short';
    nameErrors.appendChild(li);
    valid = false;
  }

  //    name has 0 or 2 whitespaces between words
  if (!nameNode.value.match(NAMEFORMAT)) {
    let li = document.createElement('li');
    li.innerText = 'Name format is incorrect';
    nameErrors.appendChild(li);
    valid = false;
  }

  if (nameErrors.childElementCount > 0) {
    nameErrorNode.appendChild(nameErrors)
  }

  return valid;
}



function validatePhone(phoneNode) {

  //event.preventDefault();
  let valid = true;

  const phoneErrorNode = phoneNode.parentNode.querySelector('p.help-block')
  phoneErrorNode.innerHTML = '';

  let phoneErrors = document.createElement('ul');
  phoneErrors.setAttribute("role", "alert");
  
  //    phone length is 12 or more digits
  if (phoneNode.value.length < PHONEMINLEN) {
    let li = document.createElement('li');
    li.innerText = 'Phone number is too short';
    phoneErrors.appendChild(li);
    valid = false;
  }


  //    phone format is correct. Valid formats: "+38032 000 000 00", "+380(32) 000 000 00", "+380(32)-000-000-00", "0380(32) 000 000 00", + any combitaion
  if (!phoneNode.value.match(PHONEFORMAT)) {
    let li = document.createElement('li');
    li.innerText = 'Phone number format is incorrect';
    phoneErrors.appendChild(li);
    valid = false;
  }

  
  if (phoneErrors.childElementCount > 0) {
    phoneErrorNode.appendChild(phoneErrors)
  }

  return valid;
}



function validateMsg(emailNode) {

  //event.preventDefault();
  let valid = true;

  const messageErrorNode = messageNode.parentNode.querySelector('p.help-block')
  messageErrorNode.innerHTML = '';

  let messageErrors = document.createElement('ul');
  messageErrors.setAttribute("role", "alert");

  //    message is 10 or more characters.
  if (messageNode.value.length < MSGMINLEN) {
    let li = document.createElement('li');
    li.innerText = 'Message length is too short';
    messageErrors.appendChild(li);
    valid = false;
  }

  //    message must not iclude bad language: ugly, dumm, stupid, pig, ignorant
  if (!messageNode.value.match(MSGFORMAT)) {
    let li = document.createElement('li');
    li.innerText = 'Message contains prohibited language';
    messageErrors.appendChild(li);
    valid = false;
  }

  if (messageErrors.childElementCount > 0) {
    messageErrorNode.appendChild(messageErrors)
  }


  return valid;
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------//

function validateMe(event) {
  event.preventDefault();

  const emailNode = event.target.elements['email'];
  const nameNode = event.target.elements['name'];
  const phoneNode = event.target.elements['phone'];
  const messageNode = event.target.elements['message'];

  let valid = validateEmail(emailNode) && validateMsg(messageNode) && validateName(nameNode) && validatePhone(phoneNode);

  if (valid) {
    event.target.submit()
  }

  return valid;
  
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------//

// 2. Validate each input on the fly using onchange event
emailNode.addEventListener("input", event => validateEmail(event.target));
nameNode.addEventListener("input", event => validateName(event.target));
phoneNode.addEventListener("input", event => validatePhone(event.target));
messageNode.addEventListener("input", event => validateMsg(event.target));

//------------------------------------------------------------------------------------------------------------------------------------------------------------//
'use strict'

var ACTIVE = 'active';
var NUM_LEDS = 40;

var container = document.getElementById('container');


// create div matrix
for (var i=0; i<40; i++) {
  var div = document.createElement('DIV');

  div.className = 'cell';
  div.id = i;

  container.appendChild(div);
}


/**
 * Set the active class on the given element
 */
function on(element) {
  element.classList.add(ACTIVE);
}


/**
 * Remove the active state from the given element
 */
function off(element) {
  element.classList.remove(ACTIVE)
}


/**
 * Toggle the active state
 */
function toggleActive(element) {
  element.classList.contains(ACTIVE) ? off(element) : on(element);
}


/**
 * Toggle all active elements off
 */
function clear() {
  var activeElements = document.getElementsByClassName(ACTIVE);

  var elements = [];

  for (var i=0; i<activeElements.length; i++) {
    elements.push(activeElements[i]);  
  }

  for (var i=0; i<elements.length; i++) {
    toggleActive(elements[i]);  
  }

  lightsOn();
}


/**
 * Collect all active div elements and calculates a hex string
 * based on their ids
 */
function getHexString() {
  var activeElements = document.getElementsByClassName(ACTIVE),
      hexString = '',
      leds = new Array(NUM_LEDS);

  for (var i=0; i<activeElements.length; i++) {
    leds[activeElements[i].id] = true;
  }

  for (var i=0; i<leds.length; i+=4) {
    var binaryString = '';

    for (var j=3; j>=0; j--) {
      binaryString += leds[i+j] ? 1 : 0;
    }

    hexString += parseInt(binaryString, 2).toString(16);
  }

  return hexString;
}


/**
 * Send an ajax request containing the hex string
 */
function lightsOn() {
  var httpRequest = new XMLHttpRequest();

  var hexString = getHexString();

  console.log(hexString);

  httpRequest.open("GET", "lights_on/"+hexString, true);
  httpRequest.send();
}


// bind click listener to button
document.getElementById('button').addEventListener('click', clear);


// bind click listener to cell container
container.addEventListener('click', function(event) {
  if (event.target.classList.contains('cell')) {
    toggleActive(event.target);
    lightsOn();
  }
});


container.addEventListener('mouseover', function(event) {
  var classList = event.target.classList;

  if (event.altKey) {
    if (classList.contains('cell') && !classList.contains('active')) {
      on(event.target);
      lightsOn();
    }
  }
})

container.addEventListener('mouseout', function(event) {
  if (event.altKey) {
    if (event.target.classList.contains('cell')) {
      off(event.target);
      lightsOn();
    }
  }
});


container.addEventListener('mouseover', function(event) {
  if (event.target.classList.contains('cell')) {
    if (event.shiftKey) {
      off(event.target);
      lightsOn();
    } else if (event.ctrlKey) {
      on(event.target);
      lightsOn();
    }
  }
});
'use strict';

// WOW
// function recursiveFactorial(a, res) {
//   res = res || a;
//   console.log(a, res);
//   if (a == 1) {
//     return res;
//   } else {
//     res *= --a;
//     return recursiveFactorial(a, res);
//   }
// }

const recursiveFactorial = (a) => {
  if (a == 0) {
    return 1;
  } else {
    return a * recursiveFactorial(--a);
  }
}

const factorial = (a) => {
  if (a == 0) {
    return 1;
  } else {
    let res = a;
    while (--a > 0) {
      res *= a;
    }
    return res;
  }
}

const doubleSum = (a, b) => {
  if (typeof b === 'undefined') {
    return b => a + b;
  } else {
    return a + b;
  }
}

const fizzBuzz = (max) => {
  let res = '';
  for (let i = 1; i <= max; i++) {
    res += i + ' ';
    if (i % 3 === 0) {
      res += 'Fizz';
    }
    if (i % 5 === 0) {
      res += 'Buzz';
    }
    res += '\n';
  }
  return res;
}

let sum = (arr) => arr.reduce((a, b) => a + b);
let addGenerator = (numArgs, prevArgs) => {
  return function () {
    let totalArgs = prevArgs.concat(Array.from(arguments));
    if (totalArgs.length === numArgs) {
      return sum(totalArgs);
    }
    return addGenerator(numArgs, totalArgs);
  };
};
let add = addGenerator(2, []);

add(2, 5); // 7
add(2)(5); // 7
add()(2, 5); // 7
add()(2)(5); // 7
add()()(2)(5); // 7

// Class inheritance
function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

function Toy(name, price) {
  Product.call(this, name, price);
  this.category = 'toy';
}

var cheese = new Food('feta', 5);
var fun = new Toy('robot', 40);


// More, with protottype

// Constructor
function Person(first, last, age, gender, interests) {
  this.name = {
    first,
    last
  };
  this.age = age;
  this.gender = gender;
  this.interests = interests;
  this.sayHi = function () {
    alert('Hi!');
  }
};

// Methods defined in the prototype
Person.prototype.greeting = function() {
  alert('Hi! I\'m ' + this.name.first + '.');
};

// Contructor inherits Person constructor
function Teacher(first, last, age, gender, interests, subject) {
  Person.call(this, first, last, age, gender, interests);

  this.subject = subject;
}

// Subclass inherits Parent's methods
Teacher.prototype = Object.create(Person.prototype);

// Set subclass construcor in prototype back to subclass
Teacher.prototype.constructor = Teacher;

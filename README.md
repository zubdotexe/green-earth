## 1) What is the difference between var, let, and const?
All these keywords are used for defining/declaring variables. However, variables declared using **var** have functional scope and also these variables can be accessed before declaration without reference error. On the other hand, **let** and **const** have block scope and TDZ applies on them which means they can not be accessed without reference error before declaration. In addition, **let** is used to store values that may change later just like **var** but **const** is used for storing values that are constant i.e. values can be reassigned to variables declared using **let** but values can not be reassigned to variables defined using **const**.

## 2) What is the difference between map(), forEach(), and filter()?
All these functions work on arrays. To begin with, map() is used when we want to transform the elements of an array. Also, map() returns a new array with the changes applied. Secondly, we use forEach() to interate over an array and do our intended operations on it. The function does not return a value. Lastly, filter() also returns an array just like map(), but the array size may be smaller depending on the filter condition applied.

## 3) What are arrow functions in ES6?
Arrow functions, unlike traditional functions are declared like variables using **const**, **let** or **var** (which is not recommended). Unlike traditional functions arrow functions are not hoisted if declared using **const** or **let**. Also, arrow functions inherit **this** from outer scope which makes it easier to access variables from the outer scope.

## 4) How does destructuring assignment work in ES6?
Destructuring is used with both arrays and objects and it allows to extract values from the specific arrays/objects. When we are destructuring arrays, we write `const [x, y] = [1, 2];` and when we are destructuring objects we use `const {name, age} = {name: "hannah", age: 35};`. In both cases we can access the values using the newly created variables. Also, destructuring gives us the freedom to rename the variables using `const {name: userName}` and we can skip a variable by using `const [a, , c] = [1, 2, 3]`.

## 5) Explain template literals in ES6. How are they different from string concatenation?

Template literals in ES6 lets us use js expressions inside strings which makes it a lot easier to work with strings. We can use something like *const a = 3; console.log(\`This is an ${a % 2 === 1 ? "odd" : "even"} number\`)*. However, this is not possible using string concatenation, we would need to use the expression on the previous line and then concat the result with strings.
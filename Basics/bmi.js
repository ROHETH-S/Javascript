const massMark=75;
const heightMark=175;


const massjohn=75;
const heightjohn=175;

let BMIMark=massMark/heightMark^2*1000;
let BMIJohn=massjohn/heightjohn^2*1000;


const markHigherBMI=BMIMark>BMIJohn;

console.log(BMIMark, BMIJohn, markHigherBMI);
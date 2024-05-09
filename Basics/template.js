const name="roheth";


const str="hi "+name+ ", welcome"+ "I'm great'";

const strtemp=`hi this is ${name}, I'm great'`;
//string template we dont nee to worry about qutotation
// backticks been used

console.log(str);

console.log(strtemp)

const massMark = 78;
const heightMark = 1.69;
const massJohn = 92;
const heightJohn = 1.95;

const BMIMark = massMark / (heightMark * heightMark);
const BMIJohn = massJohn / (heightJohn * heightJohn);
console.log(BMIMark, BMIJohn);

if(BMIMark>BMIJohn)
{
    console.log(`Mark's BMI ${BMIMark} is higher than John's ${BMIJohn}!`);
}

else
{
    console.log(`John's BMI ${BMIJohn} is higher than Mark's ${BMIMark}!`);
}


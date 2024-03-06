/*
Purchase tickets
    The year is 2224. You have spent most of the past year on Earth, catching up with friends and family after your travels of recent years. It didn't take too long, however, for you to long for spending some more time in space. You have decided that what you need is to spend the next two weeks on holiday to an Earth orbiting Space Station and the Moon base, Luna city. Let’s go on an adventure!
    The first thing you need to do is purchase your rocket flight tickets.
    Rocket flight companies are worse then the airlines of the 21st century when it comes to extra fees and charges. If you know the deals, you can also find numerous discounts and deductions for various loyalty programmes and so forth. Always in the hunt for a good deal, you scrape the internet searching for every possible option available so you can get the best possible price on your tickets.
    You recorded all the details of different options in a file as you found them (your input data). There are 20 different space travel companies you have researched the deals of. Determine the total cost for each company.
    Anything recorded as a seat, meals, luggage, fee or tax must be added to the cost for that company
    Anything that is recorded as a discount or rebate can be subtracted from the cost for that company
    After determining the final cost each, what is the final cost of the cheapest option?
    . . .
    // https://codingquest.io/problem/28
*/
const fs = require("fs");

function ReadInput(pathToFile) {
  let data = null;
  try {
    data = fs.readFileSync(pathToFile, "utf8").split("\r\n");
  } catch (err) {
    console.error(err);
  }

  return data;
}

const ShouldAddCost = (ticket) =>
  !ticket.includes("discount") && !ticket.includes("rebate");

let companyCosts = {};

const tickets = ReadInput("input.txt");
tickets.forEach((ticket) => {
  ticket = ticket.toLocaleLowerCase();
  let ticketData = ticket.split(" ");
  let targetCompany = ticketData[0];

  if (!Object.hasOwn(companyCosts, targetCompany)) {
    companyCosts[targetCompany] = 0;
  }

  let ticketCost = parseInt(ticketData[ticketData.length - 1]);
  ShouldAddCost(ticket)
    ? (companyCosts[targetCompany] += ticketCost)
    : (companyCosts[targetCompany] -= ticketCost);
});

var cheapestPrice = Math.min(...Object.values(companyCosts));
console.log(cheapestPrice);


/*Drop down cart start*/
(function () {

    $("#cart-icon").on("click", function () {
        $(".cart-window").fadeToggle("slow");
    });

})();

function closesidebar(){

    $("#closesidebarbtn").on("click", function () {
        $(".cart-window-hide").closeToggle("slow");
    });

};
/*Drop down cart end*/


/* increment and decrement start*/
let total = document.querySelector("#total-before");
let final = document.querySelector("#total-after");
let shipping = 100;
const plus = document.querySelector(".add"),
    num = document.querySelector(".num"),
    minus = document.querySelector(".minus");

const plus1 = document.querySelector(".add1"),
    minus1 = document.querySelector(".minus1"),
    num1 = document.querySelector(".num1");
var priceupdate = document.querySelector(".price");
var priceupdate2 = document.querySelector("#pie");
let sum = 26200;
let b = 1;
let a = 1;
plus.addEventListener("click", () => {
    var a2;
    a++;
    a2 = a - 1;
    num.innerText = a;
    priceupdate.innerText = "Price: EGP" + a * 15200;
    sum = sum - (a2 * 15200) + (a * 15200);
    total.innerText = '' + sum;
    final.innerText = '' + (sum + 100);
})
plus1.addEventListener("click", () => {
    var b2;
    b++;
    b2 = b - 1;
    num1.innerText = b;
    priceupdate2.innerText = "Price: EGP" + b * 11000;
    sum = sum - (b2 * 11000) + (b * 11000);
    total.innerText = '' + sum;
    final.innerText = '' + (sum + 100);

})

minus.addEventListener("click", () => {
    if (a > 1) {
        sum = sum - 15200;
        a--;
    }
    num.innerText = a;
    var p = 15200 + Math.abs(15200 - a * 15200);
    priceupdate.innerText = "Price: EGP" + p;
    total.innerText = '' + sum;
    final.innerText = '' + (sum + 100);
})
minus1.addEventListener("click", () => {
    if (b > 1) {
        sum = sum - 11000;
        b--;
    }
    num1.innerText = b;
    var p2 = 11000 + Math.abs(11000 - b * 11000);
    priceupdate2.innerText = "Price: EGP" + p2;
    total.innerText = '' + sum;
    final.innerText = '' + (sum + 100);
})

/* increment and decrement end */

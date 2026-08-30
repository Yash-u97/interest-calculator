const principalInput = document.getElementById("principal");
const rateInput = document.getElementById("rate");
const timeInput = document.getElementById("time");

const timeUnit = document.getElementById("timeUnit");

const calculateBtn =
    document.getElementById("calculateBtn");

const compoundOptions =
    document.getElementById("compoundOptions");

const frequency =
    document.getElementById("frequency");

const result =
    document.getElementById("result");

const resultPrincipal =
    document.getElementById("resultPrincipal");

const resultInterest =
    document.getElementById("resultInterest");

const resultTotal =
    document.getElementById("resultTotal");

const resetBtn =
    document.getElementById("resetBtn");

const interestTypeInputs =
    document.querySelectorAll(
        'input[name="interestType"]'
    );

interestTypeInputs.forEach(function(input) {

    input.addEventListener("change", function() {

        if (this.value === "compound") {

            compoundOptions.style.display = "block";

        } else {

            compoundOptions.style.display = "none";

        }

    });

});

resetBtn.addEventListener("click", function() {

    principalInput.value = "";
    rateInput.value = "";
    timeInput.value = "";

    timeUnit.value = "years";

    document.querySelector(
        'input[value="simple"]'
    ).checked = true;

    frequency.value = "1";

    compoundOptions.style.display = "none";

    result.style.display = "none";

});

calculateBtn.addEventListener("click", function() {

    const principal =
        parseFloat(principalInput.value);

    const rate =
        parseFloat(rateInput.value);

    let time =
        parseFloat(timeInput.value);

    const selectedType =
        document.querySelector(
            'input[name="interestType"]:checked'
        ).value;

    if (
        isNaN(principal) ||
        isNaN(rate) ||
        isNaN(time)
    ) {

        alert("Please enter all required values.");

        return;
    }

    if (
        principal <= 0 ||
        rate < 0 ||
        time <= 0
    ) {

        alert("The value cannot be negative.");

        return;
    }

    if (timeUnit.value === "months") {

        time = time / 12;

    }

    let interest;
    let total;

    if (selectedType === "simple") {

        interest =
            (principal * rate * time) / 100;

        total =
            principal + interest;

    }

    else {

        const n =
            parseInt(frequency.value);

        const r =
            rate / 100;

        total =
            principal *
            Math.pow(
                1 + r / n,
                n * time
            );

        interest =
            total - principal;

    }

    resultPrincipal.textContent =
        formatCurrency(principal);

    resultInterest.textContent =
        formatCurrency(interest);

    resultTotal.textContent =
        formatCurrency(total);

    result.style.display = "block";

});

function formatCurrency(amount) {

    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2
        }
    ).format(amount);

}

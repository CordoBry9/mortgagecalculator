//gets all inputs made by user
function getInput() {


    let loanAmount = document.getElementById('loanAmount').value;
    let interestAmount = document.getElementById('interestAmount').value;
    let termMonths = document.getElementById('termMonths').value;

    months = Number(termMonths);
    interest = Number(interestAmount);
    loan = Number(loanAmount);

    if (isNaN(months) || isNaN(interest) || isNaN(loan)) { //NaN = Not a Number, isNaN checks if the value stored is not a number
        //display an error message
        Swal.fire({
            icon: 'error',
            title: 'Oops!',
            text: 'Please enter numbers only!',
            backdrop: false,
        });
    }

    let completeCalc = loanCalc(months, interest, loan);
    displayResults(completeCalc);
}

//get inputs from user function
//calculate inputs in one function
//have function return details of that
//have function output monthly payments as a table
//have function output the total cost, total interst, and total principal

function loanCalc(months, interest, loan) {

    const totalMonthlyPayment = (loan * interest / 1200) / (1 - Math.pow((1 + interest / 1200), -months)); //total monthly payment calc
    let remainingBalance = loan; //before the first month, the remaining balance to be paid by client = loan amount input
    let totalInterestPaid = 0;//resetting value of totals so that they don't accumulate every time the function is called
    let totalPrincipalPaid = 0;
    let paymentDetails = [];


    //want a loop to calculate the payment each month
    for (let month = 1; month <= months; month++) {
        let interestPayment = remainingBalance * (interest / 1200);
        let principalPayment = totalMonthlyPayment - interestPayment;
        remainingBalance -= principalPayment; //subtracts and makes equal the new value

        totalInterestPaid += interestPayment; 
        totalPrincipalPaid += principalPayment; //adds and makes it = the new value

        //store the information somehow
        //can do array of all the properties and store array in an array, could also separate each variable into an empty array
        //create object to store the components that we'll want to use later easily
        //we want the information for each month for the table, so this will append each object to the end of the array and each object will have information
        //corrensponding to each month the loop went through

        paymentDetails.push({
            month: month, //month property = month this info corresponded to
            totalMonthlyPayment: totalMonthlyPayment, //total monthly payment 
            interestPayment: interestPayment, //interest paiyment for the month
            principalPayment: principalPayment, // 
            remainingBalance: remainingBalance,
            totalInterestPaid: totalInterestPaid,
        });
    }
    //return array ? return object with variables that represent the values?
    return { // object contains the array of objects, the interest paid, principal, and total of payments in full term
        paymentDetails,
        totalInterestPaid,
        totalPrincipalPaid,
        totalPayments: totalMonthlyPayment * months,
        totalMonthlyPayment,
    };
}


function displayResults(completeCalc) {
    //declare variables for totals 

    const totalPrincipal = document.getElementById('totalPrincipal');
    const totalInterest = document.getElementById('totalInterest');
    const totalCost = document.getElementById('totalCost');
    const totalMonthly = document.getElementById('totalMonthlyPay');
    let resultsTable = document.getElementById('results');


    totalPrincipal.textContent = `Total Principal: $${completeCalc.totalPrincipalPaid.toFixed(2)}`;
    totalInterest.textContent = `Total Interest: $${completeCalc.totalInterestPaid.toFixed(2)}`;
    totalCost.textContent = `Total Cost: $${completeCalc.totalPayments.toFixed(2)}`;
    totalMonthly.textContent = completeCalc.totalMonthlyPayment.toFixed(2);

        
    resultsTable.innerHTML = '';

    completeCalc.paymentDetails.forEach(monthPaid => {
        
        resultsTable.innerHTML += `<tr>
         <td>${monthPaid.month.toFixed(0)}</td>
         <td>$${monthPaid.totalMonthlyPayment.toFixed(2)}</td>
         <td>$${monthPaid.principalPayment.toFixed(2)}</td>
         <td>$${monthPaid.interestPayment.toFixed(2)}</td>
         <td>$${monthPaid.totalInterestPaid.toFixed(2)}</td>
         <td>$${monthPaid.remainingBalance.toFixed(2)}</td></tr>`;

    });

    

    

    // resultsTable.innerHTML = "<tr>"
    
    // for (let i = 0; i < completeCalc.paymentDetails.length; i += 1) {

    //     let monthpaid = completeCalc.paymentDetails[i];
    //     resultsTable += `<td>${paymentDetails.month}</td></tr>`;
    //     resultsTable += `<td>${paymentDetails.totalMonthlyPayment}</td></tr>`;
    //     resultsTable += `<td>${paymentDetails.total}</td></tr>`;

    // }

    // resultsTable.innerHTML = "";

    // completeCalc.paymentDetails.forEach(monthpaid => {


    // })


}


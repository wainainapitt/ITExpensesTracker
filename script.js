document.getElementById('expenseForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const expense = {
        date: document.getElementById('date').value,
        category: document.getElementById('category').value,
        description: document.getElementById('description').value,
        vendor: document.getElementById('vendor').value,
        cost: document.getElementById('cost').value,
        invoiceNumber: document.getElementById('invoiceNumber').value,
        remarks: document.getElementById('remarks').value
    };

    fetch('http://localhost:3000/addExpense', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(expense)
    })
    .then(response => response.text())
    .then(data => {
        console.log('Success:', data);
        // Display success message
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block';
        setTimeout(function () {
            successMessage.style.display = 'none';
        }, 3000);

        // Clear the form
        document.getElementById('expenseForm').reset();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

document.getElementById('downloadCsv').addEventListener('click', function() {
    window.location.href = 'http://localhost:3000/downloadCsv';
});

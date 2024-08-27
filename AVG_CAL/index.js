const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;
let numberStore = [];
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzI0NzM5NjY0LCJpYXQiOjE3MjQ3MzkzNjQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImQwNjVjYTY1LWQ4NWQtNDdhNS05ODQ5LWY2NWVkZDcxODZlMCIsInN1YiI6InNnYW5hcGFAZ2l0YW0uaW4ifSwiY29tcGFueU5hbWUiOiJBVkdfQ0FMIiwiY2xpZW50SUQiOiJkMDY1Y2E2NS1kODVkLTQ3YTUtOTg0OS1mNjVlZGQ3MTg2ZTAiLCJjbGllbnRTZWNyZXQiOiJvaHFBblZWemRETG90SlhEIiwib3duZXJOYW1lIjoiU3J1dGhpIEtlZXJ0aGkgR2FuYXBhIiwib3duZXJFbWFpbCI6InNnYW5hcGFAZ2l0YW0uaW4iLCJyb2xsTm8iOiJIVTIxQ1NFTjAxMDEzMjEifQ.W8TIhK4-_yI0myLUjdTAknx88jWE1FLM8B4xMsvx_nM';

const fetchNumbers = async (url) => {
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${ACCESS_TOKEN}` 
            },
            timeout: 500
        });
        return response.data.numbers;
    } catch (error) {
        console.error("Error fetching numbers:", error.response ? error.response.data : error.message);
        return [];
    }
};

const calculateAverage = (numbers) => {
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return (sum / numbers.length).toFixed(2);
};

app.get('/numbers/:type', async (req, res) => {
    const type = req.params.type;
    let apiUrl = '';

    switch (type) {
        case 'p':
            apiUrl = 'http://20.244.56.144/test/primes';
            break;
        case 'f':
            apiUrl = 'http://20.244.56.144/test/fibo';
            break;
        case 'e':
            apiUrl = 'http://20.244.56.144/test/even';
            break;
        case 'r':
            apiUrl = 'http://20.244.56.144/test/rand';
            break;
        default:
            return res.status(400).send({ error: "Invalid type" });
    }

    const fetchedNumbers = await fetchNumbers(apiUrl);
    const uniqueNumbers = [...new Set([...numberStore, ...fetchedNumbers])].slice(-WINDOW_SIZE);
    const prevWindow = [...numberStore];
    numberStore = uniqueNumbers;

    const average = calculateAverage(numberStore);

    res.json({
        windowPrevState: prevWindow,
        windowCurrState: numberStore,
        numbers: fetchedNumbers,
        avg: average
    });
});

app.get('/', (req, res) => {
    res.send(`
        <h1>Welcome to the Average Calculator Microservice</h1>
        <p>Use the endpoint <code>/numbers/:type</code> to fetch numbers and calculate averages.</p>
        <h2>Available Types:</h2>
        <ul>
            <li><strong>p</strong> - Prime Numbers</li>
            <li><strong>f</strong> - Fibonacci Numbers</li>
            <li><strong>e</strong> - Even Numbers</li>
            <li><strong>r</strong> - Random Numbers</li>
        </ul>
        <h2>Examples:</h2>
        <ul>
            <li><code>/numbers/p</code> - Fetches prime numbers</li>
            <li><code>/numbers/f</code> - Fetches Fibonacci numbers</li>
            <li><code>/numbers/e</code> - Fetches even numbers</li>
            <li><code>/numbers/r</code> - Fetches random numbers</li>
        </ul>
    `);
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

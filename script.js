async function getAllPrices() {
    const coins = [
        { symbol: 'BTCUSDT', id: 'btc' },
        { symbol: 'ETHUSDT', id: 'eth' },
        { symbol: 'SOLUSDT', id: 'sol' },
        { symbol: 'TONUSDT', id: 'ton' },
        { symbol: 'TRXUSDT', id: 'trx' },
        { symbol: 'NOTUSDT', id: 'not' }
    ];

    const usdToUah = 40.50;

    for (let coin of coins) {
        try {
            const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${coin.symbol}`);
            const data = await response.json();

            const priceUsdt = parseFloat(data.lastPrice);
            const priceUah = (priceUsdt * usdToUah).toLocaleString('uk-UA', { minimumFractionDigits: 2 });
            const change = parseFloat(data.priceChangePercent);

            const priceElement = document.getElementById(`${coin.id}-price`);
            const changeElement = document.getElementById(`${coin.id}-change`);

            if (priceElement && changeElement) {
                priceElement.innerHTML = priceUah + ' ₴';
                changeElement.innerHTML = (change > 0 ? '+' : '') + change.toFixed(2) + '%';
                changeElement.style.color = change >= 0 ? '#0ecb81' : '#ff4d4d';
            }
        } catch (err) {
            console.error(err);
            const errorElement = document.getElementById(`${coin.id}-price`);
            if (errorElement) errorElement.innerHTML = 'Помилка';
        }
    }
}

getAllPrices();
setInterval(getAllPrices, 20000);

async function getMarketStats() {
    try {
        const fearResponse = await fetch('https://api.alternative.me/fng/');
        const fearData = await fearResponse.json();

        const fngValue = fearData.data[0].value;
        const fngStatus = fearData.data[0].value_classification;

        document.querySelector('.fear-value').innerText = fngValue;
        document.querySelector('.fear-label').innerText = fngStatus;
        document.querySelector('.bar-dot').style.left = fngValue + '%';

    } catch (err) {
        console.error(err);
    }
}

getMarketStats();

function createSparkline(canvasId, dataPoints, color) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dataPoints.map((_, i) => i),
            datasets: [{
                data: dataPoints,
                borderColor: color,
                borderWidth: 2,
                pointRadius: 0,
                fill: false,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { enabled: false } },
            scales: {
                x: { display: false },
                y: { display: false }
            }
        }
    });
}

createSparkline('marketChart', [2.60, 2.62, 2.61, 2.64, 2.63, 2.65, 2.67, 2.65], '#0ecb81');
createSparkline('cmcChart', [158, 160, 159, 161, 160, 162, 161, 163], '#0ecb81');
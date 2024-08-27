// Пример данных для графиков
const data = [
    [100000, 200000, 300000, 250000, 400000, 480000],  // Выручка, руб
    [300000, 320000, 310000, 305000, 310000, 300000],  // Наличные
    [100000, 110000, 120000, 115000, 125000, 100000],  // Безналичный расчет
    [100521, 105000, 110000, 102000, 107000, 100521],  // Кредитные карты
    [1300, 1250, 1200, 1150, 1400, 1300],              // Средний чек, руб
    [1200, 1100, 1150, 1050, 1250, 1200],              // Средний гость, руб
    [1000, 900, 950, 850, 900, 1000],                  // Удаление из чека (после оплаты)
    [1300, 1200, 1100, 1300, 1200, 1300],              // Удаление из чека (до оплаты)
    [34, 36, 33, 35, 34, 34],                          // Количество чеков
    [34, 36, 33, 35, 34, 32]                           // Количество гостей
];

document.addEventListener("DOMContentLoaded", () => {
    const rows = document.querySelectorAll("#data-table tbody tr:not(#chart-row)");

    rows.forEach((row, index) => {
        const currentDayCell = row.cells[1];
        const yesterdayCell = row.cells[2];
        const percentageCell = row.cells[3];
        const weekDayCell = row.cells[4];

        // Добавляем класс для столбца "Текущий день"
        currentDayCell.classList.add("current-day");

        // Окрашивание столбцов "Вчера" и "Этот день недели" в зависимости от значений
        const yesterdayValue = parseFloat(yesterdayCell.textContent.replace(/\s/g, ''));
        const weekDayValue = parseFloat(weekDayCell.textContent.replace(/\s/g, ''));
        const percentageValue = parseFloat(percentageCell.textContent.replace('%', ''));

        // Проверка на положительные и отрицательные значения
        if (yesterdayValue >= 0) {
            yesterdayCell.classList.add("positive");
        } else {
            yesterdayCell.classList.add("negative");
        }

        if (weekDayValue >= 0) {
            weekDayCell.classList.add("positive");
        } else {
            weekDayCell.classList.add("negative");
        }

        // Окрашивание процентов
        if (percentageValue > 0) {
            percentageCell.classList.add("positive-percent");
        } else if (percentageValue < 0) {
            percentageCell.classList.add("negative-percent");
        }
    });
});

function showChart(index) {
    const chartRow = document.getElementById('chart-row');
    chartRow.style.display = 'table-row';

    const chartData = data[index];
    
    Highcharts.chart('chart-container', {
        title: {
            text: 'График по выбранному показателю'
        },
        yAxis: {
            title: {
                text: 'Значения'
            }
        },
        xAxis: {
            categories: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
        },
        series: [{
            name: 'Показатель',
            data: chartData
        }]
    });
}

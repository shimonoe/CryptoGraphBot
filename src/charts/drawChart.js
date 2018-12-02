const ChartjsNode = require('chartjs-node');
const dataFormatter = require('./dataFormatter');

class DrawChart {
    constructor(data) {
        this.data = data;
        this.chartNode = new ChartjsNode(1920, 1280);
        this.chartOptions = {
            type: 'line',
            data: {
                //labels: this.data.labels,
                labels: new Array(data.averagePrices.length),
                datasets: [{
                    data: this.data.averagePrices,
                    label: "Average price",
                    borderColor: "#606060",
                    lineTension: 0,
                    borderWidth: 2,
                    pointStyle: 'rectRot',
                }, {
                    data: this.data.lowPrices,
                    label: "Lowest price",
                    borderColor: "#ff0800",
                    lineTension: 0,
                    fill: false,
                    borderWidth: 1,
                    showLine: false,
                    pointStyle: 'line',
                    pointRadius: 6,
                }, {
                    data: this.data.highPrices,
                    label: "Highest price",
                    borderColor: "#3e95cd",
                    lineTension: 0,
                    fill: false,
                    borderWidth: 1,
                    showLine: false,
                    pointStyle: 'line',
                    pointRadius: 6,
                }]
            },
            options: {
                responsive: false,
                scales: {
                    yAxes: [{
                        gridLines: {
                            drawBorder: false,
                        }
                    }]
                },
                chartArea: {
                    backgroundColor: "#ffffff"
                }
            },
        };
    }

    async getImageBuffer() {
        return await this.chartNode.drawChart(this.chartOptions)
            .then(() => {
                return this.chartNode.getImageBuffer('image/png');
            })
            .catch(error => {
                console.log(error);
            });
    }

    async getImageStream() {
        return await this.getImageBuffer()
            .then(buffer => {
                return this.chartNode.getImageStream('image/png');
            })
            .catch(error => {
                console.log(error);
            });
    }

    async saveImage(path) {
        return await this.getImageStream()
            .then(streamResult => {
                streamResult.stream;
                streamResult.length;
                return this.chartNode.writeImageToFile('image/png', path);
            })
            .catch(error => {
                console.log(error);
            });
    }

    destroy() {
        this.chartNode.destroy();
    }
}

module.exports = DrawChart;

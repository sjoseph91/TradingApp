import Chart from "react-apexcharts"
import { useState } from "react";

export const StockChart = ({chartData, symbol}) => {
    const {day, week, year} = chartData;

    const [dateFormat, setDateFormat] = useState("24h");

    const color = determineTimeFormat()[determineTimeFormat().length - 1].y - determineTimeFormat()[0].y  > 0 ?
        "#26C281" : "#ed3419";

    const options = {
        colors: [color],
        title: {text: symbol},
        align: "center",
        style: {
            fontSize: "24px"
        },
        chart: {
            id: "stock data",
            animations: {
                speed: 1300
            }
        },
        xaxis: {
            type: "datetime",
            labels: {
                dateTimeUTC: false
            }
        },
        tooltip: {
            x: {
                format: "MMM dd HH:MM"
            }
        }
    }
    function determineTimeFormat() {
        switch(dateFormat){
            case "24h":
                return day;
            case "7d":
                return week;
            case "1Y":
                return year;
            default:
                return day;
        }
    }
    const renderButtonSelect = (button) => {
        const classes = "btn m-1";
        if (button === dateFormat){
            return classes + " btn-primary"
        }else{
            return classes + " btn-outline-primary"
        }

    }
    const series = [{
        name: symbol,
        data: determineTimeFormat()
    }]
    return (
        <div 
            className="mt-5 p-4 shadow-sm bg-white"
        >
            <div>
                <button className={renderButtonSelect("24h")}onClick={() => setDateFormat("24h")}>24h</button>
                <button className={renderButtonSelect("7d")} onClick={() => setDateFormat("7d")}>7d</button>
                <button className={renderButtonSelect("1Y")} onClick={() => setDateFormat("1Y")}>1y</button>
            </div>
            <Chart 
                options={options} 
                series={series} 
                type="area" 
                width="90%"
                
            />
            
        </div>
    )
}
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";  
import finnHub from "../apis/finnHub";
import { StockChart } from "../components/StockChart";
import { StockData } from "../components/StockData";

export const StockDetailPage = () => {

    const {symbol} = useParams();
    const [chartData, setChartData] = useState();

    function formatData(data){
        return data.t.map((element, index) =>{
            return {
                x: element * 1000,
                y: Math.floor(data.c[index])
            }
        })
    }


    useEffect(() => {
        const fetchData = async () => {
            const date = new Date();
            const currentTime = Math.floor(date.getTime() /1000);
            let oneDayAgo;
            const oneWeekAgo = currentTime - (60 * 60 * 24 * 7);
            const oneYearAgo = currentTime - (60 * 60 * 24 * 365);
            
            /* Checks for weekend days */
            if (date.getDay() === 6){
                oneDayAgo = currentTime - ( 2 * 60 * 60 * 24);
            }
            else if (date.getDay() === 0){
                oneDayAgo = currentTime - ( 3 * 60 * 60 * 24);
            }else{
                oneDayAgo = currentTime - (60 * 60 * 24);
            }
            const responses = await Promise.all([
                await finnHub.get(`stock/candle`, {
                params: {
                    symbol,
                    from: oneDayAgo,
                    to: currentTime,
                    resolution: 30
                }
            }
            ), 
            finnHub.get(`stock/candle`, {
                params: {
                    symbol,
                    from: oneWeekAgo,
                    to: currentTime,
                    resolution: 60
                }
            }
            ),
            finnHub.get(`stock/candle`, {
                params: {
                    symbol,
                    from: oneYearAgo,
                    to: currentTime,
                    resolution: "W"
                }
            }
            )

            ])

            setChartData({
                day: formatData(responses[0].data),
                week: formatData(responses[1].data),
                year: formatData(responses[2].data)
            })

        }
        
        fetchData()

    }, [symbol]) 

    return (
        <div>
            {chartData && (
                <div>
                    <StockChart chartData={chartData} symbol={symbol} />
                    <StockData symbol={symbol}/>
                </div>
            )}
        </div>
    )
}
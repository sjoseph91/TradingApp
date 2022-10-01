import {useState, useEffect, useContext} from "react"
import finnHub from "../apis/finnHub"
import { BsFillCaretUpFill } from "react-icons/bs"
import { BsFillCaretDownFill } from "react-icons/bs"
import { WatchListContext } from "../context/WatchListContext"
import { useNavigate } from "react-router-dom"


export const StockList = () => {
    const [stock, setStock] = useState();
    const navigate = useNavigate();
    const {watchList, deleteStock} = useContext(WatchListContext);

    

    function changeColor(num){
        return num > 0 ? "success" : "danger"
    }

    function renderIcon(num){
        return num > 0 ?
            <BsFillCaretUpFill />
            :
            <BsFillCaretDownFill />
    }

    function handleStockSelect(symbol){
        navigate("detail/" + symbol);
    }
    
    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try{
                const responses = await Promise.all(watchList.map(stock =>{
                    return finnHub.get("/quote", {
                        params: {
                            symbol: stock
                        }
                    })
                } ))
                
                const formattedResponse = responses.map(response => {
                    return {
                        data: response.data,
                        symbol: response.config.params.symbol
                    }
                })
                if (isMounted){
                    setStock(formattedResponse);
                }
            }
            catch(err){
                // console.log(err)
                
            }
        }
        fetchData()

        return () => (isMounted = false)

    }, [watchList])

    return (
        <table className="table table-hover mt-5">
            <thead style={{color: "rgb(79, 89, 102)"}}>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Last</th>
                    <th scope="col">Chg</th>
                    <th scope="col">Chg%</th>
                    <th scope="col">High</th>
                    <th scope="col">Low</th>
                    <th scope="col">Open</th>
                    <th scope="col">Pclose</th>
                </tr>

            </thead>
            <tbody>
                { stock && stock.map(stockData => {
                    return (
                        <tr 
                            onClick={() => handleStockSelect(stockData.symbol)}className="table-row" 
                            key={stockData.symbol}
                            style={{cursor: "pointer"}}
                        >
                            <th scope="row">{stockData.symbol}</th>
                            <td>{stockData.data.c}</td>
                            <td className={`text-${changeColor(stockData.data.d)}`}>{stockData.data.d}{renderIcon(stockData.data.d)}</td>
                            <td className={`text-${changeColor(stockData.data.d)}`}>{stockData.data.dp}{renderIcon(stockData.data.dp)}</td>
                            <td>{stockData.data.h}</td>
                            <td>{stockData.data.l}</td>
                            <td>{stockData.data.o}</td>
                            <td>{stockData.data.pc}
                                <button
                                    className="btn btn-danger btn-sm ml-3 d-inline-block delete-button"    
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deleteStock(stockData.symbol)
                                    } }
                                >
                                    Remove
                                </button>
                            </td>

                        </tr>
                    )
                })}
            </tbody>

        </table>
    )
}
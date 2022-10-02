import {createContext, useState, useEffect} from "react";

const WatchListContext = createContext();

const WatchListContextProvider = (props) => {

    const [watchList, setWatchList] = useState(
        localStorage.getItem("watchList") ? 
            JSON.parse(localStorage.getItem("watchList"))
            : ["DAL", "MSFT", "TOYOF"]
    );

    useEffect(() => {
        localStorage.setItem("watchList", JSON.stringify(watchList))
    },[watchList])

    function addStock(stock){
        if (watchList.indexOf(stock) < 0){
            setWatchList(prev => [...prev, stock])
        }
    }

    function deleteStock(stock){
        setWatchList(prevList => prevList.filter(item => item !== stock))
    }

    return (
        <WatchListContext.Provider value={{watchList, addStock, deleteStock}}>
            {props.children}
        </WatchListContext.Provider>
    )
}

export {WatchListContext, WatchListContextProvider}
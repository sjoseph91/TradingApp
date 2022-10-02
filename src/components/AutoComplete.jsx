import {useState, useEffect, useContext} from "react";
import finnHub from "../apis/finnHub";
import { WatchListContext } from "../context/WatchListContext"


export const AutoComplete = () => {


    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    const {addStock} = useContext(WatchListContext);

    function handleClick(symbol){
        if (/\./.test(symbol)){
            setError("Only US Stocks supported with free version. Please choose another.");
        }else{
            addStock(symbol);
            setSearch("");
            setError(null);

        }
    }

    const renderDropdown = () => {
        const dropDownClass = search ? "show" : null;
        return (
            <ul style={{height: "500px", overflowY: "scroll", overflowX: "hidden", cursor: "pointer"}}className={`dropdown-menu ${dropDownClass}`}>
                {results.map(result => {
                    return (
                        <li 
                            key={result.symbol} className="dropdown-item"
                            onClick={() => {
                                handleClick(result.symbol)
                            }}
                        >
                            {result.description} ({result.symbol})
                        </li>
                    )
                })}
            </ul>
        )
    }

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try{
                const response = await finnHub.get("/search", {
                    params: {q: search}
                })
                if (isMounted){
                    setResults(response.data.result)
                }
            }
            catch(err){

            }
        }
        if (search.length > 0){
            fetchData();
        }else{
            setResults([])
        }
        return () => isMounted = false;
    }, [search])
    
    return (
        <div>
            {error && (
                <div className="text-center alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <div className="w-50 p-4 mx-auto rounded ">
                <div className="form-floating dropdown" >
                    <input 
                        style={{backgroundColor: "rgba(145, 158, 171, 0.4)"}}
                        id="search" 
                        type="text" 
                        placeholder="Search" 
                        autoComplete="off" 
                        className="form-control" 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <label htmlFor="search">Search</label>
                    {renderDropdown()}
                </div>
            </div>
        </div>
    )
}
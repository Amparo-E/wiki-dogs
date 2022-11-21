import { Link } from "react-router-dom";
import { getDogs, searchByName } from "../../redux/actions";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from './SearchBar.module.css'

const SearchBar = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(getDogs())
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(searchByName(search))
    }

    const handleInput = (e) => {
        setSearch(e.target.value)        
    }    

    const handleInputKeyUp = (e) => {
        if(e.key !== 'Enter') {
            return;
        }

        dispatch(searchByName(search))
    }

    const handleClear = (e) => {
        setSearch('');
    }

    return (
        <>
            <nav className={style.search_box}>
                <div>
                    <Link to='/create' className={style.title_menu}><h4>Create your dog</h4></Link>
                    <Link to= '/home' className={style.title_menu}><h4>Home</h4></Link>
                </div>
                <div className={style.input}>                
                    <input onKeyUp={handleInputKeyUp}  type="text" value={search} placeholder='Type to search...' onChange={handleInput}/>
                    {
                        search.length > 0 
                        ? <button onClick={handleClear} className={style.cancel_btn}>Clear</button>
                        : false
                    }
                    <button onClick={handleSubmit} className={style.search_btn}><ion-icon name="search-outline"></ion-icon></button>

                </div>
                    
            </nav>
        </>
    )
}

export default SearchBar;
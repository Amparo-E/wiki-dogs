import { Link } from "react-router-dom";
import { searchByName, searchByTemp } from "../../redux/actions";
import { useState } from "react";
import { useDispatch } from "react-redux";
import style from './SearchBar.module.css'

const SearchBar = (props) => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');

    const isReady = (value) => {
        if(props.isReady) {
            props.isReady(value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        isReady(false);
        dispatch(searchByName(search))
        isReady(true);
        props.setCurrentPage(1)
    }

    const handleInput = (e) => {
        isReady(false);
        setSearch(e.target.value);
        isReady(true);
    }    

    const handleInputKeyUp = (e) => {
        if(e.key !== 'Enter') {
            return;
        }
        isReady(false);
        dispatch(searchByName(search))
        isReady(true);
    }

    const handleClear = () => {
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
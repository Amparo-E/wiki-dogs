import { Link } from "react-router-dom";
import { getDogs, searchByName } from "../../redux/actions";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import style from './SearchBar.module.css'

const SearchBar = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');

    useEffect(() => {
        dispatch(getDogs())
    }, [dispatch])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(search) 
        dispatch(searchByName(search))
        setSearch('');
    }

    const handleInput = (e) => {
        setSearch(e.target.value)
        
    }



    

    return (
        <>
            <nav className={style.search_box}>
                <div>
                    <Link to='/create' className={style.title_menu}><h4>Create your dog</h4></Link>
                    <Link to='/about' className={style.title_menu}><h4>About</h4></Link>
                    <Link to= '/home' className={style.title_menu}><h4>Home</h4></Link>
                </div>
                <div className={style.input}>
                    <input  type="text" value={search} placeholder='Type to search...' onChange={handleInput}/>
                    <button onClick={handleSubmit} className={style.search_btn}><ion-icon name="search-outline"></ion-icon></button>
                    {/* {
                    search 
                    ? <button onClick={handleSubmit} className={style.cancel_btn}>X</button>
                    : ''
                    }  */}
                </div>
                    
            </nav>
        </>
    )
}

export default SearchBar;
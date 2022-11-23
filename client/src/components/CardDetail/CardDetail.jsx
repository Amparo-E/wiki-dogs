import { getDetail, cleanDetail, deleteDog } from "../../redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Loading from "../Loading/Loading";
import style from './CardDetail.module.css'
import SearchBar from "../SearchBar/SearchBar";

const CardDetail = (props) => {
    const { id } = props.match.params;
    const dispatch = useDispatch();
    const detail = useSelector(state => state.dogDetail)
    
    useEffect(() => {
         dispatch(getDetail(id));

         return () => {
            dispatch(cleanDetail())
         }
    }, [dispatch, id]);


    const handleDelete = () => {
        dispatch(deleteDog(id))
    }        
    if(!Object.keys(detail).length) return <Loading ready={false}></Loading>;

    const splitHeight = detail.height.split('-'); 
    const splitWeight = detail.weight.split('-');
    const splitYears = detail.life_span.split('-'); 

    return (
        <>
            <SearchBar />
            
            <div className={style.content}>
                <div className={style.content_all}>
                    <div className={style.content_img}>
                        <img src={detail.image} alt="" />
                    </div>
                    <div className={style.content_info}>
                        <h1>{detail.name}</h1>
                        <p>Their average height ranges from {splitHeight[0]} to {splitHeight[1]} cm</p>
                        <p>Their average wight ranges from {splitWeight[0]} to {splitWeight[1]} kg</p>
                        <p>They tend to live for {splitYears[0]} to {splitYears[1]} years</p>
                        <p>They are usally {detail.temperament}</p>
                    </div>

                    <button onClick={handleDelete}>X</button> 
                </div>
            </div>
        </>
    )
    
}

export default CardDetail;
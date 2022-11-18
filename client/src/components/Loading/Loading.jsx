import React from "react";
import './Loading.css'


const Loading = (props) => {
    if(props.ready) return <>{props.children}</>
    else {
        return (
            <div className="loading text-center text-white">
                <div className="loader-container">
                    <div className="outer">
                        <div className="inner">
                            <div className="small"></div>
                            <div className="small"></div>
                            <div className="small"></div>
                            <div className="small"></div>
                        </div>
                        <div className="big">
                            <div className="small"></div>
                        </div>
                        <div className="big">
                            <div className="small"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Loading;
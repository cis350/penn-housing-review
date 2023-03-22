import '../App.css';
import * as React from "react";
import Filter from './FBMainFilter';
import Header from './FBMainHeader';


export default function FBMain() {
    return (
        <div className='Container'>
            <Header />
            <Filter />
        </div>
    )
}
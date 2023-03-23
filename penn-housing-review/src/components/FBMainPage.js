import { useEffect, useState } from "react";

const config = require("../config.json");
// implement the main page for forum board
export default function FBMainPage() {
    const [postsData, setpostsData] = useState({});
    const [pageSize, setPageSize] = useState(10);

    const [postName, setPostName] = useState('');
    const [housingType, setHousingType] = useState("all_housing_type");
    const [category, setCategory] = useState(["all_category"]);

    useEffect(() => {
        fetch(`http://${config.host}:${config.port}/forum_board`)
            .then((res) => res.json())
            .then((data) => {
                setpostsData(data);
            });
    }, []);

    const search = () => { 
        fetch(`http://${config.host}:${config.port}/forum_board?post_name=${postName}` + 
        `&housing_type=${housingType}` + 
        `&category=${category}`
        )
            .then((res) => res.json())
            .then((data) => {
                setpostsData(data);
            });
    }

    const columns = [
        { field: 'post_name', headerName: 'Search', width: 200, renderCell: (params) => (
            <Link onClick={() => setPostName(params.value)}>{params.value}</Link>
        )},
        { field: 'housing_type', headerName: 'Housing Type' }, 
        { field: 'category', headerName: 'Category' },
    ]

}
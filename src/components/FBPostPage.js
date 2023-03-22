// create posting page
// allow user to insert title, content and choose housing type and category

import React from 'react';
import { useState } from 'react';
import '../App.css';
import { Button, TextField, Stack, RadioGroup, FormControlLabel, Radio, FormControl } from '@mui/material';
import { addNewPost } from '../api/FBNewPostAPI';

export default function FBPostPage() {
    const [currentOnCampus, setcCurrentOnCampus] = useState('outlined');
    const [currentOffCampus, setcCurrentOffCampus] = useState('outlined');
    const [housingType, setHousingType] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [postObject, setPostObject] = useState({});

    const handleHousingTypeClickOne = (event) => {
        if (currentOnCampus === 'outlined') {
            setcCurrentOnCampus('contained');
            if (currentOffCampus === 'contained') {
                setcCurrentOffCampus('outlined');
            }
            setHousingType(event.target.value);
        }
        else {
            setcCurrentOnCampus('outlined');
            setHousingType('');
        }
        
    };

    const handleHousingTypeClickTwo = (event) => {
        if (currentOffCampus === 'outlined') {
            setcCurrentOffCampus('contained');
            if (currentOnCampus === 'contained') {
                setcCurrentOnCampus('outlined');
            }
            setHousingType(event.target.value);
        }
        else {
            setcCurrentOffCampus('outlined');
            setHousingType('');
        }
    };

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    };

    const handleChangeContent = (event) => {
        setContent(event.target.value);
    };

    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    };

    const handleSubmit= (event) => {
        console.log("title", title);
        console.log("content", content);
        console.log("category", category);
        console.log("housingType", housingType);

        // setPostObject({
        //     "title": title,
        //     "content": content,
        //     "category": category,
        //     "housingType": housingType
        // })
        
        async function addNewPostWrapper() {
            const response = await addNewPost(title, content, category, housingType);
            console.log("response", response);
            return response;
        }
        addNewPostWrapper();
    };



    return (
        <div className="main">
            <div>
                <h2 className='postingTitle'>Post Your Thread!</h2>
                <Stack direction="row" spacing={2}>
                    <Button className='housingType'
                        style={{
                            borderRadius: 65,
                            padding: "12px 62.5px",
                            fontSize: "12px"
                        }}
                        // make buttton text bold
                        variant={currentOnCampus}
                        value = "On Campus" 
                        onClick={handleHousingTypeClickOne}>
                        On Campus Housing</Button>
                    <Button className='housingType'
                        style={{
                            borderRadius: 65,
                            padding: "12px 62.5px",
                            fontSize: "12px",
                        }}
                        variant={currentOffCampus}
                        value = "Off Campus"
                        onClick={handleHousingTypeClickTwo}>
                        Off Campus Housing</Button>
                </Stack>
                <h3 className='postEle'>Title</h3>
                <TextField 
                    style={{
                        borderRadius: 65,
                        width: "100%",
                        color: "rgba(117, 137, 122, 0.7)"
                    }}
                    size="small"
                    id="full-width-text-field" 
                    variant="outlined" 
                    color = "success"
                    placeholder = "Enter your title here"
                    multiline
                    rows={1}
                    maxRows={2}
                    value={title}
                    onChange = {handleChangeTitle}/>
                <h3 className='postEle'>Category</h3>
                <FormControl>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange= {handleChangeCategory}
                    >
                        <FormControlLabel value="Discussion" control={<Radio />} label="Discussion" />
                        <FormControlLabel value="Lease Info" control={<Radio />} label="Lease Info" />
                        <FormControlLabel value="Social" control={<Radio />} label="Social" />
                        <FormControlLabel value="Event" control={<Radio />} label="Event" />
                    
                    </RadioGroup>
                </FormControl>
                <h3 className='postEle'>Content</h3>
                <TextField 
                    style={{
                        borderRadius: 65,
                        width: "100%",
                        color: "rgba(117, 137, 122, 0.7)"
                    }}
                    size="small"
                    id="full-width-text-field"
                    variant="outlined" 
                    color = "success"
                    placeholder = "Enter you text here"
                    multiline
                    rows={10}
                    maxRows={10}
                    value={content}
                    onChange = {handleChangeContent}
                    />
                <p></p>
                
                <Stack>
                    <Button
                    style={{
                        borderRadius: 65,
                        padding: "12px 62.5px",
                        backgroundColor: "rgba(117, 137, 122, 0.7)",
                        fontSize: "15px"
                    }}
                    variant="contained"
                    onClick={handleSubmit}>
                        Post</Button>
                </Stack>

                
                
                
            </div>
        </div>
    );
}

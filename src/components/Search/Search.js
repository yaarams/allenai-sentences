import React, { useState } from 'react';
import search from './search.svg';
import './search.css';

function SearchBar(props) {
    const [form, setValues] = useState({
        word: ''
    });
    const updateField = e => {
        setValues({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    const {search} = props;
    return (
        <div className="Search">
            <input 
                type="text"
                name="word"
                onChange={updateField}
                value={form.word} />
            <button onClick={() => search(form.word)}>Search</button>
        </div>
    );
}

export default SearchBar;
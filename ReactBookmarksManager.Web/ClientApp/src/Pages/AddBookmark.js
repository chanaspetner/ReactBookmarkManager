import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AddBookmark = () => {
    const [formData, setFormData] = useState({ title: '', url: '' })
    const history = useHistory();

    const onTextChange = e => {
        const copy = { ...formData };
        copy[e.target.name] = e.target.value;
        setFormData(copy);
    } 
    const onFormSubmit = async e => {
        e.preventDefault();
        await axios.post('/api/bookmark/addbookmark', formData);
        history.push('/my-bookmarks');
    }

    return(
        <div className="row">
            <div className="col-md-6 offset-md-3 card card-body bg-light">
                <h3>Add Bookmark</h3>
                <form onSubmit={onFormSubmit}>
                    <input onChange={onTextChange} type="text" name="title" 
                        placeholder="Title" className="form-control mt-2" value={formData.title} />
                    <input onChange={onTextChange} type="text" name="url" 
                        placeholder="Url" className="form-control mt-2" value={formData.url} />
                    <button className="btn btn-primary form-control mt-2">Add</button>
                </form>
            </div>
        </div>
    )
}

export default AddBookmark;
import React, { useState } from 'react';
import { setSyntheticLeadingComments } from 'typescript';

const BookmarkRow = props => {
    const { bookmark, onEditClick, beingEdited, onUpdateClick, onTitleChange, onCancelClick, onDeleteClick } = props;


    const generateRow = () => {
        if(!!beingEdited.find(b => b.id == bookmark.id)){
            var b = beingEdited.find(t => t.id == bookmark.id);
            return(
                <tr>
                    <td>
                        <input type="text" name="title" onChange={e => onTitleChange(e, b.title, b.id)} 
                         className="form-control" placeholder="Title" value={b.title} />
                    </td>
                    <td>
                        <a href={bookmark.url}>{bookmark.url}</a> 
                    </td>
                    <td>
                        <button className="btn btn-warning" onClick={onUpdateClick}>Update</button>
                        <button className="btn btn-info" onClick={onCancelClick}>Cancel</button>
                        <button className="btn btn-danger" onClick={onDeleteClick}>Delete</button>
                    </td>
                </tr>
            )
        }
        else{
            return(
            <tr>
                <td>{bookmark.title}</td>
                <td>
                    <a href={bookmark.url}>
                    {bookmark.url}
                    </a>     
                </td>
                <td>
                    <button className='btn btn-success' onClick={onEditClick}>Edit Title</button>
                    <button className='btn btn-danger' onClick={onDeleteClick}>Delete</button>
                </td>
            </tr>
            )
        }
    }

    return(
        <>
        {generateRow()}
        </>
    )
}

export default BookmarkRow
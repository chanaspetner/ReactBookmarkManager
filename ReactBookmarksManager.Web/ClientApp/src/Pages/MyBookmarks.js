import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BookmarkRow from '../Components/BookmarkRow';

const MyBookmarks = () => {

    const [bookmarks, setBookmarks] = useState([]);
    const [beingEdited, setBeingEdited] = useState([]);

    const { user } = useAuthContext();

    useEffect(() =>{
        const getBookmarks = async () => {
            const { data } = await axios.get('/api/bookmark/getuserbookmarks');
            setBookmarks(data);
        }

        getBookmarks();
    }, [beingEdited]);

    const onEditClick = (id, title) => {
        setBeingEdited([{id, title}, ...beingEdited]);

    }

    const onUpdateClick = async(title, id) => {
        await axios.post(`/api/bookmark/updatetitle?title=${title}&id=${id}`);
        setBeingEdited(beingEdited.filter(b => b.id !== id));
    }

    const onTitleChange = (e, title, id) => {
        setBeingEdited(beingEdited.filter(b => b.id !== id));
        setBeingEdited([{id, title: e.target.value}, ...beingEdited] );
        
    }

    const onCancelClick = id => {
        setBeingEdited(beingEdited.filter(b => b.id !== id));
    }

    const onDeleteClick = async id => {
        await axios.post(`/api/bookmark/delete?id=${id}`);
        if(beingEdited.includes(id)){
            setBeingEdited(beingEdited.filter(b => b.id !== id));
        }
    }

    return(
        <div className='container mt-2'>
            <div className="row">
                <div className="col-md-12">
                    <h1>Welcome back {`${user.firstName} ${user.lastName}`}</h1>
                    <Link className='text-light' to='/add-bookmark'>
                        <button className="btn btn-primary btn-block" >                       
                                Add Bookmark                      
                        </button>
                    </Link>
                </div>
            </div>
            <div className='row mt-2'>
                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Url</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookmarks.map(b => <BookmarkRow key={b.id} 
                                                         bookmark={b}
                                                         beingEdited={beingEdited}
                                                         onEditClick={() => onEditClick(b.id, b.title)}
                                                         onUpdateClick={() => onUpdateClick(beingEdited.find(be => be.id == b.id).title, b.id)}
                                                         onTitleChange={onTitleChange}
                                                         onCancelClick={() => onCancelClick(b.id)}
                                                         onDeleteClick={() => onDeleteClick(b.id)}
                                                          />)}
                    </tbody>
                </table>
            </div> 
        </div>
    )


}

export default MyBookmarks;
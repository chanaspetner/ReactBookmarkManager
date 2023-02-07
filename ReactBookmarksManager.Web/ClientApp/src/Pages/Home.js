import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BookmarkCountRow from '../Components/BookmarkCountRow';

const Home = () => {
    const [bookmarkCounts, setBookmarkCounts] = useState([]);

    useEffect(() => {
        const getBookmarkCounts = async() => {
            const { data } = await axios.get('/api/bookmark/mostpopularbookmarks');
            setBookmarkCounts(data);
        }

        getBookmarkCounts();
    }, [])

    return(
        <div className='container mt-2'>
            <h1>Welcome to the React Bookmark Application.</h1>
            <h3>Top 5 most bookmarked links</h3>
            <table className='table table-hover table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>URL</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {bookmarkCounts.map((bc, i) => <BookmarkCountRow key={i} bookmarkCount={bc}/>)}
                </tbody>
            </table>
        </div>
    )
}

export default Home;
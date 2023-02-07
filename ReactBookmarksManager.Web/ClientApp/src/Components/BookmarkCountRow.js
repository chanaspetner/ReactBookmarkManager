import React from 'react';

const BookmarkCountRow = ({bookmarkCount}) => {

    return(
        <tr>          
            <td>
                 <a href={bookmarkCount.url}>{bookmarkCount.url}</a> 
            </td>
            <td>{bookmarkCount.count}</td>
        </tr>
    )
}

export default BookmarkCountRow;
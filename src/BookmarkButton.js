import React from 'react';
import {getHeaders} from './utils';

class BookmarkButton extends React.Component {  

    constructor(props) {
        super(props);

        this.toggleBookmark = this.toggleBookmark.bind(this);
        this.bookmark = this.bookmark.bind(this);
        this.unbookmark = this.unbookmark.bind(this);
    }

    toggleBookmark(ev) {
        console.log('toggleBookmark')
        if (this.props.bookmarkId) {
            this.unbookmark();
        } else {
            this.bookmark();
        }
    }

    bookmark() {
        console.log('bookmark');
        fetch('/api/bookmarks', {
            headers: getHeaders(),
            method: 'POST',
            body: JSON.stringify({post_id: this.props.postId})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.props.requeryPost();
        });
    }

    unbookmark() {
        console.log('unbookmark');
        fetch('/api/bookmarks/' + this.props.bookmarkId, {
            headers: getHeaders(),
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.props.requeryPost();
        });

    }

    render () {
        const bookmarkId = this.props.bookmarkId
        return (
            <button
                onClick={this.toggleBookmark}
                aria-checked={bookmarkId ? true : false}>
                <i className={bookmarkId ? 'fas fa-bookmark' : 'far fa-bookmark'}></i>                        
            </button>
        );
    }
}

export default BookmarkButton;
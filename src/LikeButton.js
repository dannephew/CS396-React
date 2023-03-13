import React from 'react';
import {getHeaders} from './utils';

class LikeButton extends React.Component {  

    constructor(props) {
        super(props);

        this.toggleLike = this.toggleLike.bind(this);
        this.like = this.like.bind(this);
        this.unlike = this.unlike.bind(this);
    }

    toggleLike(ev) {
        console.log('toggleLike')
        if (this.props.likeId) {
            this.unlike();
        } else {
            this.like();
        }
    }

    like() {    
        console.log('like');
        const postId = this.props.postId;
        fetch('/api/posts/likes', {
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

    unlike() {
        console.log('unlike');
        const likeId = this.props.likeId
        fetch('/api/posts/likes/' + likeId, {
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
        const likeId = this.props.likeId
        return (
            <button
                onClick={this.toggleLike}
                aria-checked={likeId ? true : false}>
                <i className={likeId ? 'fas fa-heart' : 'far fa-heart'}></i>                        
            </button>
        );
    }
}

export default LikeButton;
import React from 'react';
import {getHeaders} from './utils';

class LikeButton extends React.Component {  

    constructor(props) {
        super(props);
        //needs: whether or not currest post is liked
        //needs postId to know which post to like
        //therefore, Post.js embeds this into the LikeButton
        this.state = {
            likeId: this.props.likeId
        }
        this.toggleLike = this.toggleLike.bind(this);
        this.like = this.like.bind(this);
        this.unlike = this.unlike.bind(this);
    }

    toggleLike(ev) {
        if (this.props.likeId) {
            console.log('unlike');
            this.unlike();
        } else {
            console.log('like');
            this.like();
        }
    }

    like() {
        console.log('like the post');
        const postId = this.props.postId

        const postData = {
            post_id: postId
        };

        fetch('/api/posts/likes', {

            //pass in JWT token
            headers: getHeaders(),

            //converts a value to its JSON string representation
            //commonly used to convert JS objects, but can also pass in numbers and booleans, and they will also be turned into strings
            //JSON is always a string representation
            body: JSON.stringify(postData),
            method: "POST"
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            console.log("here's the data: ", data)
            console.log("in like function, in promise")

            //call the parent Component (Post's) function to requery post
            this.props.requeryPost()
        })
    }

    unlike() {
        console.log('code to unlike the post');
        const postId = this.props.postId
        const likeId = this.props.likeId
        // issue fetch request and then afterwards requery for the post:
        fetch('/api/posts/likes/' + likeId, {
            headers: getHeaders(),
            //DELETE doesn't need a body: JSON.stringify({}),
            method: "DELETE"
        })
        .then(response => response.json())
        .then(data => {
            console.log("unlike, data: ", data)
            this.props.requeryPost()
        })
    }

    //////////not redrawing, even though the data is all correct, and likeId 100% is no longer the same
    render () {
        const likeId = this.state.likeId;
        console.log("render(). likeId: ", likeId)
        console.log("this.props: ", this.props)
        //if there is a dependency on a piece of data, need the data. therefore, constructor must have likeId
        return (
            <button role="switch"
                className="like" 
                aria-label="Like Button" 
                aria-checked={this.state.likeId ? true : false}
                onClick={this.toggleLike}>
                <i className={this.state.likeId ? 'fas fa-heart' : 'far fa-heart'}></i>                        
            </button>
        ) 
    }
}

export default LikeButton;
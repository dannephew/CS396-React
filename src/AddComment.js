import React from 'react';
import {getHeaders} from './utils';

class AddComment extends React.Component {  

    constructor(props) {
        super(props);

        this.state = {text: ''};

        this.post = this.post.bind(this);
        this.updateText = this.updateText.bind(this)
    }

    updateText(e) {
        this.setState({text: e.target.value})
    }

    post(e) {    
        e.preventDefault();
        const postId = this.props.postId;
        const comment = this.state.text;
        console.log(comment);
        
        fetch('/api/comments', {
            headers: getHeaders(),
            method: 'POST',
            body: JSON.stringify({post_id: postId, text: comment})
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
            <form>
                <input type="text" placeholder="Add a comment..." onChange={this.updateText} >
                </input>
                <button onClick={(e) => {this.post(e)}}>
                    Post
                </button>
            </form>
        );
    }
}

export default AddComment;
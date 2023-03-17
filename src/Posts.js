import React from 'react';
import {getHeaders} from './utils.js'
import Post from './Post.js'

class Posts extends React.Component {  

    //fired when component is first created
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
        // constructor logic
        //('Posts component created, this is: ', this.state);
        this.getPosts()
    }

    getPosts() {
        fetch('/api/posts', {
            //reads JWT token from cookies
            headers: getHeaders()
        })
        .then(response => response.json())
        .then(data => {
            //console.log("fetched, in promise, here's data: ", data)
            
            //set state to trigger redraw
            this.setState({
                posts: data
            })
        })
    }
    //fired when component is injected into DOM
    componentDidMount() {
        // fetch posts
        //console.log('Posts component mounted');
    }
    
    //renders HTML
    render () {
        //console.log('Posts rendering', this.state)
        //iterate through each post, for each post, convert JSON to react component
        return (
            <div id="posts">
                {
                    this.state.posts.map(post => {
                        return <Post model={post} key={'post-' + post.id} />
                    })
                }
            </div>
        );   
    }
}

export default Posts;
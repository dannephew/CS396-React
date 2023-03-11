import React from 'react';
import {getHeaders} from './utils';
import LikeButton from './LikeButton';


class Post extends React.Component {  

    constructor(props) {
            //functional vs class react
        //JS classes: keyword "this" is contextual 
            //"this" is used in a different context in LikeButton
            //therefore, you should bind "this" when the constructor fires, so it permanently refers to instance of the class
        super(props);
        this.requeryPost = this.requeryPost.bind(this)
        console.log("in post.js constructor, this.props.model (JSON rep of post): ", this.props.model)

        this.state = {
            post: this.props.model,
            //model: this.props.model
        }
    }
    
    requeryPost() {
        //get a post with an updated data structure
        console.log("requeryPost()")
        fetch('/api/posts/' + this.props.model.id, {
            headers: getHeaders()
        })
        .then(response => response.json())
        .then(data => {
            console.log("Updated post: ", data)
            //after retrieving data, need to redraw the component
            this.setState({
                //must set post to data because post is the variable inside this.state that we update
                post: data
                //getting access to model through const post = this.state.post;
            })
        })
    }


    render () {
        // uses this.state.post, JSON rep of post, to populate the JSX variables
        //this.props.model vs this.state.model: 
        //props cannot be updated, whereas state can change
        
        //post = an actual post
        //this.state.post is defined in the constructor
        const post = this.state.post;
        //console.log("this.state.post: ", this.state.post)
        //console.log("this.state.model: ", this.state.model)
        if (!post) {
            return (
                <div>no post</div>  
            );
        }
        return (
            <section className="card">
                <div className="header">
                    <h3>{ post.user.username }</h3>
                    <i className="fa fa-dots"></i>
                </div>
                
                <img 
                    src={ post.image_url } 
                    alt={'Image posted by ' +  post.user.username } 
                    width="300" 
                    height="300" />
                
                <div className="info">
                    <div>
                        Additional data / controls go here...
                        <LikeButton 
                            likeId={post.current_user_like_id}
                            postId={post.id}
                            requeryPost={this.requeryPost}
                            // notify post to requery
                            // you can't see this data in the actual HTML
                            //these three data are part of this.props somehow
                        />

                    </div>
                    <p>{ post.caption }</p>
                </div>
            </section> 
        );     
    }
}

export default Post;
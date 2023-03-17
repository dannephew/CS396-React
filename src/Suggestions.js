import React from 'react';
import {getHeaders} from './utils'

class Suggestions extends React.Component {  

    constructor(props) {
        super(props);
        this.state = {
            stories: []
        }

        this.toggleFollow = this.toggleFollow.bind(this);
        this.follow = this.follow.bind(this);
        this.unfollow = this.unfollow.bind(this);
        // constructor logic
        this.getSuggestions()
    }

    getSuggestions() {
        fetch('/api/suggestions', {
            //reads JWT token from cookies
            headers: getHeaders(),
            // body: JSON.stringify({comment: })
        })
        .then(response => response.json())
        .then(data => {
            
            //set state to trigger redraw
            this.setState({
                stories: data
            })
        })
    }

    toggleFollow(ev) {
        console.log('toggleFollow')
        if (this.props.followId) {
            this.unfollow();
        } else {
            this.follow();
        }
    }

    follow() {
        console.log('follow');
        fetch('/api/following/', {
            headers: getHeaders(),
            method: 'POST',
            body: JSON.stringify({user_id: this.props.userId})
        })
        .then(response => console.log(response))
        .then(data => {
            console.log(data);
            this.props.requeryPost();
        });
    }

    unfollow() {
        console.log('unfollow');
        fetch('/api/following/' + this.props.followId, {
            headers: getHeaders(),
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.props.requeryPost();
        });

    }

    componentDidMount() {
        // fetch posts
    }

    render () {
        console.log('suggestions rendering', this.state)
        const followId = this.props.followId
        return (
            <div className='suggestionsbox'>
                <header className="suggestions">
                <h3>Suggestions for you</h3>
                    {
                        this.state.stories.map(suggestion => {
                            return <div className='suggestions-prop' key={suggestion.id}>
                                <img className="pfps"
                                src={suggestion.image_url}
                                width="40"
                                height="40" />
                                <div className='suggestion-words'>
                                    {suggestion.username + ' '} <br></br>
                                    <small>Suggested for you</small>
                                </div>
                                <button
                                    onClick={this.toggleFollow}
                                    aria-checked={followId ? true : false}>
                                    {followId ? 'unfollow' : 'follow'}                
                                </button>
                            </div>
                        })
                    }
                </header>
            </div>
        );
    }
}

export default Suggestions;
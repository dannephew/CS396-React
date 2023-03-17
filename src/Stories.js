import React from 'react';
import {getHeaders} from './utils.js'


class Stories extends React.Component {  


    constructor(props) {
        super(props);
        this.state = {
            stories: []
        }
        // constructor logic
        this.getStories()
    }

    getStories() {
        fetch('/api/stories', {
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

    componentDidMount() {
        // fetch posts
    }

    render () {
        return (
            <div>
                <header className="stories">
                {
                    this.state.stories.map(story => {
                        return <div key={story.user.username}>
                            <img className="pfps"
                            src={story.user.image_url}
                            width="50"
                            height="50" />
                            <small>{story.user.username + ' '}</small>
                        </div>
                    })
                }
                </header>
            </div>
        );
    }
}

export default Stories;
import React from 'react';
import { getHeaders } from './utils';

class Profile extends React.Component {  

    constructor(props) {
        super(props);
        this.state = {
            profile: 0
        }

        this.getProfile()
    }

    getProfile() {
        fetch('/api/profile', {
            //reads JWT token from cookies
            headers: getHeaders(),
            // body: JSON.stringify({comment: })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            //set state to trigger redraw
            this.setState({
                profile: data
            })
        })
    }

    componentDidMount() {
        // fetch posts
    }
    

    render () {
        return (
            
            <header className='profileheader'>
                <div className='profile-test-2'>
                    <img className='pfps-2'
                        src={this.state.profile.image_url}
                        width="55"
                        height="55" />
                    <h1 className='profile-test'>{this.state.profile.username}</h1>
                </div>
            </header>  
        );
    }
}

export default Profile;
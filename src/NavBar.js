import React from 'react';

class NavBar extends React.Component {  

    constructor(props) {
        super(props);
        // constructor logic
        this.state = {
            user: null,
            //model: this.props.model
        }
        //console.log('NavBar component created');
    }

    componentDidMount() {
        // fetch posts
        //console.log('NavBar component mounted');
        this.getName()
    }

    getName() {
        //console.log("test")
        fetch('/api/profile')
        .then((response) => response.json())
        .then((data) => {
            //console.log(data)
            this.setState({user: data})}
        );

    }

    render () {
        //must pass title and username property
        return (
            <nav className="main-nav">
                <h1>{this.props.title}</h1>
                <ul>   
                    <li><a href="https://photo-app-secured.herokuapp.com/api">API Docs</a></li>
                    <li><span>{this.state.user ? this.state.user.username : ''}</span></li>
                    <li><a href="/logout">Sign out</a></li>
                </ul> 
            </nav>       
        );
    }
}

export default NavBar;
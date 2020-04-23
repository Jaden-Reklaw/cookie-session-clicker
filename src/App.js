import React, { Component } from 'react';
import axios from 'axios';

//Utility function -- looks at all the cookies for this page and gives you the one requested
const getCookie = (cookieName) => {
  // Get name followed by anything except a semicolon
  const cookieString = RegExp('' + cookieName + '[^;]+').exec(document.cookie);
  // Return everything after the equal sign, or an empty string if the cookie name not found
  return decodeURIComponent(!!cookieString ? cookieString.toString().replace(/^[^=]+./, '') : '');
}

class App extends Component {
  state = {
    clickCount: getCookie('count') || 0,
    username: getCookie('username') || '',
    usernameIsEditable: false,
  }


  handleChange = (event) =>{
    const name = event.target.value;
    console.log ('in handleChange', event.target.value);    
    document.cookie = `username=${name}`;
    this.setState({
       username: name
    });
  }

  // Adding a click means adding to the number that lives on the server
  // We'll POST here
  handleClick = () => {

    const newCount = Number(this.state.clickCount) + 1;

    // This is making a cookie called count with the newCount amount
    // It will replace anything called count
    this.setState({
      clickCount: newCount,
    });

    axios.post('/add-click')
      .then(() => this.getCount())
      .catch(error => {
        console.log('error making add click post', error);
      });
  }


  // Our actual count lives on the server in a session. 
  // We need to GET that count
  getCount = () => {
    axios.get('/get-clicks')
      .then(response => {
        this.setState({
          clickCount: response.data.totalClicks,
        });
      })
      .catch(error => {
        console.log('error making add click post', error);
      });
  }

  editUsername = () => {
    this.setState({
      usernameIsEditable: true,
    });
  }

  saveUsername = () => {
    console.log( 'in saveUsername', this.state.username);
    

    this.setState({
      usernameIsEditable: false,
    });

    axios.post('/add-user', {username: this.state.username})
      .then(() => this.getUser())
      .catch(error => {
        console.log('error making add click post', error);
      });
  }

  getUser = () => {
    console.log ('in getUser');
    axios.get('/get-user')
      .then(response => {
        this.setState({
          username: response.data.userName,
        });
      })
      .catch(error => {
        console.log('error on user GET', error);
      });

  }

  render() {
    return (
        <div>
          <center>
            <h1>Click the Cookie!!</h1>
            <p>
              Username:
            {/* Username should go here */}
              {/* The next block of code is conditional rendering.
            Look at the documentation https://reactjs.org/docs/conditional-rendering.html
            if this is new to you. */}
              {/* 
              This conditional rendering is using a `ternary` operator. It works like an if/else block.
              The part at the front is being evaluated. The `?` starts the conditions. 
              The first condition is what will be done if true.
              The `:` breaks into the else block.
              
              Rewritten as if/else:
              ```
              let buttonToShow;
              if(this.state.usernameIsEditable) {
                buttonToShow = <button onClick={this.saveUsername}>Save Username</button>
              } else {
                buttonToShow = <button onClick={this.editUsername}>Edit Username</button>
              }
              ```

            */}
              {this.state.usernameIsEditable ?
                <>
                  <input value={this.state.username} onChange={(event) => this.handleChange(event)}></input>
                  <button onClick={this.saveUsername}>Save Username</button>
                </>
                :
                <>                  
                  <span> {this.state.username}</span>
                  <button onClick={this.editUsername}>Edit Username</button>
                </>
            }
            </p>
            <p>{this.state.clickCount}</p>
            <span
              role="img"
              aria-label="cookie"
              style={{ fontSize: '100px', cursor: 'pointer' }}
              onClick={this.handleClick}
            >
              🍪
          </span>
          </center>
        </div>
    );
  }
}

export default App;

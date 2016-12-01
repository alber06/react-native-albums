import React, { Component } from 'react';
import { View, Button } from 'react-native';
import firebase from 'firebase';
import { Header, Spinner } from './components/common';
import LoginForm from './components/LoginForm';
import AlbumList from './components/AlbumList';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
      firebase.initializeApp({
        apiKey: 'AIzaSyANZ_WSXjF3ktrgzrBNT7H6f8JLbBINPzg',
        authDomain: 'albums-f1032.firebaseapp.com',
        databaseURL: 'https://albums-f1032.firebaseio.com',
        storageBucket: 'albums-f1032.appspot.com',
        messagingSenderId: '231794048234'
      });

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({ loggedIn: true });
        } else {
          this.setState({ loggedIn: false });
        }
      });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return <AlbumList />;
      case false:
        return <LoginForm />;
      default:
        return (
          <View style={styles.spinnerStyle}>
            <Spinner />
          </View>
        );
    }
  }

  renderButton() {
    if (this.state.loggedIn) {
      return <Button title="Log out" onPress={() => firebase.auth().signOut()} />;
    }
  }

 render() {
   return (
     <View>
       <Header headerText='Albums' renderButton={this.renderButton.bind(this)} />
       {this.renderContent()}
     </View>
   );
 }
}

const styles = {
  spinnerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default App;

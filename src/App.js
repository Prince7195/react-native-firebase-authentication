/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';

import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

export default class App extends Component {
  state = {
    loggedIn: null
  }

  componentWillMount() {
    firebase.initializeApp('firebase-database-config-object-here');

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
        return (<CardSection>
                  <Button onPress={() => firebase.auth().signOut()}>
                    Log Out
                  </Button>
                </CardSection>);
      case false:
        return <LoginForm />;
      default: 
        return (<CardSection>
                  <Spinner size='large' />
                </CardSection>);
    }
  }

  render() {
    return (
      <View>
        <Header headerText='Authentication' />
        {this.renderContent()}
      </View>
    );
  }
}

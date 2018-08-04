import React, { Component } from 'react';
import Tree from '../containers/tree'
import Stats from '../containers/stats'

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>THE AVIDBOT DEMO </h1>
        <div>
          <Tree/>
          <Stats/>
        </div>
      </div>
    );
  }
}

import React, {Component} from 'react';
import Tree from 'react-d3-tree';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {selectAcc} from '../actions/index';
import Data from '../data/data.json';


class tree extends Component {
  constructor(props){
    super(props);
    this.onNodeClick = this.onNodeClick.bind(this);
    this.state = {data:[
      {
        "attributes":{
        "id": 1 ,
        "parent": 0
      },
      "name": "account1",
        "children" : [
            {
            "attributes":{
              "id": 2 ,
              "parent": 1
            },
          "name": "account2",
             "children" : [
                {"attributes" : {"id": 5 , "parent": 2 }, "name": "account5"},
                {"attributes": {"id": 6 , "parent": 2 }, "name": "account6"}
             ]
           },
           {
             "attributes":{
               "id": 3 ,
               "parent": 1
              }
             ,
             "name": "account3",
             "children" : [
               {"attributes":{"id": 7 , "parent": 3} , "name": "account7"},
               {"attributes":{"id": 8 , "parent": 3} , "name": "account8"}
             ]
           },
           {
             "attributes":{
              "id": 4 ,
              "parent": 1
              },
              "name": "account4",
              "children" : [
                {"attributes":{"id": 9 , "parent": 4} , "name": "account9"},
                {"attributes":{"id": 10,  "parent": 4} , "name": "account10"}
              ]
           }
        ]
      }
    ]
 }};

 // pass selected acc number to reducer
 onNodeClick(info){
   this.props.selectAcc(info);
 }
// render tree
  render(){
    var pos = {x:40, y: 200};
    return(
      <div id="treeWrapper" style={{width:'40em'}, {height:'30em'}}>
        <Tree data={this.state.data}
         pathFunc={"straight"}
         initialDepth={0}
         zoom={1}
         onClick={(nodeData,e)=> this.onNodeClick(nodeData.attributes.id)}
         translate={pos}
          />
      </div>
    );
  }
}
//dispatch to reducer
function mapDispatchToProps(dispatch) {
  return bindActionCreators({selectAcc: selectAcc} , dispatch)
}

export default connect(null, mapDispatchToProps)(tree);

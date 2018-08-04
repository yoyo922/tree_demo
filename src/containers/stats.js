import React, {Component} from 'react';
import Tree from 'react-d3-tree';
import {connect} from 'react-redux';


class stats extends Component {
  constructor(props){
    super(props);
    this.state = { data:[],
      totalArea: 0,
      totalTime: 0,
      productivity: 0,
      accNumber: "N/A",
      tree:[
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
    };
    this.genarateStats = this.genarateStats.bind(this);
    this.calculateStats = this.calculateStats.bind(this);
  };
  //function to genarate 100 cleans
  genarateStats(){
    var accNumber;
    var robot;
    var area;
    var time;
    var statsArray = [];
    for(var i =0; i<100; i++){
      accNumber = Math.floor((Math.random() *10) + 1);
      robot = Math.floor((Math.random() *100) + 1);
      area = Math.floor((Math.random() *100) + 1);
      time = Math.floor((Math.random() *100) + 1);
      var statsOb = {aNumber:accNumber,
                     robotId:robot,
                     areaCleaned:area,
                     timeSpend:time};
      statsArray.push(statsOb);
     }
    this.setState({data:statsArray});
    console.log(statsArray);
  };
  //calculate statics
  calculateStats(){
    var calculated = {totalTime:0, totalArea:0, productivity:0};
    var treeData = this.state.tree;

    calculated = this.findNode(treeData[0],calculated);
    console.log(calculated);
    this.setState(
      {totalArea: calculated.totalArea,
       totalTime: calculated.totalTime,
       productivity: calculated.totalArea/calculated.totalTime,
       accNumber: this.props.activeAccount}
    );
  };
  //find the the selected account in the tree
  findNode(tree,data){
    if(parseInt(this.props.activeAccount) == parseInt(tree.attributes.id)){
      data = this.handleCalculation(data,tree);
    }else{
      if(tree.children){
        tree.children.forEach((element) =>{
          data = this.findNode(element,data)
          });
       }
     }
     return data;
   }
   // calculate data from the selected node and its child
  handleCalculation(data,tree){
    this.state.data.forEach((element) =>{
      if(element.aNumber == tree.attributes.id){
          data.totalTime = data.totalTime + element.timeSpend;
          data.totalArea = data.totalArea + element.areaCleaned;
        }
    })
    if(tree.children){
        tree.children.forEach((element) =>{
        data = this.handleCalculation(data,element);
        });
    }
    return data;
  }

  //render statics infomration at the bottem
  render(){
    if(!this.props.activeAccount){
      return <div>Select a Account first.</div>;
    }
    return(
        <div>
          <button className= "random" onClick={this.genarateStats}>Genarate Cleaning</button>
          <button className= "random" onClick={this.calculateStats}>Calculate</button>
          <li>Account: {this.state.accNumber}</li>
          <li>Total Area cleaned:{this.state.totalArea} </li>
          <li>Total Time: {this.state.totalTime} </li>
          <li>productivity: {this.state.productivity}</li>
      </div>
    );
  }
}
//reducucer to import account number form TREE
function mapStateToProps(state){
  return {
    activeAccount: state.activeAcc
  }
}

export default connect (mapStateToProps)(stats);
//export default stats;

  
import React,{useEffect} from 'react';
import './App.css';
import { Input} from 'antd';
import Bar from './component/square'
import BubbleSort from './algorithms/bubbleSort'
import axios from 'axios'

class App extends React.Component{
  state={
    array:[],
    inputValue:''
  }

  componentDidMount() {
    fetch("/array").then(response=>
      response.json().then(data=>{
        console.log(data)
        console.log(typeof(data))
        let newarray = data.slice() ;
        this.setState({
          array:newarray
        })
      }))
  }


  handleInputChange=(e)=>{
    this.setState({
      inputValue:e.target.value
    })
  }
  pushDataBtn=async()=>{
    const response =await fetch("/add_array", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.inputValue)
    });
    if (response.ok) {
      console.log("response worked!");
      this.setState({
        inputValue:'',
      })
    }
    fetch("/array").then(response=>
      response.json().then(data=>{
        console.log(data)
        console.log(typeof(data))
        let newarray = data.slice() ;
        this.setState({
          array:newarray
        })
      }))
  }
  clearDataBtn=async()=>{
    console.log(this.state.array)
    const response =await fetch("/clear_array", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.array)
    });
    if (response.ok) {
      console.log("response worked!");
      this.setState({
        inputValue:'',
      })
    }
    fetch("/array").then(response=>
      response.json().then(data=>{
        console.log(data)
        console.log(typeof(data))
        let newarray = data.slice() ;
        this.setState({
          array:newarray
        })
      }))
  }
  // =()=>{
  //   let newarray = []
  //   this.setState({
  //     inputValue:'',
  //     array:newarray
  //   })
  // }
  sortDataBtn=()=>{
    let array = this.state.array.slice();
    BubbleSort(array);
    this.setState({
      array:array
    })
  }

  render(){
      let circleDiv = this.state.array.map((value,index)=><Bar
      key={index}  
      data={value}
      />)
      return (
        <div className ="App">
          <h1>array visualization</h1>
          <h2>push number between 0 to 99</h2>
          <section>
            <Input
            className="inputData"
            value = {this.state.inputValue}
            onChange={this.handleInputChange} 
            />
            <button   
                className="pushBtn"
                onClick={()=>this.pushDataBtn()}
            >Push</button>
            <button 
                className="clearBtn"
                onClick={()=>this.clearDataBtn()}
            >Clear</button>
            <button 
                className="sortingBtn"
                onClick={()=>this.sortDataBtn()}
            >Sorting</button>
          </section>
          <section className="circle card container">
            {circleDiv}
          </section>
        </div>
      )
  }
}


export default App;
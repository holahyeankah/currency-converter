import React, {Component} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Converter from './Converter';
import '../App.css';

class App extends Component{
  constructor(props){
    super(props);
    this.state={}
  }
  

  render(){
        
    return(
      <div className="container align-self-center">
          <div className="row ">
              <div className="col-md-8 mt-5  mx-5">
                
                  <Converter/>
                          
              </div>

             </div>
         

             </div>
           )
             }
        }


export default App;

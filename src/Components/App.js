import React, {Component} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import Converter from './Converter';
import './styles/App.css';


class App extends Component{
  constructor(props){
    super(props);
    this.state={}
  }
  

  render(){
        
    return(
      <div className="container img align-self-center">
          <div className="row ">
              <div className="col-md-8 mx-5">
                
                  <Converter/>
                          
              </div>

             </div>
         

             </div>
           )
             }
        }


export default App;

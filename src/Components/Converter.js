import React, {Component} from 'react';
import './styles/Converter.css';
import axios from 'axios';

class Converter extends Component{
    constructor(props){
        super(props);
        this.state={
            currencies:[],
            amount:1,         
            convertedFrom:"EUR",
            convertedTo:"NGN",
            result:[],
            date:""
           
        }
    }

    componentDidMount(){
        this.fetchCurrency()
    }


    inputChange=(e)=>{
        const {amount} =this.state 
        if(isNaN(amount)){
            return
        }
        this.setState({amount:e.target.value})
    }

          fetchCurrency=()=>{
          const{amount, convertedFrom, convertedTo}=this.state;
          if(convertedFrom !== convertedTo){
        axios.get(`https://api.exchangerate.host/latest?base=${convertedFrom}`)
        .then(response=>{
            const currencyAr=["EUR"]
            for(const key in response.data.rates){
                currencyAr.push(key)               
            }
          const date=response.data.date;

          const result= (response.data.rates[convertedTo] * amount).toFixed(3)
          
          this.setState({currencies:currencyAr, result, date})     
        })

    }
    else{
        this.setState({result:"You can't convert same currency"})

    }
    }


    handleSwap=(e)=>{
        const convertedFrom =this.state.convertedFrom;
        const convertedTo =this.state.convertedTo
        e.preventDefault();
        this.setState({convertedTo: convertedFrom, 
        convertedFrom: convertedTo}, this.fetchCurrency)
    }
 
    handleChange=(e)=>{
        const{name, value}=e.target;
        this.setState({[name]: value}, this.fetchCurrency)
    }

    render(){
        const{currencies, amount, convertedFrom, convertedTo , result, date}=this.state

        return(    
        <div className="card card-body bg-light text-center mt-5">
            {convertedTo !== convertedFrom ?
            <div className="align-self-center ">
            <h5> {amount} <strong>{convertedFrom}</strong> is equivalent to</h5>
    
            <h5 className=" w-auto align-self-center case text-center text-light fw-bold p-2 rounded 
            bg-secondary">{result}</h5> 
            <p className="fw-bold fs-5">{convertedTo}</p> 
            <p className="fs-5"> As of <strong>{date}</strong></p>
            </div>
            : <div className="fw-bold fs-4 w-50 align-self-center alert alert-danger">
             {result}
             </div> }
                      
            <div className="row">
                
            <div className="col-md-12">
            <form className="form-inline mb-5 mt-5 d-flex justify-content-evenly ">
             <div> 
             <h5>Amount</h5> 
                                 
            <input className="text-center align-self-center " type="number" value={amount} onChange={this.inputChange}
             style={{height:"50px"}} className="form-control height "/>   
            <p className=" mt-5  mb-1">We use midmarket rates</p>                
              </div>  
             <div>
                 <h5>From</h5>
                <select  name="convertedFrom" value={convertedFrom} onChange={this.handleChange}
                 style={{height:"50px"}} className="form-select ">
                 {currencies.map((currency, i)=>(
                  <option key={i} value={currency}> {currency}</option>  ))}
                          
                 </select>
                 </div>
                 <div className="col-lg-2 col-md-2 col-sm-2 align-self-center">
                <h1 onClick={this.handleSwap} className="swap  text-primary border border-secondary 
                w-50 rounded-circle  text-dark light">&#8595;&#8593;</h1>
                 </div>
                   
                 <label>
                 <div className=" fw-bold fs-5">To</div> 
                 <select  name="convertedTo" value={convertedTo} onChange={this.handleChange} 
                 style={{height:"50px"}} className="form-select height form-select-md">
                        {currencies.map((currency, i)=>(
                  <option key={i} value={currency}> {currency}</option>))}
                                 
                  </select>
                  <p className="mt-5  p-2 bg-secondary w-auto text-white fw-bold rounded"
                     onClick={this.fetchCurrency}>Convert</p>  
                       
                    </label>  
                    
                    </form>
                   
                    </div>
                    </div>
    
        </div>
        )
    }
}

export default Converter
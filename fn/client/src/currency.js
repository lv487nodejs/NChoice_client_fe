import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware  } from 'redux';
import { Provider } from 'react-redux';


const BASE_URL = 'https://api.exchangeratesapi.io/latest'




// function CurrencyRow(){
//     return(
//         <div>
//             <select id = "currency">
//                 <option value = ''>{currencyOptions[0]}</option>
//                 <option value = ''>{currencyOptions[1]}</option>
//             </select>
//         </div>
//     )
// };


function App(){
    const product1 = {
        name : 'shooes',
        priceCurrency : 'EUR',
        price : 10
    };

        const product2 = {
        name : 't-short',
        priceCurrency : 'EUR',
        price : 56
    };



    const [currencyOptions, setCurrencyOptions] = useState([])


    useEffect(()=>{
        fetch(BASE_URL)
            .then(res=>res.json())
            .then(data=>{
                setCurrencyOptions([data.base, Object.keys(data.rates)[26]])
            })
    }, []);



    
    function reducer(state, action){
        switch(action.type){
            case 'CHANGE_CURRENCY':
                return {...state, price : action.payload()}                  
        }

        return state
    }


    const store = createStore(reducer)

    console.log(store.getState())



    const changeCurrency = {
        type : 'CHANGE_CURRENCY',
        payload : function(price = product1.price){
            return price * 5
        }
    }

    store.dispatch(product1 ,changeCurrency)

    console.log(store.getState())


    return(
        <>
            <select id = "currency">
                <option value = ''>{currencyOptions[0]}</option>
                <option value = ''>{currencyOptions[1]}</option>
            </select>
        </>    
        )
}

ReactDOM.render(<App/>, document.getElementById('root'));





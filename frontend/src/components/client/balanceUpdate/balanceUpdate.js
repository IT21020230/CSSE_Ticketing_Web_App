//require("dotenv").config();
import React, { useState, useContext, useEffect  } from 'react'
import { render } from 'react-dom'
import Styles from './Styles'
import { Form, Field } from 'react-final-form'
import Card from './Card'
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate
} from './cardUtils'
import axios from 'axios'
import { useAuthContext } from "../../../hooks/useAuthContext";


const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function BalanceUpdate() {
  const { user } = useAuthContext();
  const [balance, setBalance] = useState(0);
    const [rechargeAmount, setRechargeAmount] = useState('');

    const handleSubmitButton = async () => {
      console.log("kkkkkkkkkkkkkkkkkkkkk")
      await sleep(300);
      //window.alert(JSON.stringify(values, 0, 2));
      console.log("amountcsvwevwevwevwev")
      const amount = 78976;
      const source = "tok_visa"
      const description = "Passenger account recharge";
      const currency = "usd"
  

  await axios.post("http://localhost:9000/api/payment",{
    
    amount,
    source,
    description,
    currency
  }).then(async () => {

    await axios.put("http://localhost:9000/api/payment/updateAccountBalance",{
        userId: user.userId,
        amount

  })
   })
   console.log("jjjjjjjjjjjjjjjjjj")
    
  };

  useEffect(() => {

    axios.get("http://localhost:9000/api/payment/getCurrentAccountBalance",{

      params: {
      userId: user.userId
    }
    })
    .then((response) => {
      setBalance(response.data)
      console.log(response.data)

    })
    .catch((error) => {
      console.error(error);
    })
  }, [])

    
  
  
  
  const dummyFunction = async()=>{

    }
  
    


  return (
    <Styles>
        <div className="card">
          <h2>Your balance</h2>
          <p>${balance}</p>
          <div>
            <input
              type="text"
              placeholder="Enter your recharge amount"
              value={rechargeAmount}
              onChange={(e) => setRechargeAmount(e.target.value)}
            />
            
          </div>
        </div>
        <h1>Add your card details here</h1>
        <Form
          onSubmit={dummyFunction}
          render={({
            handleSubmit,
            form,
            submitting,
            pristine,
            values,
            active
          }) => (
            <form onSubmit={handleSubmit}>
              <Card
                number={values.number || ''}
                name={values.name || ''}
                expiry={values.expiry || ''}
                cvc={values.cvc || ''}
                focused={active}
              />
              <div>
                <Field
                  name="number"
                  component="input"
                  type="text"
                  pattern="[\d| ]{16,22}"
                  placeholder="Card Number"
                  format={formatCreditCardNumber}
                />
              </div>
              <div>
                <Field
                  name="name"
                  component="input"
                  type="text"
                  placeholder="Name"
                />
              </div>
              <div>
                <Field
                  name="expiry"
                  component="input"
                  type="text"
                  pattern="\d\d/\d\d"
                  placeholder="Valid Thru"
                  format={formatExpirationDate}
                />
                <Field
                  name="cvc"
                  component="input"
                  type="text"
                  pattern="\d{3,4}"
                  placeholder="CVC"
                  format={formatCVC}
                />
              </div>
              <div className="buttons">
                <button type="submit" disabled={submitting}
                onClick={handleSubmitButton}>
                  Submit
                </button>

                <button
                  type="button"
                  
                  disabled={submitting || pristine}
                >
                  Reset
                </button>
              </div>
            </form>
          )}
        />
      </Styles>
  );
}

export default BalanceUpdate;

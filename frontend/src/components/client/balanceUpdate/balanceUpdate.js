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
    const [isLoading, setIsLoading] = useState(false);
const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);


    const handleSubmitButton = async () => {
      setIsLoading(true); // Show loading overlay
      setIsPaymentSuccessful(false);
            
      const source = "tok_visa"
      const description = "Passenger account recharge";
      const currency = "usd"
  

  await axios.post("http://localhost:9000/api/payment",{
    
    amount: rechargeAmount,
    source,
    description,
    currency
  }).then(async () => {

    await axios.put("http://localhost:9000/api/payment/updateAccountBalance",{
        userId: user.userId,
        amount: parseFloat(rechargeAmount)

  })
   })
   await sleep(3000);
   // Update the state to indicate payment success
  setIsPaymentSuccessful(true);
  await sleep(2000);
  // Hide the loading overlay
  setIsLoading(false);
    
  };


  useEffect(() => {
    const fetchAccountBalance = async () => {
      try {
        const userId = user.userId; // Replace with the actual user ID
        const response = await fetch(`http://localhost:9000/api/payment/getCurrentAccountBalance/${userId}`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setBalance(data.accountBalance);
        console.log(data.accountBalance)
      } catch (error) {
        console.error(error);
       
      }
    };


    fetchAccountBalance();
    const intervalId = setInterval(fetchAccountBalance, 7000);
      
  },);

 
  const dummyFunction = async()=>{ }
  
  return (
    <Styles>
        <div className="card">
          <h2>Your balance</h2>
          <h3>Bus Currency: {balance}</h3>
          <div>
          <input
              type="text"
              placeholder="Enter your recharge amount"
              value={rechargeAmount}
              onChange={(e) => {
            // Use a regular expression to allow only numbers (0-9) and prevent other characters
            const sanitizedValue = e.target.value.replace(/[^0-9]/g, '');
            setRechargeAmount(sanitizedValue);
  }}
  style={{
    border: '2px solid #007BFF',
    borderRadius: '4px',
    padding: '8px',
    fontSize: '16px',
    width: '20%',
    boxShadow: '0 0 4px rgba(0, 123, 255, 0.3)',
  }}
/>


            
          </div>
        </div>
        {/* Loading overlay */}
        {isLoading && (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
    <div style={{ background: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
      <div className="loading-spinner"></div>
      {isPaymentSuccessful ? (
        <p>Payment Successful</p>
      ) : (
        <p>Processing Payment...</p>
      )}
    </div>
  </div>
)}


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
              <button
  type="submit"
  disabled={
    submitting ||
    pristine ||
    !values.number || // Check if the "number" field is empty
    !values.name || // Check if the "name" field is empty
    !values.expiry || // Check if the "expiry" field is empty
    !values.cvc // Check if the "cvc" field is empty
  }
  onClick={handleSubmitButton}
>
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

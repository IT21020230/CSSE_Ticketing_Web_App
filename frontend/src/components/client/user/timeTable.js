import React, { useState } from 'react';
import axios from 'axios'
import { Axios } from 'axios';
import "./spinnerStyles.css"

const cardStyle = {
    maxWidth: '600px', // Adjust the width as needed
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };


  
  const inputStyle = {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };
  
  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const loadingSpinnerStyle = {
    border: '5px solid #f3f3f3',
    borderTop: '5px solid #3498db',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 2s linear infinite', // Use the 'spin' animation keyframes
  };
  
  
  const spinKeyframes = {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  };
  



  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function TimeTable(){

    const [departurePlace, setDeparturePlace] = useState('');
    const [arrivalPlace, setArrivalPlace] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [fetchedData, setFetchedData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isFetchedData, setIsFetchedData] = useState(false);

    const handleDeparturePlaceChange = (e) => {
        setDeparturePlace(e.target.value);
      };
    
      const handleArrivalPlaceChange = (e) => {
        setArrivalPlace(e.target.value);
      };
    
      const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
      };
    
      const handleSubmit = async() => {
        setIsLoading(true);
        setIsFetchedData(false);
        
        console.log('Departure Place:', departurePlace);
        console.log('Arrival Place:', arrivalPlace);
        console.log('Selected Date:', selectedDate);

        try {
            const response = await axios.get(`http://localhost:9000/api/routes/findRoutes/${departurePlace}/${arrivalPlace}`);
        
            if (response.status === 200) {
              
              const responseData = response.data;
              console.log('Fetched data:', responseData);
              await sleep(2000);
              setFetchedData(responseData);
              setIsLoading(false);
        setIsFetchedData(true);
              
            } else {
              
            }
          } catch (error) {
            
            console.error('Error fetching data:', error);
          }
      };








return(

    <div className="container">
    <div className="card" style={cardStyle}>
      <div className="card-body">
        <h5 className="card-title">Fill in your details</h5>
        <div className="form-group row">
          <label className="col-sm-4 col-form-label">Departure Place:</label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              style={inputStyle}
              value={departurePlace}
              onChange={handleDeparturePlaceChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-4 col-form-label">Arrival Place:</label>
          <div className="col-sm-8">
            <input
              type="text"
              className="form-control"
              style={inputStyle}
              value={arrivalPlace}
              onChange={handleArrivalPlaceChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-4 col-form-label">Date:</label>
          <div className="col-sm-8">
            <input
              type="date"
              className="form-control"
              style={inputStyle}
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-12 text-center">
          <button
    className="btn btn-primary"
    style={buttonStyle}
    onClick={handleSubmit}
    disabled={!departurePlace || !arrivalPlace || !selectedDate}
  >
    Submit
  </button>
          </div>
        </div>

        {isLoading && (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
    <div style={{ background: 'white', padding: '20px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
      <div className="loading-spinner"></div>
      {isFetchedData ? (
        <p>Payment Successful</p>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  </div>
)}




        {fetchedData && (
  <div className="card" style={cardStyle}>
    <div className="card-body">
      <h5 className="card-title">Bus Details:</h5>
      <table className="table">
        <thead>
          <tr>
          <th style={{ padding: '5px' }}>Route Number</th>
          <th style={{ padding: '5px' }}>Departure Place</th>
          <th style={{ padding: '5px' }}>Departure Time</th>
          <th style={{ padding: '5px' }}>Arrival Place</th>
          
          <th style={{ padding: '5px' }}>Arrival Time</th>
          </tr>
        </thead>
        <tbody>
          {fetchedData.map((item, index) => (
            <tr key={index}>
              <td>{item.routeNumber}</td>
              <td>{departurePlace}</td>
              <td>{item.departureTime}</td> {/* Display the Departure Place */}
              <td>{arrivalPlace}</td>   {/* Display the Arrival Place */}
              
              <td>{item.arrivalTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)}

      </div>
    </div>
  </div>
)



    
}


export default TimeTable;
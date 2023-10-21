import React, { useState } from 'react';
import axios from 'axios'
import { Axios } from 'axios';

const cardStyle = {
    maxWidth: '400px',
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

function TimeTable(){

    const [departurePlace, setDeparturePlace] = useState('');
    const [arrivalPlace, setArrivalPlace] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [fetchedData, setFetchedData] = useState(null);

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
        
        console.log('Departure Place:', departurePlace);
        console.log('Arrival Place:', arrivalPlace);
        console.log('Selected Date:', selectedDate);

        try {
            const response = await axios.get(`http://localhost:9000/api/routes/findRoutes/${departurePlace}/${arrivalPlace}`);
        
            if (response.status === 200) {
              
              const responseData = response.data;
              console.log('Fetched data:', responseData);
        
              
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
            >
              Submit
            </button>
          </div>
        </div>

        {fetchedData && (
        <div className="card" style={cardStyle}>
          <div className="card-body">
            <h5 className="card-title">Fetched Data</h5>
            <table className="table">
              <thead>
                <tr>
                  <th>Route Number</th>
                  <th>Departure Time</th>
                  <th>Arrival Time</th>
                </tr>
              </thead>
              <tbody>
                {fetchedData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.routeNumber}</td>
                    <td>{item.departureTime}</td>
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
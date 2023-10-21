import React, { useState } from 'react';
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "../client/user/spinnerStyles.css"


function ViewBusJouneys(){
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

    const [selectedDate, setSelectedDate] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [journeyData, setJourneyData] = useState([]);
  const [showDataCard, setShowDataCard] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
    const [isFetchedData, setIsFetchedData] = useState(false);

  const districts = ['Colombo', 'Gampaha', 'Kandy', 'Galle', 'Nuwara Eliya', 'Kalutara', 'Matara', 'Kurunegala', 'Ratnapura', 'Jaffna', 'Hambantota', 'Badulla', 'Ampara'];

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  const handleSearch = async() => {
    setIsLoading(true);
        setIsFetchedData(false);
        setShowDataCard(false);

    try {
        const response = await axios.get(`http://localhost:9000/api/busJourney/getJourneys/${selectedDate}/${selectedDistrict}`);
    
        if (response.status === 200) {
          
          const responseData = response.data;
          console.log('Fetched data:', responseData);
          await sleep(1500);
          setJourneyData(responseData);
          setShowDataCard(true);
          setIsLoading(false);
        setIsFetchedData(true);
    
          
        } else {
          
        }
      } catch (error) {
        
        console.error('Error fetching data:', error);
      }
    
  };

  const cardStylee = {
    maxWidth: '600px', // Adjust the width as needed
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };

  const cardStyleee = {
    maxWidth: '1000px', // Adjust the width as needed
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  }
  
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


   return(
    

<div className="container">
<div className="card" style={cardStylee}>
  <div className="card-body">
    <h5 className="card-title">Fill in your details</h5>
    <div className="form-group row">
      <label className="col-sm-4 col-form-label">District:</label>
      <div className="col-sm-8">
        <select
          className="form-control"
          style={inputStyle}
          value={selectedDistrict}
          onChange={handleDistrictChange}
        >
          <option value="">Select District</option>
          {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>
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
          onClick={handleSearch}
          disabled={!selectedDistrict || !selectedDate}
        >
          Submit
        </button>
      </div>
    </div>
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


{showDataCard && (
        <div className="card" style={cardStyleee}>
          <div className="card-body">
            <h5 className="card-title">Journey Data</h5>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Bus Route</TableCell>
            <TableCell >Start Time</TableCell>
            <TableCell align="right">End Time</TableCell>
            <TableCell align="right">Distance</TableCell>
            <TableCell align="right">Districts traveled</TableCell>
            <TableCell align="right">Passenger Count</TableCell>
            <TableCell align="right">Total Earnings</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {journeyData.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.routeNumber}
              </TableCell>
              <TableCell >{row.startTime}</TableCell>
              <TableCell align="right">{row.endTime}</TableCell>
              <TableCell align="right">{row.distance}</TableCell>
              <TableCell align="right">{row.districts.join(', ')}</TableCell>
              <TableCell align="right">{row.passengerCount}</TableCell>
              <TableCell align="right">{row.totalEarning}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          </div>
        </div>
      )}
</div>



   )


}


export default ViewBusJouneys;
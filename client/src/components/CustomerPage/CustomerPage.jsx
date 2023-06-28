import React, { useState } from 'react';
import { CreateCustomer } from '../../Service';
import './customerpage.css';

const CustomerPage = () => {
  const [OrderDate, setOrderDate] = useState('');
  const [Company, setCompany] = useState('');
  const [Owner, setOwner] = useState('');
  const [Item, setItem] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [Weight, setWeight] = useState('');
  const [RequestForShipment, setRequestForShipment] = useState('');
  const [TrackingId, setTrackingId] = useState('');
  const [ShipmentSize, setShipmentSize] = useState('');
  const [BoxCount, setBoxCount] = useState('');
  const [Specification, setSpecification] = useState('');
  const [ChecklistQuantity, setChecklistQuantity] = useState('');

const userdata=localStorage.getItem('userData')
  const parsedData = JSON.parse(userdata);
  const userID=parsedData.email;

  const handleSubmit = async(e) => {
    e.preventDefault();

    const customerData = {
      OrderDate,
      Company,
      Owner,
      Item,
      Quantity,
      Weight,
      RequestForShipment,
      TrackingId,
      ShipmentSize,
      BoxCount,
      Specification,
      ChecklistQuantity,
      userID
    };
    // console.log(customerData)
const response= await CreateCustomer(customerData)
console.log(response)
    // Clear the form fields after submission
    setOrderDate('');
    setCompany('');
    setOwner('');
    setItem('');
    setQuantity('');
    setWeight('');
    setRequestForShipment('');
    setTrackingId('');
    setShipmentSize('');
    setBoxCount('');
    setSpecification('');
    setChecklistQuantity('');
   
  };

  return (
    <div className="customer-page">
      <h1>Customer Page</h1>
      <form onSubmit={handleSubmit}  className="customer-form">
        <label>Order Date</label>
        <input
          type="date"
          placeholder="Order Date"
          value={OrderDate}
          onChange={(e) => setOrderDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Company"
          value={Company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          type="text"
          placeholder="Owner"
          value={Owner}
          onChange={(e) => setOwner(e.target.value)}
        />
        <input
          type="text"
          placeholder="Item"
          value={Item}
          onChange={(e) => setItem(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={Quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          type="number"
          placeholder="Weight"
          value={Weight}
          onChange={(e) => setWeight(e.target.value)}
        />
    
            <select
            value={RequestForShipment}
            onChange={(e) => setRequestForShipment(e.target.value)}
            >
            <option value="">Select Option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            </select>
       
        <input
          type="text"
          placeholder="Tracking ID"
          value={TrackingId}
          onChange={(e) => setTrackingId(e.target.value)}
        />
        <input
          type="number"
          placeholder="Shipment Size"
          value={ShipmentSize}
          onChange={(e) => setShipmentSize(e.target.value)}
        />
        <input
          type="number"
          placeholder="Box Count"
          value={BoxCount}
          onChange={(e) => setBoxCount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Specification"
          value={Specification}
          onChange={(e) => setSpecification(e.target.value)}
        />
        <input
          type="number"
          placeholder="Checklist Quantity"
          value={ChecklistQuantity}
          onChange={(e) => setChecklistQuantity(e.target.value)}
        />
   

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CustomerPage;

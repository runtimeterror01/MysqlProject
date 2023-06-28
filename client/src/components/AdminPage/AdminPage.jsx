import React, { useEffect, useState } from 'react';
import { getAllCustomerData } from '../../Service';
import './adminpage.css'

const AdminPage = () => {
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCustomerData();
        console.log(response.data);
        setAllData(response.data);
      } catch (error) {
        console.error('Error fetching customer data: ', error);
      }
    };
    fetchData();
  }, []);

  const totalQuantity = allData.reduce((total, data) => total + data.Quantity, 0);
  const totalWeight = allData.reduce((total, data) => total + data.Weight, 0);
  const totalBoxCount = allData.reduce((total, data) => total + data.BoxCount, 0);

  return (
    <div className="admin-page">
      <table className="customer-table">
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>User ID</th>
            <th>Order Date</th>
            <th>Company</th>
            <th>Owner</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Weight</th>
            <th>Request for Shipment</th>
            <th>Tracking ID</th>
            <th>Shipment Size</th>
            <th>Box Count</th>
            <th>Specification</th>
            <th>Checklist Quantity</th>
          </tr>
        </thead>
        <tbody>
          {allData.map((data, index) => (
            <tr key={data.id}>
              <td>{index + 1}</td>
              <td>{data.userID}</td>
              <td>{data.OrderDate}</td>
              <td>{data.Company}</td>
              <td>{data.Owner}</td>
              <td>{data.Item}</td>
              <td>{data.Quantity}</td>
              <td>{data.Weight}</td>
              <td>{data.RequestForShipment}</td>
              <td>{data.TrackingId}</td>
              <td>{data.ShipmentSize}</td>
              <td>{data.BoxCount}</td>
              <td>{data.Specification}</td>
              <td>{data.ChecklistQuantity}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="6">Total</td>
            <td>{totalQuantity}</td>
            <td>{totalWeight}</td>
            <td colSpan="3"></td>
            <td>{totalBoxCount}</td>
            <td colSpan="2"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;

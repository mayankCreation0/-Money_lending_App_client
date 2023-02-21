import React, { useContext } from 'react'
import { context } from '../AuthContext/context'

function Dashboard() {
  const { store } = useContext(context);
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  let lastMonthCustomers = 0;

  store.forEach(customer => {
    const customerDate = new Date(customer.registrationDate);
    if (
      customerDate.getMonth() === currentMonth - 1 &&
      customerDate.getFullYear() === currentYear
    ) {
      lastMonthCustomers += 1;
    }
  });

  const MoMChange = store.length - lastMonthCustomers;

  return (
    <div>
    <p style={{font:'70px',fontWeight:'800'}}>Page is underConstruction</p>
      Dashboard: {store.length} ({MoMChange > 0 ? "+" : ""}
      {MoMChange} MoM)
    </div>
  );
}




export default Dashboard
  
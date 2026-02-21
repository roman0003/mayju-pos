import { useEffect, useState } from "react";
import axios from "axios";
 
function Sales() {
  const [bills, setBills] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
 
  const token = localStorage.getItem("token");
 
  useEffect(() => {
    fetchBills();
  }, []);
 
  const fetchBills = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/bills",
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    setBills(res.data);
  };
 
  const viewBill = async (id) => {
    const res = await axios.get(
      `http://localhost:5000/api/bills/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    setSelectedBill(res.data);
  };
 
  return (
    <div className="flex h-screen">
 
      {/* Bill List */}
      <div className="w-1/3 border-r p-6 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Sales History</h2>
 
        {bills.map(bill => (
          <div
            key={bill.id}
            className="border p-3 mb-2 cursor-pointer hover:bg-gray-100"
            onClick={() => viewBill(bill.id)}
          >
            <p>Bill #{bill.id}</p>
            <p>₹ {bill.totalAmount}</p>
          </div>
        ))}
      </div>
 
      {/* Bill Details */}
      <div className="w-2/3 p-6">
        {selectedBill ? (
          <>
            <h2 className="text-2xl font-bold mb-4">
              Bill #{selectedBill.id}
            </h2>
 
            {selectedBill.BillItems?.map(item => (
              <div key={item.id} className="flex justify-between mb-2">
                <span>
                  {item.Product?.name} x {item.quantity}
                </span>
                <span>
                  ₹ {item.price * item.quantity}
                </span>
              </div>
            ))}
 
            <hr className="my-4" />
 
            <h3 className="font-bold">
              Total: ₹ {selectedBill.totalAmount}
            </h3>
          </>
        ) : (
          <p>Select a bill to view details</p>
        )}
      </div>
 
    </div>
  );
}
 
export default Sales;
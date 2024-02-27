import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  RiShoppingCartLine,
  RiBoxingLine,
  RiTruckLine,
  RiProductHuntLine,
  RiArrowRightSLine,
  RiMoneyDollarCircleLine,
} from "react-icons/ri";

const SellerDashboard = () => {
  // State variables to store key metrics
  const [totalOrders, setTotalOrders] = useState(0);
  const [completedOrders, setCompletedOrders] = useState(0);
  const [ordersYetToDispatch, setOrdersYetToDispatch] = useState(0);
  const [shippedOrders, setShippedOrders] = useState(0);
  const [activeProducts, setActiveProducts] = useState(0);
  const [outOfStockProducts, setOutOfStockProducts] = useState(0);
  const [lowStockProducts, setLowStockProducts] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    // Simulated API call or data retrieval
    // You may replace this with actual API calls
    // Here, I'm using setTimeout to simulate async behavior
    const fetchData = () => {
      const data = {
        totalOrders: 0,
        completedOrders: 0,
        ordersYetToDispatch: 0,
        shippedOrders: 0,
        activeProducts: 0,
        outOfStockProducts: 0,
        lowStockProducts: 0,
        totalRevenue: 0,
      };

      setTotalOrders(data.totalOrders);
      setCompletedOrders(data.completedOrders);
      setOrdersYetToDispatch(data.ordersYetToDispatch);
      setShippedOrders(data.shippedOrders);
      setActiveProducts(data.activeProducts);
      setOutOfStockProducts(data.outOfStockProducts);
      setLowStockProducts(data.lowStockProducts);
      setTotalRevenue(data.totalRevenue);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white h-5/6 py-2 px-2 flex">
      <div className="flex flex-col space-y-6 justify-items-start">
      <Link to="/edit-store"><button className="button-blue h-7 w-auto m-2 text-black-700 hover:text-red-500 font-medium hover:underline">
          Edit Store
        </button></Link>
        <Link to="/edit-address"><button className="button-blue h-7 w-auto m-2 text-black-700 hover:text-red-500 font-medium hover:underline">
          Edit Address
        </button></Link>
        <Link to="/edit-contact"><button className="button-blue h-7 w-auto m-2 text-black-700 hover:text-red-500 font-medium hover:underline">
          Edit Contact
        </button></Link>
        <Link to="/upload-image"><button className="button-blue h-7 w-auto m-2 text-black-700 hover:text-red-500 font-medium hover:underline">
          Update/Add Logo
        </button></Link>
        <Link to="/add-product"><button className="button-blue h-7 w-auto m-2 text-black-700 hover:text-red-500 font-medium hover:underline">
          Add Product
        </button></Link>
      </div>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Seller Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/total-orders"
            className="dashboard-item bg-white p-6 rounded-lg shadow-md flex items-center justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
              <p className="text-gray-600">
                View overall total count of orders
              </p>
            </div>
            <div className="flex items-center">
              <span className="text-4xl text-blue-500">{totalOrders}</span>
              <RiShoppingCartLine className="ml-2" />
            </div>
          </Link>

          <Link
            to="/completed-orders"
            className="dashboard-item bg-white p-6 rounded-lg shadow-md flex items-center justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold mb-2">Completed Orders</h3>
              <p className="text-gray-600">
                View total count of completed orders
              </p>
            </div>
            <div className="flex items-center">
              <span className="text-4xl text-green-500">{completedOrders}</span>
              <RiBoxingLine className="ml-2" />
            </div>
          </Link>

          <Link
            to="/orders-yet-to-dispatch"
            className="dashboard-item bg-white p-6 rounded-lg shadow-md flex items-center justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Orders Yet to Dispatch
              </h3>
              <p className="text-gray-600">
                View total count of orders yet to dispatch
              </p>
            </div>
            <div className="flex items-center">
              <span className="text-4xl text-yellow-500">
                {ordersYetToDispatch}
              </span>
              <RiTruckLine className="ml-2" />
            </div>
          </Link>

          <Link
            to="/shipped-orders"
            className="dashboard-item bg-white p-6 rounded-lg shadow-md flex items-center justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold mb-2">Shipped Orders</h3>
              <p className="text-gray-600">
                View total count of shipped orders
              </p>
            </div>
            <div className="flex items-center">
              <span className="text-4xl text-purple-500">{shippedOrders}</span>
              <RiArrowRightSLine className="ml-2" />
            </div>
          </Link>

          <Link
            to="/active-products"
            className="dashboard-item bg-white p-6 rounded-lg shadow-md flex items-center justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold mb-2">Active Products</h3>
              <p className="text-gray-600">
                View total count of active products
              </p>
            </div>
            <div className="flex items-center">
              <span className="text-4xl text-red-500">{activeProducts}</span>
              <RiProductHuntLine className="ml-2" />
            </div>
          </Link>

          <Link
            to="/out-of-stock-products"
            className="dashboard-item bg-white p-6 rounded-lg shadow-md flex items-center justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Out of Stock Products
              </h3>
              <p className="text-gray-600">
                View total count of out of stock products
              </p>
            </div>
            <div className="flex items-center">
              <span className="text-4xl text-gray-500">
                {outOfStockProducts}
              </span>
              <RiProductHuntLine className="ml-2" />
            </div>
          </Link>

          <Link
            to="/low-stock-products"
            className="dashboard-item bg-white p-6 rounded-lg shadow-md flex items-center justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold mb-2">Low Stock Products</h3>
              <p className="text-gray-600">
                View total count of low stock products
              </p>
            </div>
            <div className="flex items-center">
              <span className="text-4xl text-pink-500">{lowStockProducts}</span>
              <RiProductHuntLine className="ml-2" />
            </div>
          </Link>

          <Link
            to="/total-revenue"
            className="dashboard-item bg-white p-6 rounded-lg shadow-md flex items-center justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
              <p className="text-gray-600">View overall total revenue in $</p>
            </div>
            <div className="flex items-center">
              <span className="text-4xl text-yellow-500">{totalRevenue}</span>
              <RiMoneyDollarCircleLine className="ml-2" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;

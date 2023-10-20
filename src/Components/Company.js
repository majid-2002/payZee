import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { EthersContext } from "../Context/EthersContext";
import "../Styles/Company.css";
import Loader from "./Loader";
import { ethers } from "ethers";

function Company() {
  const {
    getEmployeeList,
    calculateTotalSalary,
    removeEmployee,
    payEmployees,
    getName,
    setEmpWallet,
  } = useContext(EthersContext);
  const [Loaded, setLoaded] = useState(false);
  const [TotalSal, setTotalSal] = useState(0);
  const [EmpList, setEmpList] = useState([]);
  const [Name, setName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    initiator();
  }, []);
  const initiator = async () => {
    setLoaded(false);
    const emp_list = await getEmployeeList();
    const totalSal = await calculateTotalSalary();
    const name = await getName();
    console.log(emp_list);
    if (totalSal) setTotalSal(totalSal);
    if (emp_list) setEmpList(emp_list);
    if (name) setName(name);
    setLoaded(true);
  };

  const intiateTransactions = async () => {
    setLoaded(false);
    await payEmployees();
    setLoaded(true);
  };
  if (Loaded)
    return (
      <div className="emp_main">
        <Row>
          <Col sm={12} lg={5} md={12} className="probox">
            <div className="pro_box">
              <div className="cmp_box bg-white rounded-md p-4 shadow-md flex flex-col gap-y-4">
                <div className="cmp_name text-4xl font-semibold text-dark">
                  {Name}
                </div>
                <div className="flex gap-x-3 mt-3 flex-row justify-center">
                  <div className="bg-blue-400 p-4 rounded-lg w-full">
                    <div className="text-sm text-dark">No. of Employees:</div>
                    <div className="text-2xl text-dark">{EmpList.length}</div>
                  </div>
                  <div className="bg-blue-400 p-4 rounded-lg w-full">
                    <div className="text-sm text-dark">Total Salary</div>
                    <div className="text-2xl text-white font-normal">
                      {TotalSal} AVAX
                    </div>
                  </div>
                </div>
                <div className="flex-col flex">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-3 text-xl shadow-md"
                    onClick={intiateTransactions}
                  >
                    Distribute Salary
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-3 mt-2 text-xl shadow-md"
                    onClick={() => navigate("/addemployees")}
                  >
                    Add Employees
                  </button>
                  <button
                    className="bg-blue-500 hover-bg-blue-600 text-white rounded-lg p-3 mt-2 text-xl shadow-md"
                    onClick={() => navigate("/transactions")}
                  >
                    View Transaction History
                  </button>
                </div>
              </div>
            </div>
          </Col>

          <Col sm={12} lg={7} md={12}>
            <div className="text-white text-4xl my-5 ml-2 font-bold">
              Employees
            </div>

            <div className="p-6">
              {/* Iterating part */}
              {EmpList.map((employee, index) => {
                let etherValue = ethers.utils.formatEther(employee.salary);
                return (
                  <div className="flex text-xl bg-white rounded-md shadow-md py-2 mb-3 w-full">
                    <div className="text-dark font-bold w-6 p-2">{index + 1}</div>
                    <div className=" text-gray-800  p-2">{employee.name}</div>
                    <div className="emp_sal text-green-400 p-2">
                      {etherValue} AVAX
                    </div>
                    <div className="ml-auto mr-3 space-x-4">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2 font-semibold shadow-md"
                        onClick={() => {
                          setEmpWallet(employee.wallet);
                          navigate("/changesalary");
                        }}
                      >
                        Change Salary
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white rounded-md p-2 font-semibold shadow-md"
                        onClick={async () => {
                          setLoaded(false);
                          await removeEmployee(employee.wallet);
                          setLoaded(true);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
              <div className="list_breaker"></div>
            </div>
          </Col>
        </Row>
      </div>
    );
  else return <Loader />;
}

export default Company;

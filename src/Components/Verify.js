import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EthersContext } from "../Context/EthersContext";
import Loader from "./Loader";
import { shortenAddress } from "../Utils/ShortenAddress";
import backLogo from "../images/back.png";
import { type } from "@testing-library/user-event/dist/type";
function Verify() {
  const [Rname, setRname] = useState();
  const { getEmployeeName, addEmployee } = useContext(EthersContext);
  const [Wallet, setWallet] = useState();
  const [Address, setAddress] = useState();
  const [Window, setWindow] = useState(0);
  const [Loaded, setLoaded] = useState(true);
  const [Salary, setSalary] = useState();

  const handleName = async () => {
    setLoaded(false);
    if (!Address) {
      setLoaded(true);
      return alert("Please enter a walid address");
    }
    const name = await getEmployeeName(Address);
    console.log(name);
    if (name === null || name === "" || name === undefined) {
      setLoaded(true);
      return alert(
        "Employee not registerd yet, please try a diffrent wallet address"
      );
    }
    setRname(name);
    setWindow(1);
    setLoaded(true);
  };
  const handleAdder = async () => {
    if (!Salary || Salary <= 0 || Salary === undefined || Salary === null)
      return alert("Please enter a valid Salary");
    setLoaded(false);
    await addEmployee(Address, Salary, Rname);
    setWindow(0);
    setLoaded(true);
  };
  const inputStyle =
    "rounded-sm p-2 outline-white bg-blue-500 text-white border-none text-sm w-full ";
  if (Loaded)
    return (
      <div className="emp_main text-center">
        <div className="flex justify-center pt-3">
          {Window === 0 ? (
            <div className="text-xl bg-white backdrop-blur-lg p-4 rounded-lg shadow-lg pb-10 w-96">
              <div className="text-dark text-3xl py-2 font-semibold pb-2">
                Add Employees
              </div>
              <div className="flex flex-col w-full justify-center items-center my-2">
                <input
                  placeholder="Enter employee's wallet address"
                  className={
                    "p-2 rounded-md outline-neutral-300 outline-1 text-dark border border-neutral-600 text-sm w-full placeholder:text-dark "
                  }
                  onChange={(e) => setAddress(e.target.value)}
                />
                <div
                  className=" bg-blue-500 hover:bg-blue-600 p-2 rounded-lg font-semibold mt-2 w-full text-white"
                  onClick={handleName}
                >
                  Get Name
                </div>
              </div>
            </div>
          ) : (
            <div className="text-xl bg-white backdrop-blur-lg rounded-lg shadow-lg pb-10 w-96">
              <div className="text-gray-600 text-3xl py-2 font-semibold">
                Add Employees
              </div>
              <div>
                <input
                  placeholder="Enter Salary for the Employee in Avax"
                  className={inputStyle}
                  onChange={(e) => setSalary(e.target.value)}
                  type="number"
                />
              </div>
              <div className="text-xs text-left text-gray-600 mt-2">Name:</div>
              <div className="text-gray-800 w-64 text-left px-1">{Rname}</div>
              <div className="text-xs text-left text-gray-600 mt-2">
                Wallet:
              </div>
              <div className="text-gray-800 w-64 text-left px-1">
                {Address ? shortenAddress(Address) : "0x00000...00000"}
              </div>
              <div
                className="add_employee_btn bg-green-500 hover:bg-green-600 p-2 rounded-lg font-semibold mx-3 mt-3"
                onClick={handleAdder}
              >
                Add to Company
              </div>
            </div>
          )}

          <div className="list_breaker"></div>
        </div>
      </div>
    );
  else return <Loader></Loader>;
}

export default Verify;

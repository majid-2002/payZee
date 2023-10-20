import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EthersContext } from "../Context/EthersContext";
import "../Styles/Salary.css";
import { shortenAddress } from "../Utils/ShortenAddress";
import Loader from "./Loader";
function Salary() {
  const { EmpWallet, getEmployeeName, changeEmployeeSalary } =
    useContext(EthersContext);
  const [Loaded, setLoaded] = useState(false);
  const [Name, setName] = useState("");
  const [Salary, setSalary] = useState();
  
  const navigate = useNavigate();
  useEffect(() => {
    initiator();
  }, []);
  const initiator = async () => {
    if (!EmpWallet) navigate("/company");
    setLoaded(false);
    const name = await getEmployeeName(EmpWallet);
    setName(name);
    setLoaded(true);
  };

  const handleSalary = async () => {
    if (!Salary || Salary <= 0 || Salary === undefined || Salary === null)
      return alert("Please enter a valid Salary");
    setLoaded(false);
    await changeEmployeeSalary(Salary, EmpWallet);
    setLoaded(true);
    navigate("/company");
  };

  return (
    <div className="emp_main text-center">
      <div className="flex justify-center pt-3">
        {Loaded ? (
          <div className="text-xl bg-white backdrop-blur-lg p-4 rounded-lg shadow-lg pb-10 w-96">
            <div className="text-dark text-3xl py-2 font-semibold pb-2">
              Change Salary
            </div>
            <input
              placeholder="Enter Salary for the Employee in Avax"
              className={"p-3 rounded-md outline-neutral-300 outline-1 text-dark bg-white border-neutral-700 border text-sm w-full placeholder:text-white mt-2"}
              onChange={(e) => setSalary(e.target.value)}
              type="number"
            />
            <div className="text-xs text-left text-gray-600 mt-2">Name:</div>
            <div className="text-gray-800 text-left px-1">{Name}</div>
            <div className="text-xs text-left text-gray-600 mt-2">Wallet:</div>
            <div className="text-gray-800 text-left px-1">
              {EmpWallet ? shortenAddress(EmpWallet) : "0x00000...00000"}
            </div>
            <div
              className=" bg-green-500 hover:bg-green-600 p-2 rounded-lg font-semibold  mt-3"
              onClick={handleSalary}
            >
              Proceed to change
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default Salary;

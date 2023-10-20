import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { EthersContext } from "../Context/EthersContext";
import "../Styles/Welcome.css";
import Loader from "./Loader";

const companyCommonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Welcome = () => {
  const { isEmployee, createAccount, getName, currentAccount, connectWallet } =
    useContext(EthersContext);
  const [Selection, setSelection] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [Name, setName] = useState();
  const [Rname, setRname] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    initiator();
  }, []);
  const initiator = async () => {
    let name = await getName();
    if (name) setRname(name);
  };

  const handleCreate = async () => {
    setisLoading(true);
    await createAccount(Name);
    setisLoading(false);
  };
  return (
    <div className="wel_main">
      <div className="wel_sub">
        <Row>
          <Col sm={12} xs={12} lg={6} md={6}>
            <div className="flex flex-1 justify-start items-start flex-col mf:mr-10 w-full">
              <h1 className="text-4xl sm:text-6xl py-2 font-bold">
                <span className="bg-gradient-to-r from-blue-500 to-slate-700 text-transparent bg-clip-text">
                  Seamless Web3 Financial Services
                </span>
                <br /> 
                at Zero Cost.
              </h1>
              <p className="text-left mt-3 text-gray-600 font-normal md:w-9/12 w-11/12 text-lg">
                Protect your assets with the power of blockchain technology.
              </p>

              <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10 gap-6">
                <div className="bg-blue-500 text-white rounded-tl-3xl p-3 text-center font-semibold">
                  Zero Fees
                </div>
                <div className="bg-purple-500 text-white rounded-tr-3xl p-3 text-center font-semibold">
                  Fast Transactions
                </div>
                <div className="bg-green-500 text-white rounded-bl-3xl p-3 text-center font-semibold">
                  Secure Assets
                </div>
                <div className="bg-yellow-500 text-white rounded-br-3xl p-3 text-center font-semibold">
                  Avalanche Speed
                </div>
                <div className="bg-indigo-500 text-white rounded-tl-3xl p-3 text-center font-semibold">
                  Reliable Services
                </div>
                <div className="bg-pink-500 text-white rounded-tr-3xl p-3 text-center font-semibold">
                  User-Friendly
                </div>
              </div>
            </div>
          </Col>
          <Col sm={12} xs={12} lg={6} md={6} className="wel_left">
            {}
            {currentAccount ? (
              Rname === "" ? (
                isLoading ? (
                  <Loader />
                ) : (
                  <div className="flex justify-center items-center ">
                    <div className="bg-white p-8 text-center shadow-md  my-5 h-min rounded-lg sm:w-4/5 w-full">
                      <div className="text-3xl font-bold text-blue-500 mb-4">
                        Hello There!
                      </div>
                      <div className="text-gray-700 text-lg mb-8">
                        We're almost done. Before using our services, you need
                        to create an account.
                      </div>
                      <div className="mb-4">
                        <input
                          type="text"
                          placeholder="Name of the Company"
                          className="w-full p-3 border rounded-md text-dark border-neutral-900 outline-none focus:border-neutral-900 focus:border-2"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div>
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-full py-3 transition duration-300"
                          onClick={handleCreate}
                        >
                          Create Account
                        </button>
                      </div>
                      <div className="text-sm text-gray-500 mt-4">
                        Disclaimer: Please do it with utmost care; you won't be
                        able to change these details.
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <div className="flex justify-center  min-h-screen">
                  <div className="bg-white my-5 h-min rounded-lg p-8 text-center shadow-md">
                    <div className="text-3xl font-bold text-blue-500 mb-4">
                      Welcome!
                    </div>
                    <div className="text-gray-700 text-lg mb-8">
                      Let's get started, please select your category.
                    </div>
                    <div>
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-full py-3 transition duration-300"
                        onClick={() => navigate("/company")}
                      >
                        Continue as a Company
                      </button>
                    </div>
                    <div>
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-full py-3 mt-4 transition duration-300"
                        onClick={() => navigate("/employee")}
                      >
                        Continue as an Employee
                      </button>
                    </div>
                    <div className="text-gray-500 mt-4">
                      Signed In as{" "}
                      <span className="text-blue-500">{Rname}</span>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <div className="flex justify-center items-center min-h-screen">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-full py-3 px-6 text-xl transition duration-300"
                  role="button"
                  onClick={connectWallet}
                >
                  Connect Wallet
                </button>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Welcome;

// Render Prop
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextError from "./TextError";
import { useAccount, useSigner, useContract } from "wagmi";
import { ContractFactory } from "ethers";
import ContractInfo from "../utils/deployments/ropsten/CustomToken.json";
import { toast } from "react-toastify";
import { CirclesWithBar, Circles } from "react-loader-spinner";


const Basic = () => {
  const { address, isConnecting, isDisconnected , isConnected} = useAccount()
  const { data: signer, isError, isLoading } = useSigner();
  const [deploying, setdeploying] = useState(false);
  const [contract, setcontract] = useState({});
  const [contractUrl, setcontractUrl] = useState("");
  const [validating, setValidating] = useState(false);

  const [code, setcode] = useState("");
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    symbol: Yup.string().required("Required"),
    premint: Yup.number().required().positive().integer(),
  });

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Generate Free Basic ERC20 Token!</h1>
      <Formik
        initialValues={{ name: "", symbol: "", premint: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            
            console.log(isConnected)

            if(!isConnected){
              // toast.error("Connect Metamask", {
              //   position: "top-right",
              //   autoClose: 5000,
              //   hideProgressBar: false,
              //   closeOnClick: true,
              //   pauseOnHover: true,
              //   draggable: true,
              //   progress: undefined,
              //   });
              throw new Error("Connect metamask")
            }
            
            const factory = new ContractFactory(
              ContractInfo.abi,
              ContractInfo.bytecode,
              signer
            );
            // if(!isLoading){

            setdeploying(true);

            // }

            const contract = await factory.deploy(
              values.name,
              values.symbol,
              values.premint
            );
            console.log(contract);
            setdeploying(false);
            setcontract(contract);
            setValidating(true);
            setTimeout(() => {
              setcontractUrl(
                `https://ropsten.etherscan.io/address/${contract.address}`
              );
              setValidating(false);
            }, 30000);

            console.log(values);
          } catch (error) {
            setdeploying(false);
            console.log(typeof error.message)
            toast.error(error.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });

            
          }

          //
        }}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4  flex flex-col gap-4 w-1/2 items-center">
            <Field
              type="text"
              name="name"
              placeholder="Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage name="name" component={TextError} className="" />
            <Field
              type="text"
              name="symbol"
              placeholder="Symbol"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage name="symbol" component={TextError} />
            <Field
              type="nubmer"
              name="premint"
              placeholder="Premint"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <ErrorMessage name="premint" component={TextError} />
            <button type="submit" className="bg-black text-white w-20">
              Deploy
            </button>
          </Form>
        )}
      </Formik>

      <pre className=" text-white m-2 p-2">
        {deploying && (
          <>
            {/* <div></div> */}
            <CirclesWithBar
              height="100"
              width="100"
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              outerCircleColor=""
              innerCircleColor=""
              barColor=""
              ariaLabel="circles-with-bar-loading"
            />
          </>
        )}
      </pre>
      <div className="flex flex-col items-center justify-center m-3 p-1">
        {contract.address && (
          <>
            <div>Your deployed address is <br /> at {contract.address} </div>
            <div>
              {validating && (
                <div className="flex flex-col justify-center items-center">
                  <div>Wait It is being validated</div>
                  <Circles
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                </div>
              )}
            </div>

            {contractUrl && (
              <div>
                Your conract is validadted check at <br />
                <a href={contractUrl} target='_blank'  className="underline">Click here</a>
                <br />
                <div>If not Validated Just wait few more secs</div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Basic;

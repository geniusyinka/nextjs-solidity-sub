import React from "react";
import { useRef, useState, useEffect } from "react";
import abi from "../../abi/Subscription.json";
import { useGreeting } from "../hooks/useSub";
import { toast } from "react-toastify";
import { useConnectModal } from "@rainbow-me/rainbowkit";

import { useContractRead, usePrepareContractWrite } from "wagmi";

const Subscription = () => {
  const [newGreeting, setNewGreeting] = useState<string>("");
  const newGreetingInputRef = useRef<HTMLInputElement>(null);

  const onSetGreetingSuccess = () => {
    toast.success(`Successfully set your new greeting`, {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      theme: "light",
      className: "text-sm",
    });
    setNewGreeting("");
    newGreetingInputRef.current?.blur();
  };

  const {
    address,
    greeting,
    getGreetingLoading,
    getGreetingError,
    setGreeting,
    setGreetingLoading,
    prepareSetGreetingError,
    setGreetingError,
  } = useGreeting({ newGreeting, onSetGreetingSuccess });

  useEffect(() => {
    if (!address) {
      setNewGreeting("");
    }
  }, [address]);

  const { openConnectModal } = useConnectModal();

  return (
    <div>
      <div className="main-item">
        <div className="input mt-5">
          <p>get greeting from chain...</p>
          {getGreetingLoading ? (
          <p className="text-lg text-center text-gray-500 italic">Loading...</p>
        ) : (
          <p
            className={
              !getGreetingError
                ? `text-lg text-center`
                : `text-lg text-center text-red-500`
            }
          >
            {!getGreetingError
              ? greeting
              : `There was an error getting the greeting`}
          </p>
        )}
          <input type="text" placeholder="Enter amount..." />
          <button>Send Transaction</button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;

import { useState } from "react";
import React from "react";
import { useAccount, useContractRead } from "wagmi";
import abi from "../../abi/Subscription.json";

const Sub = () => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [subscriptionPrice, setSubscriptionPrice] = useState(0);
  const [subscriptionDuration, setSubscriptionDuration] = useState(0);
  const [isSubscriber, setIsSubscriber] = useState(false);
  const [subscriptionExpiry, setSubscriptionExpiry] = useState(0);
  const [allSubscribers, setAllSubscribers] = useState([]);
  const [activeSubscribers, setActiveSubscribers] = useState([]);
  const [inactiveSubscribers, setInactiveSubscribers] = useState([]);
  const [totalSubscriptions, setTotalSubscriptions] = useState(0);

  const { address, isConnecting, isDisconnected } = useAccount();

  const {data} = useContractRead({
    // address: '',
    abi: abi,
    functionName: 'getAllSubscribers',
  }) as {data: number};

  

  return (
    <div>
      <h1>Subscription Service</h1>
      <p>Account: {account}</p>
      <p>Subscription Price (wei): {subscriptionPrice}</p>
      <p>Subscription Duration (seconds): {subscriptionDuration}</p>
      {/* <button onClick={() => handleSetSubscriptionPrice(0.01)}>Set Subscription Price (0.01 ETH)</button>
      <button onClick={handlePurchaseSubscription}>Purchase Subscription</button>
      <button onClick={handleIsSubscriber}>Check if Subscriber</button>
      <p>Is Subscriber: {isSubscriber ? 'Yes' : 'No'}</p>
      <button onClick={handleGetSubscriptionExpiry}>Get Subscription Expiry</button>
      <p>Subscription Expiry: {subscriptionExpiry} (Timestamp)</p>
      <button onClick={handleGetAllSubscribers}>Get All Subscribers</button>
      <p>All Subscribers: {allSubscribers.join(', ')}</p>
      <button onClick={handleGetActiveSubscribers}>Get Active Subscribers</button>
      <p>Active Subscribers: {activeSubscribers.join(', ')}</p>
      <button onClick={handleGetInactiveSubscribers}>Get Inactive Subscribers</button>
      <p>Inactive Subscribers: {inactiveSubscribers.join(', ')}</p> */}
      {/* <button onClick={handleGetTotalSubscriptions}>Get Total Subscriptions</button> */}
      <p>Total Subscribers: {totalSubscriptions}</p>
      <p>your data: {data}</p>
    </div>
  );
};

export default Sub;

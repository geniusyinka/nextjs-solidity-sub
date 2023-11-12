
# Solidity Subscription Service

The Subscription Service Smart Contract, written in Solidity, it provides a robust framework for managing subscription-based services. 

This contract allows developers to create subscription services on the blockchain.




## Authors

- [@geniusyinka](https://www.github.com/geniusyinka)


## Getting Started

Fork and clone this repo, cd `container`

```bash
npm install
```
cd `contracts`
```bash
npm install
```
cd `app`
```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Deployment

To deploy this is for deploying your solidity smartcontract. 
>cd into your `contracts` folder. run

```bash
npx hardhat run scripts/deploy.ts --network hardhat
```
>NB: you can change `hardhat` to the network of your choosing. I personally deployed this to `goerli` RIP. 

Restart your server
import { ethers } from "hardhat";

async function main() {
  const subscriptionPrice = "Hello, world!";
  const subscriptionDuration = 1
  const sub = await ethers.deployContract("Subscription", [
    subscriptionPrice,
  ]);
  await sub.waitForDeployment();
  console.log(
    `Subcritipon service contract with price of "${subscriptionDuration}", and duration of "${subscriptionDuration}" deployed to ${sub.target}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

import { ethers } from "hardhat";

async function main() {
  const greeting = "Hello, world! From Goerli!";
  const greeter = await ethers.deployContract("Subscription", [
    greeting,
  ]);
  await greeter.waitForDeployment();
  console.log(
    `Greeter with greeting "${greeting}" deployed to ${greeter.target}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

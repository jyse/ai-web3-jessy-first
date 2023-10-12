import { task, HardhatUserConfig, run } from "hardhat";
import { ethers } from "hardhat";
import toast, { Toaster } from "react-hot-toast";

export async function deployContract() {
  const toaster = <Toaster position="top-center" />;

  try {
    await task("compile", "Compile contracts").setAction(async () => {
      console.log("💻 Compiling smart contract");
      await run("compile");
    });

    const Contract = await ethers.getContractFactory("Frontmania");
    const contractArtifacts = await ethers
      .getContractFactory("Frontmania")
      .then((factory) => factory.getDeployed().then((deployed) => deployed[0]));

    const genNFTContract = await Contract.deploy();
    await genNFTContract.deployed();

    // toast.success(
    //   `🥳🥳✨ Contract successfully deployed!! ${genNFTContract.address} 📝`,
    //   {
    //     duration: 5000
    //   }
    // );

    console.log("Contract deployed to", genNFTContract.address);
    console.log("Abi of contract: ", contractArtifacts.abi);

    const response = JSON.stringify({
      contractAddress: genNFTContract.address,
      abi: contractArtifacts.abi
    });

    return response;
  } catch (error) {
    console.error(error);
  }
}

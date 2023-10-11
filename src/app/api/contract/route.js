export async function POST() {
  console.log("🙋‍♂️Creating smart contract 📝");

  try {
    task("compile", "Compile contracts").setAction(async () => {
      console.log("compiling contract");
      await run("compile");
    });

    const Contract = await hre.ethers.getContractFactory("GenNFTs");
    const contractArtifacts = await hre.artifacts.readArtifact("GenNFTs");

    const genNFTContract = await Contract.deploy();
    await genNFTContract.deployed();

    console.log("Contract deployed to", genNFTContract.address);
    console.log("Abi of contract: ", contractArtifacts.abi);

    // grab the deployed contract address and send it back
    return {
      contractAddress: genNFTContract.address,
      abi: contractArtifacts.abi
    };
  } catch (error) {
    console.error(error);
  }

  return new Response(JSON.stringify({ message: "Hello" }));
}

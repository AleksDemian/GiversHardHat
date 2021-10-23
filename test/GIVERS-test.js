const { expect } = require("chai");
const { ethers } = require("hardhat");
const BigNumber = ethers.BigNumber

describe("GIVERS", function () {

  const toWei = BigNumber.from(`1${"0".repeat(18)}`);


  it("Total supply equal to what you set", async function () {
    const [charity] = await ethers.getSigners();
    const GIVERS = await ethers.getContractFactory("GIVERS");
    const givers = await GIVERS.deploy(charity.address);

    expect(await givers.totalSupply()).to.equal(BigNumber.from(10).pow(9).mul(toWei));
  });
  

  it("Transfer to wallets that are excluded and not excluded from fee", async function () {

    const [owner, addr1, addr2] = await ethers.getSigners();
    const GIVERS = await ethers.getContractFactory("GIVERS");
    const givers = await GIVERS.deploy(addr1.address);

    const amount = BigNumber.from(100).mul(toWei);
    const requiredBalance = (await givers.balanceOf(owner.address)).sub(amount)
    
    await givers.transfer(addr1.address, amount);
    
    expect(await givers.balanceOf(owner.address)).to.equal(requiredBalance);

    await givers.connect(addr1).transfer(addr2.address, amount);

    expect(await givers.balanceOf(addr1.address)).to.equal(0); 
    expect(await givers.balanceOf(addr2.address)).to.be.lt(amount);

  });


  it("Make sure adding liquidity works", async function () {

    const [owner, addr1, addr2, charity] = await ethers.getSigners();
    const GIVERS = await ethers.getContractFactory("GIVERS");
    const givers = await GIVERS.deploy(charity.address);

  console.log("givers: %s, owner: %s, addr1: %s, addr2: %s, charity: %s",
      await givers.balanceOf(givers.address),
      await givers.balanceOf(owner.address),
      await givers.balanceOf(addr1.address),
      await givers.balanceOf(addr2.address),
      await givers.balanceOf(charity.address),
    );
    const amount = BigNumber.from(100).mul(toWei);
    await givers.transfer(addr1.address, amount);
    await givers.connect(addr1).transfer(addr2.address, amount);
  
    console.log("givers: %s, owner: %s, addr1: %s, addr2: %s, charity: %s",
      await givers.balanceOf(givers.address),
      await givers.balanceOf(owner.address),
      await givers.balanceOf(addr1.address),
      await givers.balanceOf(addr2.address),
      await givers.balanceOf(charity.address),
    );
    expect(await givers.balanceOf(givers.address)).to.not.equal(0); 
  });


  it("Check that the fees are sent to appropriate wallets correctly", async function () {

    const [owner, addr1, addr2, charity] = await ethers.getSigners();
    const GIVERS = await ethers.getContractFactory("GIVERS");
    const givers = await GIVERS.deploy(charity.address);

    console.log("givers: %s, owner: %s, addr1: %s, addr2: %s, charity: %s",
      await givers.balanceOf(givers.address),
      await givers.balanceOf(owner.address),
      await givers.balanceOf(addr1.address),
      await givers.balanceOf(addr2.address),
      await givers.balanceOf(charity.address),
    );

    const amount = BigNumber.from(1000000).mul(toWei);
    await givers.transfer(addr1.address, amount);
    await givers.connect(addr1).transfer(addr2.address, amount);
    
    console.log("givers: %s, owner: %s, addr1: %s, addr2: %s, charity: %s", 
      (await givers.balanceOf(givers.address)).div(toWei),
      await givers.balanceOf(owner.address),
      (await givers.balanceOf(addr1.address)),
      (await givers.balanceOf(addr2.address)).div(toWei),
      await givers.balanceOf(charity.address),
    );
  
    expect(await givers.balanceOf(charity.address)).to.equal(0); 
  });

});
//import 'babel-polyfill';
const BTContract = artifacts.require('BTFile')

let instance;

contract('BTContract', accounts => {
    let plotFileNo = 'PLOT-A-1'

    beforeEach(async function() {
        console.log('Deploy contract')
        instance = await BTContract.new({from: accounts[0]})
    })
    
    it('can claim plot file', async() => {
        let tokenId = 1;
        tx = await instance.claimFile(plotFileNo, tokenId, {from: accounts[0]})
        assert.equal(await instance.tokenIdToFileInfo.call(tokenId), plotFileNo)
    });

    it('lets user1 put up their file for sale', async() => {
        let user1 = accounts[1]
        let fileId = 2;
        let filePrice = web3.utils.toWei(".01", "ether")
        await instance.claimFile(plotFileNo, fileId, {from: user1})
        await instance.putFileForSale(fileId, filePrice, {from: user1})
        assert.equal(await instance.filesForSale.call(fileId), filePrice)
    });
    
    it('lets user1 get the funds after the sale', async() => {
        let user1 = accounts[1]
        let user2 = accounts[2]
        let fileId = 3
        let filePrice = web3.utils.toWei(".01", "ether")
        await instance.claimFile(plotFileNo, fileId, {from: user1})
        await instance.putFileForSale(fileId, filePrice, {from: user1})
        let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user1)

        await instance.buyFile(fileId, {from: user2, value: filePrice})
        let balanceOfUser1AfterTransaction = await web3.eth.getBalance(user1)
        // verify that user1 balance is increased by filePrice
        assert.equal(balanceOfUser1AfterTransaction - filePrice, balanceOfUser1BeforeTransaction);
    });
    
    it('lets user2 buy a file, if it is put up for sale', async() => {
        let user1 = accounts[1]
        let user2 = accounts[2]
        let fileId = 4
        let filePrice = web3.utils.toWei(".01", "ether")
        await instance.claimFile(plotFileNo, fileId, {from: user1})
        await instance.putFileForSale(fileId, filePrice, {from: user1})
        let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2)
        await instance.buyFile(fileId, {from: user2, value: filePrice});
        assert.equal(await instance.ownerOf.call(fileId), user2);
    });

    it('lets user2 buy a file and decreases its balance in ether', async() => {
        let user1 = accounts[1]
        let user2 = accounts[2]
        let fileId = 5
        let filePrice = web3.utils.toWei(".01", "ether")
        await instance.claimFile(plotFileNo, fileId, {from: user1})
        await instance.putFileForSale(fileId, filePrice, {from: user1})
        const balanceOfUser2BeforeTransaction = await web3.eth.getBalance(user2)
        await instance.buyFile(fileId, {from: user2, value: filePrice, gasPrice:0})
        const balanceAfterUser2BuysFile = await web3.eth.getBalance(user2)
        assert.equal(balanceOfUser2BeforeTransaction - balanceAfterUser2BuysFile, filePrice);
    });
})
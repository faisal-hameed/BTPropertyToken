pragma solidity >=0.4.21 <0.6.0;

import "../app/node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";

contract BTFile is ERC721 {

    struct File {
        string serialNo;
    }

    mapping(uint256 => File) public tokenIdToFileInfo;
    mapping(uint256 => uint256) public filesForSale;

    function claimFile(string memory serialNo, uint256 _tokenId) public {
        File memory newFile = File(serialNo);
        tokenIdToFileInfo[_tokenId] = newFile;

        _mint(msg.sender, _tokenId);
    }

    function putFileForSale(uint256 _tokenId, uint256 _price) public {
        require(this.ownerOf(_tokenId) == msg.sender, "You don't own this file");

        filesForSale[_tokenId] = _price;
    }

    function buyFile(uint256 _tokenId) public payable {
        require(filesForSale[_tokenId] > 0, "this file is not for sale");

        uint256 fileCost = filesForSale[_tokenId];
        address fileOwner = this.ownerOf(_tokenId);
        require(msg.value >= fileCost, "Not sufficient amount provided to buy this file");

        _removeTokenFrom(fileOwner, _tokenId);
        _addTokenTo(msg.sender, _tokenId);

        
        fileOwner.transfer(fileCost);

        if(msg.value > fileCost) {
            msg.sender.transfer(msg.value - fileCost);
        }
    }
}
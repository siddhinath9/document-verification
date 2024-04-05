// SPDX-License-Identifier: MIT

// DocumentVerification.sol
pragma solidity ^0.8.0;

contract DocumentVerification {
    struct Document {
        address owner;
        string hash;
    }

    mapping(string => Document) documents;

    event DocumentAdded(address indexed owner, string hash);

    constructor() {
        // Constructor sets an initial owner for the contract
        documents["initialDocumentHash"] = Document(
            msg.sender,
            "initialDocumentHash"
        );
        emit DocumentAdded(msg.sender, "initialDocumentHash");
    }

    function addDocument(string memory _hash) public {
        require(
            documents[_hash].owner == address(0),
            "Document already exists"
        );
        documents[_hash] = Document(msg.sender, _hash);
        emit DocumentAdded(msg.sender, _hash);
    }

    function verifyDocument(
        string memory _hash
    ) public view returns (address owner, bool exists) {
        Document storage document = documents[_hash];
        owner = document.owner;
        exists = (owner != address(0));
    }
}

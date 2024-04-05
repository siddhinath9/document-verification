

const express = require('express');
const router = express.Router();
const {Web3} = require('web3');
const web3 = new Web3('http://127.0.0.1:7545'); // Use your Ethereum node's URL
const { checkAuth } = require('../middlewares/auth');
const contractABI = require('../../../truffle/build/contracts/DocumentVerification.json').abi;
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Document = require('../models/Document');

// Route to add a document
router.get('/add-document',checkAuth, async (req, res) => {
  //get the user id from the token in the request header
  const token = req.headers.authorization.split(' ')[1];


  //get the user id from the token in the request header
  const decoded = jwt.decode(token, process.env.JWT_SECRET);
  const id = decoded.id;

  //get the user from the database

  const user = await User.findById(id);
  console.log(user);

    const { documentHash, fileName } = req.query;

  // Replace 'YourContract' with the actual contract ABI and address
  const contract = new web3.eth.Contract(contractABI, process.env.CONTRACT_ADDRESS);

  try {
    // Check if the document hash exists on the blockchain
    const { exists } = await contract.methods.verifyDocument(documentHash).call();
    if (exists) {
      return res.status(200).json({ message: 'Document already exists on the blockchain.' });
    }

    // Assuming you have a wallet private key (use an environment variable for security)
    const privateKey = user.private_key; // Replace with your private key

    // Build the transaction data
    const functionData = contract.methods.addDocument(documentHash).encodeABI();

    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 200000; // Adjust as needed

    const nonce = await web3.eth.getTransactionCount(user.sender_address); // Replace with your sender address
    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: process.env.CONTRACT_ADDRESS,
        data: functionData,
        gas: gasLimit,
        gasPrice,
        nonce: nonce,
      },
      privateKey
    );

    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log(`Transaction hash: ${receipt.transactionHash}`);

    //add a new document to the document collection
    const newDocument = await Document.create({
      documentHash: documentHash,
      transactionHash: receipt.transactionHash,
      fileName: fileName,
      owner: user._id,
    })

    await newDocument.save();

    res.status(200).json({ message: 'Document added successfully.', status: 200 });
  } catch (error) {
    console.error('Error adding document:', error);
    res.status(500).json({ error: 'Failed to add the document to the blockchain.' });
  }
});


  router.get('/verify-document', async (req, res) => {
    const { documentHash } = req.query; // Assuming you're passing the document hash as a query parameter  
    try {
      // Create a contract instance with the ABI and contract address
      const contract = new web3.eth.Contract(contractABI, process.env.CONTRACT_ADDRESS);
  
      // Call the smart contract's verifyDocument function
      const result = await contract.methods.verifyDocument(documentHash).call();
  
      // Parse the result
      const owner = result[0];
      const exists = result[1];
  
      if (exists) {
        res.status(200).json({ message: 'Document is valid and owned by ' + owner, status:200 });
      } else {
        res.status(200).json({ message: 'Document not found on the blockchain' });
      }
    } catch (error) {
      console.error('Error verifying document:', error);
      res.status(500).json({ error: 'Failed to verify the document on the blockchain' });
    }
  });

  //route to get a user's documents
  router.get('/get-documents', checkAuth, async (req, res) => {
    //get the user id from the token in the request header
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.decode(token, process.env.JWT_SECRET);
    const id = decoded.id;
  
    //get the user from the database
    const user = await User.findById(id);
  
    //get all documents owned by the user
    const documents = await Document.find({ owner: user._id }).populate('owner', '-password -private_key');
  
    res.status(200).json({ message: 'Documents retrieved successfully', data: documents });
  });


module.exports = router;
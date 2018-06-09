//using the infura.io node, otherwise ipfs requires you to run a //daemon on your own computer/server.
const IPFS = require("ipfs-api");
const ipfs = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https"
});
//run with local daemon
// const ipfs = new ipfsApi('localhost', '5001', {protocol:'http'});

export const readIPFS = hash => {
  return new Promise((resolve, reject) =>
    ipfs.files.cat(hash, (err, res) => {
      if (!err) {
        const IPFS_DATA = res.toString();
        //load IPFS to web
        const content = JSON.parse(IPFS_DATA);
        resolve(content);
      } else {
        reject(err);
      }
    })
  );
};

export const createIPFS = payload => {
  return new Promise((resolve, reject) => {
    const buffer = Buffer.from(JSON.stringify(payload), "utf8");
    ipfs.add(buffer, async (err, ipfsHash) => {
      if (!err) {
        resolve(ipfsHash[0].hash);
      }
      reject(err);
    });
  });
};

export default ipfs;

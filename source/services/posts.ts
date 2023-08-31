require("dotenv").config("../.env")
const {RoomServiceClient, Room,EgressClient,EncodedFileType,AccessToken,StreamOutput,StreamProtocol} = require('livekit-server-sdk');

const svc = new RoomServiceClient(process.env.livekitHost, process.env.apiKey, process.env.secretKey);


const generateToken=(participantName: string, grants: object)=>{
    console.log(process.env.apiKey, process.env.secretKey);
    const at = new AccessToken( "APIZZFbENr7P7Ba" , "SW9zytjYIMxfaifa5ZQP1LI86Z9Nni8XAJnVpwirRSr" , {
        identity: "sdfg",
        ttl:"17520h"
      })
      
      at.addGrant({
        roomJoin: true,
        room: "blob",
        canPublish: true,
        canSubscribe: true,
       
      });
      console.log("Token Created For Participant"+at);
    //at.addGrant(grants);
    return at.toJwt();
    
}

export default { generateToken };
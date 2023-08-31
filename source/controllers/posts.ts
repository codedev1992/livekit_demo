import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import services from "../services/posts";

interface Post {
    userId: Number;
    id: Number;
    title: String;
    body: String;
}

enum RoomGrantRole {
   Driver = "driver", 
   Parents = "parents", 
   Admin = "admin"
  }


const getToken = async (req: Request, res: Response, next: NextFunction) => {

    let participantName: string = req.body.participant_name;
    let roomName: string = req.body.room_name
    let role : string  = req.body.role
    let grant: object;

    if(role.toLowerCase() === RoomGrantRole.Driver.toString().toLowerCase())
    {
        grant = {
                roomCreate : true, 
                roomJoin: true,
                room: roomName,
                canPublish: true,
                canSubscribe: true,
            };
    }
    else if(role.toLowerCase() === RoomGrantRole.Parents.toString().toLowerCase()){
        grant = {
            roomJoin: true,
            room: roomName,
        };
    }
    else if(role.toLowerCase() === RoomGrantRole.Admin.toString().toLowerCase()){
        grant = {

        }
    }else{
        return res.status(401).json({
            message: "Invalid Role."
        });  
    }
    const token = services.generateToken(participantName,grant);
	
	 return res.status(200).json({
        message: token
    });
};


 
export default {getToken };
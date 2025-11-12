import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import axios from 'axios'

export default function SyncUser(){
    const {isSignedIn,user} = useUser()
    useEffect(()=>{
            if(isSignedIn && user){
            const clerkId = user.id
            const email = user.emailAddresses[0]?.emailAddress || ''
            const fullname = user.fullName || ''
            axios.post('http://localhost:3000/users/sync',{
                clerkId,
                email,
                fullname
            }).then(res=>console.log('User synced:',res.data)).catch(err=>console.error('Error syncing user:',err))
        }
    },[isSignedIn,user])
    return null

}
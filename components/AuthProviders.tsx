"use client"
import {useState,useEffect} from "react";
import {signIn, getProviders} from 'next-auth/react';
import Button from "./Button";

type Provider={ 
  id:string;
  name:string;
  type:string;
  signinUrl:string;
  callbackUrl:string;
  signinUrlParams?:Record<string, string> | null;
}
type Providers = Record<string,Provider>;

const AuthProviders = () => {
  const [providers, setproviders] = useState<Providers | null>(null);

  useEffect(()=>{
    const fetchProviders=async()=>{
      const res=await getProviders();
      setproviders(res);
    }
    fetchProviders();
  },[]);
  
  if(providers){
    return (
      <div>
        {Object.values(providers).map((provider:Provider,i)=>(
          <Button key={i} title="Sign In" handleClick={()=>signIn(provider?.id)}/>
        ))}
      </div>
    )
  }
}

export default AuthProviders
"use client"
import { useCallback,useRef, ReactNode } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

const Modal = ({children}:{children:ReactNode}) => {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const Dismiss= useCallback(()=>{
    router.push('/');
  },[router]);
  
  const handleClick= useCallback((e:React.MouseEvent)=>{
    if(e.target=== overlay.current && Dismiss){
      Dismiss();
    }
  },[overlay,Dismiss])
  
  return (
    <div ref={overlay} className="modal" onClick={handleClick}>
      <button type="button" onClick={Dismiss} title="dismiss" className="absolute top-3 right-5">
        <Image
        src='/close.svg'
        width={17}
        height={17}
        alt="close"
        />
      </button>
      <div ref={wrapper} className="modal_wrapper">
        {children}
      </div>
    </div>
  )
}

export default Modal

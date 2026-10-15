import { ReactNode } from "react"
import Navbar from "../components/Navbar"

const Headerlayout = ({children}: {children: ReactNode}) => {
  return (
    <div className="flex flex-col min-h-screen">
        <Navbar />
        {children}
    </div>
  )
}

export default Headerlayout
import { NavBar } from "./ui/components/navbar"
import { BrowserRouter, Routes , Route } from "react-router-dom"
import { SideBar} from "./ui/components/sidebar"
const btns = [
  {
    title: "people",
    button : [
      {title: "ramanshu",
        url : "#"
      },
      {
        title: "neelesh",
        url: "!"
      }
    ]
  },
  {
    title: "gangs",
    button: [
      {
        title: "bagga",
        url: "&"
      },
      {title: "billu",
        url: "^"
      }
    ]
  }
]
export default function App(){
  //  will fetch the necessary information from backend name , username, image 
  //  will add google auth in the backend
  //  will add random avatar in case of no image on backend

  return (
    <div className="h-full">
    <BrowserRouter>
      <div>
      <NavBar variant="home" size="lg">DASHBOARD</NavBar>
    </div>
      <SideBar name="ramanshu" username="indophoenix" groups={btns}></SideBar>
    </BrowserRouter>
    </div>
    
  )
}


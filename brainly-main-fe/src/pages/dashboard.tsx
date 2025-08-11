import { useEffect, useState } from "react"
import { Button } from ".././components/Button"
import { Card } from ".././components/Card"
import { CreateContentModal } from ".././components/CreateContentModal"
import { PlusIcon } from ".././icons/PlusIcon"
import { ShareIcon } from ".././icons/ShareIcon"
import { Sidebar } from ".././components/Sidebar"
import { useContent } from "../hooks/useContent"
import axios from "axios"
import { BACKEND_URL, FRONTEND_URL } from "../config"

export function Dashboard() {
  const [modalOpen,setModalOpen] = useState(false)
  const {contents, refresh} = useContent()

  useEffect( ()=> {
    refresh()
  }, [modalOpen])

  return <div>

    <Sidebar/>
    <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
      <CreateContentModal open={modalOpen} onClose={()=> {
        setModalOpen(false)
      }}/>
      <div className="flex justify-end gap-4">
        <Button onClick={()=> {
          setModalOpen(true)
        }} variant="primary" text="Add Content" startIcon={<PlusIcon />}/>
        <Button onClick={async () => {
          const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
            share : true
          }, {
            headers : {
              "Authorization" : localStorage.getItem("token")
             }
          })
          const shareurl = FRONTEND_URL + `${response.data.hash}`
          alert(shareurl)
        }} variant="secondary" text="Share Brain" startIcon={<ShareIcon />}/>
        </div>
      <div className="flex gap-4 flex-wrap">
        {contents.map(({type, link, title}) => <Card 
          type={type} 
          link={link} 
          title={title} 
        />)}

      </div>
    </div>
  </div>
}

export default Dashboard

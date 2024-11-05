import React, { useEffect, useState } from "react"
import { BackgroundGradientAnimation } from "../../components/ui/background-gradient-animation.tsx"
import evoloading from "../../assets/evoloading.gif"
import { Link } from 'react-router-dom'

const HomePage = () => {
  const [loading, setLoading] = useState(true)
  const [files, setFiles] = useState([])

  // Fetch directories when component mounts
  useEffect(() => {
    async function fetchFiles() {
      try {
        const response = await fetch("https://assets.ndts.uk/fetch.php?latest=true")
        const data = await response.json()
        setFiles(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching files:", error)
      }
    }

    fetchFiles()
  }, [])

  return (
    <>
      {loading && (
        <>
          <BackgroundGradientAnimation />
          <img className="z-50 m-auto" src={evoloading} alt="loading ..." />
        </>
      )}
      {!loading && (
        <>
          <BackgroundGradientAnimation />
          <div className="TOP z-10 flex flex-col items-center justify-center space-y-6 font-[Prod-bold]">
            <div className="inline-flex flex-col items-center text-4xl leading-tight sm:text-5xl lg:text-6xl">
              <p>
                <span className="evoxhighlight">Evolution X</span>
              </p>
              <p>Downloads Management Portal</p>
            </div>
          </div>
          <div className="MIDDLE z-40 flex gap-9 rounded-3xl px-8 pb-16 lg:px-16 lg:py-16">
            {/* Latest Files */}
            <div className="flex-1 bg-black rounded-3xl middleshadow">
              <div className="flex items-center justify-between px-8 py-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <span className="font-[Prod-bold] text-3xl capitalize lg:text-3xl">Latest Files</span>
                </div>
              </div>
              <hr className="h-px border-0 bg-white" />
              <div id="deviceList" className="space-y-4 px-4 py-4 text-xl lg:text-2xl">
                <div>
                  {files.map((file, index) => (
                    <div key={index}>
                      <p>{files.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Downloads History */}
            <div className="flex-1 bg-black rounded-3xl middleshadow">
              <div className="flex items-center justify-between px-8 py-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <span className="font-[Prod-bold] text-3xl capitalize lg:text-3xl">Downloads History</span>
                </div>
              </div>
              <hr className="h-px border-0 bg-white" />
              <div id="deviceList" className="space-y-4 px-4 py-4 text-xl lg:text-2xl">
                {/* Content here */}
              </div>
            </div>
          </div>

        </>
      )}
    </>
  )
}

export default HomePage

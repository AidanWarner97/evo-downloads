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
        const response = await fetch("https://assets.ndts.uk/fetch.php")
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
              <p>Administration Portal</p>
            </div>
          </div>
          <div className="MIDDLE z-40 flex gap-9 rounded-3xl px-8 pb-16 lg:px-16 lg:py-16">
            {/* Available options */}
            <div className="MIDDLE z-40 flex items-center">
              <div className="rounded-full p-4 bg-slate-500">
                Files
              </div>
            </div>
          </div>

        </>
      )}
    </>
  )
}

export default HomePage

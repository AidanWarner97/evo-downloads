import React, { useEffect, useState } from "react"
import { BackgroundGradientAnimation } from "../../components/ui/background-gradient-animation.tsx"
import evoloading from "../../assets/evoloading.gif"
import { useParams, Link } from 'react-router-dom'

const HomePage = () => {
  const { deviceId } = useParams()
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch directories when component mounts
  useEffect(() => {
    if (deviceId) {
      fetch(`https://assets.ndts.uk/fetch.php?deviceId=${deviceId}`)
        .then(response => response.json())
        .then(data => {
          setFiles(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching device files:', error);
          setLoading(false)
        })
    }
  }, [deviceId])

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
                  <span className="font-[Prod-bold] text-xl capitalize">Files</span>
                </div>
              </div>
              <hr className="h-px border-0 bg-white" />
              <div className="space-y-4 px-4 py-4 text-lg">
                    {loading ? (
                        <p>Loading files...</p>
                    ) : (
                        <div className="space-y-4 px-4 py-4 text-xl lg:text-2xl">
                        {files.map((file, index) => (
                            <Link 
                              key={index} 
                              to={`${file.name}`} 
                              className="flex items-center justify-between px-4 py-3 bg-gray-800 rounded-full hover:bg-gray-700 transition shadow-inner-custom">
                                <span>{file.name}</span>
                                <span className="grid place-items-center grid-cols-[auto_auto]">
                                  {file.lastModified}
                                  <Link
                                    to={`/delete/${file.name}`}
                                    className="items-center rounded-full bg-red-500 inline-block w-[32px] h-[32px] text-center ml-2.5">
                                    <span className="material-symbols-outlined h-[32px] w-[32px] grid place-items-center">delete_forever</span>
                                  </Link>
                                </span>
                            </Link>
                        ))}
                        </div>
                    )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default HomePage

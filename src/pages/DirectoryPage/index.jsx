import React, { useEffect, useState } from "react"
import { BackgroundGradientAnimation } from "../../components/ui/background-gradient-animation.tsx"
import evoloading from "../../assets/evoloading.gif"
import { Link } from 'react-router-dom'

const HomePage = () => {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [devices] = useState([])
  const [directories, setDirectories] = useState([])
  const [filteredItems, setFilteredItems] = useState([])

  // Fetch directories when component mounts
  useEffect(() => {
    fetch('https://assets.ndts.uk/fetch.php')
      .then(response => response.json())
      .then(data => setDirectories(data))
      .catch(error => console.error('Error fetching directories:', error))
      setLoading(false)
  }, [])

  // Filter items based on search input
  useEffect(() => {
    const filteredDevices = devices.filter(device =>
      device.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const filteredDirectories = directories.filter(dir =>
      dir.toLowerCase().includes(searchTerm.toLowerCase())
    ).map(dir => ({ name: dir, date: null }))

    setFilteredItems([...filteredDevices, ...filteredDirectories])
  }, [searchTerm, devices, directories])

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
                  <input
                      type="text"
                      id="searchInput"
                      placeholder="Search..."
                      className="p-2 text-sm text-gray-300 bg-gray-700 border border-gray-600 rounded-full focus:outline-none focus:ring focus:ring-indigo-400 w-150"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
              </div>
              <hr className="h-px border-0 bg-white" />
              <div id="deviceList" className="space-y-4 px-4 py-4 text-lg">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => (
                    <Link 
                      key={index} 
                      to={`${item.name}`}
                      className="flex items-center justify-between px-4 py-3 bg-gray-800 rounded-full hover:bg-gray-700 transition shadow-inner-custom">
                      <span>{item.name}</span>
                    </Link>
                  ))
                ) : (
                  <div className="text-gray-400">No items found</div>
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

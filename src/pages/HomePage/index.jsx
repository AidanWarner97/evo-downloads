import React, { useEffect, useState } from "react"
import { BackgroundGradientAnimation } from "../../components/ui/background-gradient-animation.tsx"
import evoloading from "../../assets/evoloading.gif"
import { Link } from 'react-router-dom'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const HomePage = () => {
  const [loading, setLoading] = useState(true)
  const [files, setFiles] = useState([])
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  })

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

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://assets.ndts.uk/download_log.php')
      const data = await response.json()

      const labels = data.map(item => {
        const date = new Date(item.date)
        const day = date.getDate()

        // Ordinal suffix helper
        const getOrdinalSuffix = (day) => {
          if (day > 3 && day < 21) return `${day}th`
          switch (day % 10) {
            case 1: return `${day}st`
            case 2: return `${day}nd`
            case 3: return `${day}rd`
            default: return `${day}th`
          }
        }

        return getOrdinalSuffix(day)
      })

      const counts = data.map(item => item.count)

      setChartData({
        labels,
        datasets: [
          {
            label: 'Downloads',
            data: counts,
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderWidth: 2,
          },
        ],
      })
    }

    fetchData()
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
            <div className="flex-1 bg-black rounded-3xl middleshadow truncate">
              <div className="flex items-center justify-between px-8 py-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <span className="font-[Prod-bold] text-xl capitalize">Latest Files</span>
                </div>
              </div>
              <hr className="h-px border-0 bg-white" />
              <div id="deviceList" className="space-y-4 px-4 py-4 text-xl">
                <div className="space-y-4 text-lg">
                  {files.map((file, index) => (
                    <div 
                    key={index}
                    className="flex items-center justify-between px-4 py-3 bg-gray-800 rounded-full hover:bg-gray-700 transition shadow-inner-custom overflow-hidden whitespace-nowrap text-ellipsis">
                      <p className="truncate">{file.directory}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-4 text-lg">
                  <Link 
                  to="/files"
                  className="flex items-center justify-between px-4 py-3 bg-gray-800 rounded-full hover:bg-gray-700 transition shadow-inner-custom">
                    View all files
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Downloads History */}
            <div className="flex-1 bg-black rounded-3xl middleshadow">
              <div className="flex items-center justify-between px-8 py-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <span className="font-[Prod-bold] text-xl capitalize">Downloads History</span>
                </div>
              </div>
              <hr className="h-px border-0 bg-white" />
              <div id="deviceList" className="space-y-4 px-4 py-4 text-lg h-[420px]">
                <Line
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      },
                      tooltip: {
                        display: false
                      },
                    },
                    scales: {
                      x: {
                        title: { 
                          display: true,
                          text: 'Date',
                          color: '#333',
                          font: {
                            size: 16,
                          },
                        },
                        ticks: {
                          callback: function (value, index) {
                            return this.getLabelForValue(value)
                          },
                          color: '#666',
                          font: {
                            size: 16,
                          },
                        },
                      },
                      y: {
                        title: { 
                          display: true, 
                          text: 'Downloads',
                          color: '#333',
                          font: {
                            size: 16,
                          },
                        },
                        ticks: {
                          beginAtZero: true,
                          stepSize: 1,
                          callback: function (value) {
                            return Number.isInteger(value) ? value : null
                          },
                          color: '#666',
                          font: {
                            size: 16,
                          },
                        },
                      },
                    }
                  }} height={null}
                  />
              </div>
            </div>
          </div>

        </>
      )}
    </>
  )
}

export default HomePage

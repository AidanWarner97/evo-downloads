// DevicePage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import evoloading from "../../assets/evoloading.gif"
import { BackgroundGradientAnimation } from "../../components/ui/background-gradient-animation.tsx"

const DevicePage = () => {
  const { deviceId } = useParams();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

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
          setLoading(false);
        });
    }
  }, [deviceId]);
  
  // Fetch device data or display static content based on the deviceId
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
                <span className="evoxhighlight">Download</span> for
              </p>
              <p>{deviceId}</p>
            </div>
        </div>
        <div className="MIDDLE z-40 inline-flex flex-col rounded-3xl px-8 pb-16 lg:px-16 lg:py-16">
            <div className="inline-flex flex-col gap-9">
              <div className="mb-4 items-center bg-black rounded-3xl middleshadow">
                <div className="flex items-center justify-between px-8 py-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <span className="font-[Prod-bold] text-3xl capitalize lg:text-3xl">Device Name</span>
                  </div>
                  <span className="font-[Prod-bold] text-3xl capitalize lg:text-3xl">Last Updated</span>
                </div>
                <hr className="h-px border-0 bg-white" />
                    {loading ? (
                        <p>Loading files...</p>
                    ) : (
                        <div className="space-y-4 px-4 py-4 text-xl lg:text-2xl">
                        {files.map((file, index) => (
                            <Link 
                              key={index} 
                              to={`/${deviceId}/${file.name}`} 
                              className="flex items-center justify-between px-4 py-3 bg-gray-800 rounded-full hover:bg-gray-700 transition shadow-inner-custom">
                                <span>{file.name}</span>
                                <span>{file.lastModified}</span>
                                <span>X</span>
                            </Link>
                        ))}
                            <Link 
                              to={`/files`}
                              className="flex items-center justify-between px-4 py-3 bg-gray-800 rounded-full hover:bg-gray-700 transition shadow-inner-custom">
                                Go back to device list.
                            </Link>
                        </div>
                    )}
                    <span>Test</span>
              </div>
            </div>
          </div>
          </>
      )}
    </>
  )
}

export default DevicePage;

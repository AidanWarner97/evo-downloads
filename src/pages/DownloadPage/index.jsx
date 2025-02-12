// FilePage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import evoloading from "../../assets/evoloading.gif"
import { BackgroundGradientAnimation } from "../../components/ui/background-gradient-animation.tsx"

const FilePage = () => {
  const { deviceId, fileName } = useParams();
  const [countdown, setCountdown] = useState(5);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the presigned URL for the file
    if (deviceId && fileName) {
      fetch(`https://assets.ndts.uk/fetch.php?deviceId=${deviceId}&file=${fileName}&download=true`)
        .then(response => response.json())
        .then(data => {
          if (data.downloadUrl) {
            setDownloadUrl(data.downloadUrl);
          } else {
            console.error('Error: Presigned URL not returned.');
          }
          setLoading(false);
        })
        .catch(error => console.error('Error fetching presigned URL:', error));
    }
  }, [deviceId, fileName]);

  // Countdown logic
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (downloadUrl) {
      // Trigger download
      window.location.href = downloadUrl;
      setTimeout(() => navigate('/'), 10000);
    }
  }, [countdown, downloadUrl, navigate]);

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
                            <span className="font-[Prod-bold] text-3xl capitalize lg:text-3xl">
                                <span className="evoxhighlight">Thank you </span> for downloading!
                            </span>
                        </div>
                    </div>
                    <hr className="h-px border-0 bg-white" />
                    <div className="space-y-4 px-4 py-4 text-xl lg:text-2xl">
                        {loading ? (
                        <p>Preparing file...</p>
                        ) : (
                        <>
                            <p className="flex items-center px-4 py-3 bg-gray-800 rounded-full transition shadow-inner-custom">Downloading &nbsp;<strong>{fileName}</strong>&nbsp; will start in {countdown} seconds...</p>
                            <Link to={`/${deviceId}`} className="flex items-center justify-between px-4 py-3 bg-gray-800 rounded-full hover:bg-gray-700 transition shadow-inner-custom">
                            Back to {deviceId} downloads
                            </Link>
                        </>
                        )}
                    </div>
                </div>
            </div>
        </div>
            </>
      )}
    </>
  )
}

export default FilePage;

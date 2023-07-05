import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import { useRef, useState } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ShieldCheck } from "@phosphor-icons/react";

interface PredictionProps {
  score: number;
  setScore: (score: number) => void;
}

const WebcamCapture = (props: PredictionProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // Function to start the webcam feed
  const startWebcam = async () => {
    setShowVideo(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  // Function to capture a photo
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        // Set canvas dimensions to match video feed
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw current video frame on the canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        setCapturedImage(canvas.toDataURL("image/png"));
      }
    }
  };

  const loadModel: any = async () => {
    setIsPredicting(true);
    const img = document.getElementById("captured-image") as HTMLImageElement;
    const model = await cocoSsd.load();
    const predictions = await model.detect(img);
    // console.log(predictions);
    if (predictions.length === 0) {
      toast.error("Could not capture image properly. Try Again.", {
        autoClose: 1000,
        position: "top-center",
      });
      return;
    } else {
      if (predictions[0].class === "person" && predictions[0].score > 0.9) {
        props.setScore(predictions[0].score);
        setIsVerified(true);
        toast.success("Identity Verified", {
          autoClose: 1000,
          position: "top-center",
        });
      } else {
        toast.error("Identity Verification failed. Retry.", {
          autoClose: 1000,
          position: "top-center",
        });
        return;
      }
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
    }
    setIsPredicting(false);
  };

  return (
    <div className="mt-4">
      <ToastContainer pauseOnFocusLoss={false} />
      <p className="block text-gray-700 text-lg font-bold mb-2">
        Identity Verification
      </p>
      {isVerified ? (
        <p className="flex justify-center items-center">Verified <ShieldCheck size={36} color="#04d600" weight="fill" /></p>
      ) : (
        <div>
          <div className="flex justify-center gap-4">
            <button
              onClick={startWebcam}
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
            >
              Start Webcam
            </button>
            <button
              onClick={capturePhoto}
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
            >
              Capture
            </button>
          </div>

          <div className="flex gap-2 mt-4">
            {showVideo && (
              <div className="m-0 w-1/2">
                <h2>Live Video Feed:</h2>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  style={{ display: "inline" }}
                />
              </div>
            )}
            <canvas ref={canvasRef} style={{ display: "none" }} />
            {capturedImage && (
              <div className="m-0 w-1/2">
                <h2>Captured Image:</h2>
                <img
                  id="captured-image"
                  src={capturedImage}
                  alt="Captured"
                  style={{ display: "inline" }}
                />
              </div>
            )}
          </div>
          {capturedImage && (
            <button
              onClick={loadModel}
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline mt-2 w-full"
            >
              Verify
            </button>
          )}
          {isPredicting && (
            <p className=" text-xs text-gray-500">
              Checking if you are human or not. This may take a while...
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;

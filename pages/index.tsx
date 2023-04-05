import Head from "next/head";
import "regenerator-runtime/runtime";
import Image from "next/image";
import TextBox from "../components/TextBox";
import { MicrophoneIcon, StopIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import logo from "../public/logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ThreeDots } from "react-loader-spinner";

const Home = () => {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const handleListen = () => {
    SpeechRecognition.startListening({ continuous: true });
    resetTranscript();
    toast("Now Listening !");
  };

  const model = "text-davinci-003";

  const sendMessage = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    toast("Sending To GPT");
    setLoading(true);
    const res = await fetch("/api/sendQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: transcript,
        model,
      }),
    });
    let answer = await res.json();
    if (res.status !== 200) {
      console.log("Error");
    } else {
      setNote(answer.answer);
    }
    setLoading(false);
  };
  const stopListening = () => {
    toast("Listening Stopped !");
    SpeechRecognition.stopListening();
    setNote("");
  };

  return (
    <div className="">
      <Head>
        <title>VOice API TEST</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-7xl mx-auto px-4 py-4">
        <ToastContainer />
        <Image
          alt="Original photo"
          src={logo}
          className="object-contain my-2"
          width={150}
          height={150}
        />
        <div className="flex items-center justify-center my-6">
          <h1 className=" text-4xl font-semibold font-mono text-green-600">
            Get you answer through voice
          </h1>
        </div>

        <div className="grid grid-cols-2 space-x-5 ">
          <TextBox text={transcript} />
          {loading ? (
            <div className="flex justify-center items-center">
              {" "}
              <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#4fa94d"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                visible={true}
              />
            </div>
          ) : (
            <TextBox text={note} />
          )}
        </div>
        <div className="flex  items-center gap-2 mt-2  ">
          <span className="text-lg font-semibold items-center">
            Microphone:
          </span>
          {listening ? (
            <p className="w-4 h-4  rounded-full bg-red-500 animate-ping  "></p>
          ) : (
            <p className="w-4 h-4 rounded-full bg-green-500"></p>
          )}
        </div>
        <div
          className="flex  my-4 cursor-pointer ml-12 gap-4 items-center justify-center
        "
        >
          {!listening ? (
            <MicrophoneIcon className="h-6 w-6" onClick={handleListen} />
          ) : (
            <StopIcon className="h-6 w-6" onClick={stopListening} />
          )}

          <p
            className="font-semibold text-white bg-green-600 px-2 py-2 rounded-lg hover:bg-green-500 transition-all duration-150 ease-in-out"
            onClick={resetTranscript}
          >
            Reset Text
          </p>
          <div>
            {transcript && (
              <p
                className="font-semibold text-white bg-green-600 px-2 py-2 rounded-lg hover:bg-green-500 transition-all duration-150 ease-in-out"
                onClick={sendMessage}
              >
                Send to GPT
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

import React from 'react'
import Webcam from "react-webcam";
import { PhotoContext } from '../context/photoContext';

export default function WebCam({ w, h }: { w: number, h: number }) {
    const webcamRef = React.useRef<Webcam>(null);
    const [cameraLigada, setCameraLigada] = React.useState(false);

    const photoContext = React.useContext(PhotoContext);
    const photo = photoContext?.photo;
    const setPhoto = photoContext?.setPhoto ?? (() => { });


    const videoConstraints = {
        width: w,
        height: h,
        facingMode: "user"
    };

    const capture = React.useCallback(
        () => {
            if (!webcamRef.current) return;
            const screenshot = webcamRef.current.getScreenshot();
            setPhoto(screenshot);
            setCameraLigada(false); // Desliga a câmera após capturar
        },
        [webcamRef]
    );

    const desativarCamera = () => {
        setCameraLigada(false);
    };

    const ativarCamera = () => {
        setCameraLigada(true);
    };

    const limparImagem = () => {
        setPhoto(null);
    };

    React.useEffect(() => {
        if (photo) {
            fetch(photo)
                .then(res => res.blob())
                .then(blob => {
                    const file = new File([blob], "webcam.jpg", { type: "image/jpeg" });
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(file);
                    link.download = "webcam.jpg";
                    link.click();
                });
        }
    }, [photo]);

    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="w-full aspect-video flex items-center justify-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
                {cameraLigada ? (
                    <Webcam
                        className="w-full h-full object-cover"
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                    />
                ) : photo ? (
                    <img
                        src={photo}
                        alt="Foto capturada"
                        className="w-full h-full object-cover rounded-xl"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400 p-8">
                        <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-center text-sm">Ligue a câmera para capturar uma foto</span>
                    </div>
                )}
            </div>
            <div className="flex gap-3 justify-center">
                {cameraLigada ? (
                    <>
                        <button
                            onClick={capture}
                            className="bg-green-600 hover:bg-green-700 text-white py-2.5 px-6 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                        >
                            📸 Capturar
                        </button>
                        <button
                            onClick={desativarCamera}
                            className="bg-slate-200 hover:bg-slate-300 text-slate-700 py-2.5 px-6 rounded-lg transition-all duration-200 font-medium"
                        >
                            ⏹️ Desligar
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={ativarCamera}
                            className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-6 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                        >
                            📷 Ligar Câmera
                        </button>
                        {photo && (
                            <button
                                onClick={limparImagem}
                                className="bg-red-500 hover:bg-red-600 text-white py-2.5 px-6 rounded-lg transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                            >
                                🗑️ Limpar
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
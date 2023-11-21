import ytdl from "ytdl-core";
import fs from "fs";

export const download = (videoId) => new Promise((resolve, reject) => {
    const videoURL = "https://youtube.com/shorts/" + videoId
    console.log("teste download " + videoId);


    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly"} )
    .on(
        "info",
        (info) => {
            const seconds = info.formats[0].approxDurationMs / 1000 
            if(seconds > 60){
                throw new Error("a duração desse vídeo é mais que 60 segundos")
            }
        } 
    ).on("end", () => {
        console.log("download concluido");
        resolve()
    })
    .on("error", (error) => {
        console.log("error:" + error);
        reject(error);
    }).pipe(fs.createWriteStream("./tmp/audio.mp4"))
})
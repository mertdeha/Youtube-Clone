import millify from "millify"
import { useState } from "react"
import { Link } from "react-router-dom"


const VideoCard = ({ video, isRow }) => {
    // Video resmini belirleyecek state
    const [isHover, setIsHover] = useState(false)

    // Eğer video üzerine hover olunduysa ve movingThumbnails varsa bunu yoksa veya hover olunmadıysa thumbnail i render et
    const thumbnail =
        isHover && video.richThumbnail
            ? video.richThumbnail[video.richThumbnail.length - 1].url
            : video.thumbnail[video.thumbnail.length - 1].url

    return (
        // Video kart üzerine hover olunma durumuna bağlı olarak isHover state'ini güncelle
        <Link
            to={`/watch?v=${video.videoId}`}
            className={` video-main cursor-pointer ${isRow && "row"}`}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            {/* Resim alanı */}
            <div className="rounded-lg w-full h-auto">
                <img src={thumbnail} alt="" />
            </div>

            {/* Alt detay alanı */}
            <div className={`${!isRow && "mt-4"} flex items-center gap-4`}>
                <img
                    src={video?.thumbnail[0]?.url}
                    alt="chanel-pic"
                    className="size-11 rounded-full pp" />
                <div>
                    <h4 className="font-bold line-clamp-2 video-name">{video.title}</h4>
                    <p className="channel-title">{video.channelTitle}</p>

                    <div className="flex gap-3 items-center font-light text-s">
                        {video.viewCount &&
                            (<p className="view">
                                <span >{millify(video.viewCount)}</span>
                                {!isRow && <span className="p-3">Görüntüleme</span>}*
                            </p>
                            )}


                        {video.isLive ? (
                            <p className="bg-red-500 py-0.5 px-2 rounded-lg"> Canlı</p>
                        ) : (
                            <p className="ago">
                                <span>{video.publishedTimeText}</span>
                            </p>
                        )}


                    </div>
                </div>
            </div>
        </Link>
    )
}

export default VideoCard
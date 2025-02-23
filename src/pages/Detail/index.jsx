import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import api from "../../utils/api"
import ReactPlayer from "react-player"
import ChannelInfo from "../../components/ChannelInfo"
import Description from "../../components/Description"
import Comments from "../../components/Comments"
import VideoCard from "../../components/VideoCard"
import ErrorComponent from "../../components/Error"
import { BasicLoader } from "../../components/Loader"

const Detail = () => {
    // react router domdan usesearch params kurulumunu yap
    const [searchParams] = useSearchParams()

    // Video state i
    const [video, setVideo] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    // Url den gelen v parametresinin karşılığını al
    const id = searchParams.get("v")



    useEffect(() => {

        // Api ya gönderilecek parametreler
        const params = {
            id,
            extend: 1,
        }

        api
            .get(`/video/info?`, { params })
            .then((res) => setVideo(res.data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }, [])



    return (
        <div className="detail-page h-screen overflow-auto">
            {error ? <ErrorComponent /> : loading ? <BasicLoader /> : (
                <div className="page-content">
                    {/* video içeriği*/}
                    <div>
                        <div className="h-[30vh] md:h-[50vh] lg:h-[60vh] rounded overflow-hidden">
                            <ReactPlayer
                                controls
                                url={`https://www.youtube.com/watch?v=${id}`}
                                height={"100%"}
                                width={"100%"} />
                        </div>
                        {/* info */}
                        <div>
                            <h1 className="my-3 text-xl font-bold line-clamp-2">{video?.title}
                            </h1>
                            {/* Channel */}
                            <ChannelInfo video={video} />
                            {/* Description */}
                            <Description video={video} />
                            {/* Comments */}
                            <Comments videoId={id} />
                        </div>
                    </div>

                    {/* önerilen videolar */}

                    <div onClick={() => window.location.reload()} className="flex flex-col gap-5 p-1">
                        {video?.relatedVideos.data.map((i, key) => i.type === "video" && <VideoCard video={i} key={key} isRow />)}
                    </div>


                </div>
            )}

        </div>
    )
}

export default Detail
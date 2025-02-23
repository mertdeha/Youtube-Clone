import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar"
import { useSearchParams } from "react-router-dom";
import api from "../../utils/api";
import VideoCard from "../../components/VideoCard";
import { SkeletonLoader } from "../../components/Loader";
import Error from "../../components/Error";

const Feed = () => {

    // STate kurulumları
    const [videos, setVideos] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    // Url deki parametreye eriş
    const [params] = useSearchParams()
    const selectedCat = params.get("cat");


    // Api'a istek at
    useEffect(() => {
        const url = !selectedCat
            ? "/home"
            : selectedCat === "trending"
                ? "/trending"
                : `/search?query=${selectedCat}`

        setIsLoading(true)


        // api istek atımı
        api
            .get(url)
            .then((res) => setVideos(res.data.data))
            .catch((err) => setError(err.message))
            .finally(() => setIsLoading(false))

    }, [selectedCat])


    return (
        <div className="flex">
            <Sidebar selectedCat={selectedCat} />
            <div className="videos">
                {isLoading ? (
                    <SkeletonLoader />
                ) : error ? (
                    <Error />
                ) : (
                    videos?.map(
                        (video, key) =>
                            video.type === "video" && <VideoCard key={key} video={video} />
                    )
                )}
            </div>
        </div>
    )
}

export default Feed
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MovieList from '../../components/Home/MovieList'
import HomeCarousel from '../../components/Home/HomeCarousel'
import CinemaCluster from '../../components/Home/CinemaCluster'
import LoadingPage from '../LoadingPage'
import { callApiFilm, getFilmList } from '../../redux/reducers/FilmReducer'
import { LayHeThongRapChieu } from '../../redux/reducers/CinemaReducer'
import { history } from '../../utils/history'
import { LayThongTinLichChieuHeThongRap } from '../../services/CinemaClusterService'
import MovieNews from '../../components/Home/MovieNews'
import ApplicationUser from '../../components/Home/ApplicationUser'

export default function Home() {
    const [isLoading, setIsLoading] = useState(true)
    const [showMovieNews, setshowMovieNews] = useState(false) // thêm state này

    const { arrFilm } = useSelector(state => state.FilmReducer)
    const { heThongRapChieu } = useSelector(state => state.CinemaReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        history.listen(() => {
            window.scrollTo(0, 0);
        });
        dispatch(callApiFilm)
        
        const getApiHeThongRapChieu = async() => {
            try {
                const apiHeThongRap = await LayThongTinLichChieuHeThongRap()
                dispatch(LayHeThongRapChieu(apiHeThongRap.data.content))
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        getApiHeThongRapChieu()
    }, [])

   
    const handleShowMovieNews = () => {
        setshowMovieNews(true)
    }

    const handleHideMovieNews = () => {
        setshowMovieNews(false)
    }

    return (
        <div>
            {isLoading ? <LoadingPage /> : <>
                <HomeCarousel />
                <MovieList arrFilm={arrFilm} />
                <CinemaCluster heThongRapChieu={heThongRapChieu} />
                {/* <MovieNews /> */}
                {showMovieNews ? (
                    <>
                        <MovieNews/>
                        <div className="btnRutGon text-center mb-5">
                        <button className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleHideMovieNews}>RÚT GỌN</button>

                        </div>
                    </>
                ) : (
                    <div className="btnXemThem text-center mb-5">
                    <button className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleShowMovieNews}>XEM THÊM</button>
                    </div>
                )}
                <ApplicationUser/>
              
            </>}
        </div>
    )
}

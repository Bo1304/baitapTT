import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../../utils/history';
import { getModalVideo } from '../../redux/reducers/BannerReducer';
import { Progress, Modal } from 'antd';
import moment from 'moment';
import useRoute from '../../hooks/useRoute'
import { LayThongTinPhimChiTiet } from '../../services/FilmService';
import ShowtimeDetail from '../../components/Detail/ShowtimeDetail';
import { callApiLichChieuTheoPhim, getfilmDetail } from '../../redux/reducers/FilmReducer'
import LoadingPage from '../LoadingPage'
import '../Style/DetailsBooking.css';


export default function DetailBooking() {
    const [isLoadingDetail, setIsLoadingDetail] = useState(true)
    const { filmDetail, lichChieuTheoPhim } = useSelector(state => state.FilmReducer)
    const { param, navigate } = useRoute()
    const [percent, setPercent] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    let dataVideoModal = useSelector(state => state.BannerReducer.modalData)

    const dispatch = useDispatch()


    useEffect(() => {
        history.listen(() => {
            window.scrollTo(0, 0);
        });
        const callApiChiTiet = async (id) => {
            try {
                const apiChiTiet = await LayThongTinPhimChiTiet(id)
                dispatch(getfilmDetail(apiChiTiet.data.content))
                dispatch(callApiLichChieuTheoPhim(apiChiTiet.data.content.maPhim))
                setIsLoadingDetail(false)
            } catch (error) {
                history.replace('/notfound')
            }
        }
        callApiChiTiet(param.id)
    }, [])

    const showModal = (link) => {
        dispatch(getModalVideo(link))
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    if (filmDetail) {
        setTimeout(() => {
            setPercent(() => {
                return filmDetail.danhGia * 10
            })
        }, 500)
    }

    return (
        <div>
            {isLoadingDetail ? <LoadingPage /> :
                <div className='relative film-detail'>
                    <img src="https://assets.entrepreneur.com/content/3x2/2000/1624337878-luca-bravo-XJXWbfSo2f0-unsplash5.jpg?width=700&crop=2:1&blur=50" className='w-full h-[90rem] lg:h-[80rem] object-cover object-top blur-md' />
                    <div className="container absolute z-[5] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[70%] p-4">
                        <div className='md:flex'>
                            {/* <img className='w-36 md:w-32 h-full' src={filmDetail.hinhAnh} alt={filmDetail.hinhAnh} /> */}
                            <div class="film-detail">
                                <div class="film-thumbnail">
                                    <img class="w-36 md:w-96 h-full" src={filmDetail.hinhAnh} alt={filmDetail.hinhAnh} />                    
                                    <button onClick={() => showModal(filmDetail.trailer)} className=" ">
                                    <i class="play-icon fas fa-play text-red-600">
                                    </i>
                                    </button>
                                   
                                </div>
                            </div>

                            <div className='md:pl-8 '>
                                <p className='font-bold text-white mt-2'>{moment(filmDetail.ngayKhoiChieu).format("DD-MM-YYYY")}</p>
                                <h2 className='text-white tracking-wide text-[1rem] md:text-[1.3rem] lg:text-[2.5rem] uppercase mb-3 font-semibold'>{filmDetail.tenPhim}</h2>
                                <p className='w-60 text-gray-300 tracking-wide text-justify'>{filmDetail.moTa.length > 300 ? filmDetail.moTa.slice(0, 300) + '...' : filmDetail.moTa}</p>

                                <div className='hidden xl:block mt-16'>
                                   
                                    {isModalOpen ? <Modal
                                        footer={null}
                                        centered
                                        closable={false}
                                        open={isModalOpen}
                                        onCancel={handleCancel}>
                                        <iframe id='videoId' width='100%' height='100%' src={`https://www.youtube.com/embed/${dataVideoModal}`} title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                                    </Modal> : ''}
                                    <a href='#showtime' className=
                                        " w-30 bg-transparent bg-orange-700 tracking-widest text-[16px] hover:bg-orange-800 text-white font-semibold hover:text-white border-orange-700 border-[3px] hover:border-transparent rounded uppercase px-[5rem] py-[0.7rem] mt-4 ml-4"
                                        style={{
                                            paddingLeft: '40px',
                                            paddingRight: '40px'
                                        }}
                                    >
                                        Mua vé ngay
                                    </a>
                                </div>
                            </div>
                            <div className='hidden xl:block pl-6' >
                                <Progress trailColor="#e6f4ff" status='success' type="circle" percent={percent} format={(percent) => `${percent / 10} Sao`} />
                            </div>
                            <div className='overlayDetail'></div>
                        </div>
                        {lichChieuTheoPhim ? <ShowtimeDetail heThongRapChieu={lichChieuTheoPhim.heThongRapChieu} /> : ''}
                    </div>
                </div>}
        </div>
    )
}

import { useState } from 'react';
import { Card, Pagination } from 'antd';
import Slider from "react-slick";
import useRoute from '../../hooks/useRoute';

export default function MultipleRowSlick(props) {

    const { navigate } = useRoute();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const filteredFilms = props.arrFilm.filter(item => item.sapChieu === props.status);
    const totalFilms = filteredFilms.length;
    const totalPages = Math.ceil(totalFilms / pageSize);

    const handlePageChange = (page) => setCurrentPage(page);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalFilms);
    const displayedFilms = filteredFilms.slice(startIndex, endIndex);
    

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "40px",
        speed: 500,
        rows: 1,
        slidesToScroll: 1,
        initialSlide: 2,
        dots: false,
        slidesToShow: displayedFilms.length < 5 ? displayedFilms.length : 5, // set slidesToShow tối đa bằng 5
        variableWidth: true, // set variableWidth bằng true
   
    };
    

    return (
        <div className='animate__animated animate__fadeInUp animate__fast pb-4'>
                <Slider {...settings}>

              
                {displayedFilms.map((film, index) => (
                    <Card className='slick-card' bordered={false} key={index}>
                        <div className="flip-card">
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <img src={film.hinhAnh} className='w-full h-full' alt={film.hinhAnh} onError={(e) => { e.target.onerror = null; e.target.src = 'https://picsum.photos/75/75' }} />
                                </div>
                                <div className="flip-card-back">
                                    <div className='overlay-card-back'></div>
                                    <img src={film.hinhAnh} className='w-full h-full' alt={film.hinhAnh} onError={(e) => { e.target.onerror = null; e.target.src = 'https://picsum.photos/75/75' }} />
                                    <button onClick={() => navigate(`detail/${film.maPhim}`)} className='btn-card text-base uppercase'
                                    style={{
                                        width:'100%',
                                        marginTop:'200px',
                                        paddingBottom:'45px',
                                        backgroundColor:'#ce3017',
                                    }}
                                    >Mua Vé</button>
                                </div>
                                    
                            </div>
                        
                        </div>
                        <h2 className='film-name-card mt-3 uppercase font-medium'>{
                            film.tenPhim.length > 26 ? film.tenPhim.slice(0, 26) + '...' : film.tenPhim
                        }</h2>
                    </Card>
                ))}
          </Slider>
            <Pagination className="mt-10"
            style={{
                textAlign:'center'
            }}
                current={currentPage}
                pageSize={pageSize}
                total={totalFilms}
                onChange={handlePageChange}
                showSizeChanger={false}
            />
         
        </div>
    )
}

import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import MultipleRowSlick from './MultipleRowSlick';

import { useLocation } from 'react-router-dom';
import useRoute from '../../hooks/useRoute';


export default function MovieList(props) {
    const { arrFilm } = props
    const [keyword, setKeyword] = useState('')
    const {navigate} = useRoute()

    const location = useLocation()

    useEffect(() => {
        if (location.hash) {
            let elem = document.getElementById(location.hash.slice(1))
            if (elem) {
                elem.scrollIntoView({ behavior: "smooth" })
            }
        } else {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
        }
    }, [location,])

    return (
        <div id='movie-list' className="movie-list container mx-auto md:px-8 lg:px-10">

           
         
            <Tabs className='hidden md:block' defaultActiveKey="1" items={[         
                { label: 'Phim', key: '2', children: <MultipleRowSlick status={true} arrFilm={arrFilm} /> },
            ]} />

       
      
        </div>
    )
}

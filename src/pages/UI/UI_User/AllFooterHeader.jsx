import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

export default function AllFooterHeader() {
  return (
    <>
        <Header />
        <Outlet />
        <Footer />
    </>
  )
}

// Outlet để dùng header và footer sd cho các component khác mà k cần add lại header và footer 
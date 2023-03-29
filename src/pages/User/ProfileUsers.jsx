import React from 'react'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { callApiThongTinNguoiDung } from '../../redux/reducers/UserReducer'
import NotFound from '../NotFound'
import { Tabs ,Button, Form, Input, InputNumber} from 'antd'
import moment from 'moment'
import _ from "lodash";
import { getLocalStorage, removeLocalStorage, SwalConfig } from '../../utils/config'
// import '../Style/ProfileUser.css'
import { LOCALSTORAGE_USER } from '../../utils/constant'
const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  
  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  /* eslint-enable no-template-curly-in-string */
  
  const onFinish = (values) => {
    console.log(values);
  };


const ThongTinNguoiDung = (thongTinNguoiDung) => {
    return <div className='h-[100vh] relative'>
   
     
 
            <div className="row" 
            style={{
                marginLeft:'435px'
            }}
            >
                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5">
                        <img className="rounded-circle mt-5" width="150px" src={`https://i.pravatar.cc/150?u=${getLocalStorage(LOCALSTORAGE_USER).taiKhoan} `} />
                      
                        <span> </span>
                    </div>
                </div>
                <Form
                    {...layout}
                    name="nest-messages"
                    onFinish={onFinish}
                    style={{
                        maxWidth: 600,
                    }}
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        name={['user', 'name']}
                        label="Tài Khoản"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                       <Input defaultValue={thongTinNguoiDung?.taiKhoan} />
                    </Form.Item>

                    <Form.Item
                        name={['user', 'email']}
                        label="Email"
                        rules={[
                            {
                                type: 'email',
                            },
                        ]}
                    >
                        <Input  defaultValue={thongTinNguoiDung?.email}/>
                    </Form.Item>
                    <Form.Item
                  
                        name={['sdt', 'phone']}
                        label="Số điện thoại"
                        rules={[
                            {
                                required: true,
                                
                            },
                        ]}
                    >
                        <InputNumber  className='w-40'  defaultValue={thongTinNguoiDung?.soDT}/>
                    </Form.Item>

                    <Form.Item
                      
                        name={['user', 'name']}
                        label="Họ tên Người dùng"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                       <Input defaultValue={thongTinNguoiDung?.hoTen} />
                    </Form.Item>

                    <Form.Item
                        name={['user', 'name']}
                        label="Loại tài khoản người dùng"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                       <Input  className='w-60' defaultValue={thongTinNguoiDung?.maLoaiNguoiDung} />
                    </Form.Item>
                </Form>


            </div>
        </div>
  
}

const KetQuaDatVe = (thongTinNguoiDung) => {
    const renderTicketItem = () => {
        return thongTinNguoiDung.thongTinDatVe?.map((item, index) => {
            return <div key={index} className="p-2 lg:w-1/3 md:w-1/2 w-full">
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                    <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={item.hinhAnh} />
                    <div className="flex-grow">
                        <h2 className="text-gray-900 title-font font-medium">{item.tenPhim}</h2>
                        <h2 className="text-gray-700 title-font font-medium">{_.first(item.danhSachGhe).tenHeThongRap} - {_.first(item.danhSachGhe).tenCumRap}</h2>
                        <p className="text-gray-500">Ngày đặt: {moment(item.ngayDat).format('DD-MM-YYYY ~ hh:MM:A')}</p>
                        <p className="text-gray-500">Thời lượng: {item.thoiLuongPhim} phút</p>
                        <p>Ghế: {item.danhSachGhe.map((ghe, iGhe) => {
                            return <button key={iGhe} className='mb-2 text-orange-600 font-semibold text-lg mx-1 px-1 border-orange-100'>{ghe.tenGhe}</button>
                        })}</p>
                    </div>
                </div>
            </div>
        })
    }
    return <div>
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-10 mx-auto">
                <div className="flex flex-col text-center w-full mb-10">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 uppercase">lịch sử đặt vé khách hàng</h1>
                </div>
                <div className="flex flex-wrap -m-2">
                    {renderTicketItem()}
                </div>
            </div>
        </section>
    </div>
}


export default () => {
    const { thongTinNguoiDung, isLogin } = useSelector(state => state.UserReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(callApiThongTinNguoiDung)
    }, [])

    const items = [
        { label: <span className='text-[11px] sm:text-[14px]'>01. THÔNG TIN NGƯỜI DÙNG</span>, key: 1, children: ThongTinNguoiDung(thongTinNguoiDung) },
        { label: <span className='text-[11px] sm:text-[14px]'>02. LỊCH SỬ ĐẶT VÉ</span>, key: 2, children: KetQuaDatVe(thongTinNguoiDung) },
    ];

    return (
        <>
            {isLogin ? <Tabs className='pt-[6rem] min-h-[100vh] booking' items={items} /> : <NotFound />}
        </>

    )
}



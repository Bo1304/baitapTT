import { NavLink, Outlet } from 'react-router-dom'
import {MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, SnippetsOutlined, FileAddOutlined} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { getLocalStorage, removeLocalStorage } from '../../../utils/config';
import { LOCALSTORAGE_USER } from '../../../utils/constant';
import useRoute from '../../../hooks/useRoute';
import { LayThongTinTaiKhoan } from '../../../services/UserService';
import LoadingPage from '../../../pages/LoadingPage';
import NotFound from '../../../pages/NotFound';
const { Header, Sider, Content } = Layout;

export default function AdminTemplate() {
    const [collapsed, setCollapsed] = useState(false);
    const { navigate } = useRoute()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const token = getLocalStorage(LOCALSTORAGE_USER)
        if (!token) {
            navigate('/login')
        }
        else if (token.maLoaiNguoiDung !== 'QuanTri') {
            navigate('/notfound')
        }
        else {
            const callApiThongTinNguoiDungCheckAdmin = async () => {
                try {
                    const apiNguoiDung = await LayThongTinTaiKhoan()
                    if (apiNguoiDung.data.content.maLoaiNguoiDung !== token.maLoaiNguoiDung) {
                        navigate('/notfound')
                    }else {
                        setIsLoading(false)
                    }
                } catch (error) {
                    removeLocalStorage(LOCALSTORAGE_USER)
                    navigate('/notfound')
                }
            }
            callApiThongTinNguoiDungCheckAdmin()
        }
    })

    return (
        <>
            {isLoading ? <LoadingPage /> : <>
            {/* Màn hình từ 1280px trở lên mới cho vào trang Admin */}
            <div className='hidden xl:block'>
                <Layout className='min-h-screen'>
                    <Sider trigger={null} collapsible collapsed={collapsed} className=''>
                        <NavLink to='/' aria-label="Back to homepage" className="flex items-center justify-center p-2">
                        <img src="http://demo1.cybersoft.edu.vn/logo.png" className="w-56 bg-white mr-2" alt="" />
                        </NavLink>
                        <Menu
                            theme="dark"
                            mode="inline"
                            items={[
                                {
                                    key: '1',
                                    icon: <UserOutlined />,
                                    label: 'Users',
                                    children: [{
                                        key: '11',
                                        icon: <SnippetsOutlined />,
                                        label: <NavLink to='user'>List Users</NavLink>,
                                    },
                                    {
                                        key: '12',
                                        icon: <FileAddOutlined />,
                                        label: <NavLink to='user/addnewuser'>Add Users</NavLink>,
                                    },
                                    ]
                                },
                                {
                                    key: '2',
                                    icon: <SnippetsOutlined />,
                                    label: 'Films',
                                    children: [{
                                        key: '21',
                                        icon: <SnippetsOutlined />,
                                        label: <NavLink to='film'>List Users</NavLink>,
                                    },
                                    {
                                        key: '22',
                                        icon: <FileAddOutlined />,
                                        label: <NavLink to='film/addnewfilm'>Add Film</NavLink>,
                                    },
                                    ]
                                },
                
                            ]}
                        />
                    </Sider>
                    <Layout className="site-layout">
                        <Header className="site-layout-background pl-4 text-[1.8rem]">
                            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: () => setCollapsed(!collapsed),
                            })}
                        </Header>
                        <Content
                            className="site-layout-background contentAdmin"
                            style={{
                                margin: '24px 16px',
                                padding: 24,
                                minHeight: 500,
                            }}>
                            <Outlet />
                        </Content>
                    </Layout>
                </Layout>
            </div>
            {/* Màn hình dưới 1280px KHÔNG cho vào trang Admin */}
             <div className="block xl:hidden">
                <NotFound />
            </div>
            </>}
        </>
    );
};

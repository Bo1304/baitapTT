
import React, { useEffect, useState } from "react";
import './Footerz.css';
import _ from 'lodash';
import { NavLink, useNavigate } from "react-router-dom";
import { LayThongTinLichChieuHeThongRap } from "../../../services/CinemaClusterService";
import { useSelector } from 'react-redux';


export default function Footer(props) {

  const [dataMovie, setDataMovie] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchScheduleByTheater() {
      try {
        const res = await LayThongTinLichChieuHeThongRap();
        setDataMovie(res.data.content);

        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchScheduleByTheater();
  }, []);

  return (
    <div>
      <footer class="site-footer">
        <div class="container">
          <div class="row flex gap-12 mb-5" style={{
            marginLeft: '350px',
          }}>
            <div class="col-sm-12 col-md-6">
              <h6>TIX</h6>
              <div className="containerTix flex gap-12">
                <div className="contentTix1">
                  <ul class="footer-links">
                    <li><a href="http://scanfcode.com/category/c-language/">FAQ</a></li>
                    <li><a href="http://scanfcode.com/category/front-end-development/">Brand Guidelines</a></li>

                  </ul>
                </div>
                <div className="contentTix2">
                  <ul class="footer-links">
                    <li><a href="http://scanfcode.com/category/c-language/">
                      Thỏa thuận sử dụng</a></li>
                    <li><a href="http://scanfcode.com/category/front-end-development/">Chính sách bảo mật</a></li>

                  </ul>
                </div>
              </div>


            </div>

            <div class="col-xs-6 col-md-3">
              <h6>ĐỐI TÁC</h6>
              <div className="grid grid-cols-3 gap-5">
              {dataMovie.map((banner) => (
            
                  <div >
                    <img key={banner.maHeThongRap} src={banner.logo} alt="sd" style={{
                      width: '35px',
                    }} />
                  </div>
              
              ))}
            </div>
            </div>

            <div class="col-xs-6 col-md-3">
              <h6>MOBILE APP</h6>
              <div className="imgIosAndroid "
                style={{
                  marginLeft: '20px',
                }}>
                <a href=""><img className='mr-2' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABaCAMAAADHGlvmAAAAgVBMVEUAAACVlZWnp6eWlpaVlZWhoaGVlZWWlpaXl5ebm5uUlJSVlZWenp6VlZWVlZWVlZWWlpaXl5eZmZmVlZWUlJSVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWXl5eVlZWVlZWVlZWWlpaVlZWUlJSVlZWUlJSWlpaWlpaVlZWYmJiUlJT4ZcJDAAAAKnRSTlMA+AVP8guOKx0Q7qkT472zZTIX586hiYFfx6WcRifc1nk9697Rl2pVciP1WFzxAAACV0lEQVRYw62Y6ZKqMBCFEzbZkUVARBgdt+n3f8BbtxxtenApOXx/U36VmNOdBPU5Ruusc99TOK7j038WsCk8arqSoqqzTze2mMk4EhNCKjsmxsdmNVRRDLlWNOQLUS3Zg0bCtYRqrQAaEtSAKpWqzphvWiZSOlqokvk2Mc8QVzBU6Z1CiIYqE6tEYqxWQfyw6oD2wMV9fZUB9+Xf5Tnu59NYOkGSrL5a+9Zu1lEfO6ZxHVwVvtb7PnHO77LRNlzFOl56spTKTpb4SYwLjGVEEt3c0+SdChphlU9sbUcP6KpUKdtsND1kXz9K0ZGeoXN6QWCPNutAUykyqVpENJ0+FNHeE8J6sEyvJ4wNuxIC4TtBjZr05abKfFD1zbeeI6g6ZJwsDaoGiXAwVe6yythjrp1iTExVyssQQm7LAwvhNFRtIZUlpnWG65CpIJcpXAHkCoVrjagiJeigHihdFuJKpAsq7GBGVzyjq5AuH4q9dH0TgitcBeSqhSshdCPn6tBaFNEFcsmHZIu5xIeKkDA2eI9mTLiBMdZCPMIwoh/48GDyFK4iRi85rTjJ7zp3NAN643EqYK4Py3IWl8vvQ5ReXYmJQYvcxFU6+3UZeMRWcB0xXJTwxBLF1KArne84aliEFpLlKsEGzhbj5ZNVB4M1YGB1qkYc4RUydg/fwZiFNUHliz3EEms+8EzsipV6SjC5PYwxPpMFhnolG+W/KM2tZ3vbs9ON36FvOFnE+OVWMelKE5Of1Vuy+y/i+u8awsutoewr+5WEbbXTbCozfDxoXqrqtBv/U/8AtXW2fqhv80sAAAAASUVORK5CYII=" class="jss145" width="30" alt="" />
                </a>
                <a href=""><img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABXCAMAAAB7hEg4AAAAe1BMVEUAAACVlZWXl5eWlpaUlJSUlJSUlJSWlpaVlZWVlZWVlZWWlpaUlJSjo6OVlZWVlZWfn5+WlpaVlZWXl5eVlZWVlZWVlZWUlJSXl5eenp6VlZWtra2VlZWVlZWVlZWVlZWZmZmbm5uVlZWVlZWVlZWVlZWWlpaVlZWUlJTu8U1AAAAAKHRSTlMA51MY6UO6WiTD+JatBYDcDDvJNfHToJEuE4gI4ox4ayAQtqZ9ckhgkElVywAAAgxJREFUWMPt2NmSojAYhuHfaVAIKqtsCojrd/9XOB0DZtol8ls9B13NcySWvpVoQmnoR1m0ZNAuOK1UOPRUjJLTCuE+H/NKOMSRoaEnDjgQS7BJtvRQLlYL4jlhp6Lx7FB6XlnP4uAywwgxcaU4U1hF0ERU5nRERWyFlfi4sxL+mp1a1wkeshr2x7XBU6uQtexLmIiasSCmeGE+dJ5thJd262ETdDHAfFDLw0VS1o/WxLES6tFyQOoPlFAuMdzw1/oF9oCN2C0jeTHHDU9+BlBeb8slOtvPd91N0pWbG53m1XK/Tiuy4z3uePnJv06YzM5gOJlbUzDszVMUYLCMrRgsgak1A8uHqXUEi2Nq1d/YOk9YtvRfbSs3SkN6k52587rt7wwCUiYf8r9HD9JEDcURUBp+S3/zVqF+H/SXC35Lb5Tq600q57f0RnG/bmeb39IbZfKNLWtsja2xNbbG1u9p7dAL+S0bvZX6m94RLb9VoJfKlq2v+C3a60lJaTfI9p1W4UO6njM0n9dJFrz3OyfINhDRia4K+exbLalY0D1+q/OTWuz/HSY+GFwyCgUGS3Iyi10MtHPopcCRIvQy52KP3tSRAhqsG54+PPBujybG1tgaWyY79I7qiRK9lNtaohfe3nIbbusjgRKpa32wZgW8kj4d2Gypk1uQkpD48r0l/Kr4Z6jZRkxSw1nJX+vMF/qKdZ1sAAAAAElFTkSuQmCC" width='30' class="jss145" />
                </a>
              </div>
            </div>

            <div class="col-xs-6 col-md-3">
              <h6>SOCIAL</h6>
              <div className="imgFbZalo ">
                <img className="mr-2" alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAMAAAAPdrEwAAAAflBMVEUAAACVlZWWlpaUlJSUlJSampqVlZWVlZWXl5eWlpaXl5ewsLCVlZWXl5eVlZWVlZWioqKUlJSVlZWVlZWVlZWXl5eenp6YmJiVlZWVlZWVlZWVlZWVlZWVlZWWlpaXl5eVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWWlpaUlJRq2G1aAAAAKXRSTlMAwXf4zxX8Y0OiIwTyHNy7Ce6mlHBQDynVheCd6o1qMl85ta99Vz7LSFONebAAAAKSSURBVFjD3dnX0towEIbhz2AJ415woxn4aXv/NxggM4EEw0qydZLn2Lyj0SJAAxSlIvL92vcjUQUYS7qf5G5IL5aHthQYKlokU+rVbPYwV80S+iZua8MFF1NiOVdoq+eSlLgnvbFWhSRlF41ND2Zr0iFXQnWTHdKVlVBRZmSgSPnNKMiM63NH70Cm1t+nKS5kLiy/DTCmIeTu85obGkZ+Wnfl0lBTD30Ch4YLO/TY0BjiCm9KGsfPW9kPaSQT/MNRmlJSTLbb7eIu//hQjb/MiBfvUqVXOHglMmJtAtXFzPBipbGFfDqrXmYoiZNDPU1HnUWHQiedVRqLXqEvzS+7IJanl85SPKQhsVK9NO3wsCNWjKdJs7zL6I55byfEujzLHqmQEW6EJJbzsmhSssDNiWykE9zMraSn98HHVtJ0BgTZSU+AM/NI5t68HMaZ+1vMf+hsmUfm6MNPvwFaw/SCmyMwN0xv+M+Gg2E6J4bAxTDtECNCY5bmj4OP2DA9tZauiE2zG5J4N92zGXkPO4W0a+mgUwTHVlrgx1a6QmErHWBiKb0GSkvpBKgtpTdAENpJnwAkdtIR86x5usFNbSW9wV1sI33GXWshvcRDbSHdMt9F5mnpM3doPs3fpt2x0x1z9TdPH/DUjJvu8OQZp/nraz5iOhPM/d88PWOugeZph/l5aJ5eR2/ptBkn7eFdHX45uNM/JH11RB9vSoOt0K+UNNBPgA9mNEwS4KOdHLTmFF9cQzJWMP+idGsyI4/giIRMrK9QMJEGAxRQ0rmkJ1xAVbDNdHZ5LqBBFMpH09lDk2hD4snDHgaqBbfn66KGqbqNP88uvwYYxN/my/ds0p4DjKHqyu1xs5rn81XRLk7nCP+vXxyyUrzi8kSkAAAAAElFTkSuQmCC" class="jss145" width="30" />
                <img alt="" src="data:image/png;base64,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" width="30" />

              </div>
            </div>
          </div>

          <hr style={{
            width: '75%',
            marginLeft: '255px',
          }} />

        </div>
        <div class="container mt-5">
          <div class="row flex gap-16 ml-64">
            <div class="col-md-8 col-sm-6 col-xs-12">
              <img alt="" src="data:image/jpeg;base64,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" width="100"></img>
            </div>

            <div class="col-md-8 col-sm-6 col-xs-12">
              <p class="copyright-text text-white" style={{
                fontSize: '12px',
                fontWeight: ' bold',
                marginBottom: '10px',
              }}>

                TIX – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION
              </p>
              <p class="copyright-text text-white"
                style={{
                  fontSize: '12px',
                  fontWeight: ' bold',
                }}
              >

                Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ Chí Minh, Việt Nam.
                <br />
                Giấy chứng nhận đăng ký kinh doanh số: 0101659783,
                <br />
                đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế hoạch và đầu tư Thành phố Hồ Chí Minh cấp.
                <br />
                Số Điện Thoại (Hotline): 1900 545 436
              </p>
            </div>

            <div class="col-md-8 col-sm-6 col-xs-12">
              <img alt="" src="https://classic.vn/wp-content/uploads/2018/01/20150827110756-dathongbao.png" width="100" />
            </div>

          </div>
        </div>
      </footer>
    </div>
  )
}

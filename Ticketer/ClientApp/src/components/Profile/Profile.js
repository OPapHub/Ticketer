import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { getUser, setUser } from './../../userConfig';

const Cabinet = () => {
    const navigate = useNavigate();
    const [selectDelete, setSelectDelete] = useState(true);

    const handleDelete = async (event) => {
        const url = 'https://localhost:7023/api/User/delete/' + getUser().id;

        try {
            const response = await fetch(url, {
                method: 'DELETE'                              
            });

            if (!response.ok) {
                console.error('Error during DELETE request');
                return;
            }
            setUser(null);
            console.log(getUser());            
            navigate('/');

        } catch (error) {
            console.error('Error during POST request:', error.message);
        }
    }

    const renderProfileInfo = (user) => {
        return (
            <div className="cabinet">
                <div className="cabinet_container">
                    <section className="top_section">
                        <div className="info_nav">
                            <div className="inner">
                                <div className="user_name_wrap">
                                    <div className="inner-flex">
                                        <h1>{user.name.split(' ').map(v => <span key={v}>{v} </span>)}</h1>
                                    </div>
                                </div>
                                <div className="nav-wrap">
                                    <ul className="nav wd">
                                        <li>
                                            <a href="/" className="tickets">
                                                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                                                    <g fill="none" fillRule="evenodd"><path d="M0 0h24v24H0z"></path><path d="M20 6v2.537A4.003 4.003 0 0 0 18 12c0 1.477.805 2.771 2 3.463V18H4v-2.537A4 4 0 0 0 6 12a4 4 0 0 0-2-3.463V6h16zm0-2H4a2 2 0 0 0-2 2v4a2 2 0 1 1 0 4v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 1 1 0-4V6a2 2 0 0 0-2-2z" fill="#FFF" fillRule="nonzero"></path></g>
                                                </svg>
                                                <span>Tickets</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href={`/cabinet`} className="profile">
                                                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                                                    <g fill="none" fillRule="evenodd"><path d="M0 0h24v24H0z"></path><path d="M12 5c-2.75 0-5 2.25-5 5 0 1.516.707 2.863 1.781 3.781A7.005 7.005 0 0 0 5 20h2c0-2.773 2.227-5 5-5s5 2.227 5 5h2c0-2.7-1.531-5.05-3.781-6.219C16.293 12.863 17 11.516 17 10c0-2.75-2.25-5-5-5zm0 2c1.668 0 3 1.332 3 3s-1.332 3-3 3-3-1.332-3-3 1.332-3 3-3z" fill="#FFF" fillRule="nonzero"></path></g>
                                                </svg>
                                                <span>Profile</span></a>
                                        </li>
                                        <li>
                                            <a href={`/help`} className="help">
                                                <svg width="24" height="24" xmlns="https://www.w3.org/2000/svg">
                                                    <g fill="none" fillRule="evenodd"><path d="M0 0h24v24H0z"></path><path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm1 11v2h-2v-2h2zm-1-8c.897 0 1.705.363 2.229.938.523.574.771 1.319.771 2.062 0 1.286-.73 2.18-1.244 2.773-.515.594-.756.892-.756 1.227h-2c0-1.202.759-1.978 1.244-2.537.485-.56.756-.898.756-1.463 0-.296-.1-.551-.25-.717C12.6 9.118 12.406 9 12 9c-.396 0-.588.12-.744.293-.156.174-.256.44-.256.707H9c0-.732.25-1.467.768-2.043C10.286 7.381 11.093 7 12 7z" fill="#FFF" fillRule="nonzero"></path></g>
                                                </svg>
                                                <span>Help</span></a>
                                        </li>
                                        <li>
                                            <div className="divider"></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="profile_page">
                    <div className="profile_container">
                        <section className="main_content">
                            <div className="info_block">
                                <div className="main_info">
                                    <h4 className="info_block_heading">Contact information</h4>
                                    <p className="info_block_desc">With a phone number, you can see all your orders. Mail is required for backup access to the office</p>
                                    <div className="fields_container">
                                        <div className="field">
                                            <h5>Your City:</h5>
                                            <p>Krakow</p>
                                            {/*<select id="city">*/}
                                            {/*    <option value="0">Undefined</option>*/}
                                            {/*    <option value="1">Kraków</option>*/}
                                            {/*    <option value="2">Warszaw</option>*/}
                                            {/*    <option value="3">Łódż</option>*/}
                                            {/*    <option value="4">Чернігів</option>*/}
                                            {/*</select>*/}
                                            {/*<p>&nbsp;</p>*/}
                                            {/*<div class="buttons">*/}
                                            {/*    <div class="button dropdown">*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}
                                        </div>
                                        <div className="field">
                                            <h5>Mobile phone:</h5>
                                            <p className="phone">0000000000</p>
                                            <div className="edit">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 528.899 528.899">
                                                    <path d="M328.883 89.125l107.59 107.589-272.34 272.34L56.604 361.465l272.279-272.34zm189.23-25.948l-47.981-47.981c-18.543-18.543-48.653-18.543-67.259 0l-45.961 45.961 107.59 107.59 53.611-53.611c14.382-14.383 14.382-37.577 0-51.959zM.3 512.69c-1.958 8.812 5.998 16.708 14.811 14.565l119.891-29.069L27.473 390.597.3 512.69z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="field">
                                            <h5>E-mail:</h5>
                                            <p className="email">{user.email}</p>
                                            <div className="edit">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 528.899 528.899">
                                                    <path d="M328.883 89.125l107.59 107.589-272.34 272.34L56.604 361.465l272.279-272.34zm189.23-25.948l-47.981-47.981c-18.543-18.543-48.653-18.543-67.259 0l-45.961 45.961 107.59 107.59 53.611-53.611c14.382-14.383 14.382-37.577 0-51.959zM.3 512.69c-1.958 8.812 5.998 16.708 14.811 14.565l119.891-29.069L27.473 390.597.3 512.69z">
                                                    </path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="info_block">
                                <h4 className="info_block_heading">Delete Profile</h4>
                                <p className="info_block_desc">
                                    If you want to delete your account, that button is here. You can always register again
                                </p>
                                <div className="mb-24"></div>
                                <div data-v-b1e126c0="" className="btn transparent" onClick={() => setSelectDelete(!selectDelete)}>
                                    <svg width="18" height="20" xmlns="http://www.w3.org/2000/svg" data-v-b1e126c0=""><g fill="none" fillRule="evenodd"><path d="M-3-2h24v24H-3z"></path> <path d="M6.594 0L6.28.281 5.563 1H0v2h1v14c0 1.645 1.355 3 3 3h11c1.645 0 2-1.355 2-3V3h1V1h-5.563L11.72.281 11.406 0H6.594zm.843 2h3.125l.72.719.312.281H15v14c0 .555.555 1 0 1H4c-.555 0-1-.445-1-1V3h3.406l.313-.281L7.437 2zM6 6v9h2V6H6zm4 0v9h2V6h-2z" fill="#FFF" fillRule="nonzero"></path></g></svg>
                                    Delete Profile
                                </div>
                                <div className={`modal-popup-black ${selectDelete ? 'none-display' : ''}`}>
                                    <div className="bg"></div>
                                    <div className="border">
                                        <div className="pop_up">
                                            <div className="head">
                                                <p className="title">Are you sure you want to delete your account?</p>
                                                <div className="close" onClick={() => setSelectDelete(!selectDelete)}></div>
                                            </div>                                            
                                            <div className="content">
                                                <p>You can always register again, we'll be waiting for you!</p>
                                            </div>
                                            <div className="buttons-btm">
                                                <div className="btn transparent" onClick={() => setSelectDelete(!selectDelete)}>
                                                    Do not delete
                                                </div>
                                                <div className="btn" onClick={handleDelete}>
                                                    Delete
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>                            
                        </section>
                    </div>
                </div>
            </div>
        );
    }


    const contents = renderProfileInfo(getUser());

    return (
        <>
            {contents}
        </>
    )
}

export default Cabinet;
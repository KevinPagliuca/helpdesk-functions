import React from 'react';

import { FaCamera } from 'react-icons/fa';

import './styles.css';

import userImg from '../../../assets/user.png';

const AvatarImg = () => {
    return (
        <div className="personal-image">
            <label className="label">
                <input type="file" />
                <figure className="personal-figure">
                    <img src={userImg} className="personal-avatar" alt="avatar" />
                    <figcaption className="personal-figcaption">
                        <FaCamera />
                    </figcaption>
                </figure>
            </label>
        </div>
    );
}

export default AvatarImg;
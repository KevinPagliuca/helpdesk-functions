import React, { useState } from 'react';

import './styles.css';

import Dropzone from '../../Dropzone';

const AvatarImg = () => {
    const [SelectedFile, setSelectedFile] = useState([]);
    return (
        <Dropzone onFileUploaded={setSelectedFile} />
    );
}

export default AvatarImg;
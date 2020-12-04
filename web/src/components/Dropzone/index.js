import React, { useCallback, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';

import './dropzone.css';

function Dropzone({ onFileUploaded }) {
    const [selectedFileUrl, setSelectedFileUrl] = useState(sessionStorage.getItem('image_url'));

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        const file = acceptedFiles[0];
        
        const fileUrl = URL.createObjectURL(file);

        setSelectedFileUrl(fileUrl);
        onFileUploaded(file);
    }, [onFileUploaded]);


    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*'
    });

    return (
        <div {...getRootProps()} className="personal-image">
            {
                isDragActive
                    ?
                    <p>Arraste seu arquivo aqui para fazer o Upload.</p>
                    :
                    null
            }
            <input {...getInputProps()} accept="image/*" />
            <label className="label">

                <figure className="personal-figure">
                    <img src={selectedFileUrl} className="personal-avatar" alt="avatar" />
                    <figcaption className="personal-figcaption">
                        <FaCamera />
                    </figcaption>
                </figure>
            </label>

        </div>
    )
}

export default Dropzone;
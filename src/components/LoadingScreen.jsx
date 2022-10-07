import React from 'react';
import '../styles/loading.css'

const LoadingScreen = () => {
    return (
        <div className='overlay'>
            <div class="lds-facebook"><div></div><div></div><div></div></div>
        </div>
    );
};

export default LoadingScreen;
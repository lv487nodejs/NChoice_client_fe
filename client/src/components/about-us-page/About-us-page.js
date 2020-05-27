import React, {useEffect} from 'react';

import {StaticAboutUsPageContent} from './index'
import './About-us-page.css'

const AboutUsPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <StaticAboutUsPageContent/>
    )
}

export default (AboutUsPage);

import React, { useEffect, useState } from "react";
import { getHtml } from '../configuracao/configuracaoActions';

const HomePage = () => {

    const [html, setHtml] = useState('');

    useEffect(() => {
        getHtml(setHtml);
    }, [])

    return (
        <div dangerouslySetInnerHTML={{ __html: html }} />
    );
}

export default HomePage;
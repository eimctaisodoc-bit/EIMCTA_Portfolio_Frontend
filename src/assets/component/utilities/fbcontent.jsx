import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Fbcontent = () => {
    const [pageContent, setPageContent] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get('http://localhost:5000/facebook/page-content', {
                    withCredentials: true,
                });

                // If server indicates login is needed, open the login URL in a new tab
                console.log(res.data);
                if (res.data && res.data.needsLogin && res.data.loginUrl) {
                    window.open(res.data.loginUrl, '_blank');
                    return;
                }

                if (res.data && res.data.pageContent) {
                    setPageContent(res.data.pageContent);
                } else {
                    setPageContent(null);
                }
            } catch (err) {
                // On error, if server provided a login URL, open it
                const loginUrl = err.response?.data?.loginUrl;
                if (loginUrl) window.open(loginUrl, '_blank');
                console.error(err);
            }
        };

        fetch();
    }, []);

    return <div>{pageContent ? <pre>{JSON.stringify(pageContent, null, 2)}</pre> : <p>No content loaded.</p>}</div>;
};

export default Fbcontent;
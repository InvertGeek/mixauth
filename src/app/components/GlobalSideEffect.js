"use client"
import React, {useEffect} from 'react';

function GlobalSideEffect(props) {

    useEffect(() => {

        console.info('由MixAuth提供认证支持')

    }, [])

    return (
        <></>
    );
}

export default GlobalSideEffect;
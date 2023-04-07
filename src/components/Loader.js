import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
    <ContentLoader
        speed={2}
        width="100%"
        height={500}
        viewBox="0 0 1920 500"
        backgroundColor="#ccc9d4"
        foregroundColor="#feccff"
        {...props}
    >
        <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
        <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
        <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
        <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
        <rect x="0" y="88" rx="3" ry="3" width="500" height="6" />
        <circle cx="20" cy="20" r="20"  />
    </ContentLoader>

)

export default MyLoader

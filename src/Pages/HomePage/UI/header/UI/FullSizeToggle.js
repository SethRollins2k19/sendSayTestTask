import React, {useEffect, useState} from "react";


const FullSizeToggle = () => {
    const [isFullSize, setIsFullSize] = useState(false);
    useEffect(() => {
        if(isFullSize) {
            document.querySelector("#root").requestFullscreen();
        } else {
            if(document.fullscreenElement){
                document.exitFullscreen();
            }
        }
    }, [isFullSize]);
    return (
        <div className={`full-size-toggle-wrapper`} onClick={() => setIsFullSize(!isFullSize)}>
            {
                isFullSize ?
                    <svg tabIndex={1} className="full-size-toggle" width="32" height="32" viewBox="0 0 20 20"
                         fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className="full-size-toggle__inner"
                              d="M1 6H4C4.53043 6 5.03914 5.78929 5.41421 5.41421C5.78929 5.03914 6 4.53043 6 4V1M14 1V4C14 4.53043 14.2107 5.03914 14.5858 5.41421C14.9609 5.78929 15.4696 6 16 6H19M19 14H16C15.4696 14 14.9609 14.2107 14.5858 14.5858C14.2107 14.9609 14 15.4696 14 16V19M6 19V16C6 15.4696 5.78929 14.9609 5.41421 14.5858C5.03914 14.2107 4.53043 14 4 14H1"
                              stroke="#0D0D0D"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                        />
                    </svg>
                    :
                    <svg tabIndex={1} className="full-size-toggle" width="32" height="32" viewBox="0 0 24 24"
                         fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.8">
                            <path className="full-size-toggle__inner"
                                  d="M8 3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V8M21 8V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H16M16 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V16M3 16V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H8"
                                  stroke="#0D0D0D"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                            />
                        </g>
                    </svg>
            }


        </div>
    )
}

export {
    FullSizeToggle
}

import React from "react";

class DraggableCursor extends React.Component {
    state = {
        currentPos: 0,
        maxWidth: 0,
        minWidth: 0,
        clickStart: false,
        moveBlock: document.createElement("div"),
    }

    componentDidMount() {
        const deltaOfPropotion = this.props.delta;
        const centerPropotion = this.props.centerPropotion;
        let DragWrapperContainer = document.querySelector(".json-textarea__wrapper-drag-container");
        let wrapper = document.querySelector(".main");
        let moveBlock = document.querySelector(".json-textarea__dragger-range-cursor");
        let width = wrapper.offsetWidth;
        let height = wrapper.offsetHeight;
        let maxWidth = width * deltaOfPropotion/centerPropotion;
        let minWidth = (width - maxWidth)/2;
        let centerDefault = maxWidth / 2 - 1.5;
        DragWrapperContainer.style.width = width + "px";
        DragWrapperContainer.style.height = height + "px";
        DragWrapperContainer.style.left = -width / 2 + "px";
        this.initPos(centerDefault, maxWidth, moveBlock,minWidth);
    }

    initPos(newValue, maxWidth, moveBlock,minWidth) {
        this.setState(prevState => ({
            ...prevState,
            currentPos: newValue,
            maxWidth,
            minWidth,
            moveBlock
        }))
    }
    onClickStart() {
        this.setState(prevState => {
            return {
                ...prevState,
                clickStart: true
            }
        })
    }

    onClickEnd() {
        this.setState(prevState => {
            return {
                ...prevState,
                clickStart: false
            }
        })
    }

    render() {
        const {maxWidth, clickStart,minWidth} = this.state;
        const deltaOfPropotion = this.props.delta;
        const centerPropotion = this.props.centerPropotion;
        return (
            <div className="json-textarea__wrapper-drag">
                <div className="json-textarea__wrapper-drag-container" onMouseUp={() => this.onClickEnd()} style={{pointerEvents: clickStart ? "visible": "none", cursor: clickStart ? "grabbing" : "auto"}}
                     onMouseMove={e => {
                         e.stopPropagation();
                         if (this.state.clickStart) {
                             let mouseCoordinate = e.clientX;
                             if(mouseCoordinate < minWidth){
                                 this.props.changeProportion([centerPropotion - deltaOfPropotion,centerPropotion + deltaOfPropotion])
                             } else if(mouseCoordinate > maxWidth + minWidth) {
                                 this.props.changeProportion([centerPropotion + deltaOfPropotion, centerPropotion - deltaOfPropotion])
                             } else if(mouseCoordinate === maxWidth/2 + minWidth){
                                 this.props.changeProportion([centerPropotion,centerPropotion])
                             } else {
                                 if(mouseCoordinate < maxWidth/2 + minWidth){
                                     let controlProportion = maxWidth/2 + minWidth;
                                     let delta = deltaOfPropotion -  ((mouseCoordinate-minWidth)/(controlProportion - minWidth)) * deltaOfPropotion;
                                     this.props.changeProportion([centerPropotion - delta,centerPropotion + delta])
                                 } else {
                                     let controlProportion = maxWidth + minWidth;
                                     let center = maxWidth/2 + minWidth;
                                     let delta =((mouseCoordinate - center)/(controlProportion - center)) * deltaOfPropotion;
                                     this.props.changeProportion([centerPropotion + delta,centerPropotion - delta])
                                 }
                             }

                         }
                     }}>
                    <div className="json-textarea__dragger-range">
                        <div className={`json-textarea__dragger-range-cursor ${clickStart ? "json-textarea__dragger-range-cursor--draging":""}`} style={{left: `calc(50%  - 9px)`}}
                             onMouseDown={e => {
                                 this.onClickStart();
                             }}
                             onMouseUp={e => {
                                 this.onClickEnd()
                             }}
                             onTouchStart={e => {
                                 this.onClickStart();
                             }}
                             onTouchEnd={e => {
                                 this.onClickEnd()
                             }}
                             onTouchMove={e => {
                                 e.stopPropagation();
                                 if (clickStart) {
                                     let mouseCoordinate = e.touches[0].clientX;
                                     if(mouseCoordinate < minWidth){
                                         this.props.changeProportion([centerPropotion - deltaOfPropotion,centerPropotion + deltaOfPropotion])
                                     } else if(mouseCoordinate > maxWidth + minWidth) {
                                         this.props.changeProportion([centerPropotion + deltaOfPropotion, centerPropotion - deltaOfPropotion])
                                     } else if(mouseCoordinate === maxWidth/2 + minWidth){
                                         this.props.changeProportion([centerPropotion,centerPropotion])
                                     } else {
                                         if(mouseCoordinate < maxWidth/2 + minWidth){
                                             let controlProportion = maxWidth/2 + minWidth;
                                             let delta = deltaOfPropotion -  ((mouseCoordinate-minWidth)/(controlProportion - minWidth)) * deltaOfPropotion;
                                             this.props.changeProportion([centerPropotion - delta,centerPropotion + delta])
                                         } else {
                                             let controlProportion = maxWidth + minWidth;
                                             let center = maxWidth/2 + minWidth;
                                             let delta =((mouseCoordinate - center)/(controlProportion - center)) * deltaOfPropotion;
                                             this.props.changeProportion([centerPropotion + delta,centerPropotion - delta])
                                         }
                                     }

                                 }
                             }}
                             onMouseMove={e => {
                                 if (clickStart) {
                                     let mouseCoordinate = e.clientX;
                                     if(mouseCoordinate < minWidth){
                                         this.props.changeProportion([centerPropotion - deltaOfPropotion,centerPropotion + deltaOfPropotion])
                                     } else if(mouseCoordinate > maxWidth + minWidth) {
                                         this.props.changeProportion([centerPropotion + deltaOfPropotion, centerPropotion - deltaOfPropotion])
                                     } else if(mouseCoordinate === maxWidth/2 + minWidth){
                                         this.props.changeProportion([centerPropotion,centerPropotion])
                                     } else {
                                         if(mouseCoordinate < maxWidth/2 + minWidth){
                                             let controlProportion = maxWidth/2 + minWidth;
                                             let delta = deltaOfPropotion -  ((mouseCoordinate-minWidth)/(controlProportion - minWidth)) * deltaOfPropotion;
                                             this.props.changeProportion([centerPropotion - delta,centerPropotion + delta])
                                         } else {
                                             let controlProportion = maxWidth + minWidth;
                                             let center = maxWidth/2 + minWidth;
                                             let delta =((mouseCoordinate - center)/(controlProportion - center)) * deltaOfPropotion;
                                             this.props.changeProportion([centerPropotion + delta,centerPropotion - delta])
                                         }
                                     }

                                 }
                             }}>
                            <svg width="5" height="18" viewBox="0 0 5 18" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0)">
                                    <circle cx="2.92859" cy="2" r="2" fill="black" fillOpacity="0.2"/>
                                    <circle cx="2.92859" cy="9" r="2" fill="black" fillOpacity="0.2"/>
                                    <circle cx="2.92859" cy="16" r="2" fill="black" fillOpacity="0.2"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0">
                                        <rect width="4" height="18" fill="white" transform="translate(0.928589)"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export {
    DraggableCursor
}

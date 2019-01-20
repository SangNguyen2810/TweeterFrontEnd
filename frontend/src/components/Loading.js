import React from 'react'
import Spinner from "react-spinkit"
import '../styles/Loading.scss'
const Loading = () => {
    return (
        <div className ="sk-pacman">
          <Spinner name="pacman" color="red" overrideSpinnerClassName="abc" />
        </div>
    );
}

export default Loading;
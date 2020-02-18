import React from 'react'

const Row = ({ left, right }) => {
    return (
        <div className="row">
            <div className="col s12">

                <div className="col s3" >
                    {left}
                </div>
                <div className="col s9" >
                    {right}
                </div>
            </div>
        </div>
    )
}
export default Row
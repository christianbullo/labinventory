import React from "react";

export const Loading = () => {
    return(
        <div className="container">
            <div class="row justify-content-center">
                <div class="col-3 text-center">
                    <i className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary" />
                    <h4>Loading...</h4>
                </div>
            </div>
        </div>
    );
}; 
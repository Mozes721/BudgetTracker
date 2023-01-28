
import React from 'react';


export default function Balance ({email}) {
    return (
        <>
            <div className="container d-flex justify-content-center mt-5 ">
                <div className="card p-3 bg-light">
                    <div className="d-flex flex-row justify-content-between text-align-center ">
                       <h2>Total current balance</h2>
                    </div>
                    <div className="card-bottom pt-3 px-3 mb-2">
                        <div className="d-flex flex-row justify-content-between text-align-center">
                            <div className="d-flex flex-column"><span>Balance amount</span><p>&euro; <span
                                className="text-black">88,989</span></p></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
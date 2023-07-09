import React from 'react';
function Imagem(props) {

    return (
        <>
        {
            props.children && <div className="card card-success">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12 col-lg-6 col-xl-4">
                            <div className="card mb-2 bg-gradient-dark">
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-6 col-xl-4">
                            <div className="card mb-2">
                                {
                                    props.children
                                }
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-6 col-xl-4">
                            <div className="card mb-2">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default Imagem;
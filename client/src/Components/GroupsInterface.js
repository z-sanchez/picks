import React from "react";


function GroupsInterface() {
    return (
        <div className="col-lg-11 order-1 order-lg-2 d-flex flex-column align-items-center" id="contentWrapper">
            <div id="pageHeader" className="align-self-start px-2 mt-5">
                <h1>Groups</h1>
                <div className="textBar"/>
            </div>

            <div className="groupContainer align-self-center py-5 d-flex flex-column align-items-center">
                <h1 className="w-100 mb-3">Sanchez</h1>
                <div className="groupBox">

                    <div className="groupMember my-3 d-flex justify-content-center align-items-center">
                        <p className="groupMember__ranking mx-2 mx-lg-5">1st</p>
                        <p className="groupMember__name mx-2 mx-lg-5">Ziek</p>
                        <button className="buttons groupMember__stats  mx-2 mx-lg-5">Stats</button>
                        <button className="buttons groupMember__picks mx-2 mx-lg-5">Picks</button>
                    </div>

                    <div className="groupMember my-3 d-flex justify-content-center align-items-center">
                        <p className="groupMember__ranking mx-2 mx-lg-5">2nd</p>
                        <p className="groupMember__name mx-2 mx-lg-5">Sam</p>
                        <button className="buttons groupMember__stats  mx-2 mx-lg-5">Stats</button>
                        <button className="buttons groupMember__picks mx-2 mx-lg-5">Picks</button>
                    </div>

                    <div className="groupMember my-3 d-flex justify-content-center align-items-center">
                        <p className="groupMember__ranking mx-2 mx-lg-5">3rd</p>
                        <p className="groupMember__name mx-2 mx-lg-5">Rick</p>
                        <button className="buttons groupMember__stats  mx-2 mx-lg-5">Stats</button>
                        <button className="buttons groupMember__picks mx-2 mx-lg-5">Picks</button>
                    </div>

                    <div className="groupMember my-3 d-flex justify-content-center align-items-center">
                        <p className="groupMember__ranking mx-2 mx-lg-5">4th</p>
                        <p className="groupMember__name mx-2 mx-lg-5">Amanda</p>
                        <button className="buttons groupMember__stats  mx-2 mx-lg-5">Stats</button>
                        <button className="buttons groupMember__picks mx-2 mx-lg-5">Picks</button>
                    </div>

                </div>
            </div>
        </div>
    )
}


export default GroupsInterface;
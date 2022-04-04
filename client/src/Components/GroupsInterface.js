import React, {useContext, useEffect, useState} from "react";
import userContext from "../utilities/UserContext";
import {useNavigate} from 'react-router-dom';
import {addGroup, getUsersGroups, signOutApp} from "../firebase/firebase";
import uniqid from "uniqid";
import {getStats} from "../utilities/userDataCalculator";

function GroupsInterface() {
    const context = useContext(userContext);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        async function getGroups() {
            let groups = await getUsersGroups(context.currentUser);
            setGroups(groups);
        }

        getGroups();

    }, [context.currentUser, context.user]);


    async function handleAdd() {
        let groupName = document.getElementById('groupInput').value;

        if (groupName !== "" || groupName !== null) {
            await addGroup(groupName, context.user).then(() => {groupName = ""}).then(() => getUsersGroups(context.user).then((groups) => setGroups(groups)));
        }
    }


    function renderGroup(index) {

        let members = [];

        for (let i = 0; i < groups[index].members.length; i++) {
            members.push(<GroupMember key={uniqid()} member={groups[index].members[i]}/>);
        }
        return (<div key={uniqid()}
                     className="groupContainer align-self-center py-5 d-flex flex-column align-items-center">
            <h1 className="w-100 mb-3 px-2">{groups[index].name}</h1>
            <div className="groupBox">
                {members}
            </div>
        </div>);
    }


    function renderGroups() {
        let groupsToBeRendered = [];

        for (let i = 0; i < groups.length; i++) {
            groupsToBeRendered.push(renderGroup(i));
        }

        return groupsToBeRendered;
    }


    return (
        <div className="col-lg-11 order-1 order-lg-2 d-flex flex-column align-items-center" id="contentWrapper">
            <div id="pageHeader" className="align-self-start px-2 mt-5">
                <div className="d-flex flex-row headerNav">
                    <p className="headerNav__item" onClick={signOutApp}>Sign Out</p>
                </div>
                <h1>Groups</h1>
                <div className="textBar"/>
            </div>

            <form id="addGroupForm" className="align-self-center px-2 mt-5">
                <input type="text" id="groupInput" placeholder={"Enter Group Name"}/>
                <button className="mt-3" onClick={(e) => {
                    e.preventDefault();
                    handleAdd();
                }}>
                    Add Group
                </button>
            </form>
            {renderGroups()}
        </div>
    )
}


export default GroupsInterface;











const GroupMember = (props) => {
    const context = useContext(userContext);
    const navigate = useNavigate();

    const [memberScore, setMemberScore] = useState(null);

    useEffect(() => {

        async function getData() {
            let data = await getStats(props.member).then((stats) => {
                return stats.wins + "-" + stats.losses
            })
            setMemberScore(data);
        }

        if (memberScore == null) getData();

    }, [memberScore, props.member]);


    function handleClick() {
        context.updateUser(props.member);
        navigate('/app/picks');
    }

    if (memberScore === null) return null;
    else {
        let button = (<button className="buttons groupMember__picks mx-2  mx-lg-5" onClick={handleClick}>Profile</button>);
        return (
            <div
                className="groupMember my-3 d-flex justify-content-between align-items-center">
                <p className="groupMember__ranking ps-2 mx-2 mx-lg-5 mb-0">{memberScore}
                </p>
                <p className="groupMember__name mx-2 mx-lg-5 mb-0">{props.member}</p>
                {button}
            </div>
        )
    }
}
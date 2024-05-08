import {useEffect, useState} from "react";


const ProgressBar = ({progress, maxProgress, haveLabel}) => {

    const [progressProcent, setProgressProcent] = useState(0);

    useEffect(() => {
        setProgressProcent(progress / maxProgress * 100);
    }, [progress, maxProgress])

    return (
        <div className={"progress-bar-container"}>
            <div className={"progress-bar"}>
                <div className={"progress-bar-fill"} style={{width: `${progressProcent}%`}}/>
                {haveLabel ?
                    <p className="profile-completed-card-progress-value">{progress}/{maxProgress}</p>
                    :
                    <></>
                }
            </div>
        </div>
    );
}

export default ProgressBar;
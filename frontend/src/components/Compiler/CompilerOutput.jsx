import {useEffect, useState} from "react";
import axiosClient from "../../axiosClient";
import {setCompilerFiles} from "../../redux/Compiler/slice";
import {useParams} from "react-router-dom";

const CompilerOutput = () => {
    const [activeTab, setActiveTab] = useState(0);

    const username = 'user1';
    const {project} = useParams();

    const [path, setPath] = useState("");


    const onClickTab = (index) => {
        setActiveTab(index);
    };

    useEffect(() => {
        axiosClient.post(`/compiler/@${username}/${project}`)
            .then(({data}) => {
                // console.log(data.path);
                setPath(data.path);
            });
    }, []);

    return (
        <div className="output">
            <div className="output-tabs">
                {/*{testtitles.map((value, i) => (*/}
                {/*  <button*/}
                {/*    type="button"*/}
                {/*    onClick={() => onClickTab(i)}*/}
                {/*    className={`output-tab${activeTab === i ? " active" : ""}`}*/}
                {/*  >*/}
                {/*    <p className="output-title">{value}</p>*/}
                {/*  </button>*/}
                {/*))}*/}
            </div>
            <div className="output-mainspace">
                <iframe className="output-container" width="100%" height="100%" src={"http://localhost:8080"}></iframe>
            </div>
        </div>
    );
};

export default CompilerOutput;

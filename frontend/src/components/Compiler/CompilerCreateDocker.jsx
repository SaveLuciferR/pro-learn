import ProgressBar from "../Component/ProgressBar";
import {useState} from "react";


const settingDocker = [
    {
        id: 0,
        title: "Это веб-проект?",
        buttons: [
            {
                code: 'yes',
                title: 'Да, это веб-проект',
            },
            {
                code: 'no',
                title: 'Нет, это не веб-проект',
            }
        ],
    }
]


const CompilerCreateDocker = () => {

    const [amountStep, setAmountStep] = useState(6);
    const [step, setStep] = useState(1);

    return (
        <div className={"create-docker"}>
            <div className={"create-docker-container"}>
                <div className={"create-docker-inner"}>
                    <h3 className={"markdown-h3"}>Настройка докер-контейнера</h3>
                    <ProgressBar haveLabel={true} maxProgress={amountStep} progress={step}/>
                    <div className={"create-docker-question"}>
                        <h5 className={"create-docker-question-title"}></h5>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompilerCreateDocker;
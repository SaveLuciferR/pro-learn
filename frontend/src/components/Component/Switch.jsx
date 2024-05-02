const Switch = ({isToggle, onToggle, text}) => {
    return (
        <div className={"switch-box"}>
            <label className={'switch'}>
                <input type={"checkbox"} checked={isToggle} onChange={() => onToggle()}/>
                <span className={"switch-span"}/>
            </label>
            <span>{text}</span>
        </div>
    );
}

export default Switch;
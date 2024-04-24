const CompilerTaskDescription = ({obj, solvedTask, success}) => {

    const getInputData = () => {
        let temp = '';
        obj['input_data'].map((item, i) => {
            temp += (item) + ', ';
        })
        console.log(temp);
        return temp.replace(/, $/, '');
    }

    const getOutputData = () => {
        let temp = '';
        obj['output_data'].map((item, i) => {
            temp += (item) + ', ';
        })
        console.log(temp);
        return temp.replace(/, $/, '');
    }

    return (
        <div className="compiler-task-container scroll">
            <h3 className="markdown-h3">{obj.title}</h3>
            <div className={"compiler-task-content"} dangerouslySetInnerHTML={{__html: obj.content}}/>
            <div className={"compiler-task-content example"}>
                <div>
                    <div>Входные данные: {getInputData()}</div>
                    <div>Выходные данные: {getOutputData()}</div>
                </div>
                <div>
                    {
                        success === null ?
                            <></> :
                            <>
                                {success ?
                                    <p>Задача решена верно</p> :
                                    <p>Задача решена неверно</p>}
                            </>
                    }
                    <button className={"btn big primary"} type={'button'} onClick={() => solvedTask()}>Проверить
                        задачу
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CompilerTaskDescription;
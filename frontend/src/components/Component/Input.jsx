

const Input = ({classes, placeholder, value, setValue, index = -1}) => {
    return (
        <>
            <input
                type={'text'}
                className={classes}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </>
    );
}

export default Input;
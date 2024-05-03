import { useEffect, useRef, useState } from "react";


const Input = ({classes, placeholder, value, rightValue, setValue}) => {

    const [width, setWidth] = useState(0);

    useEffect(() => {
        setWidth(rightValue.length + 2);
    }, [rightValue]);

    return (
        <>
            <input
                type={'text'}
                style={{width: width + 'ch'}}
                className={classes}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </>
    );
}

export default Input;
import React from 'react';
import { styles } from '../styles/style';

const Option = () => {
    return (
        <div className='absolute bg-slate-800 rounded-lg text-white w-[100px] top-4 left-[-65px] z-10'>
            <div className={styles.option_button}>
                Rename
            </div>
            <div className={styles.option_button}>
                Delete
            </div>
        </div>
    )
};

export default Option;
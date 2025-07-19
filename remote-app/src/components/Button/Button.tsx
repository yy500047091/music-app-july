import { useState, type FC } from 'react';


import style from './button.module.css'
import type { TButtonProps } from './types';

const Button: FC<TButtonProps> = ({ text }) => {
  const [count, setCount] = useState(0);

  return (
    <button className={style.btn} onClick={() => setCount((n) => n + 1)}>
      {`${text} ${count}`}
    </button>
  );
};

export default Button;
import style from './Wrapper.module.css';
export default function Wrapper(props) {
    return <div className={style.Container}>{props.children}</div>;
}
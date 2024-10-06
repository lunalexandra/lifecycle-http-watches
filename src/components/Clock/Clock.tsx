import classes from "./clock.module.css";

interface TimeProps {
    title: string;
    hh: number;
    mm: number;
    ss: number;
    onDelete: () => void;
}

export const Clock:React.FC<TimeProps> = (value) => {

    const { hh, mm, ss, title, onDelete } = value;

    return (
        <div className={classes["clock-container"]}>
            <div className={classes["clock-header"]}> {title} </div>
            <div className={classes["cross-box"]}>
                <button className={classes["cross-btn"]} onClick={onDelete}> X </button>
            </div>
            <div className={classes.clock}>
                <div
                    className={classes.hour}
                    style={{ transform: `rotateZ(${hh * 30 + mm * 0.5}deg)` }}
                ></div>
                <div
                    className={classes.min}
                    style={{ transform: `rotateZ(${mm * 6}deg)` }}
                ></div>
                <div
                    className={classes.sec}
                    style={{ transform: `rotateZ(${ss * 6}deg)` }}
                ></div>
            </div>
        </div>
    );
};
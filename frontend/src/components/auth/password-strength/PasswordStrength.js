const PasswordStrength = ({entropy}) => {
    const calculateProgress = () => {
        if (entropy === 0) {
            return '0%';
        } else if (entropy <= 35) {
            return '25%';
        } else if (entropy <= 59) {
            return '50%';
        } else if (entropy <= 119) {
            return '75%';
        } else {
            return '100%';
        }
    };

    return (
        <div>
            <div className="progress">
                <div
                    className="progress-bar bg-gradient"
                    role="progressbar"
                    style={{width: calculateProgress()}}
                    aria-valuenow={entropy}
                    aria-valuemin="0"
                    aria-valuemax="150"
                ></div>
            </div>
        </div>
    );
};

export default PasswordStrength;

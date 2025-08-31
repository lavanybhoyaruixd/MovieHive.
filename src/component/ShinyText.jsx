const ShinyText = ({ text, disabled = false, speed = 3, className = '' }) => {
  return (
    <div
      className={`shiny-text ${disabled ? 'animation-paused' : ''} ${className}`}
      style={{
        animationDuration: `${speed}s`
      }}
    >
      {text}
    </div>
  );
};

export default ShinyText;

import './Loading.css';

const Loading = ({ 
  type = 'spinner', 
  size = 'medium', 
  text = 'Loading...', 
  fullScreen = false 
}) => {
  const loadingClass = `loading-${type} loading-${size}`;
  
  if (fullScreen) {
    return (
      <div className="loading-fullscreen">
        <div className={loadingClass}>
          {type === 'spinner' && <div className="spinner"></div>}
          {type === 'dots' && (
            <div className="dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          )}
          {type === 'pulse' && <div className="pulse"></div>}
          {text && <p className="loading-text">{text}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className={loadingClass}>
      {type === 'spinner' && <div className="spinner"></div>}
      {type === 'dots' && (
        <div className="dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      )}
      {type === 'pulse' && <div className="pulse"></div>}
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
};

export default Loading;

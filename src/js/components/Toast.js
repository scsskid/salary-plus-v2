import * as React from 'react';
import PropTypes from 'prop-types';

export default function Toast(props) {
  const { toastList, setToastList, autoDelete } = props;

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && toastList.length) {
        deleteToast(toastList[0].id);
      }
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [toastList, autoDelete]);

  function deleteToast(id) {
    const toastListItem = toastList.findIndex((e) => e.id === id);
    toastList.splice(toastListItem, 1);
    setToastList([...toastList]);
  }

  return (
    <div className={`notification-container `}>
      {toastList.map((toast, i) => (
        <div key={i} className={`notification2 toast toast--${toast.type}`}>
          <button
            onClick={() => {
              deleteToast(toast.id);
            }}
          >
            X
          </button>

          <div>
            <p className="notification-title">{toast.title}</p>
            <p className="notification-message">{toast.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

Toast.propTypes = {
  toastList: PropTypes.array.isRequired,
  autoDelete: PropTypes.bool,
  autoDeleteTime: PropTypes.number
};

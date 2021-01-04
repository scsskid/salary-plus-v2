import * as React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default function Toast(props) {
  const { toastList, setToastList, autoDelete } = props;

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && toastList.length) {
        deleteToast(toastList[0].id);
      }
    }, 1000);

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
    <TransitionGroup className={`notification-container `}>
      {toastList.map((toast, i) => {
        return (
          <CSSTransition
            key={toast.id}
            timeout={200}
            classNames="toast-transition"
          >
            <div className={`notification2 toast toast--${toast.type}`}>
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
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
}

Toast.propTypes = {
  toastList: PropTypes.array.isRequired,
  autoDelete: PropTypes.bool,
  autoDeleteTime: PropTypes.number
};

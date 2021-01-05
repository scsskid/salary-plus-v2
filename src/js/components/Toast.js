import * as React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default function Toast({ toastList, setToastList }) {
  const [list, setList] = React.useState(toastList);

  React.useEffect(() => {
    setList(toastList);
  }, [toastList]);

  React.useEffect(deleteIfNotPersitent, [toastList]);

  function deleteIfNotPersitent() {
    if (toastList.length) {
      const latest = [...toastList].reverse()[0];

      if (!latest?.persistent) {
        setTimeout(() => {
          deleteToast(latest.id);
        }, 3000);
      }
    }
  }

  function deleteToast(id) {
    setList((items) => items.filter((item) => item.id !== id));
    setToastList((items) => items.filter((item) => item.id !== id));
  }

  return (
    <TransitionGroup className={`notification-container `}>
      {list.map(({ id, title, message, persistent, confirm }) => {
        return (
          <CSSTransition key={id} timeout={500} classNames="toast-transition">
            <div className="toast">
              {persistent && !confirm ? (
                <button
                  onClick={() => {
                    deleteToast(id);
                  }}
                >
                  X
                </button>
              ) : null}

              {title ? <p className="notification-title">{title}</p> : null}
              {message ? (
                <p className="notification-message">{message}</p>
              ) : null}
              {confirm ? (
                <div>
                  <button
                    className="btn"
                    onClick={() => {
                      confirm.action();
                    }}
                  >
                    {confirm.buttonLabel}
                  </button>
                  {` `}
                  <button
                    className="btn"
                    onClick={() => {
                      deleteToast(id);
                    }}
                  >
                    Not Now
                  </button>
                </div>
              ) : null}
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

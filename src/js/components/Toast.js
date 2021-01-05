import * as React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { getAutoOffsetHeight } from '../utils/helpers';

export default function Toast(props) {
  const { toastList, setToastList, autoDelete } = props;
  const [list, setList] = React.useState(toastList);

  function setContainerCSSHeight() {
    console.log('set Height');
    const notificationContainerDom = document.querySelector(
      '.notification-container'
    );

    setTimeout(() => {
      notificationContainerDom.style.height =
        getAutoOffsetHeight(notificationContainerDom) + 'px';
    }, 0);
  }

  React.useEffect(() => {
    setList(toastList);
  }, [toastList]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && toastList.length && list.length) {
        deleteToast(toastList[0].id);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [toastList, autoDelete]);

  function deleteToast(id) {
    setList((items) => items.filter((item) => item.id !== id));
    setToastList((items) => items.filter((item) => item.id !== id));
  }

  return (
    <TransitionGroup className={`notification-container `}>
      {list.map(({ id, title, description }) => {
        return (
          <CSSTransition
            key={id}
            timeout={500}
            classNames="toast-transition"
            // onEnter={setContainerCSSHeight}
            // onExit={setContainerCSSHeight}
          >
            <div className={`notification2 toast`}>
              <button
                onClick={() => {
                  deleteToast(id);
                }}
              >
                X
              </button>

              <div>
                <p className="notification-title">{title}</p>
                <p className="notification-message">{description}</p>
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

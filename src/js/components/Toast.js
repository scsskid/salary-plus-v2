import * as React from 'react';
import PropTypes from 'prop-types';

export default function Toast(props) {
  const { toastList, autoDelete } = props;
  const [list, setList] = React.useState(toastList);

  React.useEffect(() => {
    setList([...toastList]);
  }, [toastList]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && toastList.length && list.length) {
        deleteToast(toastList[0].id);
      }
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [toastList, autoDelete, list]);

  function deleteToast(id) {
    const listItemIndex = list.findIndex((e) => e.id === id);
    const toastListItem = toastList.findIndex((e) => e.id === id);
    list.splice(listItemIndex, 1);
    toastList.splice(toastListItem, 1);
    setList([...list]);
  }

  return (
    <div className={`notification-container `}>
      {list.map((toast, i) => (
        <div
          key={i}
          className={`notification2 toast `}
          style={{ backgroundColor: toast.backgroundColor }}
        >
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

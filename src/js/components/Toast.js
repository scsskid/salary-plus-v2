import * as React from 'react';

export default function Toast(props) {
  const { toastList, position } = props;
  const [list, setList] = React.useState(toastList);

  React.useEffect(() => {}, [toastList, list]);

  return (
    <div className={`notification-container ${position}`}>
      {list.map((toast, i) => (
        <div
          key={i}
          className={`notification2 toast ${position}`}
          style={{ backgroundColor: toast.backgroundColor }}
        >
          <button>X</button>

          <div>
            <p className="notification-title">{toast.title}</p>
            <p className="notification-message">{toast.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

import React from 'react';

const FormJob = function ({ handleDispatch, id }) {
  const [state, setState] = React.useState({
    name: '',
    rate: 0,
    id: typeof id === 'undefined' ? 'AUTOINCREMENT' : id
  });

  function handleSubmit(e) {
    e.preventDefault();
    handleDispatch(state);
  }

  function handleChange(e) {
    // console.log(e.target.name);
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>ID: {id}</p>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
            required
            placeholder="Enter a job name..."
          />
        </div>
        <div>
          <label htmlFor="name">Rate</label>
          <input
            type="number"
            step="0.01"
            name="rate"
            value={state.rate}
            onChange={handleChange}
            placeholder="Enter optional rate..."
          />
        </div>

        <div>
          {/* <button className="btn">Cancel</button> */}
          <button className="btn" type="submit">
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default FormJob;

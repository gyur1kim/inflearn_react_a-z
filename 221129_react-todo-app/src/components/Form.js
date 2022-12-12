import React from 'react';

function Form({value, setValue, handleSubmit}) {

  const handleChange = (e)=>{
    setValue(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="value"
        placeholder="해야 할 일을 입력하세요"
        value={value}
        onChange={handleChange}
      />
      <input
        type="submit"
        value="입력"
      />
    </form>
  );
}

export default Form;
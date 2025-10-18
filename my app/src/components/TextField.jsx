const TextField = ({ type = "text",autoComplete, className, placeholder, onChange, value }) => {
  return (
    <input
      className={className}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      autoComplete={autoComplete}
    />
  );
};

export default TextField;

const TextField = ({ type = "text", className, placeholder, onChange, value }) => {
  return (
    <input
      className={className}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
};

export default TextField;

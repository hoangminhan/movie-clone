export const useTitle = () => {
  const handleChangeTitle = (value) => {
    document.title = value;
  };
  return {
    handleChangeTitle,
  };
};

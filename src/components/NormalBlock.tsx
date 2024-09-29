export default ({ children, title }: { children: string; title: string }) => {
  return (
    <div className="normal-block">
      <div className="normal-block-title">{title}</div>
      <div className="normal-block-img"></div>
      <div className="normal-block-text">{children}</div>
    </div>
  );
};

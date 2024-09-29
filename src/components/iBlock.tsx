export default ({ children, title }: { children: string; title: string }) => {
  return (
    <div className="i-block">
      <div className="i-block-title">{title}</div>
      <div className="i-block-text">{children}</div>
    </div>
  );
};

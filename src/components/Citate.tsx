export default ({ children, author }: { children: string; author: string }) => {
  return (
    <div className="citate-block">
      <div />
      <div className="citate-block-text">{children}</div>
      <div className="citate-block-author">{author}</div>
    </div>
  );
};

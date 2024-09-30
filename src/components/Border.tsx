export default ({ type }: { type?: string }) => {
  return (
    <div
      className="main-border"
      style={{ justifyContent: type == "center" ? "center" : "end" }}
    >
      <div className="border" />
    </div>
  );
};

const AdminBlog = () => {
  return (
    <>
      <div className="admin-header">
        <input type="search" placeholder="Поиск ..." className="input width1200" />
        <button className="admin-button">Создать статью</button>
      </div>
      <div className="admin-content"></div>
    </>
  );
};

export default AdminBlog;

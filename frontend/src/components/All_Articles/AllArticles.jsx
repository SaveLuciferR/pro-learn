import AllArticlesItem from "./AllArticlesItem";

const AllArticles = () => {
  return (
    <div>
      <div className="maincontent_maintext">
      <div className="maincontent_maintitle">
        <h4 className="maincontent_category"> &gt; Все статьи</h4>
        <div className="maincontent_filter">
          <p className="maincontent_filtertext">Фильтр</p>
          {/* <img className="maincontent_filtericon" src="img/filter.svg"> */}
        </div>
      </div>
    </div>
    <div className="maincontent_allarticle">
      <AllArticlesItem/>
      <AllArticlesItem/>
      <AllArticlesItem/>
      <AllArticlesItem/>
      <AllArticlesItem/>
      <AllArticlesItem/>
    </div>
    </div>
  );
};

export default AllArticles;

import AllArticles from "./AllArticles";
import BestArticles from "./BestArticles";

const AllArticlesMain = () => {
  return (
    <div className="maincontent">
      <div className="maincontent_container">
        <div className="maincontent_maintext">
          <h1 className="maincontent__title">Статьи</h1>
          <h4 className="maincontent_category">
            
            &gt; Лучшие статьи на этой неделе
          </h4>
        </div>
        <BestArticles />
      </div>
      <AllArticles />
    </div>
  );
};

export default AllArticlesMain;

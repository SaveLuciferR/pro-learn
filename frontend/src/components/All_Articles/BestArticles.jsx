import BestArticlesItem from "./BestArticles_item";

function BestArticles() {
  return (
    <div className="maincontent_bestarticle">
      {/* Часть "лучшие статьи на этой неделе" */}
      <BestArticlesItem />
      <BestArticlesItem />
    </div>
  );
}

export default BestArticles;

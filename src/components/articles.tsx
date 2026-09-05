import { ArticleCard } from './articleCard';
import { useCmsArticles } from '../hooks/useCms';

export default function Articles() {
  const { data: articles } = useCmsArticles();

  // The page heading already reads "Beiträge", so this view is just the grid — there is
  // no Aktuell/Archiv split to make, since Beiträge carry no date.
  return (
    <div className="body-text">
      {articles.length === 0 ? (
        <p className="text-ink-muted">
          Zurzeit sind keine Beiträge veröffentlicht.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}

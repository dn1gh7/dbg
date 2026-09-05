import { Link } from 'react-router';
import type { CmsArticle } from '../lib/strapi/articles';
import CardThumb from './cardThumb';

export function ArticleCard({ article }: { article: CmsArticle }) {
  return (
    <Link
      to={`/articles/${article.id}`}
      className="group flex flex-col overflow-hidden rounded-md border border-brand-200 bg-white
        transition-shadow hover:shadow-md
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
    >
      <CardThumb src={article.cardImageUrl} />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-3 font-semibold leading-snug text-brand-900 group-hover:text-brand-700">
          {article.title}
        </h3>
      </div>
    </Link>
  );
}

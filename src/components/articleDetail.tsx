import { Link, useParams } from 'react-router';
import { useCmsArticleDetail } from '../hooks/useCms';
import ContentBlocks from './contentBlocks';

export default function ArticleDetail() {
  const { articleId } = useParams();
  const { status, article } = useCmsArticleDetail(articleId);

  if (status === 'loading') {
    return <p className="measure mx-auto text-ink-muted">Laden…</p>;
  }

  if (!article) {
    return (
      <div className="measure mx-auto">
        <h1 className="heading">Beitrag nicht gefunden</h1>
        <Link className="btn-secondary mt-6" to="/articles">
          Zurück zur Übersicht
        </Link>
      </div>
    );
  }

  return (
    <article>
      <div className="measure mx-auto">
        <Link className="link-inline font-medium text-brand-700" to="/articles">
          ← Beiträge
        </Link>

        <h1 className="heading mt-3">{article.title}</h1>
      </div>

      {/* Everything below the title comes from the blocks; an entry with an empty
          `Inhalt` renders as just its heading. */}
      <ContentBlocks blocks={article.body} title={article.title} />
    </article>
  );
}

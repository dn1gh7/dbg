import type { ReactNode } from 'react';
import type { StrapiRichText } from '../lib/strapi/events';

type RichNode = Record<string, unknown>;

function renderChildren(children: unknown): ReactNode {
  if (!Array.isArray(children)) return null;
  return children.map((child, index) => renderNode(child, index));
}

function renderTextNode(node: RichNode, key: number): ReactNode {
  let content: ReactNode = typeof node.text === 'string' ? node.text : '';
  if (node.bold) content = <strong>{content}</strong>;
  if (node.italic) content = <em>{content}</em>;
  if (node.underline) content = <u>{content}</u>;
  if (node.strikethrough) content = <s>{content}</s>;
  if (node.code) content = <code>{content}</code>;
  return <span key={key}>{content}</span>;
}

function renderNode(node: unknown, key: number): ReactNode {
  if (!node || typeof node !== 'object') return null;
  const n = node as RichNode;
  const type = typeof n.type === 'string' ? n.type : '';

  if (type === 'text') return renderTextNode(n, key);

  if (type === 'link') {
    const href = typeof n.url === 'string' ? n.url : '';
    return (
      <a key={key} href={href} target="_blank" rel="noreferrer" className="underline">
        {renderChildren(n.children)}
      </a>
    );
  }

  const childContent = renderChildren(n.children);
  if (type === 'heading') return <h3 key={key}>{childContent}</h3>;
  if (type === 'list-item') return <li key={key}>{childContent}</li>;
  if (type === 'list') return <ul key={key}>{childContent}</ul>;
  return <p key={key}>{childContent}</p>;
}

export default function StrapiRichText({ value }: { value: StrapiRichText }) {
  if (!value) return null;
  if (typeof value === 'string') return <p className="whitespace-pre-wrap break-words">{value}</p>;
  if (Array.isArray(value)) return <div>{value.map((node, i) => renderNode(node, i))}</div>;
  return <p className="whitespace-pre-wrap break-words">{JSON.stringify(value)}</p>;
}

import Link from 'next/link';

export default function NavLink({ link, children }) {
  const isInternalLink = link.url.startsWith('/');


  if (isInternalLink) {
    return (
      <Link href={link.url}>
        {children}
      </Link>
    );
  }

  if (link.newTab) {
    return (
      <a href={link.url} target='_blank' rel='noopener noreferrer'>
        {children}
      </a>
    );
  }

  return (
    <a href={link.url} target='_self'>
      {children}
    </a>
  );
}
